import { SxProps } from '@mui/material'

export const gridContainerSx: SxProps = {
    m: "24px 0",
}

export const headerBoxSx: SxProps = {
display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    mb: "20px"
}

export const filterButtonBoxSx: SxProps = {
    display: 'flex',
    justifyContent: 'space-between',
    mb: "16px"
}

export const getListItemSx = (isDone: boolean): SxProps => ({
    opacity: isDone ? "0.5" : "1",
    textDecoration: isDone ? "line-through" : "none",
})