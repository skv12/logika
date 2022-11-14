import React, { useState, useEffect } from "react";
import axios from "axios";
import { Chart, registerables } from "chart.js";
import { Store, SERV } from "./Store";
import { IonRow, IonCol, IonLabel, IonText, IonItem } from "@ionic/react";
import "./Tab3.css";

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
    let Склады = Store.getState().param1.Склады;

    let user = Store.getState().user;

    axios
      .get(SERV() + "График_", {
        headers: {
          Authorization: "Basic " + localStorage.getItem("app_data_token"),
        },
        params:{
          params: {
            Период: period,
            Склады: Склады,
          },
        }
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
        } //else console.log(data)
      })
      .catch((error) => {
        return {};
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [upd]);

  function updateChart(info) {
    const canvas: any = c_ref.current;
    const ctx = canvas.getContext("2d");
    //  console.log(ctx);

    //ctx.fillRect(0,0, 100, 100);

    new Chart(ctx, {
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
  }

  function Proc(props: { percent: string }): JSX.Element {
    let elem = <></>;
    if (props.percent.charAt(0) === "-") {
      elem = (
        <IonItem>
          <IonLabel position="stacked"> Процент </IonLabel>
          <IonText class="red-2 f-1"> {props.percent} </IonText>
        </IonItem>
      );
    } else
      elem = (
        <IonItem>
          <IonLabel position="stacked"> Процент </IonLabel>
          <IonText class="f-1"> {props.percent} </IonText>
        </IonItem>
      );
    return elem;
  }
  return (
    <>
      <IonRow>
        <IonCol size="12" class="a-center">
          {period}
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol size="3.5">
          <IonItem>
            <IonLabel class="f-1" position="stacked">
              {" "}
              Продаж{" "}
            </IonLabel>
            <IonText class="f-1"> {Sales.Продаж} </IonText>
          </IonItem>
        </IonCol>
        <IonCol size="5" class="a-center">
          <IonItem>
            <IonLabel position="stacked"> Сумма </IonLabel>
            <IonText class="f-1"> {Sales.СуммаПродаж} </IonText>
          </IonItem>
        </IonCol>
        <IonCol size="3.5" class="a-center">
          <Proc percent={Sales.Процент} />
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol size="3.5">
          <IonItem>
            <IonLabel class="f-1" position="stacked">
              {" "}
              Возвраты{" "}
            </IonLabel>
            <IonText class="f-1"> {Sales.Возвраты} </IonText>
          </IonItem>
        </IonCol>
        <IonCol size="5" class="a-center">
          <IonItem>
            <IonLabel class="f-1" position="stacked">
              {" "}
              Сумма{" "}
            </IonLabel>
            <IonText class="f-1"> {Sales.СуммаВозвратов} </IonText>
          </IonItem>
        </IonCol>
        <IonCol size="3.5" class="a-center">
          <Proc percent={Sales.ПроцентВозвратов} />
        </IonCol>
      </IonRow>
      <IonRow>
        <canvas ref={c_ref} width={300} height={300}></canvas>
      </IonRow>
    </>
  );
};

export default LineChart;
