import React from "react";
import ResponsiveAppBar from "../../ResponsiveAppBar/ResponsiveAppBar";
import {capitalize} from "@mui/material";
import useLangSelector from "../../../hooks/useLangSelector";
import Building from "../../Building/Building";


function Home(props: {data: any}) {
    const {currentLang} = useLangSelector();


    return (
        <>
            <ResponsiveAppBar/>
            <Building/>
            <div className="App-Section">
                <h1 className={"Section-title"}>
                    {capitalize(props.data[currentLang].Home.label)}
                </h1>
            </div>
        </>
    );
}


export default Home;
