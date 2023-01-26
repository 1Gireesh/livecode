import React, { useEffect, useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2'
import "codemirror/mode/javascript/javascript";
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/theme/material.css';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';

const options = {
    lineNumbers: true,
    matchBrackets: true,
    mode: 'javascript',
    theme: 'material',
    autoScroll: true,
    autoCursor: true,
    indentUnit: 4,
    smartIndent: true,
    // readOnly: true
    matchingbracket: true
};
export default function Edit() {


    let [val, setVal] = useState("");

    useEffect(() => {

        (async () => {


        })();


    }, [])



    return (
        <CodeMirror
            className='edit'
            value={val}
            options={options}
            onBeforeChange={(editor, data, code) => { setVal(code) }}
        />
    )
}
