import { useEffect } from "react"



const arr = ["let", "var", "break", "function", "class", "const"]
const arr2 = ["for", "log", "break", "while", "if", "else"]
const arr3 = ["true", "false", "null", "undefined"]


export default function Edit({ code, setCode }:
    {
        readonly: boolean,
        code: string,
        setCode: React.Dispatch<React.SetStateAction<string>>,
        theme: string
    }) {



    return (
        <div className='code'>
            <textarea name="" id="" cols={30} rows={30}
                value={code || ""}
                onChange={(e) => {
                    setCode(e.target.value)
                }}

            ></textarea>

            <div>
                {
                    code
                }
            </div>



        </div>
    )
}
