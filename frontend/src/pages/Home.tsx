import React, { useState } from 'react'
import "../style/home.css"
import { useNavigate } from 'react-router-dom';
import { idText } from 'typescript';

export default function Home() {

  const navigate = useNavigate();

  const [data, setData] = useState({ username: "", id: "" })

  const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => setData({ ...data, [e.target.name]: e.target.value });

  return (
    <div className="home">
      <div className="form">
        <div className="form_heading">
          <h1>LiveCode</h1>
        </div>
        <div className="form_body">
          <input type="text" onChange={handlechange} name='id' placeholder='ROOM ID' />
          <input type="text" onChange={handlechange} name='username' placeholder='USERNAME' />
          <button className="btn btn-5"
            onClick={() => (data.id.length > 5) && navigate("/editor/" + data.id, { state: data })}
          >Let's code</button>
          <p>Create new invite ID?</p>
        </div>
      </div>
    </div>
  )
}


