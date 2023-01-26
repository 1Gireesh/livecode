import Edit from "../components/Edit"
import "../style/editor.css"


export default function Try() {



    function openresult() {
        let res=document.querySelector(".resultbox")
        
    }


    return (
        <div className="editorPage">
            <div className="avatarPage">
                <div id="editorlogo">
                    <h1>LIVECODE</h1>
                </div>
                <div className="editorUsers">
                    <div className="user">
                        <img src="https://i.ibb.co/M2Gd2pD/icons8-cat-profile-100.png" />
                        <div>
                            <p>Gireesh</p>
                            <div>
                                <p>Admin</p>
                                <img src="https://i.ibb.co/7Cw1f4y/icons8-pencil-60.png" />
                            </div>
                        </div>
                    </div>
                    <div className="user">
                        <img src="https://i.ibb.co/M2Gd2pD/icons8-cat-profile-100.png" />
                        <div>
                            <p>Gireesh</p>
                            <div>
                                <p>User</p>
                                <img src="https://i.ibb.co/qN9CXWn/icons8-no-edit-60.png" />
                            </div>
                        </div>
                    </div>
                    <div className="user">
                        <img src="https://i.ibb.co/M2Gd2pD/icons8-cat-profile-100.png" />
                        <div>
                            <p>Gireesh</p>
                            <div>
                                <p>User</p>
                                <img src="https://i.ibb.co/qN9CXWn/icons8-no-edit-60.png" />
                            </div>
                        </div>
                    </div>
                    <div className="user">
                        <img src="https://i.ibb.co/M2Gd2pD/icons8-cat-profile-100.png" />
                        <div>
                            <p>Gireesh</p>
                            <div>
                                <p>User</p>
                                <img src="https://i.ibb.co/qN9CXWn/icons8-no-edit-60.png" />
                            </div>
                        </div>
                    </div>
                    <div className="user">
                        <img src="https://i.ibb.co/M2Gd2pD/icons8-cat-profile-100.png" />
                        <div>
                            <p>Gireesh</p>
                            <div>
                                <p>User</p>
                                <img src="https://i.ibb.co/qN9CXWn/icons8-no-edit-60.png" />
                            </div>
                        </div>
                    </div>
                    <div className="user">
                        <img src="https://i.ibb.co/M2Gd2pD/icons8-cat-profile-100.png" />
                        <div>
                            <p>Gireesh</p>
                            <div>
                                <p>User</p>
                                <img src="https://i.ibb.co/qN9CXWn/icons8-no-edit-60.png" />
                            </div>
                        </div>
                    </div>
                    <div className="user">
                        <img src="https://i.ibb.co/M2Gd2pD/icons8-cat-profile-100.png" />
                        <div>
                            <p>Gireesh</p>
                            <div>
                                <p>User</p>
                                <img src="https://i.ibb.co/qN9CXWn/icons8-no-edit-60.png" />
                            </div>
                        </div>
                    </div>
                    <div className="user">
                        <img src="https://i.ibb.co/M2Gd2pD/icons8-cat-profile-100.png" />
                        <div>
                            <p>Gireesh</p>
                            <div>
                                <p>User</p>
                                <img src="https://i.ibb.co/qN9CXWn/icons8-no-edit-60.png" />
                            </div>
                        </div>
                    </div>
                    <div className="user">
                        <img src="https://i.ibb.co/M2Gd2pD/icons8-cat-profile-100.png" />
                        <div>
                            <p>Gireesh</p>
                            <div>
                                <p>User</p>
                                <img src="https://i.ibb.co/qN9CXWn/icons8-no-edit-60.png" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="editorfooter">
                    <button className="button-89">Copy ID</button>
                    <button className="leavebtn">Leave</button>
                </div>
            </div>
            <div className="editorbody">
                <div className="editorbody_top">
                    <p>Room Id: BABU_BHAIYA</p>
                    <div>
                        <label htmlFor="language">Language</label>
                        <select name="language" id="language">
                            <option value="">Javascript</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="theme">Theme</label>
                        <select name="" id="theme">
                            <option value="material">Material</option>
                            <option value="drakula">Drakula</option>
                        </select>
                    </div>
                    <button className="button-87">Run</button>
                </div>
                <div>
                    <Edit/>
                </div>
                <div className="resultbox">
                    <div className="resulttab">
                        <p>Result</p>
                        <p>X</p>
                    </div>
                    <p className="result"></p>
                </div>
            </div>
        </div>
    )
}