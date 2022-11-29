import React, { useState, useEffect } from "react";
import axios from "axios";
import { Chart, registerables } from "chart.js";
import { Store } from "./Store";
import { IonRow, IonCol, IonLabel, IonText } from "@ionic/react";
import { SERV } from "../data/DataApi";

Chart.register(...registerables);

const colors = [
  { fon: "rgba(255, 99, 132, 0.2)", color: "rgba(255, 99, 132, 1)" },
  { fon: "rgba(54, 162, 235, 0.2)", color: "rgba(54, 162, 235, 0.2)" },
  { fon: "rgba(255, 206, 86, 0.2)", color: "rgba(255, 206, 86, 0.2)" },
  { fon: "rgba(75, 192, 192, 0.2)", color: "rgba(75, 192, 192, 0.2)" },
  { fon: "rgba(153, 102, 255, 0.2)", color: "rgba(153, 102, 255, 0.2)" },
];

interface t_info {
  Продаж: string;
  СуммаПродаж: string;
  Возвраты: string;
  СуммаВозвратов: string;
  Процент: string;
  ПроцентВозвратов: string;
}

interface ContainerProps {
  period: string;
  upd: number;
}

const LineChart: React.FC<ContainerProps> = ({ period, upd }) => {
  const [Sales, setSales] = useState<t_info>({
    Продаж: "0,00",
    СуммаПродаж: "0,00",
    Возвраты: "0,00",
    СуммаВозвратов: "0,00",
    Процент: "0,00",
    ПроцентВозвратов: "0,00",
  });

  const c_ref = React.useRef(null);

  useEffect(() => {
    let data = Store.getState().param1;
    axios
      .get(SERV() + "График_", {
        headers: {
          Authorization: "Basic " + localStorage.getItem("app_data_token"),
        },
        params: {
          params: JSON.stringify(data),
        },
      })
      .then((response) => response.data)
      .then((data) => {
        if (data.Code !== 200) {
          let n = 0;
          data.Данные.forEach((d) => {
            d.backgroundColor = colors[n].fon;
            d.borderColor = colors[n].color;
            ++n;
          });
          setSales(data.Показатели);
          updateChart(data);
        }
      })
      .catch((error) => {
        return {};
      });
  }, [upd]);

  function updateChart(info) {
    const canvas: any = c_ref.current;
    const ctx = canvas.getContext("2d");
    let status = Chart.getChart(canvas);
    if (status !== undefined) {
      status.destroy();
    }
    var chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: info.Периоды,
        datasets: info.Данные,
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    chart.render();
  }

  function Proc(props: { percent: string; name: string }): JSX.Element {
    if (props.percent.charAt(0) === "-") {
      return (
        <>
          <IonLabel color="medium" className="text_12">
            {props.name}
          </IonLabel>
          <IonText class="red-2 text_14">{props.percent}</IonText>
        </>
      );
    }
    return (
      <>
        <IonLabel color="medium" className="text_12">
          Процент
        </IonLabel>
        <IonText class="text_14">{props.percent}</IonText>
      </>
    );
  }
  return (
    <>
      <IonRow>
        <IonCol size="12" className="ion-text-center chart-title">
          {period}
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol size="4">
          <IonLabel color="medium" className="text_12">
            Продаж
          </IonLabel>
          <IonText className="text_14">{Sales.Продаж}</IonText>
        </IonCol>
        <IonCol size="4">
          <IonLabel color="medium" className="text_12">
            Сумма
          </IonLabel>
          <IonText className="text_14"> {Sales.СуммаПродаж} </IonText>
        </IonCol>
        <IonCol size="4">
          <Proc percent={Sales.Процент} name="Процент" />
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol size="4">
          <IonLabel color="medium" className="text_12">
            Возвраты
          </IonLabel>
          <IonText className="text_14"> {Sales.Возвраты} </IonText>
        </IonCol>
        <IonCol size="4">
          <IonLabel color="medium" className="text_12">
            Сумма
          </IonLabel>
          <IonText className="text_14"> {Sales.СуммаВозвратов} </IonText>
        </IonCol>
        <IonCol size="4">
          <Proc percent={Sales.ПроцентВозвратов} name={"Процент возвратов"} />
        </IonCol>
      </IonRow>
      <IonRow>
        <canvas ref={c_ref} width={300} height={300}></canvas>
      </IonRow>
    </>
  );
};

export default LineChart;
