import React from "react";
import {capitalize} from "@mui/material";
import ResponsiveAppBar from "../../ResponsiveAppBar/ResponsiveAppBar";
import useLangSelector from "../../../hooks/useLangSelector";
import Building from "../../Building/Building";


function Contact(props: {data: any}) {
    const {currentLang} = useLangSelector();


    return (
        <>
            <ResponsiveAppBar/>
            <Building/>
            <div className="App-Section">
                <h1 className={"Section-title"}>
                    {capitalize(props.data[currentLang].Contact.label)}
                </h1>
                <h2 className={"Section-subtitle"}>
                    {capitalize(props.data[currentLang].Contact.Info.label)}
                </h2>
                <p>
                <span>
                  <i className='fa fa-map-marker'></i>
                    {props.data ? `${capitalize(props.data[currentLang].Contact.address.label)}` : 'loading'}
                </span>
                    {props.data ? `: ${capitalize(props.data[currentLang].Contact.address.value)}` : 'loading'}
                </p>
            </div>
        </>
    );
}

export default Contact;