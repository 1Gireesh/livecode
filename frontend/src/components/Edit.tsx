


import { Controlled as CodeMirror } from 'react-codemirror2'
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/python/python";
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/theme/material.css';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';

let id:ReturnType<typeof setTimeout>;

// function debounce(func:Function, delay:number) {
//     clearTimeout(id)
//     id=setTimeout(()=>{
//         func()
//     },delay)
// }




export default function Edit({ code, setCode, readonly,theme }:
    {
        readonly: boolean,
        code: string,
        setCode: React.Dispatch<React.SetStateAction<string>>,
        theme:string
    }) {




    const options = {
        lineNumbers: true,
        matchBrackets: true,
        mode: 'javascript',
        theme: theme,
        autoScroll: true,
        readOnly: readonly,
    };



    return (
        <CodeMirror
            className='CodeMirror'
            value={code}
            options={options}
            onBeforeChange={(editor, data, code) => {id=setTimeout(() => {
                setCode(code)
            }, 100);}}
        />
    )
}
