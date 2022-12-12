import { Menu } from "antd";
// import css from "./index.module.css";
import {
  SettingFilled,
  HomeOutlined,
  FundOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
const MenuPage = () => {
  const navigateTo = useNavigate();
  const pathname = useLocation();
  const onClick = (e) => {
    if (e.key === "/home") {
      navigateTo(e.key);
    } else {
      navigateTo(e.key);
    }
    // console.log("click ", e);
    console.log(e.key);
    // navigateTo(e.key);
  };
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const getPath = () => {
    console.log(pathname.pathname);
    if (pathname.pathname === "/person/record") {
      return "record";
    } else if (pathname.pathname === "/person/information") {
      return "information";
    }
    // return pathname.pathname;
  };
  const items = [
    getItem("我的战绩", "record", <FundOutlined />),
    getItem("修改信息", "information", <SettingFilled />),

    getItem("返回首页", "/home", <HomeOutlined />),
  ];
  useEffect(() => {
    if (pathname.pathname === "/person") {
      navigateTo("record");
    } else {
      navigateTo(pathname.pathname);
    }
  }, []);
  return (
    <Menu
      onClick={onClick}
      style={{
        marginTop: 256,
        width: 256,
      }}
      selectedKeys={[getPath()]}
      //   defaultOpenKeys={["record"]}
      mode="inline"
      items={items}
    />
  );
};
export default MenuPage;
