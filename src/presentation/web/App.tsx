"use client";
import React, {useEffect} from 'react';
import './App.scss';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {Navigate, Route, Routes, useNavigate} from "react-router-dom"
import {JsonData} from '../../constants/data'
import useActivePage from "./hooks/useActivePage";
import {ACTIVE_PAGE} from "../../constants/pages";
import Blog from './components/pages/Blog/Blog';
import Contact from "./components/pages/Contact/Contact";
import About from "./components/pages/About/About";
import Home from "./components/pages/Home/Home";
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import ProgrammingConcepts from "../../concepts";
import './App.scss'


function App() {
    const {updateActivePageOnStore} = useActivePage();
    const navigate = useNavigate();


    useEffect(() => {
        updateActivePageOnStore(ACTIVE_PAGE.HOME);
        navigate(`about/${ACTIVE_PAGE.HOME.toLowerCase()}`);

        // concepts && principles && practices in TypeScript
        ProgrammingConcepts();
    }, []);


    return (
        <div className="App">
            <Routes>
                <Route
                    path={"about/blog"}
                    element={<ErrorBoundary children={<Blog data={JsonData}/>}/>}
                />

                <Route
                    path={"about/contact"}
                    element={<ErrorBoundary children={<Contact data={JsonData}/>}/>}
                />

                <Route
                    path={"about/home"}
                    element={<ErrorBoundary children={<Home data={JsonData}/>}/>}
                />

                <Route
                    path={"about/about"}
                    element={<ErrorBoundary children={<About data={JsonData}/>}/>}
                />

                <Route
                    path={"about"}
                    element={<ErrorBoundary children={<Home data={JsonData}/>}/>}
                />

                <Route
                    path={"about/*"}
                    element={<Navigate to={"/about"} replace/>}
                />
            </Routes>
        </div>
    );
}

export default App;
