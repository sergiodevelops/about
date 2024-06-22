import {ErrorInfo} from "react";
import Button from "@mui/material/Button";
import {Link, useNavigate} from "react-router-dom";
import {ACTIVE_PAGE} from "../../../../../constants/pages";
import useActivePage from "../../../hooks/useActivePage";


export interface ErrorComponentProps {
    hasError: boolean;
    error?: Error;
    errorInfo?: ErrorInfo;
}


export function ErrorComponent(props: ErrorComponentProps) {
    const {error, errorInfo} = props;
    const {updateActivePageOnStore} = useActivePage();
    const navigate = useNavigate();

    const handleOnClick = (): void => {
        updateActivePageOnStore(ACTIVE_PAGE.HOME);
        navigate(`about/${ACTIVE_PAGE.HOME.toLowerCase()}`);
    }


    return (
        <div>
            <h1>Something went wrong!</h1>
            <h2>📢 This is only one Fake Error 🤪</h2>
            <h3>⚛️ 🎉 {error?.message} 🤪</h3>
            <details open style={{whiteSpace: 'pre-wrap'}}>
                {error && error.toString()}
                <br/>
                {errorInfo && errorInfo.componentStack}
            </details>
            <Button
                className={"& .css-1rwt2y5-MuiButtonBase-root-MuiButton-root"}
                style={{color: "white", backgroundColor: "#525005"}}
                variant={"outlined"}
                onClick={handleOnClick}
            >
                <span style={{fontSize: "1.5rem"}}>🐝</span> Go to Home Page 👆
            </Button>
        </div>
    );
}