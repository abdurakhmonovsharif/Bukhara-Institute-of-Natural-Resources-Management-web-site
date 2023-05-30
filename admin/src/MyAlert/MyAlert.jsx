import React from 'react'
import './scss/MyAlert.scss'
function MyAlert({ visible, onClose, children, width, height }) {
    return (
        <div className='MyAlert-dialog' style={{ display: visible ? 'block' : 'none' }}>
            <div className="MyAlert-content" style={{ width: width + 'px', height: height + "px" }}>
                <div className="close-btn">
                    <button onClick={onClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22">
                            <path d="M19.3 4.7c-0.4-0.4-1-0.4-1.4 0l-6.4 6.4-6.4-6.4c-0.4-0.4-1-0.4-1.4 0s-0.4 1 0 1.4l6.4 6.4-6.4 6.4c-0.4 0.4-0.4 1 0 1.4s1 0.4 1.4 0l6.4-6.4 6.4 6.4c0.4 0.4 1 0.4 1.4 0s0.4-1 0-1.4l-6.4-6.4 6.4-6.4c0.4-0.4 0.4-1 0-1.4z" />
                        </svg>
                    </button>
                </div>
                {children}
            </div>
        </div>
    )
}

export default MyAlert