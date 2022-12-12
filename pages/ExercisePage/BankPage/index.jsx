import React, { useContext, useEffect, useRef, useState } from "react";
import css from "./index.module.css";
import {
  Button,
  Form,
  Input,
  Popconfirm,
  Table,
  Modal,
  Select,
  message,
} from "antd";
import { useNavigate } from "react-router-dom";
import {
  GetExerciseGroupAPI,
  AddExerciseGroupAPI,
  DeleteGroupAPI,
  ExportAPI,
} from "../../../request/api";
import axios from "axios";
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
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};
const BankPage = () => {
  useEffect(() => {
    getExerciseGroup();
  }, []);
  const [level, setLevel] = useState(); //定义年级
  const [isModalOpen, setIsModalOpen] = useState(false); //是否显示对话框
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const navigateTo = useNavigate();
  const [data, setData] = useState([]);
  const getExerciseGroup = async () => {
    let res = await GetExerciseGroupAPI({
      page: currentPage,
      rows: pageSize,
      start: (currentPage - 1) * 10,
    });
    console.log("生成列表", res);
    if (res.code === 200) {
      setData(res.data.list);
      setTotal(res.data.total);
    }
  };
  const gotoExercise = (record) => {
    console.log("record", record);
    localStorage.setItem("groupId", record.key);
    navigateTo(`/exerise/study`);
  };
  const handleDelete = async (e) => {
    let res = await DeleteGroupAPI(e.key);
    if (res.code === 200) {
      message.success("删除成功");
      getExerciseGroup();
    }
  };
  const dowmLoadDataQuery = (res, e) => {
    let data = res;
    console.log(e);
  };
  const exportGroupId = async (e) => {
    axios({
      url: `http://47.108.238.92:8084//exercise/export?groupId=${e.key}`,
      method: "get",
      responseType: "blob",
      headers: {
        token: localStorage.getItem("token"),
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8",
      },
    }).then((res) => {
      console.log(res);
      const link = document.createElement("a");
      let blob = new Blob([res.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      link.style.display = "none";
      link.href = window.URL.createObjectURL(blob);
      link.download = "第" + e.key + "个练习组";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };
  const defaultColumns = [
    {
      title: "题库编号",
      dataIndex: "bankNumber",
      width: "10%",
      editable: true,
    },
    {
      title: "数量",
      width: "10%",
      dataIndex: "number",
    },
    {
      title: "难度",
      width: "10%",
      dataIndex: "difficulty",
    },
    {
      title: "生成时间",
      width: "20%",
      dataIndex: "startTime",
    },
    {
      title: "完成时间",
      width: "20%",
      dataIndex: "endTime",
    },
    {
      title: "练习",
      dataIndex: "exercise",
      render: (_, record) =>
        data.length >= 1 ? (
          <Popconfirm
            title="是否立即练习?"
            onConfirm={() => gotoExercise(record)}
          >
            <a>立即练习</a>
          </Popconfirm>
        ) : null,
    },
    {
      title: "操作",
      dataIndex: "",
      render: (_, record) => (
        <div style={{ display: "flex" }}>
          <div>
            {data.length >= 1 ? (
              <Popconfirm
                title="是否导出?"
                okText="是"
                cancelText="否"
                onConfirm={() => exportGroupId(record)}
              >
                <a>导出</a>
              </Popconfirm>
            ) : null}
          </div>
          &nbsp;&nbsp;&nbsp;
          <div>
            {data.length >= 1 ? (
              <Popconfirm
                title="确认删除?"
                okText="确定"
                cancelText="取消"
                onConfirm={() => handleDelete(record)}
              >
                <a>删除</a>
              </Popconfirm>
            ) : null}
          </div>
        </div>
      ),
    },
  ];
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
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
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    if (count === 0 || level <= 0) {
      message.warning("请选择正确信息");
    } else if (count > 20) {
      message.warning("最大题目数量为20");
    } else {
      let res = await AddExerciseGroupAPI({ level, total: count });
      if (res.code === 200) {
        message.success("添加成功");
        setIsModalOpen(false);
        getExerciseGroup();
      }
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const getTopicNumber = (e) => {
    console.log("数量", e.target.value);
    setCount(parseInt(e.target.value));
  };
  const getLevel = (e) => {
    console.log("年级", parseInt(e));
    setLevel(parseInt(e));
  };
  const pageChange = (e) => {
    console.log("当前页", e);
    setCurrentPage(e);
  };
  useEffect(() => {
    getExerciseGroup();
  }, [currentPage]);
  const pagination = {
    pageSize,
    currentPage,
    total,
    onChange: pageChange,
  };
  return (
    <div className={css.box}>
      <div className={css.btn}>
        <Modal
          title="新增习题组"
          okText="确定"
          cancelText="取消"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form
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
            autoComplete="off"
          >
            <Form.Item
              label="题目数"
              name="题目数"
              rules={[
                {
                  required: true,
                  message: "请输入想要练习的题目数量!",
                },
              ]}
            >
              <Input onChange={getTopicNumber} placeholder="最大题目数量为20" />
            </Form.Item>
            <Form.Item
              label="难度"
              name="难度"
              rules={[
                {
                  required: true,
                  message: "请输入难度",
                },
              ]}
            >
              <Select
                style={{ width: 120 }}
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
          </Form>
        </Modal>
        <Button
          onClick={showModal}
          type="primary"
          style={{
            marginBottom: 16,
            marginLeft: 0,
          }}
        >
          生成习题组
        </Button>
      </div>
      <div className={css.table}>
        <Table
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={data.map((value) => {
            return {
              key: value["id"],
              bankNumber: value["id"],
              number: value["num"],
              difficulty: value["level"] + "年级",
              startTime: value["createTime"].substring(0, 10),
              endTime:
                value["entTime"] === null
                  ? value["entTime"].substring(0, 10)
                  : "未完成",
            };
          })}
          columns={columns}
          className={css.table}
          pagination={pagination}
        />
      </div>
    </div>
  );
};
export default BankPage;
