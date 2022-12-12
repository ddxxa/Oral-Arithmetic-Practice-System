import React, { useContext, useEffect, useRef, useState } from "react";
import css from "./index.module.css";
import {
  Button,
  Form,
  Table,
  Modal,
  Popconfirm,
  InputNumber,
  message,
} from "antd";
import { GetExerciseList, Submit } from "../../../request/api";
import { useNavigate } from "react-router-dom";
const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const Study = () => {
  const navigateTo = useNavigate();
  const [data, setData] = useState([]);
  const [time, setTime] = useState(600);
  const [pushData, setPushData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [record, setRecord] = useState();
  const [answer, setAnswer] = useState();
  const [right, setRight] = useState(0);
  const [doNot, setDoNot] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [disable, setDisable] = useState(false);
  const changeAnswer = useRef({ record, answer });
  const timer = useRef();
  const getAnswer = (record, e) => {
    setAnswer(e);
    setRecord(record.key);
  };

  useEffect(() => {
    let { record: preRecord, answer: preAnswer } = changeAnswer.current;
    if (answer !== preAnswer) {
      let status = 0;
      for (let i = 0; i < data.length; i++) {
        if (parseInt(record) === parseInt(data[i].id)) {
          console.log("record", record);
          if (answer === null) {
            status = 0;
          } else if (parseInt(answer) === parseInt(data[i].answer)) {
            status = 1;
          } else if (parseInt(answer) !== parseInt(data[i].answer)) {
            status = 2;
          }
        }
      }

      let d = [...pushData];
      for (let i = 0; i < d.length; i++) {
        if (d[i].id === record) {
          d[i].userAnswer = parseInt(answer);
          d[i].status = status;
        }
      }
      setPushData(d);
    }
  }, [record, answer]);
  const defaultColumns = [
    {
      title: "题号",
      dataIndex: "id",
      width: "20%",
      editable: true,
    },
    {
      title: "题目",
      width: "20%",
      dataIndex: "question",
    },
    {
      title: "答案",
      width: "30%",
      dataIndex: "answer",
      render: (_, record) =>
        data.length >= 1 ? (
          <InputNumber
            onChange={(e) => getAnswer(record, e)}
            size="small"
            disabled={disable}
          ></InputNumber>
        ) : null,
    },
  ];

  const components = {
    body: {
      row: EditableRow,
    },
  };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataindex: col.dataindex,
        title: col.title,
      }),
    };
  });
  const getList = async () => {
    const groupId = localStorage.getItem("groupId");
    await GetExerciseList(groupId).then((res) => {
      if (res.code === 200) {
        setData(res.data);
      }
    });
  };
  useEffect(() => {
    const d = [];
    for (let i = 0; i < data.length; i++) {
      d.push({
        group: localStorage.getItem("groupId"),
        userAnswer: null,
        id: data[i]["id"],
        status: 0,
      });
    }
    setPushData(d);
  }, [data.length]);
  const countdown = () => {
    timer.current = setInterval(() => setTime((t) => --t), 1000);
  };

  const showModal = async () => {
    clearInterval(timer.current);
    setIsModalOpen(true);
    setTime(-1);

    if (disable) {
      let right = 0;
      let doNot = 0;
      let wrong = 0;
      for (let i = 0; i < pushData.length; i++) {
        if (pushData[i].status === 0) {
          doNot++;
        } else if (pushData[i].status === 1) {
          right++;
        } else {
          wrong++;
        }
      }
      setDoNot(doNot);
      setRight(right);
      setWrong(wrong);
      console.log(pushData);
      let res = await Submit(pushData);
      console.log("提交", res);
      if (res.code === 200) {
        message.success("提交成功");
      }
    }
    setDisable(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    navigateTo("/exerise/bank");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    getList();
    countdown();
    setTime(600);
  }, []);
  useEffect(() => {
    if (time < 0) {
      showModal();
      clearInterval(timer.current);
    }
  }, [time]);

  useEffect(() => {}, [isModalOpen]);
  const returnBank = () => {
    navigateTo("/exerise/bank");
  };
  return (
    <div className={css.box}>
      <Modal
        title="测试完成，是否返回题库页？"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="是"
        cancelText="否"
      >
        <p>总测试题数：{right + doNot + wrong}</p>
        <p>正确：{right}</p>
        <p>未做: {doNot}</p>
        <p>错误：{wrong}</p>
      </Modal>
      <span className={css.span}>
        {time > 0
          ? `倒计时：${parseInt(time / 60)}分${time % 60}秒`
          : "测试结束"}
      </span>
      <Button className={css.returnBtn} onClick={returnBank}>
        返回题库
      </Button>
      <div className={css.table}>
        <Table
          components={components}
          pagination={false}
          scroll={{ y: 500 }}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={data.map((value, index) => {
            return {
              key: value["id"],
              id: index + 1,
              question: value["question"],
            };
          })}
          columns={columns}
        />
      </div>
      <div className={css.submitBtn}>
        {disable ? (
          <Button onClick={showModal}>查看结果</Button>
        ) : (
          <Popconfirm
            title="确认提交？"
            onConfirm={showModal}
            okText="确定"
            cancelText="取消"
          >
            <Button>提交</Button>
          </Popconfirm>
        )}
      </div>
    </div>
  );
};
export default Study;
