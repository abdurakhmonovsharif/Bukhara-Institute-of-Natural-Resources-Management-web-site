import React, { useContext, useEffect, useRef, useState } from "react";
import "./HorijiyHamkorlar.scss";
import Carousel from "react-multi-carousel";
import { ThemeContext } from "../../context/GlobalContext";
import { useNavigate, useParams } from "react-router-dom";
import AxiosCall from "../AxiosCall/AxiosCall";
import { BASE_URL } from "./../AxiosCall/AxiosCall";
const HorijiyHamkorlar = () => {
  const carouselRef = useRef(null);
  const { lang } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [categoryId, setCategoryId] = useState("");

  const [xorijiy, setXorijiy] = useState([]);

  useEffect(() => {
    getPartners();
  }, []);
  const getPartners = () => {
    AxiosCall("get", "/content/foreignPartners/" + lang).then((data) => {
      setXorijiy(data);
    });
  };
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <section className="horijiy-hamkorlar">
      <div className="boshqarmalar-header">
        <div className="title">
          <h1>
            {lang == "uz"
              ? "Hamkorlar "
              : lang == "en"
              ? "Partners "
              : "Партнеры"}
          </h1>
          <span>
            {lang == "uz"
              ? "Barcha hamkorlar"
              : lang == "ru"
              ? "Все партнеры"
              : "All partners"}
          </span>
        </div>
      </div>
      <div className="boshqarmalar-body">
        <Carousel
          responsive={responsive}
          autoPlay
          transitionDuration={"1s"}
          ref={carouselRef}
          itemClass="carousel-item-padding-40-px"
        >
          {xorijiy.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate("/detailed/announcements/")}
              className="card-col"
            >
              <div className="image-container">
                <img src={BASE_URL + item.url} alt="" />
              </div>
              <div className="text-container">
                <span>{item.title}</span>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default HorijiyHamkorlar;
