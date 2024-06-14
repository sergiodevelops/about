import React from "react";
import ResponsiveAppBar from "../../ResponsiveAppBar/ResponsiveAppBar";
import {capitalize} from "@mui/material";
import useLangSelector from "../../../hooks/useLangSelector";


function About(props: {data: any}) {
    const {currentLang} = useLangSelector();


    return (
        <>
            <ResponsiveAppBar/>
            <div className="App-Section">
                <h1 className={"Section-title"}>
                    {capitalize(props.data[currentLang].About.label)}
                </h1>
                <p className="App-Section-Paragraph">{props.data[currentLang].About.presentation}</p>
            </div>
        </>
    );
}

export default About;