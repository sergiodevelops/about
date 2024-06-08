import React, {useEffect} from 'react';
import './App.scss';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {Navigate, Route, Routes, useNavigate} from "react-router-dom"
import {JsonData} from './data/data'
import useActivePage from "./presentation/web/hooks/useActivePage";
import {ACTIVE_PAGE} from "./constants/pages";
import functionalProgramming from "./concepts/functionalProgramming";
import javascriptSorprises from "./concepts/javascriptSorprises";
import Blog from './presentation/web/pages/Blog/Blog';
import Contact from "./presentation/web/pages/Contact/Contact";
import About from "./presentation/web/pages/About/About";
import Home from "./presentation/web/pages/Home/Home";


function App() {
    const {updateActivePageOnStore} = useActivePage();
    const navigate = useNavigate();


    useEffect(() => {
        updateActivePageOnStore(ACTIVE_PAGE.HOME)
        navigate(`/about/${ACTIVE_PAGE.HOME.toLowerCase()}`)
    }, []);

    useEffect(() => {
        // CONCEPTS about Functional Programming
        functionalProgramming();
        // CONCEPTS about Javascript Sorprises
        javascriptSorprises();
    }, []);


    return (
        <div className="App">
            <Routes>
                <Route path={"about/blog"} element={<Blog data={JsonData}/>}/>
                <Route path={"about/contact"} element={<Contact data={JsonData}/>}/>
                <Route path={"about/home"} element={<Home data={JsonData}/>}/>
                <Route path={"about/about"} element={<About data={JsonData}/>}/>
                <Route path={"about"} element={<Home data={JsonData}/>}/>
                <Route
                    path={"about/*"}
                    element={<Navigate to={"/about"} replace/>}
                />
            </Routes>
        </div>
    );
}

export default App;
