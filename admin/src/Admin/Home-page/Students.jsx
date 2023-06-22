import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faImage, faL } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useEffect } from "react";
import Rodal from "rodal";
import AxiosCall from "../../AxiosCall/AxiosCall";

export default function Students() {
  const [studentCount, setStudentCount] = useState("");
  const [id, setId] = useState(null);
  const [ord, setOrd] = useState(null);
  const [selectName, setSelectName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [regions, setRegions] = useState([]);

  function getStudent() {
    AxiosCall("get", "/regional_students")
      .then((data) => setRegions(data))
  }

  useEffect(() => {
    getStudent()
  }, [])

  function openModal({ name, id, studentCount,ord }) {
    setModalVisible(true)
    setSelectName(name)
    setStudentCount(studentCount)
    setId(id)
    setOrd(ord)
  }

  function editStudent(e) {
    e.preventDefault()
    AxiosCall("put", "/regional_students/" + id, {
      name: selectName,
      studentCount,
      ord
    }).then((res) => {
      getStudent()
      setModalVisible(false)
      setSelectName("")
      setStudentCount("")
      setId("")
    })
  }

  return (
    <div className="students-container">
      <h6>Talabalar</h6>
      <ul className="students-responsive-table">
        <li className="table-header">
          <div className="col col-1">Viloyat nomi</div>
          <div className="col col-2">O'quvchilar</div>
          <div className="col col-2">O'zgartirish</div>
        </li>
        {regions.map((item) => (
          <li className="table-row" key={item.id}>
            <div className="col col-1">{item.name}</div>
            <div className="col col-2">{item.studentCount} ta</div>
            <div className="col col-4">
              <button onClick={() => openModal(item)}>
                <FontAwesomeIcon icon={faEdit} />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <Rodal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        width={500}
        height={300}
      >
        <form onSubmit={editStudent} className="mt-2 form-inputs">
          <h4>{selectName}</h4>
          <input
            type="text"
            placeholder="Studentlar sonini kiriting"
            value={studentCount}
            onChange={(e) => setStudentCount(e.target.value)}
          />
          <button className="submit-btn">Saqlash</button>
        </form>
      </Rodal>
    </div>
  );
}
