import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import LangSelectorAvatar from "../LangSelectorAvatar/LangSelectorAvatar";
import {Grid} from '@mui/material';
import LUnoDevAvatar from "../LUnoDev/LUnoDevAvatar";
import LogoNickname from "../LogoNickname/LogoNickname";
import NavBarXS from "../NavBarXS/NavBarXS";
import NavBar from "../NavBar/NavBar";


function ResponsiveAppBar() {
    return (
        <>
            <AppBar className={"App-Bar"} position={"static"} color={"warning"}>
                <Toolbar>
                    <Grid container>
                        <Grid className={"Logo-nickname Center-Content"} item xs={2} sm={3}
                              sx={{display: {xs: 'none', sm: 'flex'}}}>
                            <LogoNickname/>
                        </Grid>
                        <Grid className={"Menu-pages-xs"} item xs={2} sx={{display: {xs: 'flex', sm: 'none'}}}>
                            <NavBarXS/>
                        </Grid>
                        <Grid className={"Logo-nickname-xs Logo-nickname"} item xs={6}
                              sx={{display: {xs: 'flex', sm: 'none'}}}>
                            <LogoNickname/>
                        </Grid>
                        <Grid className={"Menu-pages"} item xs={0} sm={6} sx={{display: {xs: 'none', sm: 'flex'}}}>
                            <NavBar/>
                        </Grid>
                        <Grid className={"Avatars-group"} item xs={4} sm={3}>
                            <LUnoDevAvatar/>
                            <LangSelectorAvatar/>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </>
    );
}


export default ResponsiveAppBar;
