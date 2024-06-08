import React from 'react'
import {LANG_CODE, LANGUAGES} from "../../constants/languages";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import useLangSelector from "../../hooks/useLangSelector";


function LangSelectorAvatar() {
    const {currentLang, updateCurrentLang} = useLangSelector();
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);


    const handleOnChangeLanguage = (
        value: LANG_CODE,
    ): void => {
        updateCurrentLang(value);
        handleCloseUserMenu();
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };


    return (
        <>
            <IconButton component={"div"} className={"App-logo"} onClick={handleOpenUserMenu} sx={{fontSize: "0rem"}}>
                <img
                    style={{background: "black", borderRadius: "50%"}}
                    color={"red"}
                    src={`./${currentLang}.png`}
                    className={"App-logo-img App-language"}
                    alt={"bandera que representa el idioma"}
                />
                <Typography
                    fontWeight={"500"}
                    fontSize={"2rem"}
                    color={"rgba(255,255,255,0.71)"}
                    sx={{position: "absolute", left: "0", right: "0"}}>
                    {currentLang.toUpperCase()}
                </Typography>
            </IconButton>
            {/*<Autocomplete
                title={`Select one language`}
                disableClearable
                getOptionLabel={option => `${option.code.toUpperCase()} - ${capitalize(option.name)}`}
                value={language}
                options={LANGUAGES}
                renderOption={handleRenderOption}
                renderInput={handleRenderInputLanguage}
                onChange={handleOnChangeLanguage}
            />*/}
            <Menu
                onClose={handleCloseUserMenu}
                sx={{mt: '45px'}}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
            >
                {LANGUAGES.map(language => (
                    <MenuItem
                        onClick={() => handleOnChangeLanguage(language.code)}
                        key={language.code}
                    >
                        <img
                            src={`./${language.code}.png`}
                            className={"App-logo App-logo-menu-language"}
                            alt={"bandera que representa el idioma"}
                        />
                        <Typography sx={{marginLeft: ".7rem"}}>
                            {language.name}
                        </Typography>
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}


export default LangSelectorAvatar;
