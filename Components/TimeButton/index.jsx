import React, { useState, useEffect } from "react";
import { Button, message } from "antd";
import css from "./index.module.css";
import { EmailCodeAPI } from "../../request/api";
let timeChange;

const Btn = (props) => {
  const { mail } = props;
  const [time, setTime] = useState(60);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [btnContent, setBtnContent] = useState("获取验证码");

  useEffect(() => {
    clearInterval(timeChange);
    return () => clearInterval(timeChange);
  }, []);

  useEffect(() => {
    if (time > 0 && time < 60) {
      setBtnContent(`${time}s后可重发`);
    } else {
      clearInterval(timeChange);
      setBtnDisabled(false);
      setTime(60);
      setBtnContent("获取验证码");
    }
  }, [time]);

  const getCaptcha = async () => {
    if (!mail.trim()) {
      message.error("请输入邮箱");
    } else {
      const res = await EmailCodeAPI(mail);
      if (res.code === 200) {
        message.success("获取验证码成功");
        // 注意，不要使用 setTime(t-1) ： 闭包问题会导致time一直为59
        timeChange = setInterval(() => setTime((t) => --t), 1000);
        setBtnDisabled(true);
      }
    }
  };
  return (
    <Button
      type="primary"
      size="large"
      onClick={getCaptcha}
      disabled={btnDisabled}
      className={css.captchaBoxBotton}
    >
      {btnContent}
    </Button>
  );
};

export default Btn;
