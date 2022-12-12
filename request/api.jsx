import request from "./config";

//获取图片验证码接口
export const CaptchaAPI = () => request.get("/auth/captcha");
//登陆接口
export const LoginAPI = (params) => request.post("auth/login", params);
//注册接口
export const RegisterAPI = (data) => request.post("/auth/register", data);
//邮箱
export const EmailCodeAPI = (email) => request.get(`/auth/send/?mail=${email}`);
//找回密码
export const RecoverAPI = (data) => request.post("/auth/forget", data);
//
export const RevisePasswordAPI = (data) =>
  request.post("/auth/alterPassword", data);

//获取题库
export const GenerateExerciseAPI = (data) =>
  request.post("/exercise/generateExercise", data);
//获取习题组列表
export const GetExerciseGroupAPI = (data) =>
  request.post("/exercise/exercises", data);
//添加习题组
export const AddExerciseGroupAPI = (data) =>
  request.post("/exercise/generateExercise", data);
//删除习题组
export const DeleteGroupAPI = (id) =>
  request.delete(`/exercise/delete?groupId=${id}`);
//排行榜
export const GetTop = () => request.get("/sys/getRank");
//获取题目列表
export const GetExerciseList = (groupId) =>
  request.get(`/exercise/problemList?groupId=${groupId}`);

export const ExportAPI = (groupId) =>
  request.get(`/exercise/export?groupId=${groupId}`);
//折线图
export const GetChart = () => request.get("/sys/getLineChart");

//饼图
export const GetPie = () => request.get("/sys/getPie");

export const GetInfo = () => request.get("/auth/getUserInfo");

export const GetWrongList = (data) => request.post("/wrong/getList", data);

export const Submit = (data) => request.post("/exercise/submit", data);

export const UpdateUserInfo = (data) =>
  request.post("/auth/updateUserInfo", data);
