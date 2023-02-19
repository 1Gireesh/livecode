import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { Socket } from 'socket.io-client';
import Edit from '../components/Edit';
import "../style/editor.css"
import { Toaster } from 'react-hot-toast';
import axios, { AxiosResponse } from 'axios';
import { controler } from '../clientControler';

export type socketType = (Socket<DefaultEventsMap, DefaultEventsMap>) | null;
export type joined = { socketId: string, username: string, clients: Array<{ username: string, id: string, admin: string }>, code: string }
export type clientType = Array<{ username: string, id: string, admin: string }>

export default function Editor() {

  let [h, seth] = useState("5vh");
  const [theme, settheme] = useState("material")
  const [res, setres] = useState<{ res: [string], fl: boolean }>()
  let location = useLocation();
  let { username = "chupaRustam", id = "dsfajkfdsh" } = location.state;
  let socketRef = useRef<socketType>(null);
  let [readOnly, setRead] = useState(false);
  const [clients, setClient] = useState<clientType>([]);
  const [code, setCode] = useState(`@`);

  function readonly(userId: string, write: boolean) {
    let admin = clients.find((client) => client.username === username)
    console.log(admin)
    socketRef.current?.emit("readonly", { ...admin, room: id })
  }



  useEffect(() => {
    controler(socketRef, id, username, setClient, clients, setCode, setRead);
  }, []);


  function copyidbtn() {
    navigator.clipboard.writeText(id);
  }

  useEffect(() => {
    if (code !== `@`) socketRef.current?.emit("type", { id, username, code });
  }, [code])

  function getresult() {
    seth("200px")
    axios.post("http://localhost:8080/run", { code })
      .then((e: AxiosResponse) => setres({ res: (e.data.res.split("\n")), fl: e.data.fl }))
      .catch(() => setres({ res: ["Server is too busy"], fl: false }))
  }

  return (
    <div className="editorPage">
      <Toaster position="top-right" />
      <div className="avatarPage">
        <div id="editorlogo">
          <h1>LIVECODE</h1>
        </div>



        <div className="editorUsers">


          {
            clients?.map((e, i) => (
              <div className="user" key={i}>
                <img alt="a" src="https://i.ibb.co/M2Gd2pD/icons8-cat-profile-100.png" />
                <div>
                  <p>{e.username}</p>
                  <div>
                    <p>{e.admin === e.username ? "Admin" : "User"}</p>
                    <img alt="a" src={readOnly ? "https://i.ibb.co/qN9CXWn/icons8-no-edit-60.png" :
                      "https://i.ibb.co/7Cw1f4y/icons8-pencil-60.png"
                    }
                      onClick={() => readonly(e.id, true)}
                    />
                  </div>
                </div>
              </div>
            ))
          }



        </div>
        <div className="editorfooter">
          <button className="button-89" onClick={() => copyidbtn()}>Copy ID</button>
          <button className="leavebtn">Leave</button>
        </div>
      </div>
      <div className="editorbody">
        <div className="editorbody_top">
          <p>Room Id: {id}</p>
          <p>username: {username}</p>
          <div>
            <label htmlFor="language">Language</label>
            <select name="language" id="language">
              <option value="">Javascript</option>
            </select>
          </div>
          <div>
            <label htmlFor="theme">Theme</label>
            <select name="" id="theme" onChange={(e) => settheme(e.target.value)}>
              <option value="material">Material</option>
              <option value="dracula">Dracula</option>
            </select>
          </div>
          <button className="button-87" onClick={() => getresult()} >Run</button>
        </div>
        <div>
          {<Edit readonly={readOnly} code={code} setCode={setCode} theme={theme} />}
        </div>
        <div className="resultbox"
          style={{ height: h }}
        >
          <div className="resulttab">
            <p>Result</p>
            <p style={{ cursor: "pointer" }} onClick={() => seth("30px")}>X</p>
          </div>
          <div className="result">
            <p style={{ color: "white" }}>{">_Console/~"}</p>
            {
              res?.res.map((el, i) => (
                <p style={{ color: res?.fl ? "rgb(0, 250, 0)" : "rgb(255, 77, 77)" }} key={i}>{i + 1}. {el}</p>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}