import { Main } from "@/app/Main"
import { Route, Routes } from "react-router"
import { Login } from "@/features/auth/ui/Login/Login.tsx"
import { PageNotFound } from "@/common/components/PageNotFound/PageNotFound.tsx"
import { Faq } from "@/common/components/FAQ/ui/Faq.tsx"
import { ProtectedRoutes } from "./ProtectedRoutes"
import { useAppSelector } from "@/common/hooks"
import { selectIsLoggedIn } from "@/app/app-slice.ts"

export const Path = {
  Main: "/",
  Login: "login",
  Faq: "faq",
  Error: "*"
} as const

export const Routing = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  return (
    <Routes>
      <Route element={<ProtectedRoutes isNotAllowed={!isLoggedIn} redirectTo={Path.Login} />}>
        <Route path={Path.Main} element={<Main />} />
      </Route>

      <Route element={<ProtectedRoutes isNotAllowed={isLoggedIn} redirectTo={Path.Main} />}>
        <Route path={Path.Login} element={<Login />} />
      </Route>

      <Route path={Path.Faq} element={<Faq />} />
      <Route path={Path.Error} element={<PageNotFound />} />
    </Routes>
  )
}
