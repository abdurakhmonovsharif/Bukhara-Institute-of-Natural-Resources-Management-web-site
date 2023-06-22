import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosCall from "../AxiosCall/AxiosCall";
import "../Professors/Professors.scss";
import { ThemeContext } from "../../context/GlobalContext";
import { useContext } from "react";
import rektor from "../../Images/rektor.jpg";
const Professors = () => {
  const { lang } = useContext(ThemeContext);
  const navigate = useNavigate();
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
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

  const [data, setData] = useState([1, 2, 3, 4]);

  useEffect(() => {
    get();
  }, []);
  function get() {
    AxiosCall("get", `/content/group/${lang}`).then((data) => {
      setData(data);
    });
  }

  return (
    <section className="allkadrs">
      {/* <div className="Kadr">
        <div className="Kadr_title">
          {
            lang == "uz" ? <>
              <h1>Universitetdagi faol kadrlar
              </h1>
              <span
                onClick={() => navigate("/detailed/personnal/" + categoryId + "/all")}
              >
                Barcha Kadrlar
              </span>
            </> : lang == 'en' ? <>
              <h1>Active personnel at the university</h1>
              <span
                onClick={() => navigate("/detailed/personnal/" + categoryId + "/all")}
              >   All Staff
              </span>
            </> : <>
              <h1>Aктивный персонал в университете</h1>
              <span
                onClick={() => navigate("/detailed/personnal/" + categoryId + "/all")}
              >
                Весь персонал
              </span>
            </>
          }
        </div>
        <Carousel
          responsive={responsive}
          autoPlay
        >
          {
            data.length > 0 ?
              data.map((item, index) => (
                <div onClick={() => navigate("/detailed/professors")} className="Kadr_row_col" key={index}>
                  <div className="Kadr_row_col_img">
                    <img src={rektor} alt="kadr" />
                  </div>
                  <div className="Kadr_row_col_text">
                    <h2>{'Imomov Shavkat Jaxonovich'}</h2>
                    <p>{'Buxoro tabiiy resurslarni boshqarish instituti rektori'}</p>
                  </div>
                </div>
              ))
              : demoData?.map((item,index) => {
                return (
                  <div className="card" key={index}>
                    <div className="card-body">
                      <Loading />
                    </div>
                    <div className="text">
                    </div>
                  </div>
                )
              })
          }
        </Carousel>

      </div> */}
    </section>
  );
};

export default Professors;
