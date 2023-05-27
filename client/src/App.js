import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Comments from "./Components/Comments/Comments";
import Detailed from "./Components/Detailed/Detailed";
import HomeComponents from "./Components/HomeComponents/HomeComponents";
import React, { Suspense, useContext, useEffect, useState } from 'react';
import Loading from "./Components/Loading/Loading";
import NotFound from "./NotFound";
import { ToastContainer, toast } from "react-toastify";
import { ThemeContext } from "./context/GlobalContext";
const Home = React.lazy(() => import("./Components/Home/Home"))
function App() {
  const { lang } = useContext(ThemeContext)
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Suspense fallback={<Loading />}>
        <Home />
      </Suspense>,
      children: [
        {
          path: "/",
          element: <HomeComponents />
        },
        {
          path: "/announcement/comment/:id",
          element: <Comments />
        },
        {
          path: "/:name/:id",
          element: <Detailed />
        },
        {
          path: "/:name",
          element: <Detailed />
        },
        {
          path: "/:name/:id/all",
          element: <Detailed />
        },
      ]
    },
   
    {
      path: "*",
      element: <NotFound />
    }
  ])
  const networkError = () =>
    toast.error(lang == "uz" ? "XATOLIK INTERNET UZILDI" : lang == "en" ? "ERR INTERNET DISCONNECTED" : "ОШИБКА ИНТЕРНЕТ ОТКЛЮЧЕН", {
      className: "toast-error-container toast-error-container-after ",
    });
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);
  !isOnline && networkError();

  return (<>
    <ToastContainer theme="light" autoClose={5000} rtl={false} />
    <RouterProvider router={router} />

  </>

  )
}

export default App;
