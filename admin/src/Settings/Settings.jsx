import React, { useState } from 'react';
import "../Settings/Settings.scss"
import userImage from "../Image/user.png"
import { useEffect } from 'react';
import AxiosCall from '../AxiosCall/AxiosCall';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Settings = ({ user, setUser }) => {
    const [img, setImg] = useState("")
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [showpass, setShowpass] = useState(false)
    const navigate = useNavigate()

    function handleFile(e) {
        const reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = () => {
            setImg(reader.result)
        }
    }

    function handleSave() {
        const data = { firstname, lastname, username, password: password === "" ? null : password }
        AxiosCall('put', `/user/${user.id}`, data)
            .then(data => {
                setUser(null)
                navigate('/login')
            }).catch(e => {
                console.log(e)
                toast.error("Xatolik")
            })
    }

    useEffect(() => {
        if (user) {
            setFirstname(user.firstname)
            setLastname(user.lastname)
            setUsername(user.username)
        }
    }, [])

    return (
        <div className='profile-cards'>
            <div className='card2'>
                <img src={userImage} width={100} alt="" />
                <h1>{user?.lastname} {user?.firstname}</h1>
            </div>

            <div className='card3'>
                <div className="textes"></div>
                <input value={firstname} onChange={e => setFirstname(e.target.value)} placeholder='Name' type="text" />
                <input value={lastname} onChange={e => setLastname(e.target.value)} placeholder='LastName' type="text" />
                <input value={username} onChange={e => setUsername(e.target.value)} placeholder='UserName' type="text" />
                <div className="input-contanier">
                    <input value={password} onChange={e => setPassword(e.target.value)} placeholder='Password' type={showpass ? 'text' : 'password'} />
                    <FontAwesomeIcon onClick={() => setShowpass(!showpass)} icon={showpass ? faEye : faEyeSlash} className="eye-icon" />
                </div>
                <div onClick={handleSave} className='savebtn'>Save</div>
            </div>

        </div>



    );
}

export default Settings;
