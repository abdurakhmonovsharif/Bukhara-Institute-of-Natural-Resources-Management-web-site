import React, { useRef } from 'react';
import Carousel from 'react-multi-carousel';
import './scss/Videos.scss'
import AxiosCall from '../AxiosCall/AxiosCall';
import { useEffect, useState } from 'react';
import { ThemeContext } from "../../context/GlobalContext";
import { useContext } from "react";
import AliceCarousel from 'react-alice-carousel';

const Videos = () => {
    const { lang } = useContext(ThemeContext);
    const carouselRef = useRef(null)
    const [data, setData] = useState([

    ])

    const responsive = {
        0: {
            items: 1,
        },
        568: {
            items: 2,
        },
        1024: {
            items: 4,
            itemsFit: "contain",
        },
    };
    useEffect(() => {
        get()
    }, [])
    function get() {
        AxiosCall("get", '/video').then(data => {
            setData(data)
        })
    }
    const slidePrev = () => {
        carouselRef.current.slidePrev();
    };

    const slideNext = () => {
        carouselRef.current.slideNext();
    };
    return (
        <section className='videos'>
            <div className="videos-header">
                {
                    lang == "uz" ? <>
                        <h1>Videolar
                        </h1>

                    </> : lang == 'en' ? <>
                        <h1> Videos</h1>

                    </> : <>
                        <h1>Видео</h1>

                    </>
                }
            </div>
            <div className="videos-body">
                <div className="controller">
                    <button onClick={slidePrev} className='prev-btn'><svg width={"30px"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z" fill="rgba(251,251,251,1)"></path></svg></button>
                    <button onClick={slideNext} className='next-btn'><svg width={"30px"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M13.1714 12.0007L8.22168 7.05093L9.63589 5.63672L15.9999 12.0007L9.63589 18.3646L8.22168 16.9504L13.1714 12.0007Z" fill="rgba(250,250,250,1)"></path></svg></button>
                </div>
                <AliceCarousel responsive={responsive} ref={carouselRef}
                    mouseTracking
                    items={data.map(item => <div className='my-video-container' key={item.id}>

                        <iframe
                            src={item.link}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; 
                            autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </div>)}
                />
            </div>



        </section>
    );
}

export default Videos;
