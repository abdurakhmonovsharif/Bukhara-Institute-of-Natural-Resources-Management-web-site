import React, { useEffect, useRef, useState } from "react";
import "./Main.scss";
import Rodal from "rodal";
import { Outlet, useNavigate, useParams, useOutletContext } from "react-router-dom";
import AxiosCall from "../../AxiosCall/AxiosCall";
import Loading from "../../Loading/Loading";
import AccordionItem from "./AccordionItem/AccordionItem.jsx";
const Main = () => {
  const { id } = useParams();
  const [modalvisible, setModalvisible] = useState(false);
  const [modalvisible2, setModalvisible2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nameUz, setNameUz] = useState("");
  const [nameRu, setNameRu] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [nameUzEdit, setNameUzEdit] = useState("");
  const [nameRuEdit, setNameRuEdit] = useState("");
  const [nameEnEdit, setNameEnEdit] = useState("");
  const [edit, setEdit] = useState(null);
  const [editChild, setEditChild] = useState(false);
  const navigate = useNavigate();
  const [accardion, setAccardion] = useState([]);
  const [deletes2, setDeletes2] = useState(false)
  const [deletes3, setDeletes3] = useState(false)
  const [deleteId2, setDeleteId2] = useState("")
  const [deleteId3, setDeleteId3] = useState("")
  const { selectedCategory, setSelectedCategory } = useOutletContext();
  const [categoryId, setCategoryId] = useState(null)
  const [categoryIndex, setCategoryIndex] = useState(localStorage.getItem('c_index') || 3)

  useEffect(() => {
    console.log('categoryIndex', categoryIndex);
    localStorage.setItem('c_index', categoryIndex)
  }, [categoryIndex])

  useEffect(() => {
    getCategories();
  }, [id]);
  function getCategories() {
    AxiosCall("get", `/navbar_categories_2/admin/${id}`).then((data) => {
      setLoading(false);
      setAccardion(data);
    });
  }
  function addInnerCategory(e) {
    e.preventDefault();
    if (edit == null) {
      AxiosCall("post", `/navbar_categories_2/${id}`, {
        category2NamesDTO: [
          { categories2Names: { name: nameUz, lan: "UZ" } },
          { categories2Names: { name: nameRu, lan: "RU" } },
          { categories2Names: { name: nameEn, lan: "EN" } },
        ],
      }).then(() => {
        getCategories();
        setNameUz("")
        setNameRu("")
        setNameEn("")
        setModalvisible(false);
      });
    } else {
      AxiosCall("put", "/navbar_categories_2/" + edit.id, {
        category2NamesDTO: [
          { categories2Names: { name: nameUz, lan: "UZ" }, id: nameUzEdit },
          { categories2Names: { name: nameRu, lan: "RU" }, id: nameRuEdit },
          { categories2Names: { name: nameEn, lan: "EN" }, id: nameEnEdit },
        ],
      }).then(() => {
        getCategories()
        setEdit(null)
        setModalvisible(false);

        setNameUzEdit("")
        setNameRuEdit("")
        setNameEnEdit("")
        setNameUz('')
        setNameEn('')
        setNameRu('')
      })
    }
  }

  function addInnerCategoryinChild(e) {
    console.log('editChild', editChild);
    console.log('edit', edit);
    e.preventDefault()
    const catName = "category" + categoryIndex + "NamesDTO"
    const catChildName = "categories" + categoryIndex + "Names"
    if (!editChild && edit == null) {
      AxiosCall("post", `/navbar_categories_${categoryIndex}/${categoryId}`, {
        [catName]: [
          { [catChildName]: { name: nameUz, lan: "UZ" } },
          { [catChildName]: { name: nameRu, lan: "RU" } },
          { [catChildName]: { name: nameEn, lan: "EN" } },
        ],
      }).then(() => {
        getCategories()
        setNameUz("")
        setNameRu("")
        setNameEn("")
        setModalvisible2(false);
      });
    } else {
      AxiosCall("put", `/navbar_categories_${categoryIndex}/` + edit.id, {
        [catName]: [
          { [catChildName]: { name: nameUz, lan: "UZ" }, id: nameUzEdit },
          { [catChildName]: { name: nameRu, lan: "RU" }, id: nameRuEdit },
          { [catChildName]: { name: nameEn, lan: "EN" }, id: nameEnEdit },
        ],
      }).then(() => {
        getCategories()
        setEdit(null)
        setModalvisible2(false);
        setNameUz("")
        setNameRu("")
        setNameEn("")
        setNameUzEdit("")
        setNameRuEdit("")
        setNameEnEdit("")
      })
    }
  }

  function editInner(item) {
    setModalvisible(true);
    setEdit(item)
    AxiosCall('get', "/navbar_categories_2/" + item.id).then(data => {
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

  function editInnerAdd(item, index) {
    setCategoryId(item.id)
    setCategoryIndex(index)
    setModalvisible2(true)
  }

  function editInnerChild(item, index) {
    setModalvisible2(true);
    setEdit(item)
    setCategoryIndex(index)
    AxiosCall('get', `/navbar_categories_${index}/` + item.id).then(data => {
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
  function deleteInner(id) {
    setDeleteId2(id)
    setDeletes2(true)
  }

  function deleteinner() {
    AxiosCall("delete", `/navbar_categories_2/${deleteId2}`).then(() => {
      getCategories()
      setDeletes2(false)
    })
  }

  function deleteInnerChild(id, index) {
    setCategoryIndex(index)
    setDeleteId3(id)
    setDeletes3(true)
  }

  function deleteinnerchild() {
    AxiosCall("delete", `/navbar_categories_${categoryIndex}/${deleteId3}`).then(() => {
      getCategories()
      setDeletes3(false)
    })
  }

  return (
    <div className="main">
      {loading ? <Loading />
        : <>
          <div className="top mb-2">
            <div style={{ width: "130px" }}>
              {selectedCategory.name}
            </div>
            <div className="buttons">
              <button
                className="addCategory"
                onClick={() => setModalvisible(true)}
              >
                + Kategoriya Qo'shish
              </button>
              <button
                className="addnews"
                onClick={() => {
                  setCategoryIndex(1)
                  navigate(`/main/${id}/content`)
                }}
              >
                Kontentlar
              </button>
            </div>
          </div>
          <nav className="nav" role="navigation">
            <ul className="nav__list">
              {accardion.map(item1 =>
                <AccordionItem
                  setSelectedCategory={setSelectedCategory}
                  setCategoryIndex={setCategoryIndex}
                  deleteInner={deleteInner}
                  editInner={editInner}
                  item={item1}
                  navigate={navigate}
                  editInnerAdd={editInnerAdd}
                  key={item1.id}
                  modalvisible={modalvisible}
                  deletes2={deletes2}
                  startPos={2}
                />
              )}
            </ul>
          </nav>
        </>
      }

      <Rodal width={250} height={120} visible={deletes2} onClose={() => setDeletes2(false)}>
        <div className="mt-1 text-center">
          O'chirilsinmi <br /><br />
          <button
            className="btn btn-primary mr-1"
            onClick={() => deleteinner()}
          >Ha
          </button>
          <button className="btn btn-danger" onClick={() => setDeletes2(false)}>Yoq</button>
        </div>
      </Rodal>
      <Rodal width={250} height={120} visible={deletes3} onClose={() => setDeletes3(false)}>
        <div className="mt-1 text-center">
          O'chirilsinmi <br /><br />
          <button className="btn btn-primary mr-1" onClick={() => deleteinnerchild()}>Ha</button>
          <button className="btn btn-danger" onClick={() => setDeletes3(false)}>Yoq</button>
        </div>
      </Rodal>
      <Rodal visible={modalvisible} onClose={() => setModalvisible(false)}>
        <form className="htmlForm" onSubmit={addInnerCategory}>
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
            <button className="btn btn-primary" type="submit">Saqlash</button>
          </div>
        </form>
      </Rodal>

      <Rodal visible={modalvisible2} onClose={() => setModalvisible2(false)}>
        <form className="htmlForm" onSubmit={addInnerCategoryinChild}>
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
            <button className="btn btn-primary">Saqlash</button>
          </div>
        </form>
      </Rodal>
      <Outlet context={{ selectedCategory, categoryIndex }} />
    </div>
  );
};

export default Main;
