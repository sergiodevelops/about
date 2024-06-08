import {useState, MouseEvent} from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import {ACTIVE_PAGE, PAGES} from "../../constants/pages";
import {NavLink} from "react-router-dom";
import {JsonData} from "../../data/data";
import useLangSelector from "../../hooks/useLangSelector";
import { Button } from "@mui/material";
import useActivePage from "../../hooks/useActivePage";
import {getClassNameItemMenu} from "../../utils/StylesUtils";


function NavBarXS() {
    const {currentLang} = useLangSelector();
    const {currentActivePage, updateActivePageOnStore} = useActivePage();

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);


    const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleClickNavMenu = (page: ACTIVE_PAGE) => {
        updateActivePageOnStore(page);
        handleCloseNavMenu();
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };


    return (
        <>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
            >
                <MenuIcon/>
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                    display: {xs: "block", md: "none"},
                }}
            >
                {PAGES.map((page: ACTIVE_PAGE, index: number) => {
                    return (
                        <NavLink
                            className={({isActive, isPending}) => getClassNameItemMenu({isActive, isPending, page, currentActivePage})}
                            key={`${index}-${page}`}
                            to={`/about/${page.toLowerCase()}`}
                            onClick={() => handleClickNavMenu(page)}
                        >
                            <Button
                                key={page}
                                sx={{height: "100%", color: "inherit"}}
                            >
                                {(JsonData as any)[currentLang][page].label.toUpperCase()}
                            </Button>
                        </NavLink>
                    );
                })}
            </Menu>
        </>
    );
}


export default NavBarXS;
