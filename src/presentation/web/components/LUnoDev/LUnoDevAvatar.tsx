import IconButton from "@mui/material/IconButton";
import {Link} from "react-router-dom";
import * as React from "react";
import {getFilePulicUrl} from "../../utils/strings";
import {FILE_TYPES} from "../../../../constants/fileTypes";


function LUnoDevAvatar() {
    const {PUBLIC_URL} = process.env;
    const imageProfile: string = PUBLIC_URL + `/images/profile.png`;

    return (
        <div className={"App-LUnoDevAvatar"}>
            <IconButton className={"App-logo"}>
                <Link style={{display: "flex"}} to={`/about/about`}>
                    <img
                        className={"App-logo-img"}
                        src={
                            getFilePulicUrl({
                                subUrl: `images/`,
                                fileName: `profile`,
                                fileType: FILE_TYPES.PNG,
                            })
                        }
                        alt={"Avatar"}
                    />
                </Link>
            </IconButton>
        </div>
    );
}


export default LUnoDevAvatar;
