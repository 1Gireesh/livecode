import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { initSocket } from '../socket';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { Socket } from 'socket.io-client';
import Edit from '../components/Edit';
import "../style/editor.css"
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';


type joined = { socketId: string, username: string, clients: Array<{ username: string, id: string, admin: string }>, code: string }

export default function Editor() {
  let [h, seth] = useState("5vh");
  const [theme, settheme]=useState("material")
  const [res, setres] = useState<{res:string,fl:boolean}>()


  let location = useLocation();
  let { username = "chupaRustam", id = "dsfajkfdsh" } = location.state;

  let socketRef = useRef<(Socket<DefaultEventsMap, DefaultEventsMap>) | null>(null);

  function readonly(userId: string, write: boolean) {
    let admin = clients.find((client) => client.username === username)
    socketRef.current?.emit("readonly", {
      roomId: id, adminId: admin?.id,
      userId, readonly: write
    })
  }

  let [readOnly, setRead] = useState(false);
  const [clients, setClient] = useState<Array<{ username: string, id: string, admin: string }>>([]);
  const [code, setCode] = useState(`@`);

  console.log(clients)

  useEffect(() => {

    (async () => {
      socketRef.current = await initSocket();
      // socketRef.current.on("connect_failed", (e) => { alert(e); })
      socketRef.current.emit("join", { id, username });
      socketRef.current
        .on("joined", (({ socketId, username: uname, clients, code }: joined) => {
          setClient(clients);
          setCode(code);
          if (username !== uname) {
            toast((uname + " joined"),{
              icon:"😉"
            });
          }
        }))

      socketRef.current.on("disconnected", ({ uname }: { uname: string }) => {
        toast((uname + " disconnected"),{
          icon:"☹️"
        });
        setClient((clients) => clients.filter((client) => client.username !== uname));
      })

      socketRef.current.on("dontwrite", (readOnly: boolean) => { setRead(readOnly) });




      socketRef.current.on("prevcode", (code) => setCode(code));
      socketRef.current.on("typed", (code) => setCode(code));

    })();
  }, []);

  function copyidbtn() {
    navigator.clipboard.writeText(id);
  }

  useEffect(() => {
    if (code !== `@`) socketRef.current?.emit("type", { id, username, code });
  }, [code])

  function getresult() {
    seth("200px")
    axios.post("http://localhost:8080/run",{code})
    .then((e)=>setres(e.data))
    .catch((e)=>setres({res:"Server is too busy",fl:false}))
  }


  return (
    <div className="editorPage">
      <Toaster position="top-right"/>
      <div className="avatarPage">
        <div id="editorlogo">
          <h1>LIVECODE</h1>
        </div>



        <div className="editorUsers">


          {
            clients?.map((e, i) => (
              <div className="user" key={i}>
                {/* https://i.ibb.co/7Cw1f4y/icons8-pencil-60.png */}
                <img alt="a" src="https://i.ibb.co/M2Gd2pD/icons8-cat-profile-100.png" />
                <div>
                  <p>{e.username}</p>
                  <div>
                    <p>{e.admin === e.username ? "Admin" : "User"}</p>
                    <img alt="a" src="https://i.ibb.co/qN9CXWn/icons8-no-edit-60.png"
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
          <div>
            <label htmlFor="language">Language</label>
            <select name="language" id="language">
              <option value="">Javascript</option>
            </select>
          </div>
          <div>
            <label htmlFor="theme">Theme</label>
            <select name="" id="theme" onChange={(e)=>settheme(e.target.value)}>
              <option value="material">Material</option>
              <option value="dracula">Dracula</option>
            </select>
          </div>
          <button className="button-87" onClick={() => getresult()} >Run</button>
        </div>
        <div>
          {<Edit readonly={readOnly} code={code} setCode={setCode} theme={theme}/>}
        </div>
        <div className="resultbox"
          style={{ height: h }}
        >
          <div className="resulttab">
            <p>Result</p>
            <p style={{ cursor: "pointer" }} onClick={() => seth("30px")}>X</p>
          </div>
          <p className="result" style={{color:res?.fl?"rgb(0, 250, 0)":"rgb(255, 77, 77)"}}>{res?.res}</p>
        </div>
      </div>
    </div>
  )
}