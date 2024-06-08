import * as React from "react";
import Typography from "@mui/material/Typography";
import useLangSelector from "../../hooks/useLangSelector";
import {JsonData} from "../../../../data/data";


function Building() {
    const {currentLang} = useLangSelector();


    return (
        <Typography className={"Section-title Building"} component={"h1"}>
            {(JsonData as any)[currentLang].Building.label.toUpperCase()}
        </Typography>
    );
}

export default Building;
