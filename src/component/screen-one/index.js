import { Button, Stack } from "@mui/material";
import HeroSection from "./HeroSection";
import Img from "./Img";


export default function First_screen () {
    return (
        <Stack id="First_screen" direction='row' justifyContent='center' alignItems='center'>
            <HeroSection />
            <Img />
        </Stack>
    )
}