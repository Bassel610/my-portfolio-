import { Button, Stack } from "@mui/material";
import HeroSection from "./HeroSection";
import Img from "./Img";


export default function First_screen () {
    return (
        <Stack
            id="First_screen"
            direction={{ xs: 'column', md: 'row' }}
            justifyContent='center'
            alignItems='center'
            spacing={{ xs: 2, md: 0 }}
            sx={{
                minHeight: '100vh',
                px: { xs: 2, sm: 3, md: 4 },
                py: { xs: 4, md: 0 }
            }}
        >
            <HeroSection />
            <Img />
        </Stack>
    )
}