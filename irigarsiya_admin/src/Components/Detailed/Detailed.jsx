import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import AllDetelied from './DetailedCompenents/AllDeteiled/AllDetelied';
import SingleComponent from './DetailedCompenents/SingleComponent';
import './scss/Detailed.scss'
const Detailed = () => {
    const location = useLocation()
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [])
    return (
        <div className='detailed'>
            {
                location.pathname.endsWith("all") ?
                    <AllDetelied /> :
                    <SingleComponent />
            }
        </div>
    );
}

export default Detailed;
