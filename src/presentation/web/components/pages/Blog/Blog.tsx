import React, {useEffect, useState} from "react";
import {capitalize} from "@mui/material";
import ResponsiveAppBar from "../../ResponsiveAppBar/ResponsiveAppBar";
import {useAppSelector} from "../../../../../redux/hooks";
import Building from "../../Building/Building";


function Blog(props: {data: any}) {
    const langSelector = useAppSelector(state => state.langSelector)
    const [currentLang, setCurrentLang] = useState(langSelector.value)


    useEffect(() => {
        throw new Error('This is a fake error for test the ErrorBoundary class with "componentDidCatch" method implemented')
        setCurrentLang(langSelector.value)
    }, [langSelector.value]);


    return (
        <>
            <ResponsiveAppBar/>
            <Building/>
            <div className="App-Section">
                <h1 className={"Section-title"}>
                    {capitalize(props.data[currentLang].Blog.label)}
                </h1>
            </div>
        </>
    );
}

export default Blog;