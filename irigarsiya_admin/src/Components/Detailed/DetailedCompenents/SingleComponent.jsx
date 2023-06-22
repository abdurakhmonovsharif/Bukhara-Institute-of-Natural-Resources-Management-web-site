import React, { useContext, useEffect, useState } from "react";
import "./scss/SingleComponent.scss";
import AxiosCall, { BASE_URL } from "../../AxiosCall/AxiosCall";
import Comments from "../../Comments/Comments";
import { useNavigate, useParams } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "../../../context/GlobalContext";
import AliceCarousel from "react-alice-carousel";
import { Carousel } from "react-responsive-carousel";
import Loading2 from "../../Loading/Loading2";
const SingleComponent = () => {
  const [data, setData] = useState({
    url: [1, 2, 3, 4, 5, 6, 7],
  });
  const navigate = useNavigate();
  const [commentItems, setCommentItems] = useState([]);
  const [commentOpen, setCommentOpen] = useState({
    item: {},
    hide: false,
  });
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);
  const [tuzilma, setTuzilma] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const { id, name } = useParams();
  const { lang } = useContext(ThemeContext);
  const [flagInfo, setFlagInfo] = useState({
    nameUZ: "O‘zbekiston Respublikasining davlat bayrog‘i",
    nameRU: "Государственный флаг Республики Узбекистан",
    nameEN: "The national flag of the Republic of Uzbekistan",
    image1: "http://archive.uz/source/images/GetPDF-(2).gif",
    contentUZ: `
            Davlat bayrog‘i O‘zbekiston Respublikasining 1991 yil 18 noyabrdagi 407­XII­sonli «O‘zbekiston Respublikasining Davlat bayrog‘i to‘g‘risida»gi Qonuni bilan tasdiqlangan. O‘zbekiston Respublikasining Davlat bayrog‘i — bayroqning butun uzunligi bo‘ylab o‘tgan to‘q moviy rang, oq rang va to‘q yashil rangli uchta endan tarkib topgan to‘g‘ri to‘rtburchak shaklidagi matodir. O‘zbekiston Respublikasi Davlat bayrog‘ining uzunligi 250 santimetrga, kengligi 125 santimetrga teng. Moviy rang, oq rang  va  yashil  rangli  enlarning  kengligi  bir  xil.  Har  bir  en  40  santimetrga  tengdir.  O‘zbekiston  Respublikasi  Davlat bayrog‘ining o‘rtasidagi oq rangli enning chetlaridan kengligi 2,5 santimetrga teng qizil hoshiyalar o‘tkazilgan.
            O‘zbekiston Respublikasi Davlat bayrog‘ining yuqori qismidagi moviy rangli enning yuz tomoni va orqa tomonida dastaga yaqin joyida oq rangli yangi oy va uning yonida o‘n ikkita oq rangdagi besh qirrali yulduz tasvirlangan. Oq  rangli  yangi  oy  va  o‘n  ikkita  oq  rangli  besh  qirrali  yulduzning  tasviri  moviy  rangli  yuqori enning  o‘rtasidan  70x30 santimetrga teng to‘g‘ri to‘rtburchakka sig‘adigan qilib joylashtirilgan. Oq  rangli  yangi oy  vertikal  holatda  do‘ng  tomoni  dastaga  qaratilgan,  dastadan  20  santimetr  masofada  joylashtirilgan bo‘lib, diametri 30 santimetrli doiraga sig‘adi.
       O‘n  ikkita  oq  rangli  besh  qirrali  yulduz  diametri  6  santimetrli  doiraga  sig‘adi.  Doiralar  orasidagi masofa  6  santimetr. Yulduzlar uzunasiga va tikkasiga quyidagi tartibda joylashadi: yuqori qatorda uchta, o‘rta qatorda to‘rtta va quyi qatorda beshta yulduz. Quyi qatordagi yulduzlar yangi oyning pastki uchidan 3,5 santimetr masofada joylashadi.
            `,
    contentRU: `
    Государственный флаг утвержден Законом Республики Узбекистан от 18 ноября 1991 года № 407XII «О Государственном флаге Республики Узбекистан». Государственный флаг Республики Узбекистан представляет собой прямоугольное полотнище, состоящее из трех частей синего цвета, белого цвета и темно-зеленого цвета, идущее по всей длине флага. Длина Государственного флага Республики Узбекистан составляет 250 сантиметров, а ширина – 125 сантиметров. Синие, белые и зеленые полосы имеют одинаковую ширину. Каждая ширина 40 сантиметров. От краев белой каймы посередине Государственного флага Республики Узбекистан проведены красные каймы шириной 2,5 сантиметра. На лицевой и оборотной стороне верхней части Государственного Флага Республики Узбекистан у рукояти изображены белая новая луна и двенадцать белых пятиконечных звезд. Изображение белого новолуния и двенадцати белых пятиконечных звезд размещено посередине синего верха шириной в прямоугольнике размером 70х30 сантиметров. Белая новая луна расположена вертикально правой стороной к ручке, размещена на расстоянии 20 сантиметров от ручки и вписывается в круг диаметром 30 сантиметров. Двенадцать белых пятиконечных звезд вписываются в круг диаметром 6 сантиметров. Расстояние между кругами 6 сантиметров. Звезды расположены вдоль и по вертикали в следующем порядке: три звезды в верхнем ряду, четыре звезды в среднем ряду и пять звезд в нижнем ряду. Звезды нижнего ряда расположены на расстоянии 3,5 сантиметра от нижнего конца новолуния.
             `,
    contentEN: `
    The state flag was approved by the Law of the Republic of Uzbekistan dated November 18, 1991 No. 407XII "On the State Flag of the Republic of Uzbekistan". The State flag of the Republic of Uzbekistan is a rectangular cloth consisting of three parts of dark blue color, white color and dark green color, running along the entire length of the flag. The length of the State flag of the Republic of Uzbekistan is 250 centimeters and the width is 125 centimeters. Blue, white, and green bars have the same width. Each width is 40 centimeters. Red borders with a width of 2.5 centimeters have been drawn from the edges of the white border in the middle of the State flag of the Republic of Uzbekistan. On the front and back side of the upper part of the National Flag of the Republic of Uzbekistan, a white new moon and twelve white five-pointed stars are depicted near the handle. An image of a white new moon and twelve white five-pointed stars is placed in the middle of the blue top width in a rectangle measuring 70x30 centimeters. The white new moon is vertical with its right side facing the handle, placed at a distance of 20 centimeters from the handle, and fits into a circle with a diameter of 30 centimeters. Twelve white five-pointed stars fit into a 6-centimeter diameter circle. The distance between the circles is 6 centimeters. The stars are arranged lengthwise and vertically in the following order: three stars in the top row, four stars in the middle row, and five stars in the bottom row. The stars in the lower row are located at a distance of 3.5 centimeters from the lower end of the new moon.
            `,
  });
  const [emblemInfo, setEmblemInfo] = useState({
    nameUZ: "O'zbekiston Respublikasi davlat gerbi",
    nameRU: "Государственный герб Республики Узбекистан",
    nameEN: "State coat of arms of the Republic of Uzbekistan",
    image1: "http://archive.uz/source/images/Gerb.png",
    image2: "http://archive.uz/source/images/GetPDF-(1).gif",
    contentUZ: `
            Davlat  gerbi  O‘zbekiston  Respublikasining  1992  yil  2  iyuldagi  616­ XII ­sonli  «O‘zbekiston Respublikasi Davlat gerbi to‘g‘risida»gi Qonuni bilan tasdiqlangan. O‘zbekiston Respublikasi Davlat gerbi quyidagi ko‘rinishga ega: tog‘lar, daryolar va so‘l tomoni bug‘doy boshoqlaridan, o‘ng tomoni esa chanoqlari ochilgan g‘o‘za shoxlaridan iborat chambarga o‘ralgan gullagan vodiy uzra quyosh zarrin nurlarini sochib turadi. Gerbning yuqori qismida Respublika hurligining ramzi sifatida sakkizburchak tasvirlangan bo‘lib, uning ichki qismida yarim oy va yulduz tasvirlangan. Gerbning markazida baxt va erksevarlik ramzi — qanotlarini yozgan Humo qushi tasvirlangan. Gerbning pastki qismida O‘zbekiston Respublikasi Davlat bayrog‘ini ifoda etuvchi chambar lentasining bantida «O‘zbekiston» deb yozib qo‘yilgan. O‘zbekiston  Respublikasi  Davlat  gerbining rangli  ko‘rinishida:  Humo  qushi  va  daryolar  —  kumush  rangida;  quyosh,boshoqlar, paxta chanoqlari va «O‘zbekiston» yozuvi — oltin rangida; g‘o‘za shoxlari va barglari, tog‘lar va vodiy — yashil rangda;  chanoqlardagi  paxta  —  oq  rangda;  lenta  —  O‘zbekiston  Respublikasi  Davlat  bayrog‘ining ranglarini  aks ettiruvchi uch xil rangda; sakkizburchak — oltin zarhal bilan hoshiyalangan holda havo rangda; yarim oy va yulduzlar — oq rangida tasvirlangan.
            `,
    contentRU: `
    Государственный герб Республики Узбекистан утвержден Законом Республики Узбекистан № 616 XII от 2 июля 1992 года «О Государственном Гербе Республики Узбекистан». Государственный герб Республики Узбекистан имеет следующий вид: золотое солнце над горами, реками и цветущей долиной, окруженное с левой стороны колосьями пшеницы, а с правой - ветками хлопка, сияет своими лучами. В верхней части герба изображен восьмиугольник как символ свободы Республики, а во внутренней его части - полумесяц и звезда. В центре герба изображена птица Хумо, символ счастья и щедрости. В нижней части герба на поясной ленте, изображающей Государственный флаг Республики Узбекистан, написано слово «Узбекистан». В цветном варианте Государственного герба Республики Узбекистан: птица Хума и реки - серебром; солнце, колосья, коробочки хлопка и надпись "Узбекистан" - золотом; ветки и листья хлопка, горы и долина - зеленым цветом. ; хлопок на подмышках - белого цвета; лента - трех разных цветов, отражающих цвета Государственного флага Республики Узбекистан; восьмиугольник - воздушного цвета, обрамленный золотой позолотой; полумесяц и звезды - белого цвета.
            `,
    contentEN: `
    The state coat of arms of the Republic of Uzbekistan was approved by the Law of the Republic of Uzbekistan No. 616 XII of July 2, 1992 "On the State Coat of Arms of the Republic of Uzbekistan". The national coat of arms of the Republic of Uzbekistan has the following appearance: a golden sun over mountains, rivers and a flowering valley surrounded by wheat ears on the left side, and cotton branches on the right side. shines its rays. In the upper part of the coat of arms, an octagon is depicted as a symbol of the freedom of the Republic, and a crescent and a star are depicted in its inner part. In the center of the coat of arms is depicted the Humo bird, a symbol of happiness and generosity. In the lower part of the coat of arms, the word "Uzbekistan" is written on the belt ribbon representing the State flag of the Republic of Uzbekistan. In the color version of the State Emblem of the Republic of Uzbekistan: Huma bird and rivers - in silver; sun, spikes, cotton bolls and the inscription "Uzbekistan" - in gold; cotton branches and leaves, mountains and valley - in green color; cotton on the armpits - in white color; ribbon - in three different colors reflecting the colors of the State flag of the Republic of Uzbekistan; octagon - in air color, framed with gold gilding; crescent moon and stars - in white color.
            `,
  });

  const closeCommentModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    getContent();
    getComments();
  }, [id]);
  const getContent = () => {
    AxiosCall("get", `/content/${lang}/${id}`).then((data) => {
      setData(data);

      setLoading(false);
    });
    AxiosCall("get", `/content/news2/${lang}/${id}`).then((data) => {
      setNews(data);
    });
  };
  const getComments = () => {
    AxiosCall("get", `/comment/${id}`).then((data) => {
      setCommentItems(data);
    });
  };
  useEffect(() => {
    AxiosCall("get", "/navbar_categories_2/structure/" + lang).then((data) => {
      setTuzilma(data);
    });
  }, []);
  const checkCategory = (id, num, name) => {
    AxiosCall("get", `/content/${lang}/${id}/1`).then((data) => {
      if (data.contents.length == 1) {
        navigate(
          `/${name.replace(/\s+/g, "-").replace(/\//g, "-")}/${
            data.contents[0].id
          }`
        );
      } else if (data.contents.length == 0) {
        navigate(`/${name}/${id}`);
      } else {
        navigate(`/${name}/${id}/all`);
      }
    });
  };
  const dateParser = () => {
    const createdAt = new Date(data.created_at);
    const formattedDate = `${(createdAt.getMonth() + 1)
      .toString()
      .padStart(2, "0")}.${createdAt
      .getDate()
      .toString()
      .padStart(2, "0")}.${createdAt.getFullYear()}`;
    const formattedTime = `${createdAt.getHours()}:${createdAt.getMinutes()}`;
    return `${formattedDate}  ${formattedTime}`;
  };
  console.log(commentOpen);
  return (
    <>
      <Comments
        content={{ contentId: id }}
        closeCommentModal={closeCommentModal}
        visible={modalVisible}
      />
      <section className="sigleComponent">
        {
          <>
            {name == "flag" ? (
              <div className="flag-container">
                <h1>
                  {lang == "uz"
                    ? flagInfo.nameUZ
                    : lang == "en"
                    ? flagInfo.nameEN
                    : flagInfo.nameRU}
                </h1>
                <div className="image-container">
                  <img src={flagInfo.image1} alt="flag" />
                </div>
                <p>
                  {lang == "uz"
                    ? flagInfo.contentUZ
                    : lang == "en"
                    ? flagInfo.contentEN
                    : flagInfo.contentRU}
                </p>
              </div>
            ) : name == "emblem" ? (
              <section className="emblem">
                <h1>
                  {lang == "uz"
                    ? emblemInfo.nameUZ
                    : lang == "en"
                    ? emblemInfo.nameEN
                    : emblemInfo.nameRU}
                </h1>
                <div className="images">
                  <div className="image-container">
                    <img src={emblemInfo.image1} alt="flag" />
                  </div>
                </div>
                <p>
                  {lang == "uz"
                    ? emblemInfo.contentUZ
                    : lang == "en"
                    ? emblemInfo.contentEN
                    : emblemInfo.contentRU}
                </p>
              </section>
            ) : (
              <div className="content-container">
                {Object.keys(data).length == 0 ? (
                  <span className="content">
                    <span className="loading-text">
                      {lang == "uz"
                        ? "Sahifa yangilanmoqda..."
                        : lang == "ru"
                        ? "Страница обновляется..."
                        : "The page is refreshing..."}
                    </span>
                  </span>
                ) : loading ? (
                  <div className="content">
                    <Loading2 />
                  </div>
                ) : (
                  <>
                    <div className="content">
                      <h1>{data?.title}</h1>
                      {data.url.length > 0 && (
                        <Carousel className="carousel">
                          {data?.url?.map((images, index) => (
                            <div key={index}>
                              <div className="banner_item">
                                <img
                                  className="fake-image"
                                  src={BASE_URL + images}
                                  alt=""
                                />
                                <img
                                  src={BASE_URL + images}
                                  className="orignal-image"
                                  alt={BASE_URL + images}
                                />
                              </div>
                            </div>
                          ))}
                        </Carousel>
                      )}
                      <div className="text-container">
                        <div className="date-author">
                          <div className="author">
                            <FontAwesomeIcon icon={faUser} />
                            <span>{data?.author}</span>
                          </div>

                          <div className="date">{dateParser()}</div>
                        </div>
                        <div
                          className="text"
                          dangerouslySetInnerHTML={{ __html: data?.body }}
                        ></div>
                      </div>
                      <div className="comment-btn">
                        <button onClick={() => setModalVisible(true)}>
                          Izoh qoldirish
                          <svg
                            width={"22px"}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M6.45455 19L2 22.5V4C2 3.44772 2.44772 3 3 3H21C21.5523 3 22 3.44772 22 4V18C22 18.5523 21.5523 19 21 19H6.45455ZM11 10H8V12H11V15H13V12H16V10H13V7H11V10Z"
                              fill="rgba(255,255,255,1)"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </>
                )}
                <div className="cards-container">
                  <div className="cards1-container">
                    {lang == "uz" ? (
                      <>
                        <h6>Tuzilma</h6>
                      </>
                    ) : lang == "en" ? (
                      <>
                        <h6>Structure</h6>
                      </>
                    ) : (
                      <>
                        <h6>Структура</h6>
                      </>
                    )}
                    {tuzilma.map((item, index) => {
                      return (
                        <span
                          key={index}
                          onClick={() => checkCategory(item?.id, 2, item?.name)}
                        >
                          {item?.name}
                        </span>
                      );
                    })}
                  </div>
                  <div className="cards2-container">
                    <h6>
                      {lang == "uz"
                        ? "Yangiliklar"
                        : lang == "en"
                        ? "News"
                        : "Новости"}
                    </h6>
                    <div className="cards">
                      {news.map((item, index) => {
                        const createdAt = new Date(item.created_at);
                        const formattedDate = `${(createdAt.getMonth() + 1)
                          .toString()
                          .padStart(2, "0")}.${createdAt
                          .getDate()
                          .toString()
                          .padStart(2, "0")}.${createdAt.getFullYear()}`;
                        const formattedTime = `${createdAt.getHours()}:${createdAt.getMinutes()}`;
                        return (
                          <div
                            key={index}
                            className="my-card1"
                            onClick={() =>
                              navigate(
                                `/${item.title
                                  .replace(/\s+/g, "-")
                                  .replace(/\//g, "-")}/${item.id}`
                              )
                            }
                          >
                            <div className="textes">
                              <span className="time">
                                {formattedDate} {formattedTime}
                              </span>
                              <span className="text">{item.title}</span>
                            </div>
                            <div className="image">
                              <img
                                src={
                                  item.url != null
                                    ? BASE_URL + item.url
                                    : "https://archive.org/download/no-photo-available/no-photo-available.png"
                                }
                                alt=""
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        }
        {commentItems.length > 0 ? (
          <div className="comments-container">
            <AliceCarousel
              responsive={{
                0: {
                  items: 1,
                },
                768: {
                  items: 2,
                },
                1024: {
                  items: 3,
                  itemsFit: "contain",
                },
              }}
              items={commentItems?.map((item, index) => (
                <div key={index} className="comment-card">
                  <div
                    className="commment-card-container"
                    onClick={() =>
                      setCommentOpen({
                        ...commentItems,
                        hide: true,
                        item: item.body,
                      })
                    }
                  >
                    <div className="comment-content">{item.body}</div>
                    <div className="client-info">
                      <div className="image">
                        <img
                          src="https://w7.pngwing.com/pngs/753/432/png-transparent-user-profile-2018-in-sight-user-conference-expo-business-default-business-angle-service-people-thumbnail.png"
                          alt="image"
                        />
                      </div>
                      <div className="names-company">
                        <span className="name">{item.firstname}</span>
                        <span className="email">{item.lastname}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            />
          </div>
        ) : (
          <div className="no-comment"></div>
        )}

        <Modal
          show={commentOpen.hide}
          onHide={() => setCommentOpen({ ...commentItems, hide: false })}
        >
          <Modal.Body>
            <span className="text-white-comment">{commentOpen.item}</span>
          </Modal.Body>
        </Modal>
      </section>
    </>
  );
};

export default SingleComponent;
