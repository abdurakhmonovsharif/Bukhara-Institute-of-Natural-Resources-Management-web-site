import React from 'react'
import './scss/HomePage.scss'
import EditCarousel from './EditCarousel'
import Partners from './Partners'
import EditVideos from './EditVideos'
import Students from './Students'
import EditLogo from './EditLogo'

export default function HomePage() {
    return (
        <div className='Homepage'>
            <div className="Logo">
                <EditLogo />
            </div>
            <div className="Carousel-edit">
                <EditCarousel />
            </div>
            <div className="Partners">
                <Partners />
            </div>
            <div className="Videos">
                <EditVideos />
            </div>

            <div className="Students">
                <Students />
            </div>


        </div>
    )
}
