import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Rodal from "rodal";
import { Box, Button, Checkbox, Drawer, FormControlLabel, List } from "@mui/material";
import AxiosCall from "../../AxiosCall/AxiosCall";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faComments, faImage, faRefresh, faSearch, faTrash, faUser, faUserGear } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import userImage from "../../Image/user.png"
import { toast } from "react-toastify";

const AdminHeader = ({ user }) => {
  const navigate = useNavigate("");
  const [modalvisible, setModalvisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [comments, setCommetns] = useState([])
  const [comments2, setCommetns2] = useState([])
  const [more, setMore] = useState("")
  useEffect(() => {
    getCommetns()
    getCommetns2()
  }, [])
  const getCommetns = () => {
    AxiosCall("get", "/comment").then(data => {
      setCommetns(data);
    })
  }
  const getCommetns2 = () => {
    AxiosCall("get", "/message").then(data => {
      setCommetns2(data)
    })
  }
  const [state, setState] = useState({
    right: false
  });
  const [state2, setState2] = useState({
    right: false
  });
  function addCategory() {
    categories.push(title);
    setCategories([...categories]);
    setModalvisible(false);
  }
  function selectAllComments(e) {
    let value = e.target.checked;
    comments.map(item => {
      item.visible = value
    })
    setCommetns([...comments])
  }
  function selectComments(e, id) {
    comments.filter(item => item.id === id)[0].visible = e.target.checked;
    setCommetns([...comments])
  }
  function accsessToAllComment() {
    let putComments = comments.map(item => {
      return {
        id: item.id,
        contentId: item.content_id,
        comment: {
          firstname: item.firstname,
          lastname: item.lastname,
          telOrEmail: item.telOrEmail,
          body: item.body,
          visible: item.visible,
          createdAt: item.created_at,
        }
      }
    })
    AxiosCall("put", `/comment`, { comments: putComments })
      .then(data => {
        toast.success("Muvaffaqiyatli o'zgartirildi")
      })
  }

  function accsessToComment(item) {
    item.createdAt = item.created_at
    AxiosCall("put", `/comment/${item.content_id}/${item.id}`, item)
      .then(data => {
        toast.success("Muvaffaqiyatli o'zgartirildi")
      })
  }
  function ignoreComment(id) {
    AxiosCall("delete", "/comment/" + id)
      .then(data => {
        getCommetns()
      })
  }
  function ignoreComment2(id) {
    AxiosCall("delete", "/message/" + id)
      .then(data => {
        toast.success(`Xabar o'chirildi`)
        getCommetns2()
      })
  }

  function deleteMessages() {
    AxiosCall("delete", "/message")
      .then(data => {
        toast.success(`Xabarlar o'chirildi`)
        getCommetns2()
      })
  }

  // comments
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : '60vw' }}
      role="presentation"
    >
      <List>
        <div className="commnets-container">
          <div className="comments-header">
            <div className="top-actions">
              <FormControlLabel className="checkbox-label"
                control={<Checkbox onChange={selectAllComments} />} label="Hammasini belgilash" />
              <Button disabled={comments.length == 0} className="access-btn" onClick={accsessToAllComment}>Ruhsat</Button>
            </div>
            <FontAwesomeIcon icon={faRefresh} className="refresh-icon" onClick={() => getCommetns()} />

            <FontAwesomeIcon icon={faClose} className="icon" onClick={() => setState({ right: false })} />
          </div>
          {
            comments.length > 0 ?
              comments?.map(item => {
                return (<div className="comments-body">
                  <div className="body-header">
                    <div className="user">
                      <FontAwesomeIcon icon={faUser} />
                      <span>{item.firstname + " " + item.lastname}</span>
                    </div>
                    <div className="time">
                      {new Date(item.created_at).toLocaleString()}
                    </div>
                  </div>
                  <div className="body-content">
                    <div className="content">
                      <span className="text1">{item.body}</span>
                      <span onClick={() => setMore(item.body)} className="more">Batafsil</span>
                    </div>
                    <div className="actions">
                      <Checkbox checked={item.visible} onChange={(e) => selectComments(e, item.id)} />
                      <Button className="accsses-btn" onClick={() => accsessToComment(item)}>Saqlash</Button>
                      <Button className="ignore-btn" onClick={() => ignoreComment(item.id)}>O'chirish</Button>
                    </div>

                  </div>

                </div>)
              }) : <p className="text-center mt-2">Xabarlar mavjud emas!</p>
          }
        </div>
      </List>
    </Box>
  );
  const list2 = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : '60vw' }}
      role="presentation"
    >
      <List>
        <div className="commnets-container">
          <div className="comments-header">
            <FontAwesomeIcon icon={faRefresh} className="refresh-icon" onClick={() => getCommetns2()} />

            <div className="top-actions">
              <Button disabled={comments2.length == 0} className="ignore-btn" onClick={() => deleteMessages()}>Tozalash</Button>
            </div>

            <FontAwesomeIcon icon={faClose} className="icon" onClick={() => setState2({ right: false })} />
          </div>
          {
            comments2.length > 0 ?
              comments2?.map(item => {
                return (<div className="comments-body">
                  <div className="body-header">
                    <div className="user">
                      <FontAwesomeIcon icon={faUser} />
                      <span>{item.authorFirstname + " " + item.authorLastname}</span>
                    </div>
                    <div className="time">
                      {new Date(item.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <div className="body-header justify-center">
                    <div>Sarlavha: <b>{item.title}</b> </div>
                  </div>
                  <div className="body-header">
                    <div>Raqam: <b>{item.telNumber}</b> </div>
                    <div>Email: <b>{item.emailAddress}</b> </div>
                  </div>
                  <div className="body-content">
                    <div className="content">
                      <span className="text1">{item.body}</span>
                      <span onClick={() => setMore(item.body)} className="more">Batafsil</span>
                    </div>
                    <div className="actions">
                      <Button className="ignore-btn" onClick={() => ignoreComment2(item.id)}>O'chirish</Button>
                    </div>
                  </div>
                </div>)
              }) : <p className="text-center mt-2">Xabarlar mavjud emas!</p>
          }
        </div>
      </List>
    </Box>
  );
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const toggleDrawer2 = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState2({ ...state2, [anchor]: open });
  };
  return (
    <>
      <div className="admin-header">
        <React.Fragment >
          <Drawer
            anchor={'right'}
            open={state['right']}
            onClose={toggleDrawer('right', false)}
          >
            {list('right')}
          </Drawer>
          <Drawer
            anchor={'right'}
            open={state2['right']}
            onClose={toggleDrawer2('right', false)}
          >
            {list2('right')}
          </Drawer>
        </React.Fragment>
        <div className="user-and-comments">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className="comments-container mr-2" onClick={toggleDrawer('right', true)}>
              <FontAwesomeIcon className="icon" icon={faComments} />
              <span>Komentariyalar</span>
            </div>
            <div className="comments-container" onClick={toggleDrawer2('right', true)}>
              <FontAwesomeIcon className="icon" icon={faUser} />
              <span>Rektorga</span>
            </div>
          </div>
          <div className="user-container">
            <div className="user-card">
              <div className="user-image">
                <img src={userImage} alt="" />
              </div>
              <div className="full-name">
                <span>{user?.lastname} {user?.firstname}</span>
              </div>
              <div onClick={() => navigate("/setting")} className="setting">
                <FontAwesomeIcon icon={faUserGear} className="userSetting-icon" />
              </div>
            </div>
          </div>
        </div>

        <Rodal
          className="rodal"
          height={200}
          width={300}
          visible={modalvisible}
          onClose={() => setModalvisible(false)}
        >
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Category"
            className="category"
            type="text"
          />

          <button onClick={addCategory} className="rodal-button">
            Add
          </button>
        </Rodal>

        <Rodal visible={more} onClose={() => setMore(false)} width={750} height={400}>
          <div className="rodal-scroll mt-2">
            <span className="text1">{more}</span>
          </div>
        </Rodal>
      </div>
    </>

  );
};

export default AdminHeader;
