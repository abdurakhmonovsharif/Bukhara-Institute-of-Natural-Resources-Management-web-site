import React from "react";
const Announcements = React.lazy(() =>
  import("../Announcements/Announcements")
);
const Tuzilma = React.lazy(() => import("../Tuzilmalar/Tuzilma"));
const Map = React.lazy(() => import("../Map/Map"));
const News = React.lazy(() => import("../News/News"));
const Corusel = React.lazy(() => import("../Slider/Slider"));
const Videos = React.lazy(() => import("../Videos/Videos"));
const HorijiyHamkorlar = React.lazy(() =>
  import("../Hamkorlar/HorijiyHamkorlar")
);
const HomeComponents = () => {
  return (
    <>
      <Corusel />
      <HorijiyHamkorlar />
      <News />
      <Announcements />
      <Tuzilma />
      <Videos />
      <Map />
    </>
  );
};

export default HomeComponents;
