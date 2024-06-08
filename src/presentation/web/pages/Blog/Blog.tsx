import React, {useEffect, useState} from "react";
import {capitalize} from "@mui/material";
import ResponsiveAppBar from "../../components/ResponsiveAppBar/ResponsiveAppBar";
import {useAppSelector} from "../../../../app/hooks";
import Building from "../../components/Building/Building";


function Blog(props: {data: any}) {
    const langSelector = useAppSelector(state => state.langSelector)
    const [currentLang, setCurrentLang] = useState(langSelector.value)


    useEffect(() => {
        setCurrentLang(langSelector.value)
    }, [langSelector.value]);


    return (
        <>
            <ResponsiveAppBar/>
            <div className="App-Section">
                <h1 className={"Section-title"}>
                    {capitalize(props.data[currentLang].Blog.label)}
                </h1>
            </div>
            <Building/>
        </>
    );
}

export default Blog;