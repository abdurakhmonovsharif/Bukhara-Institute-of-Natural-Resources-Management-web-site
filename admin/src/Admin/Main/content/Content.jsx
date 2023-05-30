import React, { useEffect, useState } from "react";
import { faArrowLeft, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./scss/Content.scss";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import AxiosCall, { BASE_URL } from "../../../AxiosCall/AxiosCall";
import { Stack } from "react-bootstrap";
import PaginationComponent from "./Pagination";
const Content = () => {
  const navigate = useNavigate()
  const [content, setContent] = useState([])
  const { id } = useParams()
  const { selectedCategory, categoryIndex } = useOutletContext()

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(true)

  const getContents = (param) => {
    AxiosCall("get", `/content/categories${param}/UZ/${id}/${currentPage}`).then((data) => {
      setContent(data.contents)
      setTotalPages(data.pageCount)
      setLoading(false)
    })
  }

  useEffect(() => {
    getContents(categoryIndex)
  }, [id, currentPage])

  return (
    <div className="content-wrap">
      <div className="add-button">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="icon"
          onClick={() => navigate("/")}
        />

        <h4>{selectedCategory.name}</h4>

        <button
          onClick={() => {
            navigate(`/main/${selectedCategory.id}/content/add`);
          }}
        >
          + Qo'shish
        </button>
      </div>
      {content?.length > 0 ? (
        <div className="Announcements-body">
          {content.map((item, index) => {
            return (
              <div className="card" onClick={() => navigate(`/main/${selectedCategory.id}/content/${item.id}/edit`)}>
                <div className="inner-card">
                  <div className="img-wrapper">
                    <img src={item.url != null ? BASE_URL + item.url : 'https://avatars.mds.yandex.net/get-altay/1923723/2a0000016f26c9af035af37ef9e3e013e92f/L_height'} alt="" />
                  </div>
                  <div className="content">
                    <p>{item.title}</p>
                  </div>
                </div>
              </div>
            );
          })
          }
        </div>
      ) : content.length == 0 && !loading ? <p className="no-content">Malumot mavjud emas!</p> : loading && (
        <div className="not-found">
          <div className="dot-spinner">
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
          </div>
        </div>
      )}
      {
        content.length > 0 && <Stack spacing={2}>
          <PaginationComponent
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </Stack>
      }
    </div>
  )
}

export default Content