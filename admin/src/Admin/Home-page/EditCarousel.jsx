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
import AxiosCall, { BASE_URL } from "../../AxiosCall/AxiosCall";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
export default function EditCarousel() {
  const carouselRef = useRef(null);
  const [addSlide, setAddSlide] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(null);
  const [deletingId, setDeletingId] = useState("");
  const [textUZ, setTextUZ] = useState("");
  const [textRU, setTextRU] = useState("");
  const [textEN, setTextEN] = useState("");
  const [img, setImg] = useState("");
  const [file, setFile] = useState(null);
  const [array, setArray] = useState([]);

  const getSlider = (method) => {
    AxiosCall("get", `/slider/UZ`).then((data) => {
      setArray(data);
      if (method === "delete") {
        if (data.length === carouselRef.current.state.selectedItem) {
          carouselRef.current.onClickPrev();
        }
      }
    });
  };
  console.log(carouselRef.current);
  const handlePrevClick = () => {
    carouselRef.current.onClickPrev();
  };

  const handleNextClick = () => {
    carouselRef.current.onClickNext();
  };

  function updateItem(item) {
    setIsEdit(item);
    setAddSlide(true);
    AxiosCall("get", `/slider/edit/${item.id}`).then((data) => {
      const currentSlide = data.find((i) => i.id === item.id);
      currentSlide?.texts.map((item) => {
        if (item.lan == "UZ") {
          setTextUZ(item.text);
        } else if (item.lan == "RU") {
          setTextRU(item.text);
        } else if (item.lan == "EN") {
          setTextEN(item.text);
        }
      });
    });
  }

  function deleteConfirm(id) {
    setAlertVisible(true);
    setDeletingId(id);
  }

  // !!!
  function deleteSlide() {
    AxiosCall("delete", `/slider/${deletingId}`).then((res) => {
      setAlertVisible(false);
      setDeletingId("");
      getSlider("delete");
    });
  }

  function saveSlide(e) {
    e.preventDefault();
    if (!isEdit) {
      if (!file) return toast.error("Rasm qo'shilmagan");
      let formData = new FormData();
      formData.append("file", file);
      AxiosCall("post", "/slider", {
        textUZ,
        textRU,
        textEN,
      })
        .then((data) => {
          AxiosCall("post", "/slider/image/" + data, formData)
            .then((response) => {
              if (response.status == 200) {
                getSlider();
                setFile(null);
                setTextEN("");
                setTextRU("");
                setTextUZ("");
                setAddSlide(false);
                toast.success("Slide muvaffaqiyatli yuklandi");
              }
            })
            .catch((error) => {
              toast.error("Xatolik");
            });
        })
        .catch(() => {
          toast.error("Malumotlar yuklanishida xatolik!");
        });
    } else {
      // !!!
      let formData = new FormData();
      file && formData.append("file", file);

      AxiosCall("put", "/slider/" + isEdit.id, {
        textEN,
        textRU,
        textUZ,
      }).then(() => {
        getSlider();
        setAddSlide(false);
        setIsEdit(null);
        setTextEN("");
        setTextRU("");
        setTextUZ("");
      });
    }
  }

  async function getImage(e) {
    let file = e.target.files[0];
    setFile(e.target.files[0]);
    setImg(await toBase64(file));
  }

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  useEffect(() => {
    getSlider();
  }, []);

  return (
    <>
      <div className="add-item">
        <button className="add-btn" onClick={() => setAddSlide(true)}>
          <FontAwesomeIcon icon={faAdd} />
          Slide Qo'shish
        </button>
      </div>
      <Carousel className="EditCarousel" ref={carouselRef}>
        {array.length > 0 ? (
          array?.map((item, index) => {
            return (
              <div className="banner_item" key={item.id}>
                <div className="banner_item_content">
                  <div className="controller">
                    <button
                      className="delete-btn"
                      onClick={() => deleteConfirm(item.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <button
                      className="edit-btn"
                      onClick={() => updateItem(item)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                  </div>
                  <div className="banner_item_img">
                    <img
                      crossOrigin="anonymous"
                      alt="demonstration2"
                      src={BASE_URL + "/" + item.url}
                    />
                  </div>
                  <div className="container" data-aos="fade-down-right">
                    <div className="textes">
                      <h1>{item.text}</h1>
                    </div>
                    <div className="buttons">
                      {array.length > 1 && (
                        <>
                          <button
                            className="icon-container"
                            onClick={handlePrevClick}
                          >
                            <FontAwesomeIcon
                              icon={faArrowLeft}
                              className="icon"
                            />
                          </button>
                          {index != array.length - 1 && (
                            <button
                              className="icon-container"
                              onClick={handleNextClick}
                            >
                              <FontAwesomeIcon
                                icon={faArrowRight}
                                className="icon"
                              />
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="banner_item">
            <span className="not-found">slide mavjud emas</span>
          </div>
        )}
      </Carousel>
      <Rodal
        width={250}
        height={120}
        visible={alertVisible}
        onClose={() => setAlertVisible(false)}
      >
        <div className="alert-box">
          <span>O'chirilsinmi?</span>
          <div className="btns">
            <button className="no-btn" onClick={() => setAlertVisible(false)}>
              yo'q
            </button>
            <button className="yes-btn" onClick={() => deleteSlide()}>
              ha
            </button>
          </div>
        </div>
      </Rodal>
      <Rodal
        visible={addSlide}
        onClose={() => setAddSlide(false)}
        width={500}
        height={300}
      >
        <form onSubmit={saveSlide} className="form-inputs">
          {!isEdit && (
            <label>
              <input type="file" hidden onChange={getImage} />
              <FontAwesomeIcon icon={faImage} />
              {file ? file.name : "Rasm joylash"}
            </label>
          )}
          <textarea
            type="text"
            placeholder="Sarlavha"
            value={textUZ}
            onChange={(e) => setTextUZ(e.target.value)}
          />
          <textarea
            type="text"
            placeholder="Заголовок"
            value={textRU}
            onChange={(e) => setTextRU(e.target.value)}
          />
          <textarea
            type="text"
            placeholder="Title"
            value={textEN}
            onChange={(e) => setTextEN(e.target.value)}
          />
          <button onClick={saveSlide} className="submit-btn">
            Saqlash
          </button>
        </form>
      </Rodal>
    </>
  );
}
