import React, { useState } from "react";

import Carousel from "react-multi-carousel";

import AxiosCall, { BASE_URL } from "../../AxiosCall/AxiosCall";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Partners() {
  const navigate = useNavigate();
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
  const [id, setId] = useState("");
  const [xorijiy, setXorijiy] = useState([]);
  useEffect(() => {
    getPartners();
  }, []);
  function getPartners() {
    AxiosCall("get", "/content/foreignPartners/UZ").then((data) => {
      setXorijiy(data);
      console.log(data);
    });
  }
  function getId() {
    AxiosCall("get", "/content/foreignPartners").then((data) => {
      localStorage.setItem("c_i", data);
      localStorage.setItem("c_index", 3);
      navigate(`/main/${data}/content/add`);
      setId(data);
    });
  }
  function editPartners(id) {
    AxiosCall("get", "/content/foreignPartners").then((data) => {
      localStorage.setItem("c_i", data);
      navigate(`/main/${data}/content/${id}/edit`);
    });
  }
  return (
    <div className="partners-container">
      <h6>Hamkorlar</h6>
      <button className="add-video-btn" onClick={() => getId()}>
        + Hamkor qo'shish
      </button>
      <Carousel
        responsive={responsive}
        autoPlay
        transitionDuration={"1s"}
        itemClass="carousel-item-padding-40-px"
      >
        {xorijiy.map((item, index) => (
          <div
            key={index}
            onClick={() => editPartners(item.id)}
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
  );
}

export default Partners;
