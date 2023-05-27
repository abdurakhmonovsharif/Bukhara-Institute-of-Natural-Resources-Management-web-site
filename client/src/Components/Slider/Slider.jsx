import React, { useContext, useState } from 'react';
import './Slider.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useRef } from 'react';
import { Carousel, CarouselItem } from 'react-bootstrap';
import AxiosCall, { BASE_URL } from '../AxiosCall/AxiosCall';
import { ThemeContext } from "../../context/GlobalContext";
import { useEffect } from 'react';
import Loading from '../Loading/Loading';
const Slider = () => {
  const carouselRef = useRef(null)
  const [img, setImg] = useState()
  const [text, setText] = useState()
  const [slider, setSlider] = useState([
  ])
  const { lang, setLang } = useContext(ThemeContext);
  useEffect(() => {
    getSlider();
  }, [lang]);

  const getSlider = () => {
    // all categories
    AxiosCall("get", `/slider/${lang}`).then((data) => {
      setSlider(data)
    });
  };
  const handlePrevClick = () => {
    carouselRef.current.prev()
  };


  const handleNextClick = () => {
    carouselRef.current.next()
  };


  return (
    <>

      {
        slider.length > 0 ?
          <Carousel autoPlay infinite={true} 
           interval={3500} className="carousel-slide" ref={carouselRef}>
            {
              slider.map(((item, index) => {
                return <CarouselItem key={index}>
                  <div className="banner_item_img" >
                    <img src={BASE_URL + "/" + item.url} alt="" />
                  </div>
                  <Carousel.Caption>
                    <div className="container" >
                      <div className="textes">
                        <h1>{item.text}</h1>
                      </div>
                      <div className="buttons">
                        {
                          slider.length > 1 && <>
                            <button className='icon-container' onClick={handlePrevClick}>
                              <FontAwesomeIcon icon={faArrowLeft} className='icon' />
                            </button>
                            <button className='icon-container' onClick={handleNextClick}>
                              <FontAwesomeIcon icon={faArrowRight} className='icon' />
                            </button>
                          </>
                        }
                      </div>
                    </div>
                  </Carousel.Caption>
                </CarouselItem>
              }))
            }
          </Carousel> : <div className="carousel-loading">
            <Loading />
          </div>
      }

    </>
  );
};

export default Slider;