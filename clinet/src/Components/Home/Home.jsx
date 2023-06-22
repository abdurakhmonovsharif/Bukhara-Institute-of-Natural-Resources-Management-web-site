import React, { Suspense } from 'react';
import './scss/Home.scss'
import { Outlet } from 'react-router-dom';
import Loading from '../Loading/Loading';
const Header = React.lazy(() => import('../Header/Header'));
const Footer = React.lazy(() => import('../Footer/Footer'));
const Home = () => {
    return (
        <div className='home'>
            <Suspense fallback={<Loading />}>
                <Header />
            </Suspense>
            <Outlet />
            <Suspense fallback={<Loading />}>
                <Footer />
            </Suspense>

        </div>
    );
}

export default Home;
