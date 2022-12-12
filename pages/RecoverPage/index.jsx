import css from "./index.module.css";
import { useState, useEffect } from "react";
import { Button, Input, message, Tooltip } from "antd";
import {
  UserOutlined,
  MailFilled,
  LockFilled,
  EyeTwoTone,
  EyeInvisibleOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { RecoverAPI } from "@/request/api";
import { useNavigate } from "react-router-dom";
import TimeBtn from "@/Components/TimeButton/index";

const Recover = () => {
  let timer;
  useEffect(() => {
    return clearTimeout(timer);
  }, []);
  const navigateTo = useNavigate();
  const [time, setTime] = useState(3);
  const [email, setEmail] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  // const [captchaUuid, setCaptchaUuid] = useState("");
  // const getCaptchaImage = async () => {
  //   let captchaAPIRes = await CaptchaAPI();
  //   console.log("captchaAPIRes", captchaAPIRes);
  //   if (captchaAPIRes.code === 200) {
  //     setCaptchaImg(captchaAPIRes.data.img);
  //     setCaptchaUuid(captchaAPIRes.data.uuid);
  //   }
  // };
  const getEmail = (e) => {
    // console.log("email", e.target.value);
    setEmail(e.target.value);
  };
  const getEmailCode = (e) => {
    // console.log("emailCode", e.target.value);
    setEmailCode(e.target.value);
  };
  const getPassword = (e) => {
    // console.log("password", e.target.value);
    setPassword(e.target.value);
  };
  const getConfPassword = (e) => {
    // console.log("confp", e.target.value);
    setConfPassword(e.target.value);
  };
  const returnToLogin = () => {
    navigateTo("/login");
  };
  const recoverPwd = async () => {
    if (
      !password.trim() ||
      !confPassword.trim() ||
      !email.trim() ||
      !emailCode.trim()
    ) {
      message.error("请输入完整信息");
    } else if (password !== confPassword) {
      message.error("两次密码不一致,请重新设置密码");
    } else {
      let res = await RecoverAPI({ email, confPassword, emailCode, password });
      console.log("1123", res);
      if (res.code === 200) {
        message.success("找回密码成功,3秒后返回登陆页");
        timer = setTimeout(() => {
          navigateTo("/login");
        }, 3000);
      }
    }
  };
  const formatTrue = (str) => {
    var regx = /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{6,20}$/;
    if (str.match(regx) && str.length >= 8) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <div className={css.recoverBox}>
      <div className={css.top}>
        <Tooltip title="返回登录">
          <ArrowLeftOutlined
            style={{ fontSize: "22px" }}
            onClick={returnToLogin}
          />
        </Tooltip>
        <p className={css.title}>找回密码</p>
      </div>
      {/* <Input
        size="large"
        placeholder="用户名"
        prefix={<UserOutlined style={{ color: "skyblue" }} />}
        className={css.account}
        onChange={getAccount}
      /> */}
      {/* 验证码 */}
      <div className={css.captchaBox}>
        <Input
          placeholder="邮箱"
          prefix={<MailFilled style={{ color: "skyblue" }} />}
          className={css.captchaBoxInput}
          onChange={getEmail}
        />
        {/* <Button type="primary" size="large" onClick={getCaptcha}>
                获取验证码
            </Button> */}
        <TimeBtn mail={email} />
      </div>
      <Input
        size="large"
        placeholder="邮箱验证码"
        className={css.account}
        onChange={getEmailCode}
      />
      {/* 密码 */}
      <Input.Password
        prefix={<LockFilled style={{ color: "skyblue" }} />}
        placeholder="密码，8位以上的数字和字母的组合"
        iconRender={(visible) =>
          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
        }
        className={css.password}
        onChange={getPassword}
      />
      <Input.Password
        prefix={<LockFilled style={{ color: "skyblue" }} />}
        placeholder="确认密码"
        iconRender={(visible) =>
          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
        }
        className={css.password}
        onChange={getConfPassword}
      />
      <Button className={css.recoverButton} onClick={recoverPwd}>
        立即找回
      </Button>
    </div>
  );
};
export default Recover;
