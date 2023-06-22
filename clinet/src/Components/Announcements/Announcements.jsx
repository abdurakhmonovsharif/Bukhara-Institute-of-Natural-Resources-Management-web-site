import { faClose, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AxiosCall from "../AxiosCall/AxiosCall";
import Loading from "../Loading/Loading";
import "./scss/Announcements.scss";
import { ThemeContext } from "../../context/GlobalContext";
import { useContext } from "react";
import elonimage from '../../Images/elon.png'
const Announcements = () => {
  const navigate = useNavigate();
  const [categoryId, setCategoryId] = useState("c3a98a08-9765-4925-9acd-f84e904ff600");
  const { lang } = useContext(ThemeContext);
  const [data, setData] = useState([]);
  const [demoData, setDemoData] = useState([1, 2, 3, 4, 5, 6]);
  useEffect(() => {
    get();
  }, []);
  function get() {
    AxiosCall(
      "get",
      "/content/announcements/" + lang
    ).then((res) => {
      setData(res.contents);
    });
  }
  function formatDateAndTime(dateTimeString) {
    const dateTime = new Date(dateTimeString);
    const formattedDate = dateTime.toLocaleDateString();
    const formattedTime = dateTime.toLocaleTimeString();
    return `${formattedDate} ${formattedTime}`;
  }
  return (
    <section className="Announcements">
      <div className="Announcements-header">
        {lang == "uz" ? (
          <>
            <h1>E'lonlar</h1>
            <span
              onClick={() =>
                navigate(
                  "/E'lonlar/" +
                  categoryId +
                  "/all"
                )
              }
            >
              Barcha E'lonlar
            </span>
          </>
        ) : lang == "en" ? (
          <>
            <h1> Announcement</h1>
            <span
              onClick={() =>
                navigate(
                  "/announcements/" +
                  categoryId +
                  "/all"
                )
              }
            >
              {" "}
              All Announcements
            </span>
          </>
        ) : (
          <>
            <h1>Объявления</h1>
            <span
              onClick={() =>
                navigate(
                  "/oбъявления/" +
                  categoryId +
                  "/all"
                )
              }
            >
              Все Объявления
            </span>
          </>
        )}
      </div>
      <div className="Announcements-body">
        {data.length > 0
          ? data?.map((item, index) => {
            return (
              <div className="card-col" key={index} onClick={() => navigate(`/${item.title.replace(/\s+/g, '-').replace(/\//g, '-')}/${item.id}`)}
              >
                <div className="card-col-header">
                  <div className="time-container">
                    <span>{formatDateAndTime(item.created_at)}</span>
                  </div>
                  <div className="viwers">
                    <FontAwesomeIcon icon={faEye} />
                    <span>{item.views}</span>
                  </div>
                </div>

                <div className="card-col-body">
                  <div className="title">{item.title}</div>
                  <div className="image-container">
                    <img className="image-demo" alt="image" src={item.url ? item.url : elonimage} />
                  </div>
                </div>
              </div>
            );
          })
          : // for loading
          demoData.map((item, index) => {
            return (
              <div className="card-col" key={index}>
                <div className="card-col-header"></div>

                <div className="card-col-body">
                  <div className="image-container">
                  </div>

                  <Loading />
                </div>
              </div>
            );
          })}
      </div>
      <Outlet />
    </section>
  );
};

export default Announcements;
