import Header from "../Header/Header";
import React, { useEffect, useState } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AboutSection from "./AboutSection";
import WorkEduSection from "./WorkEduSection";
import ZodiacSection from "./ZodiacSection";
import ImageSection from "./ImageSection";


function Accounts() {
    
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div>
            <div className="w-100 h-20 flex justify-center items-center border-b-4">
                <Header title="Date Profile" subtitle="" />
            </div>
            <div className="m-14 md:px-28 w-100 text-black bg-[#eaeaf0] rounded-3xl">
                < ImageSection />
                {/* Accordion Starts */}
                <div className="md:px-10 pb-5">
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography variant="h4" sx={{ width: '33%', flexShrink: 0 }}>
                            About Me
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        < AboutSection handleChange={handleChange("panel1")}/>
                    </AccordionDetails>
                </Accordion>
                </div>
                
                <div className="md:px-10 pb-5">
                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2bh-content"
                        id="panel2bh-header"
                    >
                        <Typography variant="h4" sx={{ width: '33%', flexShrink: 0 }}>My Work & Education</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <WorkEduSection handleChange={handleChange("panel2")}/>
                    </AccordionDetails>
                </Accordion>
                </div>
                <div className="md:px-10 pb-5">
                <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3bh-content"
                        id="panel3bh-header"
                    >
                        <Typography variant="h4" sx={{ width: '33%', flexShrink: 0 }}>
                            My Zodiac
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ZodiacSection handleChange={handleChange('panel3')} />
                    </AccordionDetails>
                </Accordion>
                </div>
            </div>

        </div>

    )
}

export default Accounts;