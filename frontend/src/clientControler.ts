import { toast } from "react-hot-toast";
import { clientType, joined, socketType } from "./pages/Editor";
import { initSocket } from "./socket";

export const controler = async (
  socketRef: React.MutableRefObject<socketType>,
  id: string,
  username: string,
  setClient: React.Dispatch<React.SetStateAction<clientType>>,
  clients: clientType,
  setCode: React.Dispatch<React.SetStateAction<string>>,
  setRead: React.Dispatch<React.SetStateAction<boolean>>
) => {
  socketRef.current = await initSocket();
  // socketRef.current.on("connect_failed", (e) => { alert(e); })
  socketRef.current.emit("join", { id, username });
  socketRef.current.on(
    "joined",
    ({ socketId, username: uname, clients, code }: joined) => {
      setClient(clients);
      setCode(code);
      if (username !== uname) {
        toast(uname + " joined", {
          icon: "😉",
        });
      }
    }
  );

  socketRef.current.on("disconnected", ({ uname }: { uname: string }) => {
    toast(uname + " disconnected", {
      icon: "☹️",
    });
    setClient((clients) =>
      clients.filter((client) => client.username !== uname)
    );
  });

  socketRef.current.on("nowrite", (readOnly, uname) => {
    // console.log(uname,readOnly)
    if (readOnly && uname === username) setRead(readOnly);
    else toast("only admin can change read and write access");
  });

  socketRef.current.on("prevcode", (code) => setCode(code));
  let uname = username;
  socketRef.current.on("typed", ({ code, username }) => {
    if (username === uname) return;
    setCode(code);
  });
};
