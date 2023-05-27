import React, { useState } from "react";
import "../Footer/Footer.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faInstagram, faTelegram, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faMailBulk } from "@fortawesome/free-solid-svg-icons";
import Rodal from 'rodal';
import { toast, ToastContainer } from 'react-toastify';
import { ThemeContext } from "../../context/GlobalContext";
import { useContext } from "react";
import AxiosCall from "../AxiosCall/AxiosCall";
import { Modal } from "react-bootstrap";


const Footer = () => {
  const { lang } = useContext(ThemeContext);
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [modalvisible, setModalvisible] = useState(false)



  function sendComment() {
    setModalvisible(false)
    AxiosCall("post", "/message").then(data => {

    })

  };



  return (
    <footer className="footer">
      <div className="footer_contact">
        <div className="footer_contact_title">
          {
            lang == "uz" ? <>
              <h1>Bog'lanish
              </h1>

            </> : lang == 'en' ? <>
              <h1>Contact us </h1>

            </> : <>
              <h1>Связь</h1>

            </>
          }
        </div>
        <div className="footer_contact_row">
          <div className="footer_contact_row_col">
            {lang == "uz" ? <><h5>Mo'ljal:</h5></> : lang == 'en' ? <> <h5>Target:</h5></> : <><h5> Цель:</h5></>}
            {lang == "uz" ? <><p>«Sherbudin» Savdo majmuasi.</p></> : lang == 'en' ? <> <p>Trade Complex "Sherbudin".</p></> : <><p> Торговый Комплекс "Шербудин".</p></>}
            {lang == "uz" ? <><h4>Transportlar: 72, 236-avtobuslar yo`nalish taksilari.</h4></> : lang == 'en' ? <> <h4>Transport: buses 72, 236, taxis.</h4></> : <><h4> Транспорт: автобусы 72, 236, такси.</h4></>}
          </div>
          <div className="footer_contact_row_col">
            {lang == "uz" ? <><h5>Telefon:</h5></> : lang == 'en' ? <> <h5>Telephone:</h5></> : <><h5> телефон:</h5></>}
            <p>0(365) 228-94-24, 228-94-19</p>
          </div>
          <div className="footer_contact_row_col">
            {lang == "uz" ? <><h5>Faks:</h5></> : lang == 'en' ? <> <h5>Fax:</h5></> : <><h5> Факс:</h5></>}

            <p>Fax:0(365) 228-94-24</p>
          </div>
          <div className="footer_contact_row_col">
            <h5>Email:</h5>
            <a className="email" target={"_blank"} href="https://umail.uz/">tiimbfuz@umail.uz, buxtimi@mail.ru</a>
          </div>
          <div className="footer_contact_row_col">
            {lang == "uz" ? <><h5>Ijtimoiy tarmoqlar:</h5></> : lang == 'en' ? <> <h5>Social networks:</h5></> : <><h5> Социальные сети:</h5></>}

            <div className="footer_contact_row_col_social">
              <a href="https://www.facebook.com/tiiame.uz/" target={"_blank"} className="footer_contact_row_col_social_item">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="https://twitter.com/tiiameofficial?lang=en" target={"_blank"} className="footer_contact_row_col_social_item">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="https://t.me/TIQXMMIBuxoro" target={"_blank"} className="footer_contact_row_col_social_item">
                <FontAwesomeIcon icon={faTelegram} />
              </a>
              <a href="https://www.youtube.com/channel/UCR2v5fa2y7-fjoDWyEMU0Sg" target={"_blank"} className="footer_contact_row_col_social_item">
                <FontAwesomeIcon icon={faYoutube} />
              </a>
            </div>
          </div>
        </div>
        <div className="footer_contact_row2">
          <div className="footer_contact_row2_col">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6133.057335824391!2d64.4581287!3d39.7726897!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f500593eb541ad1%3A0xba79947337de01c8!2sBukharskiy%20Filial%20Tashkentskogo%20Instituta%20injinerov%20Irrigatsiy%20i%20mexanizatsiy%20sellskogo%20xozaystvo!5e0!3m2!1sen!2s!4v1677563769836!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: "0" }}
              allowFullScreen=""
              loading="lazy"
              title="mapUniversity"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="footer-right-row">
            <div className="work-times">
              <span>{lang == "uz" ? 'Ish kunlari:' : lang == "ru" ? 'Рабочие дни:' : 'Working days:'}</span>
              <div className="information-card">
                {lang == "uz" ? "Du-Pa" : lang == "ru" ? 'Пон-Чет' : 'Mon-Thurs'}: 9:00 - 18:00
              </div>
              <div className="information-card">
                {lang == "uz" ? 'Tushlik:' : lang == "ru" ? 'Обед:' : 'Lunch:'} 13:00 - 14:00
              </div>
            </div>
            <div className="other">
              <span>
                {lang == "uz" ? `Bog'lanish uchun:` : lang == "ru" ? 'Связаться:' : 'To contact:'}
              </span>
              <div className="information-card">+998 (71) 228-94-24</div>
              <div className="information-card" onClick={() => setModalvisible(true)}>
                {lang == "uz" ? 'Rektorga murojat' : lang == "ru" ? 'Обращение к ректору' : 'Appeal to the Rector'}

              </div>
            </div>
          </div>
        </div>
        <div className="footer_contact_row3">
          {lang == "uz" ? <><p>© 2023 Barcha huquqlar himoyalangan</p></> : lang == 'en' ? <> <p>© 2023 All rights reserved</p></> : <><p> © 2023 Все права защищены</p></>}

          <p>
            {lang == "uz" ? <><span>Sayt yaratuvchisi:</span></> : lang == 'en' ? <> <span>Site creator:</span></> : <><span> Создатель сайта:</span></>}


            UNIPOINT SOFTWARE DEVELOPMENT
          </p>
        </div>
        <Modal show={modalvisible} onHide={() => setModalvisible(false)} >
          <Modal.Body>
            <div className="email-box">
              <div className="email-header">
                <h5>{lang == "uz" ? 'Izoh qoldirish' : lang == "ru" ? "Оставить комментарий" : 'Leave a comment'}</h5>
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
                          ? "Telefon raqam"
                          : lang === "ru"
                            ? "Номер телефона"
                            : "Phone"
                      }
                      onChange={(e) => setPhone(e.target.value)}
                      value={phone}
                    />

                    <input
                      required
                      placeholder={
                        lang === "uz"
                          ? "Elektron pochta "
                          : lang === "ru"
                            ? "Электронная почта "
                            : "Email"
                      }
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />

                    <input
                      required
                      placeholder={
                        lang === "uz"
                          ? "Sarlavha"
                          : lang === "ru"
                            ? "Электронная почта или номер телефона"
                            : "Title"
                      }
                      onChange={(e) => setTitle(e.target.value)}
                      value={title}
                    />
                    <textarea
                      required
                      placeholder={
                        lang === "uz"
                          ? "Xat"
                          : lang === "ru"
                            ? "Комментарий"
                            : "Message"
                      }
                      minRows={3}
                      maxRows={6}
                      onChange={(e) => setBody(e.target.value)}
                      value={body}
                    />
                  </div>
                  <div className="btns mt-4">
                    <button type='button' className='close-btn' onClick={() => setModalvisible(false)}>
                      {lang == "uz" ? 'Yopish' : lang == "ru" ? "закрывать" : 'Close'}
                    </button>
                    <button type='submit' className='send-btn'>
                      {lang == "uz" ? 'Yuborish' : lang == "ru" ? "Отправить" : 'Send'}
                    </button>
                  </div>
                </form>
              </div>
            </div>

          </Modal.Body>
        </Modal>

      </div>

    </footer>
  );
};

export default Footer;
