import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {NavButton} from "@/common/styles/NavButton.ts";
import Switch from '@mui/material/Switch'
import {useAppSelector} from "../../hooks/useAppSelector.ts";
import {selectThemeMode} from '@/app/app-selectors.ts';
import {useAppDispatch} from "../../hooks/useAppDispatch.ts";
import {getTheme} from "../../theme/theme.ts";
import {changeThemeModeAC} from '@/app/app-reducer.ts';


export function Header() {
    const themeMode = useAppSelector(selectThemeMode)
    const dispatch = useAppDispatch();
    const theme = getTheme(themeMode);

    const changeMode = () => {
        dispatch(changeThemeModeAC({themeMode: themeMode === 'light' ? 'dark' : 'light'}));
    }

    return (
        <Box sx={{ flexGrow: 1, paddingBottom: "80px" }}>
            <AppBar position="fixed" >
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h4" component="div" sx={{ flexGrow: 1 }} align="center">
                        Todolists
                    </Typography>
                    <Switch color={"default"} onChange={changeMode}/>
                    <NavButton color="inherit" background={theme.palette.primary.light}>FAQ</NavButton>
                    <NavButton color="inherit">Sign In</NavButton>
                    <NavButton color="inherit">Sign Up</NavButton>
                </Toolbar>
            </AppBar>
        </Box>
    );
}