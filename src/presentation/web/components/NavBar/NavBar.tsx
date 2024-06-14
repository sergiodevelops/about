import Button from "@mui/material/Button";
import {Link, NavLink} from "react-router-dom";
import * as React from "react";
import useLangSelector from "../../hooks/useLangSelector";
import useActivePage from "../../hooks/useActivePage";
import {ACTIVE_PAGE, ACTIVE_PAGES} from "../../../../constants/pages";
import {JsonData} from "../../../../data/data";


function NavBar() {
    const {currentLang} = useLangSelector();
    const {updateActivePageOnStore, currentActivePage} = useActivePage();


    return (
        <>
            {ACTIVE_PAGES.map((page: ACTIVE_PAGE, index: number) => {
                return (
                    <NavLink
                        className={({ isActive, isPending }) => isPending ? "pending" : page === currentActivePage ? "active" : isActive ? "active" : ""}
                        key={`${index}-${page}`}
                        onClick={() => updateActivePageOnStore(page)}
                        to={`/about/${page.toLowerCase()}`}
                    >
                        <Button
                            key={page}
                            sx={{height: "100%", color: "inherit"}}
                        >
                            {(JsonData as any)[currentLang][page].label}
                        </Button>
                    </NavLink>
                );
            })}
        </>
    );
}


export default NavBar;
