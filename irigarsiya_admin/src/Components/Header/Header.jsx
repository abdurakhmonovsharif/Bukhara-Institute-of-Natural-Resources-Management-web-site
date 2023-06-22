import React, { useContext, useEffect, useRef, useState } from "react";
import "./scss/Header.scss";
import gerb from "../../Images/gerb.png";
import flag from "../../Images/flag.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faBars,
  faClose,
  faEye,
  faImage,
  faRefresh,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import AxiosCall, { BASE_URL } from "../AxiosCall/AxiosCall";
import { ThemeContext } from "../../context/GlobalContext";
import Loading2 from "../Loading/Loading2";
const Header = () => {
  const [scrollHeight, setScrollHeight] = useState(0);
  const [logoImage, setLogoImage] = useState("");
  const navigate = useNavigate();
  const [headerCategory, setHeaderCategory] = useState([]);
  const [navbar, setNavbar] = useState([]);
  const [searched, setSearched] = useState([]);
  const [searcheValue, setSearchValue] = useState("");
  const [openSearchCard, setOpenSearchCard] = useState(false);
  const { id } = useParams();
  const [biv, setBiv] = useState(false);
  const [admissinYear, setAdmissinYear] = useState("");
  const [searchLoading, setSearchLoading] = useState(true);
  const [state, setState] = React.useState({
    top: false,
  });
  // lang
  const { lang, setLang } = useContext(ThemeContext);

  useEffect(() => {
    getCategories();
    getInnerCategories();
    getAdmission();
    getLogo();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollHeight(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [id]);

  function getCategories() {
    // header categories
    AxiosCall("get", `/navbar_categories/header/${lang}`).then((data) => {
      setHeaderCategory(data);
    });
  }

  function getInnerCategories() {
    // all categories
    AxiosCall("get", `/navbar_categories/all/${lang}`).then((data) => {
      setNavbar(data);
    });
  }
  useEffect(() => {
    getCategories();
    getInnerCategories();
  }, [lang]);

  let withOutColorImageIcon = (
    <FontAwesomeIcon
      icon={faImage}
      color="#797878"
      className="icon"
      onClick={() => changer("blackImage")}
    />
  );

  const changer = (param) => {
    const images = document.querySelectorAll("img");
    // const greenTags = document.querySelectorAll(
    //   "p, h1, h2, h3, h4, h5,h6,span,button"
    // );
    // const header_li = document.getElementById("li")
    // const header = document.querySelector("nav");
    // const input = document.querySelector("input");
    // const ul = document.querySelector("ul");
    // const li = document.querySelector("li");
    const bannerItemImg = document.querySelector(".banner_item_img");
    switch (param) {
      case "refresh":
        images.forEach((image) => {
          image.style.filter = "grayscale(0%)";
          bannerItemImg.style.filter = "brightness(80%)";
        });
        break;
      case "blackImage":
        images.forEach((image) => {
          image.style.filter = "grayscale(100%)";
        });
        break;
    }
  };
  const checkCategory = (id, num, name) => {
    AxiosCall("get", `/content/${lang}/${id}/1`).then((data) => {
      console.log(data);
      if (data.contents.length == 1) {
        navigate(`/${name}/${data.contents[0].id}`);
      } else if (data.contents.length == 0) {
        navigate(`/${name}/${id}`);
      } else {
        navigate(`/${name}/${id}/all`);
      }
      setState({ top: false });
    });
  };
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = () => (
    <div className="top-header-menu">
      <FontAwesomeIcon
        icon={faClose}
        className="close-icon"
        onClick={() => setState({ top: false })}
      />
      {navbar.length == 0 ? (
        <div className="loading-div">
          <Loading2 />
        </div>
      ) : (
        <div className="menues">
          {navbar.map((item1, index1) => {
            return (
              <div className="list" key={index1}>
                <ul>
                  <li>
                    <h6 onClick={() => checkCategory(item1.id, 1, item1.name)}>
                      {item1.name}
                      <svg
                        className="down-icon"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M11.9997 13.1714L16.9495 8.22168L18.3637 9.63589L11.9997 15.9999L5.63574 9.63589L7.04996 8.22168L11.9997 13.1714Z"
                          fill="rgba(251,248,248,1)"
                        ></path>
                      </svg>
                    </h6>
                    <ul>
                      {item1.innerCategories.map((item2, index2) => {
                        return (
                          <li key={index2}>
                            <div
                              onClick={() =>
                                checkCategory(item2.id, 1, item2.name)
                              }
                            >
                              {item2.name}
                            </div>
                            <ul>
                              {item2.innerCategories.map((item3, index3) => {
                                return (
                                  <li key={index3}>
                                    <div
                                      onClick={() =>
                                        checkCategory(item3.id, 1, item3.name)
                                      }
                                    >
                                      {item3.name}
                                    </div>
                                    <ul>
                                      {item3.innerCategories.map(
                                        (item4, index4) => {
                                          return (
                                            <li key={index4}>
                                              <div
                                                onClick={() =>
                                                  checkCategory(
                                                    item4.id,
                                                    1,
                                                    item4.name
                                                  )
                                                }
                                              >
                                                {item4.name}
                                              </div>
                                            </li>
                                          );
                                        }
                                      )}
                                    </ul>
                                  </li>
                                );
                              })}
                            </ul>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
  const getAdmission = () => {
    AxiosCall("get", "/admission_year").then((data) => {
      setAdmissinYear(data.year);
    });
  };
  const searchRef = useRef(null);
  const searching = (value) => {
    AxiosCall("get", `/content/search/${lang}/${value}`).then((data) => {
      setSearched(data);
      setSearchLoading(false);
    });
  };
  const handleSearch = (event) => {
    setOpenSearchCard(true);
    clearTimeout(searchRef.current);
    setSearched([]);
    const value = event.target.value;
    if (value == "") {
      setOpenSearchCard(false);
    } else {
      searchRef.current = setTimeout(async () => {
        searching(value);
      }, 2000);
    }
  };
  const getLogo = () => {
    AxiosCall("get", "/logo").then((data) => {
      setLogoImage(data);
    });
  };
  useEffect(() => {
    if (state.top === true) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [state.top]);
  return (
    <>
      {state.top && list("top")}{" "}
      <div className="test-mode">
        <span> Sayt test rejimida ishlamoqda</span>
      </div>
      <header>
        {biv && (
          <div className="fixed-side">
            <div className="images">{withOutColorImageIcon}</div>
            <FontAwesomeIcon
              icon={faRefresh}
              className="icon"
              onClick={() => changer("refresh")}
            />
          </div>
        )}

        <div className="logo">
          <div className="logo_img" onClick={() => navigate("/")}>
            <img src={BASE_URL + logoImage} alt="Logo" />
          </div>
        </div>
        <nav>
          <div className="nav_contact">
            <div className="box1" style={{ border: "none" }}>
              <div className="social-media">
                <div
                  className="icon-container"
                  onClick={() => navigate("/flag")}
                >
                  <img src={flag} alt="flag" />
                </div>
                <div
                  className="icon-container"
                  onClick={() => navigate("/emblem")}
                >
                  <img src={gerb} alt="embelem" />
                </div>
                <div className="icon-container">
                  {biv ? (
                    <FontAwesomeIcon
                      icon={faClose}
                      className="icon"
                      onClick={() => setBiv(!biv)}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faEye}
                      className="icon"
                      onClick={() => setBiv(!biv)}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="top-box">
              {lang == "uz" ? "Qabul " : lang == "en" ? "Admission " : "Прием "}
              {admissinYear}
            </div>
            <div className="box3">
              <button>
                <a
                  target="_blank"
                  href="https://student.tiiamebb.uz/dashboard/login"
                  style={{ textDecoration: "none" }}
                >
                  Hemis
                </a>
              </button>
            </div>
            <div className="box4">
              <div className="language-container">
                <div className="container">
                  <div className="my-lan-select">
                    <div className="lan-selected-item">
                      {lang == "uz" ? (
                        <>
                          <img
                            src="https://cdn-icons-png.flaticon.com/512/197/197416.png"
                            alt=""
                            width={"20px"}
                          />
                          Uzb
                        </>
                      ) : lang == "en" ? (
                        <>
                          <img
                            src="https://cdn-icons-png.flaticon.com/512/197/197374.png"
                            alt=""
                            width={"20px"}
                          />
                          Eng
                        </>
                      ) : (
                        <>
                          <img
                            src="https://cdn-icons-png.flaticon.com/512/197/197408.png"
                            alt=""
                            width={"20px"}
                          />
                          Rus
                        </>
                      )}
                    </div>
                    <div className="lan-items">
                      <div className="lan-item">
                        <label>
                          <img
                            src="https://cdn-icons-png.flaticon.com/512/197/197416.png"
                            alt=""
                            width={"20px"}
                          />
                          Uzb
                          <input
                            hidden
                            type="radio"
                            name="language"
                            value={lang}
                            checked={lang == "uz"}
                            onChange={() => {
                              localStorage.setItem("ws_l", "uz");
                              setLang("uz");
                              window.location.reload();
                            }}
                          />
                        </label>
                      </div>
                      <div className="lan-item">
                        <label>
                          <img
                            src="https://cdn-icons-png.flaticon.com/512/197/197374.png"
                            alt=""
                            width={"20px"}
                          />
                          Eng
                          <input
                            hidden
                            type="radio"
                            name="language"
                            value={lang}
                            checked={lang == "en"}
                            onChange={() => {
                              localStorage.setItem("ws_l", "en");
                              setLang("en");
                              window.location.reload();
                            }}
                          />
                        </label>
                      </div>
                      <div className="lan-item">
                        <label>
                          <img
                            src="https://cdn-icons-png.flaticon.com/512/197/197408.png"
                            alt=""
                            width={"20px"}
                          />
                          Rus
                          <input
                            hidden
                            type="radio"
                            name="language"
                            value={lang}
                            checked={lang == "ru"}
                            onChange={() => {
                              localStorage.setItem("ws_l", "ru");
                              setLang("ru");
                              window.location.reload();
                            }}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bottom-side">
            <div className="ul">
              {headerCategory.map((item1, index1) => (
                <div className="li" key={index1}>
                  <div
                    id="li"
                    onClick={() => checkCategory(item1.id, 1, item1.name)}
                  >
                    {item1.name}
                    {item1.innerCategories.length > 0 && (
                      <svg
                        width={"18px"}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12 16L6 10H18L12 16Z"
                          fill="rgba(0,0,0,1)"
                        ></path>
                      </svg>
                    )}
                  </div>
                  {item1.innerCategories.length > 0 && (
                    <div className="ul">
                      {item1.innerCategories?.map((item2, index2) => (
                        <div key={index2} className="li">
                          <div
                            id="li"
                            onClick={() =>
                              checkCategory(item2.id, 2, item2.name)
                            }
                          >
                            {item2.name}
                            {item2.innerCategories.length > 0 && (
                              <svg
                                width={"18px"}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                              >
                                <path d="M16 12L10 18V6L16 12Z"></path>
                              </svg>
                            )}
                          </div>
                          {item2.innerCategories.length > 0 && (
                            <div className="ul">
                              {item2.innerCategories?.map((item3, index3) => (
                                <div key={index3} className="li">
                                  <div
                                    id="li"
                                    onClick={() =>
                                      checkCategory(item3.id, 3, item3.name)
                                    }
                                  >
                                    {item3.name}
                                    {item3.innerCategories.length > 0 && (
                                      <svg
                                        width={"18px"}
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                      >
                                        <path d="M16 12L10 18V6L16 12Z"></path>
                                      </svg>
                                    )}
                                  </div>
                                  <div className="ul">
                                    {item3.innerCategories?.map(
                                      (item4, index4) => (
                                        <div key={index4} className="li">
                                          <div
                                            id="li"
                                            onClick={() =>
                                              checkCategory(
                                                item4.id,
                                                4,
                                                item4.name
                                              )
                                            }
                                          >
                                            {item4.name}
                                          </div>
                                        </div>
                                      )
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                gap: "20px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div className="menu-icon" onClick={toggleDrawer("top", true)}>
                <FontAwesomeIcon icon={faBars} className="icon" />
              </div>
              <div className="search-container">
                <FontAwesomeIcon icon={faSearch} className="icon" />
                <div className="input-container">
                  <input
                    onChange={(e) => {
                      handleSearch(e);
                      setSearchValue(e.target.value);
                    }}
                    value={searcheValue}
                    type="text"
                    placeholder={
                      lang == "uz"
                        ? "Qidiruv"
                        : lang == "en"
                        ? "Search"
                        : "Поиск"
                    }
                  />
                </div>
                {openSearchCard && (
                  <div className="search-result-container">
                    {searched.length > 0 ? (
                      <div className="search-list">
                        {searched?.map((item) => {
                          return (
                            <span
                              className="search-list-item"
                              onClick={() => {
                                setSearchValue("");
                                navigate(
                                  `/${item.title
                                    .replace(/\s+/g, "-")
                                    .replace(/\//g, "-")}/${item.id}`
                                );
                                setOpenSearchCard(false);
                              }}
                              key={item.id}
                            >
                              {item.title}
                            </span>
                          );
                        })}
                      </div>
                    ) : searchLoading ? (
                      <div className="search-loading">
                        <div
                          style={{
                            "--size": "64px",
                            "--dot-size": "6px",
                            "--dot-count": 6,
                            "--color": "#fff",
                            "--speed": "1s",
                            "--spread": "60deg",
                          }}
                          className="dots"
                        >
                          <div style={{ "--i": 0 }} className="dot"></div>
                          <div style={{ "--i": 1 }} className="dot"></div>
                          <div style={{ "--i": 2 }} className="dot"></div>
                          <div style={{ "--i": 3 }} className="dot"></div>
                          <div style={{ "--i": 4 }} className="dot"></div>
                          <div style={{ "--i": 5 }} className="dot"></div>
                        </div>
                      </div>
                    ) : (
                      <span className="search-list-item text-white">
                        {lang == "uz"
                          ? "Hech qanday ma'lumot topilmadi."
                          : lang == "en"
                          ? "No information found."
                          : "Информация не найдена."}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
        {scrollHeight != 0 && (
          <div
            data-aos="fade-bottom"
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            style={{
              cursor: "pointer",
              position: "fixed",
              bottom: 36,
              right: 16,
              zIndex: 7,
              width: "58px",
              height: "58px",
              background: "#007aff",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FontAwesomeIcon icon={faArrowUp} color="#FFF" />
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
