import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";
import * as React from "react";


function LogoNickname() {
    return (
        <Link
            className={"LogoNickname"}
            to={"/about/about"}
        >
            <Typography
                component={"div"}
                variant={"h6"}
            >
                {`LUNO⚛Dev`}
            </Typography>
        </Link>
    );
}


export default LogoNickname;