import React, { useEffect, useState } from "react";
import css from "./index.module.css";
import { Row, Col, Descriptions, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";

import MenuPage from "../../Components/Menu";
import { Outlet } from "react-router-dom";
import { GetInfo } from "../../request/api";

const Person = () => {
  const [username, setUsername] = useState("");
  const [grade, setGrade] = useState("");
  const getUserInfo = async () => {
    let res = await GetInfo();
    if (res.code === 200) {
      console.log("用户信息res", res);
      setUsername(res.data.username);
      setGrade(res.data.grade);
    }
  };
  const navigateTo = useNavigate();
  const gotoHome = () => {
    navigateTo("/home");
  };
  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <div className={css.box}>
      <div className={css.top}>
        <Row>
          <Col span={8}></Col>
          <Tooltip title="返回首页">
            <Col span={8} className={css.title} onClick={gotoHome}>
              口算练习系统
            </Col>
          </Tooltip>
          <Col span={8}></Col>
        </Row>
      </div>
      <div className={css.introduce}>
        <Descriptions title="用户信息" column={1}>
          <Descriptions.Item label="姓名">{username}</Descriptions.Item>
          <br></br>
          <br></br>
          <Descriptions.Item label="年级">{grade + "年级"}</Descriptions.Item>
        </Descriptions>
      </div>
      <MenuPage />
      <div className={css.content}>
        <Outlet />
      </div>
    </div>
  );
};
export default Person;
