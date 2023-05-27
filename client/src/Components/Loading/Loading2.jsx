import React from 'react'
import './scss/Loading2.scss'
function Loading2() {
    return (
        <div className='loading-container'>
            <div className="spinner">
                <svg viewBox="25 25 50 50" className="circular">
                    <circle strokeMiterlimit="10" strokeWidth="3" fill="none" r="20" cy="50" cx="50" className="path"></circle>
                </svg>
            </div>
        </div>
    )
}

export default Loading2