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

    function handleOnClick() {
        updateActivePageOnStore(ACTIVE_PAGE.HOME);
        navigate(`about/${ACTIVE_PAGE.HOME.toLowerCase()}`);
    }


    return (
        <div>
            <h2>Something went wrong!</h2>
            <details open={true} style={{whiteSpace: 'pre-wrap'}}>
                {error && error.toString()}
                <br/>
                {errorInfo && errorInfo.componentStack}
            </details>
            <Button
                color={"success"}
                variant={"outlined"}
                onClick={handleOnClick}>
                Go to Home Page
            </Button>
        </div>
    );
}