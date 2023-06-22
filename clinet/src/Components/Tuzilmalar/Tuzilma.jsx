import { faBook, faBriefcase, faGraduationCap, faNewspaper, faUserGroup, faUserTie, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Tuzilma.scss"
import { ThemeContext } from "../../context/GlobalContext";
import { useContext } from "react";
import AxiosCall from "../AxiosCall/AxiosCall";

const Tuzilma = () => {
  const { lang } = useContext(ThemeContext);
  const navigate = useNavigate()
  const [img, setImg] = useState("");
  const [tuzilma, setTuzilma] = useState([{
    img: <FontAwesomeIcon icon={faBook} />,
  },
  {
    img: <FontAwesomeIcon icon={faGraduationCap} />,
  },
  {
    img: <FontAwesomeIcon icon={faBriefcase} />,
  },
  {
    img: <FontAwesomeIcon icon={faUserGroup} />,
  },
  {
    img: <FontAwesomeIcon icon={faUserTie} />,
  },
  {
    img: <FontAwesomeIcon icon={faUsers} />,
  }]);
  const icons = [
    {
      img: <FontAwesomeIcon icon={faBook} />,
    },
    {
      img: <FontAwesomeIcon icon={faGraduationCap} />,
    },
    {
      img: <FontAwesomeIcon icon={faBriefcase} />,
    },
    {
      img: <FontAwesomeIcon icon={faUserGroup} />,
    },
    {
      img: <FontAwesomeIcon icon={faUserTie} />,
    },
    {
      img: <FontAwesomeIcon icon={faUsers} />,
    }
  ]
  useEffect(() => {
    AxiosCall("get", "/navbar_categories_2/structure/" + lang).then((data) => {
      setTuzilma(data)
    })
  }, [])
  const checkCategory = (id, num, name) => {
    AxiosCall("get", `/content/${lang}/${id}/1`).then(data => {
      if (data.contents.length == 1) {
        navigate(`/${name}/${data.contents[0].id}`)
      } else if (data.contents.length == 0) {
        navigate(`/${name}/${id}`)
      } else {
        navigate(`/${name}/${id}/all`)
      }
    })

  }
  return (
    <section className="Tuzilma" id="structure">
      <div className="service">
        <div className="service_title">
          {
            lang == "uz" ? <>
              <h1>Tuzilma
              </h1>
            </> : lang == 'en' ? <>
              <h1>Structure</h1>

            </> : <>
              <h1>Структура</h1>

            </>
          }
        </div>

        <div className="service_rows">
          {
            tuzilma.map((item, index) => (
              <div key={index}

                data-aos="zoom-in-up"
                className="service-col" onClick={() => checkCategory(item.id, 2, item.name)} >
                <div className="service-card">
                  <span>{item?.name ? item.name : '...'}</span>
                </div>
                <div className="icon-container">
                  {icons[index].img}
                </div>
              </div>
            ))
          }
        </div>

      </div>
    </section >
  );
};

export default Tuzilma;

