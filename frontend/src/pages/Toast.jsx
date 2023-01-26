import React, {useEffect} from "react"
import "../style/toast.css"



export default function Toast({type, msg}) {
    useEffect(()=>{
        let ele=document.querySelector(".toast")
        setTimeout(()=>{
            ele.style.display="none"
            console.log(ele)
        },2000)
    },[])

    function crossapp() {
        let ele=document.querySelector(".toast")
        ele.style.display="none"
    }


    return (
        <div className={`toast ${type=="success"?"success":""} ${type=="failure"?"failure":""}`}>
            <img src={type=="success"?"https://i.ibb.co/xfVRn5h/icons8-ok-50.png":"https://i.ibb.co/nscjnMP/icons8-error-100.png"}/>
            <p>{msg}</p>
            <p className="cross" onClick={()=>crossapp()}>X</p>
        </div>
    )
}