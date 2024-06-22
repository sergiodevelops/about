import React from "react";
import ResponsiveAppBar from "../../ResponsiveAppBar/ResponsiveAppBar";
import {capitalize} from "@mui/material";
import useLangSelector from "../../../hooks/useLangSelector";
import {getFilePulicUrl} from "../../../utils/strings";
import {FILE_TYPES} from "../../../../../constants/fileTypes";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Building from "../../Building/Building";


function About(props: {data: any}) {
    const {currentLang} = useLangSelector();


    return (
        <>
            <ResponsiveAppBar/>
            <Building/>
            <div className="App-Section">
                <h1 className={"Section-title"}>
                    {capitalize(props.data[currentLang].About.label)}
                </h1>
                <Container>
                    <Row>
                        <Col xs={{span: 12, offset: 0}} lg={{span: 5, offset: 0}}>
                            <Col xs={{span: 6, offset: 3}} lg={{span: 12, offset: 0}}>
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
                            </Col>
                        </Col>
                        <Col xs={{span: 12, offset: 0}} lg={{span: 7, offset: 0}}>
                            <p className="App-Section-Paragraph">{props.data[currentLang].About.presentation}</p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default About;