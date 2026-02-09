import { Box } from "@mui/material";
import Footer from "../Share/footer";
import Main from "./main";


export default function Screen_tow () {
    return (
        <Box 
            id="Screen_tow"
            sx={{
                width: '100%',
                maxWidth: '100vw',
                overflow: 'hidden',
                boxSizing: 'border-box'
            }}
        >
            <Main />
        </Box>
    )
}