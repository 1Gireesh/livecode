
export default function Edit({ code, setCode, readonly = false }:
    {
        readonly: boolean,
        code: string,
        setCode: React.Dispatch<React.SetStateAction<string>>,
        theme: string
    }) {



    return (
        <div className='code'>
            <textarea name="" id="" cols={30} rows={30}
                readOnly={readonly}
                value={code === null ? "" : code}
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
