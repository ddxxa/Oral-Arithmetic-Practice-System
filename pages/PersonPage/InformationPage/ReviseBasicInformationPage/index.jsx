import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, message, Select } from "antd";
import css from "./index.module.css";
import { GetInfo, UpdateUserInfo } from "../../../../request/api";
const ReviseInformation = () => {
  const [username, setUsername] = useState("");
  const [level, setLevel] = useState("");
  const [changeUsername, setChangeUsername] = useState("");
  const [changeLevel, setChangeLevel] = useState("");
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const getInfo = async () => {
    let res = await GetInfo();
    console.log("修改基本信息", res);
    if (res.code === 200) {
      setUsername(res.data.username);
      setLevel(res.data.level);
    }
  };
  useEffect(() => {
    getInfo();
  }, []);
  const getLevel = (e) => {
    console.log("e.key", e);
    setChangeLevel(e);
  };
  const getUsername = (e) => {
    console.log(e.target.value);
    setChangeUsername(e.target.value);
  };
  const submit = async () => {
    let res = await UpdateUserInfo({
      grade: changeLevel,
      username: changeUsername,
    });
    console.log(res);
    if (res.code === 200) {
      console.log(res);
    }
  };
  return (
    <div className={css.box}>
      <div className={css.from}>
        <Form
          // style={{ position: "absolute", left: "50%" }}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="姓名"
            name="username"
            rules={[
              {
                required: true,
                message: "请输入你的姓名",
              },
            ]}
          >
            <Input
              style={{ width: "300px" }}
              id="input"
              type="text"
              onChange={getUsername}
            />
          </Form.Item>

          <Form.Item
            label="年级"
            name="level"
            rules={[
              {
                required: true,
                message: "请选择你的年级",
              },
            ]}
          >
            <Select
              style={{ width: 300 }}
              onChange={getLevel}
              options={[
                {
                  value: "1",
                  label: "1年级",
                },
                {
                  value: "2",
                  label: "2年级",
                },
                {
                  value: "3",
                  label: "3年级",
                },
                {
                  value: "4",
                  label: "4年级",
                },
                {
                  value: "5",
                  label: "5年级",
                },
                {
                  value: "6",
                  label: "6年级",
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" onClick={submit}>
              提交修改
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default ReviseInformation;
