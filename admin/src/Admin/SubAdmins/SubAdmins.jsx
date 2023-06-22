// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
import React, { useEffect, useState } from "react";
// import { Button, ButtonBase, ButtonGroup, Input, TextField } from '@mui/material';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import Rodal from "rodal";
import "./SubAdmins.scss";
import AxiosCall, { BASE_URL } from "../../AxiosCall/AxiosCall";
import { toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";
const SubAdmins = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [users, setUsers] = useState([]);
  const [Isedit, setIsEdit] = useState();
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof Isedit === "object") {
      setFirstname(Isedit.firstname);
      setUsername(Isedit.username);
      setLastname(Isedit.lastname);
    }
  }, [Isedit]);

  function generatePassword() {
    const chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@$*&?//";
    let pass = "";
    for (let i = 0; i < 10; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(pass);
  }
  function getAdmins() {
    const token = Cookies.get("ac_t");
    axios
      .get(BASE_URL + "/user", {
        headers: {
          token: token,
        },
      })
      .then(({ data }) => {
        setUsers(data);
      })
      .catch(() => {
        toast.error("Sizga ruxsat berilmagan");
        setError(true);
      });
  }
  useEffect(() => {
    getAdmins();
  }, []);
  function saveUser() {
    if (Isedit === "no") {
      if (!username || !firstname || !lastname || !password)
        return toast.error(`Ma'lumotlar to'ldirilmagan`);
      AxiosCall("post", "/user", {
        firstname,
        username,
        password,
        lastname,
      }).then((data) => {
        toast.success(`Muvaffaqiyatli o'zgartirildi`);
        getAdmins();
        setFirstname("");
        setLastname("");
        setPassword("");
        setUsername("");
      });
    } else {
      if (!username || !firstname || !lastname)
        return toast.error(`Ma'lumotlar to'ldirilmagan`);
      AxiosCall("put", "/user/" + Isedit.id, {
        firstname,
        username,
        password: password === "" ? null : password,
        lastname,
      }).then((data) => {
        toast.success(`Muvaffaqiyatli o'zgartirildi`);
        getAdmins();
        setFirstname("");
        setLastname("");
        setPassword("");
        setUsername("");
        setIsEdit();
      });
    }
  }
  function deletes() {
    AxiosCall("delete", "/user/" + modalVisible).then((data) => {
      toast.error(data);
      getAdmins();
    });
  }

  function closeEditModal() {
    setFirstname("");
    setLastname("");
    setPassword("");
    setUsername("");
    setIsEdit(false);
  }

  return error ? null : (
    <div
      style={{
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "5px",
      }}
    >
      <ul className="responsive-table">
        <div className="add-button">
          <button onClick={() => setIsEdit("no")}>+ Admin qo'shish</button>
        </div>
        <li className="table-header">
          <div className="col col-1">Username</div>
          <div className="col col-2">FirstName</div>
          <div className="col col-4">Actions</div>
        </li>
        {users.map((item) => (
          <li key={item.id} className="table-row">
            <div className="col col-1" data-label="Job Id">
              {item.username}
            </div>
            <div className="col col-2" data-label="Customer Name">
              {item.firstname}
            </div>

            <div className="col col-4" data-label="Payment Status">
              <button>
                <FontAwesomeIcon
                  onClick={() => setModalVisible(item.id)}
                  icon={faTrash}
                />
              </button>
              <button>
                <FontAwesomeIcon
                  onClick={() => setIsEdit(item)}
                  icon={faEdit}
                />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <Rodal
        width={500}
        height={330}
        visible={Isedit}
        onClose={() => closeEditModal()}
      >
        <div className="form-card">
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            placeholder="UserName"
          />
          <input
            type="text"
            onChange={(e) => setFirstname(e.target.value)}
            value={firstname}
            placeholder="FirstName"
          />
          <input
            type="text"
            onChange={(e) => setLastname(e.target.value)}
            value={lastname}
            placeholder="LastName"
          />
          <div className="input-contanier">
            <input
              type="text"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Password"
            />
            <FontAwesomeIcon
              className="eye-icon"
              onClick={generatePassword}
              icon={faKey}
            />
          </div>
          <button onClick={() => saveUser()} className="btn btn-info">
            Saqlash
          </button>
        </div>
      </Rodal>
      <Rodal
        width={250}
        height={120}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      >
        <div className="alert-box">
          <span>O'chirilsinmi?</span>
          <div className="btns">
            <button className="no-btn" onClick={() => setModalVisible(false)}>
              yo'q
            </button>
            <button className="yes-btn" onClick={() => deletes()}>
              ha
            </button>
          </div>
        </div>
      </Rodal>
    </div>
  );
};

export default SubAdmins;
