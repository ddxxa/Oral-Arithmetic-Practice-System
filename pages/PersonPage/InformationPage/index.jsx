import React, { useEffect, useState } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { Menu } from "antd";
const items = [
  {
    label: "基本信息",
    key: "reviseBaseInformation",
  },
  {
    label: "修改密码",
    key: "revisePassword",
  },
];
const Information = () => {
  const pathname = useLocation();
  const navigateTo = useNavigate();
  const [current, setCurrent] = useState("reviseBaseInformation");
  const onClick = (e) => {
    console.log("click ", e.key);
    navigateTo(e.key);
    setCurrent(e.key);
  };
  useEffect(() => {
    console.log(pathname.pathname);
    if (
      pathname.pathname === "/person/information" ||
      pathname.pathname === "/person/information/reviseBaseInformation"
    ) {
      navigateTo("reviseBaseInformation");
      setCurrent("reviseBaseInformation");
    } else {
      setCurrent("revisePassword");
      navigateTo("revisePassword");
    }
  }, []);
  return (
    <div>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
        style={{ position: "relative" }}
      />
      <Outlet />
    </div>
  );
};
export default Information;
