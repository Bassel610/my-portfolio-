'use client'
import {  Box, Avatar, styled  } from "@mui/material";

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  boxShadow: theme.shadows[4],
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.03)'
  }
}));


export default function Img() {

    return (
   <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 2, md: 3 },
        py: { xs: 3, md: 6 },
        px: 2,
        borderBottom: { xs: 'none', md: `1px solid #973763` },
        borderTop: { xs: `1px solid #973763`, md: 'none' },
        mt: { xs: 2, md: 0 }
      }}
    >
      {/* Circular photo with formal styling */}
      <StyledAvatar
        src={'https://github.com/Basel-Sherif/imge/blob/main/WhatsApp%20Image%202025-08-03%20at%2016.13.42_18b24c87.jpg?raw=true'} // Replace with your image path
        alt="Basel sherif"
        sx={{
          width: { xs: 180, sm: 220, md: 250 },
          height: { xs: 180, sm: 220, md: 250 },
          border: `4px solid #973763`
        }}
      />
      </Box>
    )
}