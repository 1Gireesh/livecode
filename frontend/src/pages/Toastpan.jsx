import Toast from "./Toast";
import React,{useState} from "react";
import "../style/toastpan.css"




export default function Toastpan() {
    const [data, setdata] = useState([]);

    
    function adddata() {
        setdata([...data,{
            lebel:"c++",
            time:`${new Date().getHours()}${new Date().getMinutes()<10?"0"+new Date().getMinutes():new Date().getMinutes()}${new Date().getSeconds()<10?"0"+new Date().getSeconds():new Date().getSeconds()}`,
            tag:"success"
        }])
        
        // setTimeout(()=>{
        //     let dt=data
        //     dt.shift()
        //     setdata([dt])
        // },2000)
    }
    // console.log(Number(`${new Date().getHours()}${new Date().getMinutes()<10?"0"+new Date().getMinutes():new Date().getMinutes()}${new Date().getSeconds()<10?"0"+new Date().getSeconds():new Date().getSeconds()}`)-3)
    function deletedt() {
        let dt=data
        dt.shift()
        setdata([dt])
    }

    

    return (
        <div>
            <button onClick={()=>adddata()}>add</button>
            <div className="toastpan">
                {
                    data?.map((el,i)=>(
                        Number(`${new Date().getHours()}${new Date().getMinutes()<10?"0"+new Date().getMinutes():new Date().getMinutes()}${new Date().getSeconds()<10?"0"+new Date().getSeconds():new Date().getSeconds()}`)-3<=el.time?
                        <Toast key={i} type={el.tag} msg={el.lebel}/>
                        :null
                    ))
                }
            </div>
        </div>
    )
}