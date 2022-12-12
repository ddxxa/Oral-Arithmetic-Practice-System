import css from "./index.module.css";
import { useState, useEffect } from "react";
import { Button, Input, message } from "antd";
import {
  UserOutlined,
  MailFilled,
  LockFilled,
  EyeTwoTone,
  EyeInvisibleOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { RevisePasswordAPI } from "@/request/api";
import { useNavigate } from "react-router-dom";
import TimeBtn from "@/Components/TimeButton/index";
const RevisePassword = () => {
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
  const recoverPwd = async () => {
    if (
      !password.trim() ||
      !confPassword.trim() ||
      !email.trim() ||
      !emailCode.trim()
    ) {
      console.log("123456");
      message.error("请输入完整信息");
    } else if (password !== confPassword) {
      message.error("两次密码不一致,请重新设置密码");
    } else {
      let token = localStorage.getItem("token");
      console.log(token);
      let res = await RevisePasswordAPI({
        email,
        confPassword,
        emailCode,
        password,
      });
      console.log("修改密码", res);
      if (res.code === 200) {
        message.success("修改成功，3秒后返回登陆页重新进行登陆");
        timer = setTimeout(() => {
          navigateTo("/login");
        }, 3000);
      }
    }
  };
  return (
    <div>
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
        className={css.email}
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
        className={css.confPassword}
        onChange={getConfPassword}
      />
      <Button className={css.recoverButton} onClick={recoverPwd}>
        立即找回
      </Button>
    </div>
  );
};
export default RevisePassword;
