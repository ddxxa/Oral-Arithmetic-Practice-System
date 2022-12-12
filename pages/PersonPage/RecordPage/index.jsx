import ReactEcharts from "echarts-for-react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { GetChart, GetPie } from "../../../request/api";
import css from "./index.module.css";
const RecordPage = () => {
  const getChart = async () => {
    let res = await GetChart();
    console.log("折线图", res);
    if (res.code === 200) {
      setDataChart(res.data);
    }
  };
  const getPie = async () => {
    let res = await GetPie();
    console.log("饼图", res.data);
    if (res.code === 200) {
      setDataPie(res.data);
    }
  };
  useEffect(() => {
    getChart();
    getPie();
  }, []);
  const [dataChart, setDataChart] = useState([]);
  const [dataPie, setDataPie] = useState([]);
  const optionChart = {
    xAxis: {
      type: "category",
      data: dataChart.map((value) => {
        return value["date"];
      }),
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: dataChart.map((value) => {
          return value["num"];
        }),
        type: "line",
        smooth: true,
      },
    ],
  };
  const optionPie = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "5%",
      left: "center",
    },
    series: [
      {
        name: "做题情况占比图",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: dataPie.right, name: "正确" },
          { value: dataPie.unFinished, name: "未完成" },
          { value: dataPie.wrong, name: "错误" },
        ],
      },
    ],
  };
  return (
    <div>
      <div className={css.chart}>
        <ReactEcharts option={optionChart} />
      </div>
      <div className={css.pie}>
        <ReactEcharts option={optionPie} />
      </div>
    </div>
  );
};
export default RecordPage;
