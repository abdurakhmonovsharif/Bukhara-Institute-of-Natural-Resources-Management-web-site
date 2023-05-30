import React, { useState } from "react";
import banner from "../../Image/17f5447ad78265d6ab95f.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faArrowLeft,
  faArrowRight,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import { Carousel } from "react-responsive-carousel";
import { faEdit, faImage } from "@fortawesome/free-regular-svg-icons";
import Rodal from "rodal";
import MyAlert from "../../MyAlert/MyAlert";
import AxiosCall from "../../AxiosCall/AxiosCall";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Partners() {
  const navigate = useNavigate();
  const [id, setId] = useState("");

  return (
    <div className="partners-container">
      <h6>Hamkorlar</h6>
      <div className="cards">
        <div
          onClick={() => navigate("/main/uz_hamkorlar/content")}
          className="card"
        >
          <span>O'zbek Hamkorlarni</span>
          <span>o'zgartirish</span>
        </div>
        <div
          onClick={() => navigate("/main/hor_hamkorlar/content")}
          className="card"
        >
          <span>Horijiy Hamkorlarni</span>
          <span>o'zgartirish</span>
        </div>
      </div>
    </div>
  );
}

export default Partners;
