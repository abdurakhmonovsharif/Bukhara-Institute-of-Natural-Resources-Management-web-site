import { faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowLeft,
  faArrowRight,
  faChevronDown,
  faEarth,
  faHome,
  faLeftRight,
  faNewspaper,
  faPen,
  faRightLeft,
  faSign,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { button } from '@mui/material';
import React, { useEffect, useState } from "react";
import Rodal from "rodal";
import { useNavigate, useParams } from "react-router-dom";
import AxiosCall from "../../AxiosCall/AxiosCall";
import axios from "axios";
import Loading from "../../Loading/Loading";

const AdminSider = ({ setSelectedCategory, user }) => {
  const navigate = useNavigate("");
  const { id } = useParams();
  const [nameUz, setNameUz] = useState("");
  const [nameRu, setNameRu] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [nameUzEdit, setNameUzEdit] = useState("");
  const [nameRuEdit, setNameRuEdit] = useState("");
  const [nameEnEdit, setNameEnEdit] = useState("");
  const [modalvisibles, setModalvisibles] = useState(false);
  const [isedit, setIsEdit] = useState(null)
  const [deleteingId, setDeletingId] = useState("")
  const [deletes, setDeletes] = useState(false)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    getCategories();
  }, [id]);

  function getCategories() {
    AxiosCall("get", "/navbar_categories").then((data) => {
      setCategories(data);
      data.map((item) => {
        if (item.id === id) {
          localStorage.setItem("c_n", item.name);
          localStorage.setItem("c_i", item.id);
        }
      });
    });
  }

  function addCategory() {
    setModalvisibles(false);
    if (isedit == null) {
      AxiosCall("post", "/navbar_categories", {
        category1NamesDTO: [
          { categories1Names: { name: nameUz, lan: "UZ" } },
          { categories1Names: { name: nameRu, lan: "RU" } },
          { categories1Names: { name: nameEn, lan: "EN" } },
        ],
      }).then((data) => {
        console.log(data);
        getCategories();
        setModalvisibles(false);
      });
    } else {
      AxiosCall("put", "/navbar_categories/" + isedit.id, {
        category1NamesDTO: [
          { categories1Names: { name: nameUz, lan: "UZ" }, id: nameUzEdit },
          { categories1Names: { name: nameRu, lan: "RU" }, id: nameRuEdit },
          { categories1Names: { name: nameEn, lan: "EN" }, id: nameEnEdit },
        ],
      }).then((data) => {
        setIsEdit(null);
        getCategories();
        setModalvisibles(false);
        setNameUzEdit("")
        setNameRuEdit("")
        setNameEnEdit("")
      });
    }
    setNameEn("");
    setNameRu("");
    setNameUz("");
  }
  function editCategory(item) {
    setIsEdit(item)
    console.log(item);
    setModalvisibles(true)
    AxiosCall('get', "/navbar_categories/" + item.id).then(data => {
      console.log(data);
      data.map(item2 => {
        switch (item2.lan) {
          case "UZ":
            setNameUz(item2.name);
            setNameUzEdit(item2.id)
            break;
          case "RU":
            setNameRu(item2.name);
            setNameRuEdit(item2.id)
            break;
          case "EN":
            setNameEn(item2.name);
            setNameEnEdit(item2.id)
            break;
          default:
            break;
        }
      })
    })
  }

  function deleteCategory(id) {
    setDeletingId(id)
    setDeletes(true)
  }
  function deletecategory() {
    setDeletes(false)
    AxiosCall('delete', "/navbar_categories/" + deleteingId).then(data => {
      getCategories()
      navigate("/")
    })

  }
  function navigation(id, name) {
    setSelectedCategory({ name, id })
    navigate("/main/" + id);
  }
  return (
    <div className="admin-sider">
      <div className="add-category">
        <button onClick={() => setModalvisibles(true)}>+ Menu Qo'shish</button>
      </div>
      <div className="categories">
        {categories.length > 0 ? (
          categories.map((item, index) => (
            <div
              key={index}
              style={
                item.id == id
                  ? {
                    borderLeft: "4px solid #3366f0",
                  }
                  : {}
              }
              className="card"
            >
              <div className="name">
                <span onClick={() => navigation(item.id, item.name)}>{item.name}</span>
                <div className="btns">
                  <FontAwesomeIcon onClick={() => editCategory(item)} icon={faPen} className="icon" />
                  <FontAwesomeIcon onClick={() => deleteCategory(item.id)} icon={faTrash} className="icon" />
                </div>
              </div>
            </div>
          ))
        ) : (
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
        )}
      </div>
      <div className="users">
        {/* admin */}
        <button className="card" onClick={() => navigate("/sub-admins")}>
          <div className="icon-image">
            <FontAwesomeIcon icon={faUser} className="icon" />
          </div>
          <div className="name">
            <span>Adminlar</span>
          </div>
        </button>
        <button className="card" onClick={() => navigate("/edit-home-page")}>
          <div className="icon-image">
            <FontAwesomeIcon icon={faHome} className="icon" />
          </div>
          <div className="name">
            <span>Bosh sahifa</span>
          </div>
        </button>
        <button className="card" onClick={() => {
          localStorage.removeItem('user')
          window.location.assign('/login')
        }}>
          <div className="icon-image">
            <FontAwesomeIcon icon={faArrowLeft} className="icon" />
          </div>
          <div className="name">
            <span>Chiqish</span>
          </div>
        </button>
        <Rodal width={250} height={120} visible={deletes} onClose={() => setDeletes(false)}>
          <div className="alert-box">
            <span>O'chirilsinmi</span>
            <div className="d-flex align-center">
              <button className="no-btn" onClick={() => setDeletes(false)}>Yoq</button>
              <button className="yes-btn" onClick={() => deletecategory()}>Ha</button>
            </div>
          </div>
        </Rodal>
      </div>
      <Rodal visible={modalvisibles} onClose={() => setModalvisibles(false)}>
        <div className="form">
          <div className="input-lang">
            <span>Uz:</span>{" "}
            <input
              value={nameUz}
              onChange={(e) => {
                setNameUz(e.target.value);
              }}
              className="input"
              placeholder={"Kategori nomi"}
              type="text"
            />
          </div>

          <div className="input-lang">
            <span>En:</span>{" "}
            <input
              value={nameEn}
              onChange={(e) => {
                setNameEn(e.target.value);
              }}
              className="input"
              placeholder={"Category name"}
              type="text"
            />
          </div>

          <div className="input-lang">
            <span>Ru:</span>
            <input
              value={nameRu}
              onChange={(e) => {
                setNameRu(e.target.value);
              }}
              className="input"
              placeholder={"Название категории"}
              type="text"
            />
          </div>
          <div className="submit-button">
            <button onClick={() => addCategory()}>Saqlash</button>
          </div>
        </div>
      </Rodal>
    </div>
  );
};

export default AdminSider;
