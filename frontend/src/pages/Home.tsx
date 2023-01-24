import React from 'react'
import "../style/home.css"

export default function Home() {


  return (
    <div className="home">
      <div className="form">
        <div className="form_heading">
          <h1>LiveCode</h1>
        </div>
        <div className="form_body">
          <input type="text" placeholder='ROOM ID'/>
          <input type="text" placeholder='USERNAME'/>
          <button className="btn btn-5">Let's code</button>
          <p>Create new invite ID?</p>
        </div>
      </div>
    </div>
  )
}


