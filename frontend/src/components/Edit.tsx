


import { Controlled as CodeMirror } from 'react-codemirror2'
import "codemirror/mode/javascript/javascript";
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/theme/material.css';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';



export default function Edit({ code, setCode, readonly }:
    {
        readonly: boolean,
        code: string,
        setCode: React.Dispatch<React.SetStateAction<string>>
    }) {




    const options = {
        lineNumbers: true,
        matchBrackets: true,
        mode: 'javascript',
        theme: 'material',
        autoScroll: true,
        readOnly: readonly,
    };



    return (
        <CodeMirror
            className='CodeMirror'
            value={code}
            options={options}
            onBeforeChange={(editor, data, code) => { setCode(code) }}
        />
    )
}
