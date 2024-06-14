import {Component, ErrorInfo, ReactNode} from 'react';
import {ErrorComponent, ErrorComponentProps} from "./ErrorComponent/ErrorComponent";
import {SnackbarProvider} from "notistack";
import {PopUpWindow} from "../PopUpWindow/PopUpWindow";
import {MESSAGE_TYPE} from "../../../../constants/messageTypes";


interface ErrorBoundaryProps {
    children: ReactNode;
}


class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorComponentProps> {

    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
            error: undefined,
            errorInfo: undefined,
        };
    }


    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('ErrorBoundary caught an error: ', error, errorInfo);
        this.setState({hasError: true, error, errorInfo});
    }


    render() {
        const maxSnack = 3;
        const {children} = this.props;
        const {hasError} = this.state;


        return (
            hasError ?
                <>
                    <ErrorComponent {...this.state}/>
                    <SnackbarProvider {...{maxSnack}}>
                        <PopUpWindow
                            htmlContent={<ErrorComponent {...this.state}/>}
                            variant={MESSAGE_TYPE.error}
                        />
                    </SnackbarProvider>
                </>
                 : children
        );
    }
}


export default ErrorBoundary;
