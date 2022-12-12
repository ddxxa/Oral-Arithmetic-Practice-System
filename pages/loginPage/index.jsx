import React from "react";
import css from "./index.module.css";
import { useEffect } from "react";
import { Input, Space, Button, message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CaptchaAPI, LoginAPI } from "@/request/api.jsx";
const Login = () => {
  let navigatTo = useNavigate();
  useEffect(() => {
    getCaptchaImage();
  }, []);
  const [useNameValue, setUserNameValue] = useState(""); //定义用户名
  const [passwordValue, setPasswordValue] = useState(""); //定义密码
  const [captchaValue, setCaptchaValue] = useState(""); //定义验证码
  const [verifyCode, setVerifyCode] = useState(""); //验证码
  const [imgId, setImgId] = useState(""); //验证码的id
  const userNameChange = (e) => {
    console.log(e.target.value);
    setUserNameValue(e.target.value);
  };
  const passwordChange = (e) => {
    setPasswordValue(e.target.value);
  };
  const captchaChange = (e) => {
    setCaptchaValue(e.target.value);
  };

  const goToLogin = async () => {
    console.log("用户名", useNameValue);
    console.log("密码：", passwordValue);
    console.log("验证码", captchaValue);
    //判断空值
    if (!useNameValue.trim() || !passwordValue.trim() || !captchaValue.trim()) {
      message.error("请输入完整信息");
      getCaptchaImage();
    } else {
      let res = await LoginAPI({
        username: useNameValue,
        password: passwordValue,
        imgId: imgId,
        verifyCode: captchaValue,
      });
      console.log("登陆", res);
      if (res.code === 200) {
        message.success("登陆成功");
        navigatTo("/home");
        localStorage.setItem("token", res.data);
        console.log("token", localStorage.getItem("token"));
      } else {
        message.error(res.msg);
        getCaptchaImage();
      }
    }
  };
  const getCaptchaImage = async () => {
    let captchaAPIRes = await CaptchaAPI();
    console.log("captchaAPIRes", captchaAPIRes);
    if (captchaAPIRes.code === 200) {
      setVerifyCode(captchaAPIRes.data.img);
      setImgId(captchaAPIRes.data.uuid);
    }
  };
  const goToRegister = () => {
    navigatTo("/register");
    // console.log(location.pathname)
  };
  const gotoRecover = () => {
    navigatTo("/recover");
  };
  return (
    // 登陆盒子
    <div className={css.loginbox}>
      {/* 标题 */}
      <div className={css.title}>
        <h1>口算练习系统</h1>
        <p className={css.p}>Strive EveryDay</p>
      </div>
      {/* 表单部分 */}
      <div className="form">
        <Space direction="vertical" size="large" style={{ display: "flex" }}>
          <Input placeholder="用户名" onChange={userNameChange} />
          <Input.Password
            placeholder="密码： 8位以上数字、字母的组合"
            onChange={passwordChange}
          />
          {/* 验证码 */}
          <div className={css.captchaBox}>
            <Input
              placeholder="请输入验证码"
              onChange={captchaChange}
              onPressEnter={goToLogin}
            />
            <div className={css.captchaImg} onClick={getCaptchaImage}>
              <img height="28" src={verifyCode} alt="" />
            </div>
            {/* <Input placeholder="请输入验证码"/> */}
          </div>
          {/* 注册与密码找回 */}
          <div className={css.noaccountAndfind}>
            <div>
              <span style={{ color: "black" }}>没有账号？</span>
              <a style={{ height: 38 }} onClick={goToRegister} href="/register">
                前往注册
              </a>
            </div>
            <div className="find">
              <span style={{ color: "black" }}>忘记密码？</span>
              <a alt="" onClick={gotoRecover} href="/recover">
                前往找回
              </a>
            </div>
          </div>
          <Button type="primary" block onClick={goToLogin}>
            登陆
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default Login;
