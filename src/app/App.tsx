import styles from "./App.module.css"
import { changeIsLoggedIn, selectThemeMode } from "@/app/app-slice"
import { Header } from "@/common/components/Header/Header"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { getTheme } from "@/common/theme"
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import { ErrorSnackbar } from "@/common/components/ErrorSnackBar"
import { Routing } from "@/common/routing"
import { useEffect } from "react"
import { CircularProgress } from "@mui/material"
import { useMeQuery } from "@/features/auth/api/authApi.ts"
import { ResultCode } from "@/common/enums"

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)
  //const [init, setInit] = useState(false)

  const { data, isLoading } = useMeQuery()

  const theme = getTheme(themeMode)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isLoading) return
    if (data?.resultCode === ResultCode.Success) {
      dispatch(changeIsLoggedIn({ isLoggedIn: true }))
    }
  }, [isLoading])

  if (isLoading) {
    return (
      <div className={styles.circularProgressContainer}>
        <CircularProgress size={150} thickness={3} />
      </div>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.app}>
        <CssBaseline />
        <Header userName={data?.data.login} />
        <Routing />
        <ErrorSnackbar />
      </div>
    </ThemeProvider>
  )
}