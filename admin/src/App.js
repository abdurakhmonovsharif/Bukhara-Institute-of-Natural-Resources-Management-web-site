import Admin from "./Admin/Admin";
import HomePage from "./Admin/Home-page/HomePage";
import Main from "./Admin/Main/Main";
import Content from "./Admin/Main/content/Content";
import ContentModal from "./Admin/Main/contentModal/ContentModal";
import SubAdmins from "./Admin/SubAdmins/SubAdmins";
import Settings from "./Settings/Settings";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import {
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
import NotFound from "./NotFound";
import Login from "./Login/Login";
import { useEffect, useState } from "react";
function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Admin user={user} setUser={setUser} />,
      children: [
        {
          path: "/sub-admins",
          element: <SubAdmins />,
        },
        {
          path: "/edit-home-page",
          element: <HomePage />,
        },
        {
          path: "/main/:id",
          element: <Main />,
          children: [
            {
              path: "/main/:id/content",
              element: <Content />,
            },
            {
              path: "/main/:id/content/:method",
              element: <ContentModal user={user} />,
            },
            {
              path: "/main/:id/content/:childId/:method",
              element: <ContentModal user={user} />,
            },
          ],
        },
        {
          path: "/setting",
          element: <Settings setUser={setUser} user={user} />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
    {
      path: "/login",
      element: <Login user={user} setUser={setUser} />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
