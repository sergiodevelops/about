"use client";
import React, {useEffect} from 'react';
import './App.scss';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {Navigate, Route, Routes, useNavigate} from "react-router-dom"
import {JsonData} from '../../data/data'
import useActivePage from "./hooks/useActivePage";
import {ACTIVE_PAGE} from "../../constants/pages";
import Blog from './components/pages/Blog/Blog';
import Contact from "./components/pages/Contact/Contact";
import About from "./components/pages/About/About";
import Home from "./components/pages/Home/Home";

import cleanCodeAndSOLID from "../../concepts/cleanCodeAndSOLID";
import functionalProgramming from "../../concepts/functionalProgramming";
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
// import javascriptSorprises from "./concepts/javascriptSorprises";
// import Persona from "./concepts/OOP";
// import DependencyInyection from "./concepts/dependencyInyection";


function App() {
    const {updateActivePageOnStore} = useActivePage();
    const navigate = useNavigate();


    useEffect(() => {
        updateActivePageOnStore(ACTIVE_PAGE.HOME);
        navigate(`about/${ACTIVE_PAGE.HOME.toLowerCase()}`);


        // throw new Error('ERROR BOUNDARY: ');

        // About "Clean Code" and "SOLID" principles
        cleanCodeAndSOLID();

        // About "Dependency Inyection" design pattern
        // const dependencyInyection1 = new DependencyInyection();

        // About "OOP" paradigm
        // const persona1 = new Persona();

        // About "Functional Programming" paradigm
        // functionalProgramming();

        // About "TypeScript / JavaScript" (language sorprises)
        // javascriptSorprises();
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
