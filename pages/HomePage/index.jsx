import { Table, Empty } from "antd";
import React, { useEffect, useState } from "react";
import { GetTop } from "../../request/api";
import css from "./index.module.css";
const columns = [
  {
    title: "名次",
    dataIndex: "position",
  },
  {
    title: "用户名",
    dataIndex: "username",
  },
  {
    title: "做题数",
    dataIndex: "topicCount",
  },
  {
    title: "正确率",
    dataIndex: "accuracyRate",
  },
];

const Home = () => {
  const [data, setData] = useState([]);
  const getTopTendata = async () => {
    let res = await GetTop();
    if (res.code === 200) {
      setData(res.data);
    }
  };
  useEffect(() => {
    getTopTendata();
  }, []);
  return (
    <div className={css.box}>
      <h4 className={css.h4}>排行榜：TOP 10</h4>
      <Table
        columns={columns}
        dataSource={data.map((value) => {
          return {
            key: value["ownerId"],
            position: value["rank"],
            username: value["name"],
            topicCount: value["problemCount"],
            accuracyRate: value["correct"],
          };
        })}
        size="middle"
        pagination={false}
      />
    </div>
  );
};
export default Home;
