import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./scss/Comments.scss";
import { toast, ToastContainer } from "react-toastify";
import AxiosCall from "../AxiosCall/AxiosCall";
import { Modal, ModalBody } from "react-bootstrap";
import { useContext } from "react";
import { ThemeContext } from "../../context/GlobalContext";
const Comments = ({ content, visible, closeCommentModal }) => {
  const { contentId } = content;
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [telOrEmail, setTelOrEmail] = useState("");
  const { lang } = useContext(ThemeContext);
  const [body, setBody] = useState("");
  const sendComment = (e) => {
    e.preventDefault();
    let obj = {
      firstname,
      lastname,
      telOrEmail,
      body,
    };
    AxiosCall("post", `/comment/${contentId}`, obj).then((data) => {
      setFirstname("");
      setLastname("");
      setBody("");
      setTelOrEmail("");
      toast.success("Komentariya jo'natildi!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    });
  };
  return (
    <Modal show={visible} onHide={closeCommentModal} height={450} width={600}>
      <ModalBody>
        <div className="email-box">
          <div className="email-header">
            <h5>
              {lang == "uz"
                ? "Izoh qoldirish"
                : lang == "ru"
                ? "Оставить комментарий"
                : "Leave a comment"}
            </h5>
          </div>
          <div className="body">
            <form onSubmit={sendComment}>
              <div className="inputs">
                <input
                  required
                  placeholder={
                    lang === "uz"
                      ? "Ism"
                      : lang === "ru"
                      ? "Фамилия"
                      : "First Name"
                  }
                  onChange={(e) => setFirstname(e.target.value)}
                  value={firstname}
                />

                <input
                  required
                  placeholder={
                    lang === "uz"
                      ? "Familya"
                      : lang === "ru"
                      ? "Фамилия"
                      : "Last Name"
                  }
                  onChange={(e) => setLastname(e.target.value)}
                  value={lastname}
                />

                <input
                  required
                  placeholder={
                    lang === "uz"
                      ? "Elektron pochta yoki telefon raqam"
                      : lang === "ru"
                      ? "Электронная почта или номер телефона"
                      : "Email or Phone"
                  }
                  onChange={(e) => setTelOrEmail(e.target.value)}
                  value={telOrEmail}
                />

                <textarea
                  required
                  placeholder={
                    lang === "uz"
                      ? "Izoh"
                      : lang === "ru"
                      ? "Комментарий"
                      : "Comment"
                  }
                  minRows={3}
                  maxRows={6}
                  onChange={(e) => setBody(e.target.value)}
                  value={body}
                />
              </div>
              <div className="btns mt-4">
                <button
                  type="button"
                  className="close-btn"
                  onClick={closeCommentModal}
                >
                  {lang == "uz"
                    ? "Yopish"
                    : lang == "ru"
                    ? "закрывать"
                    : "Close"}
                </button>
                <button type="submit" className="send-btn">
                  {lang == "uz"
                    ? "Yuborish"
                    : lang == "ru"
                    ? "Отправить"
                    : "Send"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default Comments;
