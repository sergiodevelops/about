import React from "react";
import ResponsiveAppBar from "../../ResponsiveAppBar/ResponsiveAppBar";
import {capitalize} from "@mui/material";
import useLangSelector from "../../../hooks/useLangSelector";
import {getFilePulicUrl} from "../../../utils/strings";
import {FILE_TYPES} from "../../../../../constants/fileTypes";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function About(props: {data: any}) {
    const {currentLang} = useLangSelector();


    return (
        <>
            <ResponsiveAppBar/>
            <div className="App-Section">
                <h1 className={"Section-title"}>
                    {capitalize(props.data[currentLang].About.label)}
                </h1>
                <Container>
                    <Row>
                        <Col  xs={12} lg={6}>
                            <div style={{background:"transparent"}}>
                                <img className={"App-logo-img"}
                                     src={
                                         getFilePulicUrl({
                                             subUrl: `images/`,
                                             fileName: `profile`,
                                             fileType: FILE_TYPES.PNG
                                         })
                                     }
                                     alt=""
                                />
                            </div>
                        </Col>
                        <Col xs={12} lg={6}>
                            <p className="App-Section-Paragraph">{props.data[currentLang].About.presentation}</p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default About;