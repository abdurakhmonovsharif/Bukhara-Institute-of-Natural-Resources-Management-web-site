import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Carousel from "react-multi-carousel";
import AxiosCall from "../../AxiosCall/AxiosCall";
import Rodal from "rodal";
import { toast } from "react-toastify";
const EditVideos = () => {
  const [data, setData] = useState([]);
  const [isEdit, setIsEdit] = useState("");
  const [id, setId] = useState("");
  const [addVideo, setAddVideo] = useState(false);
  const [url, setUrl] = useState("");

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
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

  function getVideos() {
    AxiosCall("get", "/video").then((res) => {
      setData(res);
    });
  }

  function saveVideo(e) {
    e.preventDefault();
    const videoId = url.match(
      /(?:\/|%3D|v=|vi=)([0-9A-Za-z_-]{11})(?:[%#?&]|$)/
    )[1];
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;

    if (!isEdit) {
      AxiosCall("post", "/video", {
        link: embedUrl,
      }).then((response) => {
        setUrl("");
        setData((data) => [
          ...data,
          {
            id: response.id,
            link: response.link,
          },
        ]);
      });
      setAddVideo(false);
    } else {
      AxiosCall("put", "/video/" + id, {
        link: embedUrl,
      }).then(() => {
        setUrl("");
        getVideos();
        setAddVideo(false);
        setIsEdit(false);
      });
    }
  }

  function editVideos(item) {
    setIsEdit(true);
    setAddVideo(true);
    setId(item.id);
    setUrl(item.link);
  }

  function deleteVideos(id) {
    AxiosCall("delete", `/video/${id}`).then((res) => {
      toast.success("Video o'chirildi");
      getVideos();
    });
  }

  useEffect(() => {
    getVideos();
  }, []);

  return (
    <div className="videos-container">
      <h6>Videolar</h6>
      <button className="add-video-btn" onClick={() => setAddVideo(true)}>
        + Video qo'shish
      </button>
      <Carousel responsive={responsive}>
        {data?.map((item) => (
          <div key={item.id}>
            <iframe
              src={item.link}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
            <div style={{ display: "flex", gap: "10px", marginBottom: "7px" }}>
              <button
                onClick={() => deleteVideos(item.id)}
                className="btn btn-danger"
              >
                o'chirish
              </button>
              <button
                onClick={() => editVideos(item)}
                className="btn btn-primary"
              >
                tahrirlash
              </button>
            </div>
          </div>
        ))}
      </Carousel>
      <Rodal
        width={350}
        height={200}
        visible={addVideo}
        onClose={() => {
          setAddVideo(false);
          setUrl("");
        }}
      >
        <form onSubmit={saveVideo} className="form">
          <input
            type="text"
            placeholder="video url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button className="add-video-btn">saqlash</button>
        </form>
      </Rodal>
    </div>
  );
};

export default EditVideos;
