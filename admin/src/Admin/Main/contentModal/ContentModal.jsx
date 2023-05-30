/* eslint-disable default-case */
import { faArrowLeft, faTrash } from "@fortawesome/free-solid-svg-icons";
import Rodal from "rodal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Children, useState } from "react";
import {
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import "./scss/ContentModal.scss";
import AxiosCall, { BASE_URL } from "../../../AxiosCall/AxiosCall";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import { useRef } from "react";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";
import Cookies from "js-cookie";

export const EDITOR_HEIGHT = 100;

const ContentModal = (props) => {
  const [alertVisible, setAlertVisible] = useState(false);
  const { childId, id, method } = useParams();
  const [saveLoading, setSaveLoading] = useState(false);
  const [lanState, setLanState] = useState("uz");
  const [urls, setUrls] = useState([]);
  const [deletedUrls, setDeletedUrls] = useState([]);
  const navigate = useNavigate();
  let location = useLocation();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [images, setImages] = useState([]);
  const [imagesFile, setImagesFile] = useState([]);
  const { categoryIndex, setCategoryIndex } = useOutletContext();

  useEffect(() => {
    if (childId) {
      AxiosCall("get", "/content/" + childId).then((data) => {
        if (data.url.length > 0) {
          data?.url?.map((url) => {
            images.push(BASE_URL + url);
          });
        }
        const uniqueImages = images.filter((item, index) => {
          return (
            index ===
            images.findIndex((obj) => {
              return JSON.stringify(obj) === JSON.stringify(item);
            })
          );
        });
        setImages(uniqueImages);

        data.contents?.map((item) => {
          let obj = item.ckeditor;
          if (obj.lan == "UZ") {
            localStorage.setItem("uz_content", obj.body);
            localStorage.setItem("uz_title", obj.title);
            localStorage.setItem("uz_id", item.id);
          } else if (obj.lan == "RU") {
            localStorage.setItem("ru_content", obj.body);
            localStorage.setItem("ru_title", obj.title);
            localStorage.setItem("ru_id", item.id);
          } else {
            localStorage.setItem("en_content", obj.body);
            localStorage.setItem("en_title", obj.title);
            localStorage.setItem("en_id", item.id);
          }
          getContentAndTitleFromLocalStorage();
        });
      });
    }
  }, []);

  const success = (param = "") => {
    toast.success(param);
  };
  const err = (param = "") => {
    toast.error(param);
  };

  // !!!
  function convertTableToFlex(content) {
    //data-table-flex-second
    const div = document.createElement("div");
    div.innerHTML = content;
    const tables = div.querySelectorAll("[data-table-flex]");
    if (tables.length > 0) {
      tables.forEach((table) => {
        const flexesMeasure = table.dataset.tableFlex;
        console.log(flexesMeasure);
        const firstCol = table.querySelector(
          "[data-table-flex-first]"
        )?.innerHTML;
        const secondCol = table.querySelector(
          "[data-table-flex-second]"
        )?.innerHTML;
        const thirdCol = table.querySelector(
          "[data-table-flex-third]"
        )?.innerHTML;
        let flexChilds;
        if (flexesMeasure === "6") {
          flexChilds = `
          <div class="col-my-md-6">
          ${firstCol}
        </div>
        <div class="col-my-md-6">
          ${secondCol}
        </div>
          `;
        } else if (flexesMeasure === "4") {
          flexChilds = `
          <div class="col-my-md-4">
          ${firstCol}
        </div>
        <div class="col-my-md-4">
          ${secondCol}
        </div>
        <div class="col-my-md-4">
          ${thirdCol}
        </div>
          `;
        }
        // converting ...
        const flexEl = document.createElement("div");
        flexEl.classList.add("d-my-flex");
        flexEl.innerHTML = flexChilds;

        // delete table, insert flex

        table.parentNode.insertBefore(flexEl, table.nextSibling);
        table.remove();
      });
    }

    return div.innerHTML;
  }

  const handleSave = () => {
    if (method === "add") {
      AxiosCall("post", `/content/categories${categoryIndex}/${id}`, {
        author: props.user.username + " " + props.user.lastname,
        contents: [
          {
            ckEditor: {
              lan: "UZ",
              title: localStorage.getItem("uz_title"),
              body: convertTableToFlex(localStorage.getItem("uz_content")),
            },
          },
          {
            ckEditor: {
              lan: "RU",
              title: localStorage.getItem("ru_title"),
              body: convertTableToFlex(localStorage.getItem("ru_content")),
            },
          },
          {
            ckEditor: {
              lan: "EN",
              title: localStorage.getItem("en_title"),
              body: convertTableToFlex(localStorage.getItem("en_content")),
            },
          },
        ],
        urls,
        deletedUrls,
      })
        .then((data) => {
          clearLocalstorage();
          if (imagesFile.length > 0) {
            saveImages(data.id);
          } else {
            success("Kontent muvaffaqiyatli saqlandi!");
            navigate(`/main/${id}/content`);
          }
        })
        .catch(() => {
          err("Kontent saqlanmadi");
        });
    } else {
      AxiosCall("put", `/content/${childId}`, {
        author: props.user.username + " " + props.user.lastname,
        contents: [
          {
            ckEditor: {
              lan: "UZ",
              title: localStorage.getItem("uz_title"),
              body: convertTableToFlex(localStorage.getItem("uz_content")),
            },
            id: localStorage.getItem("uz_id"),
          },
          {
            ckEditor: {
              lan: "RU",
              title: localStorage.getItem("ru_title"),
              body: convertTableToFlex(localStorage.getItem("ru_content")),
            },
            id: localStorage.getItem("ru_id"),
          },
          {
            ckEditor: {
              lan: "EN",
              title: localStorage.getItem("en_title"),
              body: convertTableToFlex(localStorage.getItem("en_content")),
            },
            id: localStorage.getItem("en_id"),
          },
        ],
        urls,
        deletedUrls,
      })
        .then((data) => {
          clearLocalstorage();
          if (imagesFile.length > 0) {
            saveImages(data.id);
          } else {
            navigate(`/main/${id}/content`);
            success("Kontent muvaffaqiyatli saqlandi!");
          }
        })
        .catch(() => {
          err("Kontent saqlanmadi");
        });
    }
  };

  const saveImages = (c_id) => {
    let formData = new FormData();
    imagesFile.map((item) => {
      formData.append("files", item);
    });

    AxiosCall("post", "/content_images/" + c_id, formData)
      .then((res) => {
          success("Kontent muvaffaqiyatli saqlandi!");
          navigate(`/main/${id}/content`);
          clearLocalstorage();
          getContentAndTitleFromLocalStorage();
          setImages([]);
          setDeletedUrls([]);
          setImagesFile([]);
      })
      .catch(() => {
        err("Kontent saqlanmadi!");
      });
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  function getFiles(e) {
    let files = e.target.files;
    Array.from(files).forEach(async (item) => {
      images.push(await toBase64(item));
      setImages([...images]);
      imagesFile.push(item);
      setImagesFile([...imagesFile]);
    });
  }

  useEffect(() => {
    getContentAndTitleFromLocalStorage();
  }, [lanState]);

  const getContentAndTitleFromLocalStorage = () => {
    if (localStorage.getItem(`${lanState}_content`) != null) {
      setContent(localStorage.getItem(`${lanState}_content`));
      save(localStorage.getItem(`${lanState}_content`));
    } else {
      setContent("");
      save("");
    }
    if (localStorage.getItem(`${lanState}_title`) == null) {
      addTitle("");
    } else {
      addTitle(localStorage.getItem(`${lanState}_title`));
    }
  };

  function addTitle(value) {
    if (lanState == "ru") {
      localStorage.setItem("ru_title", value);
      setTitle(value);
    } else if (lanState == "uz") {
      localStorage.setItem("uz_title", value);
      setTitle(value);
    } else if (lanState == "en") {
      localStorage.setItem("en_title", value);
      setTitle(value);
    }
  }

  // !!!
  function save(editor) {
    if (editor != undefined)
      if (lanState == "uz") {
        localStorage.setItem("uz_content", editor);
        if (localStorage.getItem("uz_content") === null) {
          setContent("");
        } else {
          setContent(localStorage.getItem("uz_content"));
        }
      } else if (lanState === "en") {
        localStorage.setItem("en_content", editor);
        if (localStorage.getItem("en_content") === null) {
          setContent("");
        } else {
          setContent(localStorage.getItem("en_content"));
        }
      } else {
        localStorage.setItem("ru_content", editor);

        if (localStorage.getItem("ru_content") === null) {
          setContent("");
        } else {
          setContent(localStorage.getItem("ru_content"));
        }
      }
  }

  function deleteItem() {
    AxiosCall("delete", "/content/" + childId)
      .then((data) => {
        success("Kontent muvaffaqiyatli o'chirildi!");
        setImages([]);
        clearLocalstorage();
        getContentAndTitleFromLocalStorage();
        navigate("/main/" + id + "/content");
      })
      .catch(() => {
        err("Kontent o'chirilmadi!");
      });
  }
  function clearLocalstorage() {
    localStorage.removeItem("ru_content");
    localStorage.removeItem("uz_content");
    localStorage.removeItem("en_content");
    localStorage.removeItem("ru_title");
    localStorage.removeItem("uz_title");
    localStorage.removeItem("en_title");
  }
  const carouselRef = useRef();
  function deleteCarousel(src) {
    const imageId = src.split("/").at(-1);
    setDeletedUrls((prev) => [...prev, imageId]);
    setImages((prev) => prev.filter((i) => i !== src));
    carouselRef.current?.onClickPrev();
  }

  return (
    <div className="wrapper">
      <div className="header">
        <button className="back-btn">
          <FontAwesomeIcon
            icon={faArrowLeft}
            onClick={() => {
              clearLocalstorage();
              navigate("/main/" + id + "/content");
            }}
          />
        </button>
        <div style={{ display: "flex", gap: "15px", marginTop: 85 }}>
          <label className="image-uploader-label">
            <input type="file" hidden multiple onChange={(e) => getFiles(e)} />
            <button type="button" className="button-image-upload">
              <span className="button__text">Rasm</span>
              <span className="button__icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M21 15V18H24V20H21V23H19V20H16V18H19V15H21ZM21.0082 3C21.556 3 22 3.44495 22 3.9934V13H20V5H4V18.999L14 9L17 12V14.829L14 11.8284L6.827 19H14V21H2.9918C2.44405 21 2 20.5551 2 20.0066V3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082ZM8 7C9.10457 7 10 7.89543 10 9C10 10.1046 9.10457 11 8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7Z"
                    fill="rgba(250,250,250,1)"
                  ></path>
                </svg>
              </span>
            </button>
          </label>
          <select
            onChange={(e) => setLanState(e.target.value)}
            value={lanState}
          >
            <option value="uz">UZB</option>
            <option value="ru">RU</option>
            <option value="en">ENG</option>
          </select>
          <button
            onClick={() => setAlertVisible(true)}
            className="delete-content-btn-disabled"
          >
            o'chirish
          </button>
          <button
            disabled={saveLoading}
            onClick={() => {
              handleSave();
              setSaveLoading(true);
            }}
            className={
              saveLoading ? "save-content-btn" : "save-content-btn-disabled"
            }
          >
            {!saveLoading ? (
              <>Saqlash</>
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
          </button>
        </div>
      </div>

      <div className="body">
        <textarea
          placeholder={
            lanState == "uz"
              ? "Sarlavha"
              : lanState == "ru"
              ? "Заголовок"
              : "Title"
          }
          onInput={(e) => addTitle(e.target.value)}
          value={title}
        />
        <div className="p-relative">
          <Editor
            apiKey="ecftg14yobx06muc0mjuqekqns1qogjy7gqnhjbokt3hdavn"
            value={content === null ? "" : content}
            onEditorChange={(content) => save(content)}
            init={{
              menubar: false,
              resize: true,
              height: EDITOR_HEIGHT,
              toolbar_sticky: true,
              plugins: [
                "table",
                "image",
                "media",
                "autoresize",
                "template",
                "link",
                "lists",
              ],
              fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt",
              content_style: "body {font-size: 12pt;}",
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor fontsize lineheight | table image media | " +
                "alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link | template help",
              automatic_uploads: true,
              file_picker_types: "image,file,media",
              images_upload_url: `${BASE_URL}/content_images`,
              images_upload_base_path: BASE_URL,
              templates: [
                {
                  title: "2",
                  description: "2 ga bo'lish",
                  content: `
                    <table data-table-flex="6" style="width: 100%;">
                      <tbody>
                        <tr>
                          <td data-table-flex-first style="width: 50%;">1</td>
                          <td data-table-flex-second style="width: 50%;">2</td>
                        </tr>
                      </tbody>
                    </table>
                  `,
                },
                {
                  title: "3",
                  description: "3 ga bo'lish",
                  content: `
                    <table data-table-flex="4" style="width: 100%;">
                      <tbody>
                        <tr>
                          <td data-table-flex-first style="width: 33.333%;">1</td>
                          <td data-table-flex-second style="width: 33.333%;">2</td>
                          <td data-table-flex-third style="width: 33.333%;">3</td>
                        </tr>
                      </tbody>
                    </table>
                  `,
                },
              ],
              setup(editor) {
                editor.on("keydown", function (e) {
                  if (
                    (e.keyCode == 8 || e.keyCode == 46) &&
                    window.tinymce.activeEditor.selection
                  ) {
                    var selectedNode =
                      window.tinymce.activeEditor.selection.getNode();
                    if (
                      selectedNode &&
                      selectedNode.firstElementChild?.nodeName == "IMG"
                    ) {
                      var imageSrc = selectedNode.firstElementChild.src;
                      const imageId = imageSrc?.split("/").at(-1);
                      if (imageId) {
                        imageId &&
                          imageId &&
                          AxiosCall("delete", `/content_images/${imageId}`);
                        setUrls((prev) => prev.filter((u) => u !== imageId));
                      }
                    }
                  }
                });
              },
              file_picker_callback: (cb, value, meta) => {
                const input = document.createElement("input");
                input.setAttribute("type", "file");
                input.setAttribute("accept", "image/*,audio/*");
                input.addEventListener("change", (e) => {
                  const file = e.target.files[0];
                  if (
                    file.type.includes("image/") ||
                    file.type.includes("audio/")
                  ) {
                    const reader = new FileReader();
                    reader.addEventListener("load", () => {
                      const id = "blobid" + new Date().getTime();
                      const blobCache =
                        window.tinymce.activeEditor.editorUpload.blobCache;
                      const base64 = reader.result.split(",")[1];
                      const blobInfo = blobCache.create(id, file, base64);
                      blobCache.add(blobInfo);
                      // Provide image and alt text for the image dialog
                      if (meta.filetype == "image") {
                        cb(blobInfo.blobUri());
                      }

                      if (meta.filetype == "media") {
                        const formData = new FormData();
                        formData.append("files", file);

                        AxiosCall("post", "/content_images", formData)
                          .then((json) => cb(blobInfo.blobUri()))
                          .catch((e) => {
                            alert("File upload error");
                            console.log(e);
                          });
                      }
                    });
                    reader.readAsDataURL(file);
                  }
                });
                input.click();
              },
              video_template_callback: (data) => {
                return `
                          <audio controls>
                              <source src="${data.source}">
                          </audio>
                      `;
              },
              images_upload_handler: (blobInfo, progress) =>
                new Promise((resolve, reject) => {
                  const xhr = new XMLHttpRequest();

                  xhr.withCredentials = false;
                  xhr.open("POST", `${BASE_URL}/content_images`);

                  const token = Cookies.get("ac_t");
                  xhr.setRequestHeader("token", token);

                  xhr.upload.onprogress = (e) => {
                    progress((e.loaded / e.total) * 100);
                  };

                  xhr.onload = () => {
                    if (xhr.status === 403) {
                      reject({
                        message: "HTTP Error: " + xhr.status,
                        remove: true,
                      });
                      return;
                    }

                    if (xhr.status < 200 || xhr.status >= 300) {
                      reject("HTTP Error: " + xhr.status);
                      return;
                    }

                    const json = JSON.parse(xhr.responseText);
                    if (!json || typeof json != "string") {
                      reject("Invalid JSON: " + xhr.responseText);
                      return;
                    }

                    setUrls((prev) => [...prev, json]);
                    resolve(`${BASE_URL}/content_images/${json}`);
                  };

                  xhr.onerror = () => {
                    reject(
                      "Image upload failed due to a XHR Transport error. Code: " +
                        xhr.status
                    );
                  };
                  const formData = new FormData();
                  formData.append(
                    "files",
                    blobInfo.blob(),
                    blobInfo.filename()
                  );
                  xhr.send(formData);
                }),
            }}
          />
        </div>
      </div>
      <div className="my-footer">
        {images && (
          <Carousel ref={carouselRef}>
            {images.map((item, index) => (
              <div className="banner_item1" key={index}>
                <div className="delete-btn">
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => deleteCarousel(item)}
                  />
                </div>
                <img className="fake-image" src={item} alt="" />
                <img className="orignal-image" src={item} alt="" />
              </div>
            ))}
          </Carousel>
        )}
      </div>
      <Rodal
        width={250}
        height={120}
        visible={alertVisible}
        onClose={() => setAlertVisible(false)}
      >
        <div className="alert-box">
          <span>O'chirilsinmi?</span>
          <div className="btns">
            <button className="no-btn" onClick={() => setAlertVisible(false)}>
              yo'q
            </button>
            <button className="yes-btn" onClick={() => deleteItem()}>
              ha
            </button>
          </div>
        </div>
      </Rodal>
    </div>
  );
};

export default ContentModal;
