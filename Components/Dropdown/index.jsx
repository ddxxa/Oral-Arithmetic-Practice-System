import React, { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { message } from "antd";
import { Dropdown, Space } from "antd";
import { useNavigate } from "react-router-dom";
import css from "./index.module.css";
const DropdownMenu = () => {
  let navigateTo = useNavigate();
  const [open, setOpen] = useState(false);

  const handleMenuClick = (e) => {
    if (e.key === "/person") {
      navigateTo(e.key);
    } else if (e.key === "/login") {
      message.success("成功退出");
      navigateTo("/login");
      localStorage.removeItem("token"); //退出系统，删除token
    }
  };

  const handleOpenChange = (flag) => {
    setOpen(flag);
  };

  const items = [
    {
      label: "个人中心",
      key: "/person",
    },
    {
      label: "退出登陆",
      key: "/login",
    },
  ];

  return (
    <Dropdown
      menu={{
        items,
        onClick: handleMenuClick,
      }}
      onOpenChange={handleOpenChange}
      open={open}
      className={css.dropdown}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space style={{ fontSize: "16px" }}>
          <div className={css.photo}>
            <UserOutlined />
          </div>
        </Space>
      </a>
    </Dropdown>
  );
};

export default DropdownMenu;
