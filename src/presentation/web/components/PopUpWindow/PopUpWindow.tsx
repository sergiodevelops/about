import {ReactNode, useEffect} from "react";
import {MESSAGE_TYPE} from "../../../../constants/messageTypes";
import {useSnackbar} from "notistack";


type PopUpWindowProps = {
    htmlContent: ReactNode,
    variant?: MESSAGE_TYPE,
}


export function PopUpWindow(props: PopUpWindowProps) {
    const {htmlContent, variant} = props;
    const {enqueueSnackbar} = useSnackbar();


    useEffect(() => {
        enqueueSnackbar(htmlContent, {variant})
    }, []);


    return null;
}
