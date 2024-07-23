import { useRoutes } from "react-router-dom";

import HomePage from "@pages/Home";
import UserPage from "@pages/User";
import ExamPage from "@pages/Exam";
import WalletPage from "@pages/wallet";

// 创建路由
const routes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/user",
    element: <UserPage />,
  },
  {
    path: "/exam",
    element: <ExamPage />,
  },
  {
    path: "/wallet",
    element: <WalletPage />,
  },
];

export default function RouterView() {
  // 创建路由
  const elem = useRoutes(routes);
  // 返回接口
  return elem;
}
