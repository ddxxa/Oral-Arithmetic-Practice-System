import { useNavigate } from "react-router-dom";
import css from "./index.module.css";
import { Col, Row } from "antd";
const Navigation = () => {
  const navigateTo = useNavigate();
  const routes = ["/home", "/exerise", "/wrong"];
  const btn = ["首页", "练习", "错题集"];
  const changePage = (value) => {
    console.log(value);
    if (value === "首页") {
      navigateTo("/home");
    } else if (value === "练习") {
      navigateTo("/exerise");
    } else if (value === "错题集") {
      navigateTo("/wrong");
    }
  };
  return (
    <div className={css.navigationBox}>
      <Row>
        {btn.map((value, index) => {
          return (
            <Col key={value} span={8}>
              <div
                className={css.btn}
                onClick={() => {
                  changePage(value);
                }}
              >
                {value}
              </div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};
export default Navigation;
