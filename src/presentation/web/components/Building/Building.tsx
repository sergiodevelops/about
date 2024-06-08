import * as React from "react";
import Typography from "@mui/material/Typography";
import {JsonData} from "../../data/data";
import useLangSelector from "../../hooks/useLangSelector";


function Building() {
    const {currentLang} = useLangSelector();


    return (
        <Typography className={"Section-title Building"} component={"h1"}>
            {(JsonData as any)[currentLang].Building.label.toUpperCase()}
        </Typography>
    );
}

export default Building;
