import React, { lazy } from "react";
import { Navigate } from "react-router-dom";

import Login from "../pages/loginPage/index";
const Exercise = lazy(() => import("../pages/ExercisePage/index"));
const Register = lazy(() => import("../pages/registerPage/index.jsx"));
const System = lazy(() => import("../pages/SystemPage/index"));
const Recover = lazy(() => import("../pages/RecoverPage/index"));
const Home = lazy(() => import("../pages/HomePage/index"));
const WrongQuestion = lazy(() => import("../pages/WrongQuestionPage/index"));
const Person = lazy(() => import("../pages/PersonPage"));
const QuestionBack = lazy(() => import("../pages/PersonPage/QuestionBackPage"));
const Record = lazy(() => import("../pages/PersonPage/RecordPage"));
const Information = lazy(() => import("../pages/PersonPage/InformationPage"));
const ReviseInformation = lazy(() =>
  import("../pages/PersonPage/InformationPage/ReviseBasicInformationPage")
);
const RevisePassword = lazy(() =>
  import("../pages/PersonPage/InformationPage/RevisePasswordPage")
);
const Study = lazy(() => import("../pages/ExercisePage/StudyPage/index"));
const BankPage = lazy(() => import("../pages/ExercisePage/BankPage"));
const withLazyComponent = (element) => (
  <React.Suspense fallback={<div>正在加载中...</div>}>{element}</React.Suspense>
);
const routes = [
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
  {
    path: "/",
    element: withLazyComponent(<System />),
    children: [
      {
        path: "home",
        element: withLazyComponent(<Home />),
      },
      {
        path: "exerise",
        element: withLazyComponent(<Exercise />),
        children: [
          {
            path: "study",
            element: withLazyComponent(<Study />),
          },
          {
            path: "bank",
            element: withLazyComponent(<BankPage />),
          },
        ],
      },
      {
        path: "wrong",
        element: withLazyComponent(<WrongQuestion />),
      },
    ],
  },

  {
    path: "/register",
    element: withLazyComponent(<Register />),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/recover",
    element: withLazyComponent(<Recover />),
  },
  {
    path: "/person",
    element: withLazyComponent(<Person />),
    children: [
      {
        path: "record",
        element: withLazyComponent(<Record />),
      },
      {
        path: "information",
        element: withLazyComponent(<Information />),
        children: [
          {
            path: "reviseBaseInformation",
            element: withLazyComponent(<ReviseInformation />),
          },
          {
            path: "revisePassword",
            element: withLazyComponent(<RevisePassword />),
          },
        ],
      },
      {
        path: "questionBack",
        element: withLazyComponent(<QuestionBack />),
      },
    ],
  },
];
export default routes;
