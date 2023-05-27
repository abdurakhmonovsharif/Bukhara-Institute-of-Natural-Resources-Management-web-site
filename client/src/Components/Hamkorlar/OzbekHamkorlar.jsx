import React, { useContext, useRef, useState } from "react";
import "./OzbekHamkorlar.scss";
import gerb from "../../Images/gerb.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Carousel from "react-multi-carousel";
import { ThemeContext } from "../../context/GlobalContext";
import AliceCarousel from "react-alice-carousel";
import { useEffect } from "react";
import AxiosCall from "../AxiosCall/AxiosCall";
import { useNavigate, useParams } from "react-router-dom";
const OzbekHamkorlar = () => {
  const carouselRef = useRef(null);
  const navigate = useNavigate()
  const { lang } = useContext(ThemeContext);
  const { id } = useParams();
  const [categoryId, setCategoryId] = useState("hbjhbjh");

  const [ozbek, setOzbek] = useState([
    {
      img: 'https://lex.uz/assets/img/lex_uz.svg',
      text: "Lex Uz",

    },
    {
      img: 'https://asialuxe.uz/assets/img/logo400.png',
      text: "Asia luxe",
    },
    {
      img: 'https://www.nicopa.eu//images/NICOPA-logo-horizontal.png',
      text: "NICOPA",
    },
    {
      img: 'https://tiiame.uz/sites/default/files/yvf_1.png',
      text: "GeoInformatics Knowledge Pool",
    },
    {
      img: 'https://oboilux.uz/thumb/2/GHyEsXY2Jnicfmc-hsSlwg/220r135/d/logo.png',
      text: "Lyuks",
    },
  ]);

  // useEffect(() => {
  //   AxiosCall("get", "/category/" + categoryId).then((data) => {
  //       setOzbek(data);
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
  const handleChangeSlide = (direction) => {
    if (direction === 'prev') {
      carouselRef.current.previous();
    } else if (direction === 'next') {
      carouselRef.current.next();
    }
  };
  return (
    <section className="ozbek-hamkorlar">
      <div className="boshqarmalar-header">
        <div className="title">
          <h1>
            {lang == "uz"
              ? "O'zbek  hamkorlar "
              : lang == "en"
                ? "Uzbek partners "
                : "Узбекские партнеры "}
          </h1>
        </div>
        <div className="controllers">
          <button onClick={() => handleChangeSlide("prev")}>
            <FontAwesomeIcon icon={faArrowLeft} className="icon" />
          </button>
          <button onClick={() => handleChangeSlide("next")}>
            <FontAwesomeIcon icon={faArrowRight} className="icon" />
          </button>
        </div>
      </div>
      <div className="boshqarmalar-body">
        <Carousel responsive={responsive}
          ref={carouselRef}
          itemClass="carousel-item-padding-40-px"
        >
          {
            ozbek.map((item) => {
              return (
                <div onClick={() =>
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
              );
            })
          }
        </Carousel>

      </div>
    </section>
  );
};

export default OzbekHamkorlar;
