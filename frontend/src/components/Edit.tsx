import React, { useEffect, useRef, useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2'
import "codemirror/mode/javascript/javascript";
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/theme/material.css';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import { Type } from 'typescript';

export default function Edit() {
    
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
        matchingbracket: true,
    };

    let [val, setVal] = useState("");



    return (
        <CodeMirror
            className='CodeMirror'
            value={val}
            options={options}
            onBeforeChange={(editor, data, code) => { setVal(code) }}
        />
    )
}
