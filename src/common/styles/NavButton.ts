import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'

type NavButtonProps = {
    background?: string
}

export const NavButton = styled(Button)<NavButtonProps>(({background, theme}) => ({
    minWidth: '110px',
    fontWeight: 'bold',
    boxShadow: '0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)',
    borderRadius: '2px',
    textTransform: 'capitalize',
    margin: '0 10px',
    padding: '8px 24px',
    color: theme.palette.primary.contrastText,
    background: background || theme.palette.primary.main,

        "&:hover": {
            background: theme.palette.primary.dark,
    }
}
))