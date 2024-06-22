import * as React from "react";
import Typography from "@mui/material/Typography";
import useLangSelector from "../../hooks/useLangSelector";
import {JsonData} from "../../../../constants/data";


function Building() {
    const {currentLang} = useLangSelector();


    return (
        <h3>
            <strong className={"Building"}>
                {(JsonData as any)[currentLang].Building.label.toUpperCase()}
            </strong>
        </h3>
    );
}

export default Building;
