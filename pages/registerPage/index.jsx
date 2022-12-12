import css from "./index.module.css";
import { Button, Input, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockFilled,
  MailFilled,
} from "@ant-design/icons";
import { RegisterAPI } from "../../request/api";
import TimeBtn from "@/Components/TimeButton/index";
const RegisterPage = () => {
  let timer;
  useEffect(() => {
    return clearTimeout(timer);
  }, []);
  const navigateTo = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [email, setEmail] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const formatTrue = (str) => {
    var regx = /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{6,20}$/;
    if (str.match(regx) && str.length >= 8) {
      return true;
    } else {
      return false;
    }
  };
  const getAccount = (e) => {
    setUsername(e.target.value);
  };
  const getPassword = (e) => {
    setPassword(e.target.value);
  };
  const getConfPassword = (e) => {
    setConfPassword(e.target.value);
  };
  const getEmail = (e) => {
    setEmail(e.target.value);
  };
  const getEmailCode = (e) => {
    setEmailCode(e.target.value);
  };
  const returnLogin = () => {
    navigateTo("/login");
  };

  const flishRegister = async () => {
    console.log("用户名", username);
    console.log("密码", password);
    console.log("确认密码", confPassword);
    console.log("邮箱", email);
    console.log("邮箱验证码", emailCode);
    if (
      !username.trim() ||
      !password.trim() ||
      !confPassword.trim() ||
      !email.trim() ||
      !emailCode.trim()
    ) {
      message.error("请输入完整信息");
    } else if (password !== confPassword) {
      message.error("两次密码不一致,请重新设置密码");
    } else {
      let res = await RegisterAPI({
        confPassword,
        email,
        emailCode,
        password,
        username,
      });
      console.log("注册res", res);
      if (res.code === 200) {
        message.success("注册成功,2秒后返回首页");
        timer = setTimeout(() => {
          navigateTo("/login");
        }, 2000);
      }
    }
  };
  return (
    <div className={css.registerBox}>
      <p className={css.title}>注册用户</p>
      {/* 账号 */}
      <Input
        size="large"
        placeholder="用户名，用学号进行注册"
        prefix={<UserOutlined style={{ color: "skyblue" }} />}
        className={css.account}
        onChange={getAccount}
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
      {/* 获取邮箱验证码 */}
      <div className={css.captchaBox}>
        <Input
          placeholder="邮箱"
          prefix={<MailFilled style={{ color: "skyblue" }} />}
          className={css.captchaBoxInput}
          onChange={getEmail}
        />
        <TimeBtn mail={email} />
      </div>
      <Input
        size="large"
        placeholder="邮箱验证码"
        className={css.account}
        onChange={getEmailCode}
      />
      {/* 验证码输入 */}
      <Button className={css.returnButton} onClick={returnLogin}>
        返回登陆
      </Button>
      <Button className={css.flishRegister} onClick={flishRegister}>
        立即注册
      </Button>
    </div>
  );
};
export default RegisterPage;
