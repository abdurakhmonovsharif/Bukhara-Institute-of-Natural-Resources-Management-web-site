import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import React from "react";
import "./Login.scss";
import { Navigate, useNavigate } from "react-router-dom";
import AxiosCall from '../AxiosCall/AxiosCall'
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
const Login = ({ user, setUser }) => {
  const [showpass, setShowpass] = React.useState(false);
  const [username, setUserName] = React.useState("")
  const [password, setPassword] = React.useState("")
  const navigate = useNavigate("")
  function submit1(e) {
    e.preventDefault()
    AxiosCall('post', "/user/login", {
      username, password
    }).then(data => {
      Cookies.set('ac_t', data.token)
      setUser(data.user)
      navigate('/')
      toast.success('Tizimga xush kelibsiz!')
    }).catch(e => {
      toast.error("Username yoki parol xato!")
    })
  }

  if (user) {
    return <Navigate to="/" />
  }

  return (
    <div className="login">
      <ToastContainer />
      <div className="container">
        <form className="form" onSubmit={submit1}>
          <div className="textes">
            <strong>Kirish</strong>
          </div>
          <div className="inputs">
            <div className="input-contanier">
              <input onChange={(e) => setUserName(e.target.value)} value={username} type="text" className="input" autoComplete="username" placeholder="Foydalanuvchi nomi" />
            </div>
            <div className="input-contanier">
              <input onChange={(e) => setPassword(e.target.value)} value={password} type={!showpass ? "password" : "text"} autoComplete="current-password" className="input" placeholder="Parol" />
              {showpass ? (
                <FontAwesomeIcon onClick={() => setShowpass(!showpass)} icon={faEye} className="eye-icon" />
              ) : (
                <FontAwesomeIcon onClick={() => setShowpass(!showpass)} icon={faEyeSlash} className="eye-icon" />
              )}
            </div>
          </div>
          <div className="sign-in-btn">
            <Button type="submit">Kirish</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
