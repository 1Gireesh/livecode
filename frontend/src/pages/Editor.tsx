import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { initSocket } from '../socket';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { Socket } from 'socket.io-client';
import Edit from '../components/Edit';

type joined = { socketId: string, username: string, clients: Array<{ username: string, id: string }>, code: string }

export default function Editor() {


  let location = useLocation();
  let { username = "chupaRustam", id = "dsfajkfdsh" } = location.state;
  console.log(username, id);

  let socketRef = useRef<(Socket<DefaultEventsMap, DefaultEventsMap>) | null>(null);

  function readonly(userId: string, write: boolean) {
    let admin = clients.find((client) => client.username === username)
    socketRef.current?.emit("readonly", { roomId: id, adminId: admin?.id, userId })
  }

  let [readOnly, setRead] = useState(false);
  const [clients, setClient] = useState<Array<{ username: string, id: string }>>([]);
  const [code, setCode] = useState(`@`);


  useEffect(() => {

    (async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (e) => { alert(e); })
      socketRef.current.on("connect_failed", (e) => { alert(e); })
      socketRef.current.emit("join", { id, username });
      socketRef.current
        .on("joined", (({ socketId, username: uname, clients, code }: joined) => {
          setClient(clients);
          setCode(code);
          if (username !== uname) {
            alert(uname + " joined");
          }
        }))

      socketRef.current.on("disconnected", ({ uname }: { uname: string }) => {
        alert(uname + " disconnected");
        setClient((clients) => clients.filter((client) => client.username !== uname));
      })

      socketRef.current.on("dontwrite", (readOnly: boolean) => { setRead(readOnly) });




      socketRef.current.on("prevcode", (code) => setCode(code));
      socketRef.current.on("typed", (code) => setCode(code));

    })();
  }, []);

  useEffect(() => {
    if (code !== `@`) socketRef.current?.emit("type", { id, username, code });
  }, [code])


  return (
    <div>

      <div className="clients">
        {
          clients?.map((e, i) => <h2 key={i}>{e.username}</h2>)
        }
      </div>
      <Edit code={code} readonly={readOnly} setCode={setCode}></Edit>
      {code}
    </div>
  )
}