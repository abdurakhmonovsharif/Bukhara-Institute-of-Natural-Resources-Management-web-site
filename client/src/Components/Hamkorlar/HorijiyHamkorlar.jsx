import React, { useContext, useRef, useState } from "react";
import "./HorijiyHamkorlar.scss";
import Carousel from "react-multi-carousel";
import { ThemeContext } from "../../context/GlobalContext";
import AxiosCall from "../AxiosCall/AxiosCall";
import { useNavigate, useParams } from "react-router-dom";
const HorijiyHamkorlar = () => {
  const carouselRef = useRef(null);
  const { lang } = useContext(ThemeContext);
  const navigate = useNavigate()
  const [categoryId, setCategoryId] = useState("");

  const [xorijiy, setXorijiy] = useState([
    {
      img: 'https://www.hit.ac.il/sites/projects/hit/views/he/images/hit_logo.svg',
      text: "Holon texlonogiya insituti",

    },
    {
      img: 'https://mgri.ru/en/img/logo-en76.png',
      text: "Россия давлат ер тузиш университети ",
    },
    {
      img: 'https://swsu.ru/bitrix/templates/1488/images/swsu-ru-logo.svg?16583445402015',
      text: "Шимоли-ғарбий давлат университети (ЮГО-Западный Государственный Университет ) Курск давлати",
    },
    {
      img: 'https://sun9-12.userapi.com/c4335/g23989512/a_bf736fc6.jpg',
      text: "Душанбе Филиал МГУ им.Ломоносов давлат университети ",
    },
    {
      img: 'https://www.adastra.ru/images/logo1.gif',
      text: "ООО `АдАстра` (Москва)",
    },
  ]);

  // useEffect(() => {
  //   AxiosCall("get", "/category" + categoryId).then((data) => {
  //     setXorijiy(data);
  //   });
  // });
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
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
          <span>{
            lang == "uz" ? 'Barcha hamkorlar' : lang == 'ru' ? 'Все партнеры' : 'All partners'
          }</span>
        </div>
      </div>
      <div className="boshqarmalar-body">
        <Carousel responsive={responsive}
          autoPlay
          transitionDuration={'1s'}
          ref={carouselRef}
          itemClass="carousel-item-padding-40-px"
        >
          {
            xorijiy.map((item, index) => <div key={index} onClick={() =>
              navigate(
                "/detailed/announcements/"
              )
            } className="card-col">
              <div className="image-container">
                <img src={item.img} alt="" />
              </div>
              <div className="text-container">
                <span>{item.text}</span>
              </div>
            </div>
            )
          }
        </Carousel>
      </div>
    </section>
  );
};

export default HorijiyHamkorlar;
