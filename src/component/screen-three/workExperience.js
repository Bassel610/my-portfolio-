import React from "react";
import { Box, Typography, Paper, Divider, Chip } from "@mui/material";
import { CalendarToday, LocationOn } from "@mui/icons-material";

export default function Experience() {
const jobs = [
      {
      title: "Front End Developer",
      company: "Twindix",
      period: "2025/11 – Now", // Adjust dates as needed
      location: "remotely", // Add location if available
      bullets: [
        "Developed responsive and scalable web applications using React, Redux, and Tailwind CSS.",
        "Built modern user interfaces with React and Material UI (MUI), focusing on usability and performance.",
        "Designed and implemented the main dashboard supporting multiple roles, including users, administrators, and owners.",
        "Contributed to the core development of the primary business application “Twindix”.",
        "Collaborated on multiple projects ranging from small to medium-scale applications, delivering features end-to-end.",
      ],
      isCurrent: true
    },
    {
      title: "Front End Developer",
      company: "Vision Dimension",
      period: "2024/07 – 2025/03", // Adjust dates as needed
      location: "Nasr City", // Add location if available
      bullets: [
        "Developed responsive web applications using Next.js and MUI",
        "Worked on ERP system integration",
        "Built reusable component libraries",
    "Worked on multiple ERP systems including Accounting systems, Human Resource and Inventory Management",
      ],
      isCurrent: false
    },
    {
      title: "Front-End Developer",
      company: "RBOUR Company",
      period: "2023/02 – 2024/06",
      location: "Cairo",
      bullets: [
        "Developed responsive web apps using HTML5, CSS3, JavaScript (ES6+), and React.js",
        "Integrated front-end with RESTful APIs and GraphQL endpoints",
        "Implemented Redux for state management",
        "Collaborated with UX/UI designers",
        "Managed databases for full-stack projects using Node.js"
      ],
      isCurrent: false
    },
  ];


  return (
    <Box sx={{
      maxWidth: { xs: '100%', sm: 600, md: 800 },
      mx: "auto",
      px: { xs: 2, sm: 3, md: 4 },
      py: { xs: 4, md: 8 },
      position: "relative",
      pt: { xs: '16px', md: '24px' }
    }}>
      {/* Horizontal line from heading to first circle */}
      <Box
        sx={{
          position: "absolute",
          left: 180, // Adjust based on your heading width
          top: 36, // Aligns with heading baseline
          width: 40,
          height: 2,
          bgcolor: "grey.300",
        }}
      />

      {/* Vertical line connecting all circles */}
      <Box
        sx={{
          position: "absolute",
          left: "14px", // Half of circle width (24) + padding (12)
          top: "70px", // Starts below horizontal line
          width: 2,
          height: "calc(100% - 196px)",
          bgcolor: "grey.300",
        }}
      />

      <Typography position='relative' top='-19px' variant="h4" component="h2" sx={{color :"white", mb: 4, display: "inline-block" }}>
        Work Experience
      </Typography>

  <Box sx={{ position: "relative", pl: 3, top: "-42px" }}>
        {/* Vertical line */}
        <Divider
          orientation="vertical" 
          sx={{
            position: "absolute",
            left: "20px",
            top: 0,
            height: "100%",
            borderRightWidth: 2,
          }}
        />

        {jobs.map((job, index) => (
          <Box key={index} sx={{ 
            position: "relative",
            "&:last-child": { pb: 0 }
          }}>
            {/* Circle indicator */}
            <Box sx={{
              position: "absolute",
              left: "-13px",
              top: "8px",
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              bgcolor: "#7c4970",
              border: "4px solid",
              borderColor: "background.paper",
              zIndex: 2,
              p :"8px"
            }} />

            <Paper elevation={2} sx={{ 
              p: 3, 
              mb: 3, 
              borderRadius: 2,
              borderLeft: "3px solid",
              borderColor: "#ab5296cf",
              backgroundColor: "#ab5296cf"
            }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6" fontWeight="600" ml={2}>
                  {job.title} • {job.company}
                </Typography>
                {job.isCurrent && (
                  <Chip
                    label="Current" 
                    size="small" 
                    color="success" 
                    sx={{ ml: 1 }} 
                  />
                )}
              </Box>

              <Box sx={{ 
                display: "flex", 
                alignItems: "center", 
                mt: 1,
                "& > *": { mr: 1.5, display: "flex", alignItems: "center" }
              }}>
                <Typography variant="body2" color="text.secondary">
                  <CalendarToday fontSize="inherit" sx={{ mr: 0.5, fontSize: 16 }} />
                  {job.period}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <LocationOn fontSize="inherit" sx={{ mr: 0.5, fontSize: 16 }} />
                  {job.location}
                </Typography>
              </Box>

              <Box component="ul" sx={{ 
                pl: 2.5, 
                mt: 2, 
                mb: 0,
                "& li": { mb: 1 }
              }}>
                {job.bullets.map((bullet, i) => (
                  <Typography 
                    key={i} 
                    component="li" 
                    variant="body1"
                    color="text.secondary"
                  >
                    {bullet}
                  </Typography>
                ))}
              </Box>
            </Paper>
          </Box>
        ))}
      </Box>
    </Box>
  );
}