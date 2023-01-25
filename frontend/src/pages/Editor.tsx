import React, { useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { initSocket } from '../socket';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { Socket } from 'socket.io-client';

type joined = { socketId: string, username: string, clients: Array<{ username: string, id: string }> }

export default function Editor() {


  let location = useLocation();
  let { username = "chupaRustam", id = "dsfajkfdsh" } = location.state;
  console.log(username, id);

  let socketRef = useRef<(Socket<DefaultEventsMap, DefaultEventsMap>) | null>(null);

  // const codeRef = useRef();

  const [clients, setClient] = useState<Array<{ username: string, id: string }>>([]);



  useMemo(() => {

    (async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (e) => { alert(e); })
      socketRef.current.on("connect_failed", (e) => { alert(e); })
      socketRef.current.emit("join", { id, username });
      socketRef.current
        .on("joined", (({ socketId, username: uname, clients }: joined) => {
          setClient(clients);
          if (username !== uname) {
            alert(uname + " joined");
          }
        }))
    })();

  }, []);


  return (
    <div>

      <div className="clients">
        {
          clients?.map((e, i) => <h2 key={i}>{e.username}</h2>)
        }
      </div>

    </div>
  )
}