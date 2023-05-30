import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Rodal from "rodal";
import AxiosCall, { BASE_URL } from "../../AxiosCall/AxiosCall";
import { toast } from "react-toastify";

function EditLogo() {
  const [image, setImage] = useState("");
  const [logoImage, setLogoImage] = useState("");
  const [file, setFile] = useState(null);
  const [visible, setVisible] = useState(false);
  const [year, setYear] = useState("");

  const handleImage = async (fileImage) => {
    await toBase64(fileImage).then((data) => {
      setImage(data);
      setFile(fileImage);
      setVisible(true);
    });
  };
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const saveImage = () => {
    let formData = new FormData();
    formData.append("file", file);
    AxiosCall("post", "/logo", formData)
      .then((response) => {
        console.log(response.data);
        if (response.status == 200) {
          success("Logo muvaffaqiyatli o'zgartirildi");
          setVisible(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const success = (param = "") => {
    toast.success(param);
  };

  useEffect(() => {
    getLogo();
    AxiosCall("get", "/admission_year").then((data) => {
      setYear(data.year);
    });
  }, []);

  const postYear = () => {
    AxiosCall("put", "/admission_year", { year }).then((data) => {
      setYear(data.year);
    });
  };

  const getLogo = () => {
    AxiosCall("get", "/logo").then((data) => {
      setLogoImage(data);
    });
  };
  return (
    <>
      <div className="acceptance__year">
        Qabul yili:
        <input
          value={year}
          onChange={(e) => setYear(e.target.value)}
          type="number"
        />
        <input
          type="button"
          onClick={postYear}
          className="btn btn-primary"
          value="Saqlash"
        />
      </div>
      <div className="logo">
        <div className="image-container">
          <div className="img">
            {image ? (
              <img src={image} alt="logo" />
            ) : (
              <img src={BASE_URL + logoImage} alt="" />
            )}
          </div>
        </div>
        <div className="input-container">
          <div className="container">
            <label>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M21 15V18H24V20H21V23H19V20H16V18H19V15H21ZM21.0082 3C21.556 3 22 3.44495 22 3.9934L22.0007 13.3417C21.3749 13.1204 20.7015 13 20 13V5H4L4.001 19L13.2929 9.70715C13.6528 9.34604 14.22 9.31823 14.6123 9.62322L14.7065 9.70772L18.2521 13.2586C15.791 14.0069 14 16.2943 14 19C14 19.7015 14.1204 20.3749 14.3417 21.0007L2.9918 21C2.44405 21 2 20.5551 2 20.0066V3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082ZM8 7C9.10457 7 10 7.89543 10 9C10 10.1046 9.10457 11 8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7Z"></path>
              </svg>
              <input
                type="file"
                hidden
                onChange={(e) => {
                  setFile(e.target.files[0]);
                  handleImage(e.target.files[0]);
                }}
              />
            </label>
            <p>Logo rasmini o'zgartirish</p>
          </div>
        </div>
        <Rodal
          width={250}
          height={120}
          visible={visible}
          onClose={() => setVisible(false)}
        >
          <div className="alert-box">
            <span>O'chirilsinmi?</span>
            <div className="btns">
              <button
                className="no-btn"
                onClick={() => {
                  setVisible(false);
                  setFile(null);
                  setImage("");
                }}
              >
                yo'q
              </button>
              <button className="yes-btn" onClick={() => saveImage()}>
                ha
              </button>
            </div>
          </div>
        </Rodal>
      </div>
    </>
  );
}

export default EditLogo;
