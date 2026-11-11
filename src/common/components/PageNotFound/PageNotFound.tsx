import styles from "./PageNotFound.module.css"
import { Link } from "react-router"
import { Path } from "@/common/routing"
import Button from "@mui/material/Button"

export const PageNotFound = () => (
  <>
    <h1 className={styles.title}>404</h1>
    <h2 className={styles.subtitle}>page not found</h2>
    <Button title={"Back to main"} component={Link} to={Path.Main}>
      Back to main
    </Button>
  </>
)
