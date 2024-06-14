import React, {useState} from "react";
import ResponsiveAppBar from "../../ResponsiveAppBar/ResponsiveAppBar";
import {capitalize} from "@mui/material";
import useLangSelector from "../../../hooks/useLangSelector";
import Building from "../../Building/Building";


function Login(props: {data: any}) {
    const {currentLang} = useLangSelector();
    const [user, setUser] = useState("")
    const [pass, setPass] = useState("")


    return (
        <>
            <ResponsiveAppBar/>
            <div className="App-Section">
                <h1 className={"Section-title"}>Este es un FORM</h1>
                <form>
                    <label htmlFor="fname">USER</label><br/>
                    <input onChange={(pass)=>setUser(pass.currentTarget.value)} type="text" id="userid" name="userid" value={user}/><br/>
                    <label htmlFor="lname">PASSWORD</label><br/>
                    <input onChange={(pass)=>setPass(pass.currentTarget.value)}  type="password" id="passwordid" name="passwordid" value={pass}/><br/><br/>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        </>
    );
}


export default Login;
