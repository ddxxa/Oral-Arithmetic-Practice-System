import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Form, Input, Popconfirm, Table, InputNumber } from "antd";
import { GetWrongList } from "../../request/api";
import css from "./index.module.css";
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

const WrongQuestion = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [show, setShow] = useState(true);
  const [count, setCount] = useState(2);
  const [total, setTotal] = useState();
  const [showAnswer, setShowAnswer] = useState(true);
  const pageSize = 10;

  const getWrongList = async () => {
    let res = await GetWrongList({
      page: currentPage,
      rows: pageSize,
      start: (currentPage - 1) * 10,
    });
    console.log("错误", res);
    if (res.code === 200) {
      setData(res.data.list);
      setTotal(res.data.total);
    }
  };
  const pageChange = (e) => {
    setCurrentPage(e);
  };
  useEffect(() => {
    getWrongList();
  }, [currentPage]);
  const pagination = {
    pageSize,
    currentPage,
    total,
    onChange: pageChange,
    showSizeChanger: false,
  };
  useEffect(() => {
    getWrongList();
  }, []);
  const defaultColumns = [
    {
      title: "题目编号",
      dataIndex: "id",
      width: "30%",
      editable: true,
    },
    {
      title: "题目",
      dataIndex: "topic",
    },
    {
      title: "你的答案",
      dataIndex: "operation",
      render: (_, record) =>
        data.length >= 1 ? (
          <InputNumber
            // onChange={(e) => getAnswer(record, e)}
            size="small"
            // disabled={disable}
          ></InputNumber>
        ) : null,
    },
    {
      title: "正确答案",
      dataIndex: "answer",
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
        dataIndex: col.dataIndex,
        title: col.title,
      }),
    };
  });
  const showAnswers = () => {
    setShowAnswer(!showAnswer);
  };
  return (
    <div className={css.box}>
      <Button className={css.btn} onClick={showAnswers}>
        查看答案
      </Button>
      <div className={css.table}>
        <Table
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={data.map((value, index) => {
            return {
              key: value["id"],
              id: index + 1,
              topic: value["question"],
              answer: showAnswer ? value["answer"] : "",
            };
          })}
          columns={columns}
          pagination={pagination}
        />
      </div>
    </div>
  );
};
export default WrongQuestion;
