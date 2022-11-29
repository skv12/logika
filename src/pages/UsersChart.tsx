import React, { useEffect } from "react";
import axios from "axios";
import { Chart, registerables } from "chart.js";
import "./HistoryActivity.scss";
import { IonCol, IonGrid, IonRow } from "@ionic/react";
import { SERV } from "../data/DataApi";
Chart.register(...registerables);

const colors = [
  { fon: "rgba(255, 99, 132, 0.2)", color: "rgba(255, 99, 132, 1)" },
  { fon: "rgba(54, 162, 235, 0.2)", color: "rgba(54, 162, 235, 0.2)" },
];

interface ContainerProps {
  startdate: string;
  enddate: string;
  period: boolean;
}

interface ChartDataset {
  users: Array<string>;
  label: string;
  data: Array<number>;
  backgroundColor: Array<string>;
  borderColor: Array<string>;
  borderWidth: number;
}

const dataset1: ChartDataset = {
  users: [],
  label: "Количество заказов",
  data: [],
  backgroundColor: [],
  borderColor: [],
  borderWidth: 1,
};
const dataset2: ChartDataset = {
  users: [],
  label: "Общая сумма",
  data: [],
  backgroundColor: [],
  borderColor: [],
  borderWidth: 1,
};

const BarChart: React.FC<ContainerProps> = ({ startdate, enddate, period }) => {
  const c_ref = React.useRef(null);
  const c_ref2 = React.useRef(null);
  useEffect(() => {
    axios
      .get(SERV() + "СтатистикаПродавцов", {
        headers: {
          Authorization: "Basic " + localStorage.getItem("app_data_token"),
        },
        params: {
          НачалоДата: startdate.split("T")[0],
          КонецДата: enddate.split("T")[0],
          Период: period,
        },
      })
      .then((response) => response.data)
      .then((data) => {
        dataset1.data = [];
        dataset1.backgroundColor = [];
        dataset1.borderColor = [];
        dataset2.data = [];
        dataset2.backgroundColor = [];
        dataset2.borderColor = [];
        dataset1.users = [];
        dataset2.users = [];
        data.forEach(
          (element: {
            Пользователь: any;
            КоличествоЗаказов: number;
            Сумма: number;
          }) => {
            dataset1.users.push(element.Пользователь);
            dataset2.users.push(element.Пользователь);
            dataset1.data.push(element.КоличествоЗаказов);
            dataset2.data.push(element.Сумма);
            dataset1.backgroundColor.push(colors[0].fon);
            dataset1.borderColor.push(colors[0].color);
            dataset2.backgroundColor.push(colors[1].fon);
            dataset2.borderColor.push(colors[1].color);
          }
        );
        updateChart(dataset1);
        updateChart2(dataset2);
      })
      .catch((error) => {
        return {};
      });
  }, [startdate, enddate, period]);

  function updateChart(dat: ChartDataset) {
    const canvas: any = c_ref.current;
    const ctx = canvas.getContext("2d");
    let status = Chart.getChart(canvas);
    if (status !== undefined) {
      status.destroy();
    }
    var chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: dataset1.users,
        datasets: [
          {
            label: dat.label,
            data: dat.data,
            backgroundColor: dat.backgroundColor,
            borderColor: dat.borderColor,
            borderWidth: dat.borderWidth,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        layout: {
          padding: 20,
        },
        plugins: {
          title: {
            font: {
              size: 10,
            },
          },
        },
      },
    });
    chart.render();
  }
  function updateChart2(dat: ChartDataset) {
    const canvas: any = c_ref2.current;
    const ctx = canvas.getContext("2d");
    let status = Chart.getChart(canvas);
    if (status !== undefined) {
      status.destroy();
    }
    var chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: dataset1.users,
        datasets: [
          {
            label: dat.label,
            data: dat.data,
            backgroundColor: dat.backgroundColor,
            borderColor: dat.borderColor,
            borderWidth: dat.borderWidth,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        layout: {
          padding: 20,
        },
        plugins: {
          title: {
            font: {
              size: 10,
            },
          },
        },
      },
    });
    chart.render();
  }
  return (
    <>
      <IonGrid>
        <IonRow>
          <IonCol>
            <canvas ref={c_ref} width={300} height={300}></canvas>
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol>
            <canvas ref={c_ref2} width={300} height={300}></canvas>
          </IonCol>
        </IonRow>
      </IonGrid>
    </>
  );
};

export default BarChart;
