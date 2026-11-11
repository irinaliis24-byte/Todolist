import AppBar from "@mui/material/AppBar"
import { Link } from "react-router"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import { NavButton } from "@/common/styles/NavButton.ts"
import Switch from "@mui/material/Switch"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import {
  changeIsLoggedIn,
  changeThemeModeAC,
  selectAppStatus,
  selectIsLoggedIn,
  selectThemeMode
} from "@/app/app-slice.ts"
import { useLogoutMutation } from "@/features/auth/api/authApi"
import { ResultCode } from "@/common/enums"
import { AUTH_TOKEN } from "@/common/constans"
import { Path } from "@/common/routing"
import { LinearProgress } from "@mui/material"
import { baseApi } from "@/app/baseApi.ts"
import styles from "./Header.module.css"


export const Header = ({ userName }: { userName: string | undefined }) => {
  const themeMode = useAppSelector(selectThemeMode)
  const status = useAppSelector(selectAppStatus)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const dispatch = useAppDispatch()

  const [logout] = useLogoutMutation()

  const changeMode = () => {
    dispatch(changeThemeModeAC({ themeMode: themeMode === "light" ? "dark" : "light" }))
  }

  const logoutHandler = () => {
    logout()
      .then((res) => {
        if (res.data?.resultCode === ResultCode.Success) {
          dispatch(changeIsLoggedIn({ isLoggedIn: false }))
          localStorage.removeItem(AUTH_TOKEN)
        }
      })
      .then(() => {
        dispatch(baseApi.util.invalidateTags(["Todolist", "Task"]))
      })
  }

  return (
    <Box sx={{ flexGrow: 1, paddingBottom: "80px" }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            className={styles.burgerBtn}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            <Link to={Path.Main}>
              Todolists
            </Link>
          </Typography>
          <span>{isLoggedIn && userName}</span>
          <NavButton color="inherit" onClick={logoutHandler}>Log out</NavButton>
          <NavButton color="inherit"><Link to={Path.Faq}>FAQ</Link></NavButton>
          <Switch color={"default"} onChange={changeMode} />
        </Toolbar>
        <LinearProgress sx={{ visibility: status === "loading" ? "visible" : "hidden" }} />
      </AppBar>
    </Box>
  )
}