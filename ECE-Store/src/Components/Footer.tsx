import React from 'react';
import {
    Box,
    Container,
    Grid,
    Typography,
    Link,
    IconButton
} from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer: React.FC = () => {
    return (
        <Box
            component="footer"
            sx={{
                width: '100%',
                backgroundColor: '#1E293B',
                color: '#F1F5F9',
                padding: '60px 20px 40px',
                marginTop: 'auto',
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={4} justifyContent="space-between">
                    {/* Column 1: Branding */}
                    <Grid size= {{xs:12, sm:6, md:3}}>

                        <Typography variant="h6" sx={{ color: '#F8FAFC', mb: 1.5 }}>
                            ASTU - ECE Department
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#CBD5E1', lineHeight: 1.6 }}>
                            Adama Science and Technology University <br />
                            Electronics and Communication Engineering <br />
                            Inspiring innovation, research, and practical excellence in communication technologies.
                        </Typography>
                    </Grid>

                    {/* Column 2: About */}
                    <Grid size= {{xs:12, sm:6, md:3}}>
                        <Typography variant="h6" sx={{ color: '#F8FAFC', mb: 1.5 }}>
                            About
                        </Typography>
                        <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                            <li>
                                <Link href="#" color="inherit" underline="none" sx={{ fontSize: 14 }}>
                                    Our Mission
                                </Link>
                            </li>
                            <li>
                                <Link href="#" color="inherit" underline="none" sx={{ fontSize: 14 }}>
                                    Faculty
                                </Link>
                            </li>
                            <li>
                                <Link href="#" color="inherit" underline="none" sx={{ fontSize: 14 }}>
                                    Research
                                </Link>
                            </li>
                        </Box>
                    </Grid>

                    {/* Column 3: Resources */}
                    <Grid size= {{xs:12, sm:6, md:3}}>
                        <Typography variant="h6" sx={{ color: '#F8FAFC', mb: 1.5 }}>
                            Resources
                        </Typography>
                        <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                            <li>
                                <Link href="#" color="inherit" underline="none" sx={{ fontSize: 14 }}>
                                    E-Library
                                </Link>
                            </li>
                            <li>
                                <Link href="#" color="inherit" underline="none" sx={{ fontSize: 14 }}>
                                    Student Portal
                                </Link>
                            </li>
                            <li>
                                <Link href="#" color="inherit" underline="none" sx={{ fontSize: 14 }}>
                                    Laboratories
                                </Link>
                            </li>
                        </Box>
                    </Grid>

                    {/* Column 4: Contact */}
                    <Grid size= {{xs:12, sm:6, md:3}}>

                        <Typography variant="h6" sx={{ color: '#F8FAFC', mb: 1.5 }}>
                            Contact
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#CBD5E1', lineHeight: 1.6 }}>
                            Adama, Ethiopia<br />
                            Email: ece@astu.edu.et<br />
                            Phone: +251 22 111 1111
                        </Typography>
                    </Grid>
                </Grid>

                {/* Footer Bottom Section */}
                <Box
                    sx={{
                        mt: 5,
                        pt: 3,
                        borderTop: '1px solid rgba(255, 255, 255, 0.12)',
                        textAlign: 'center',
                    }}
                >
                    {/* Social Icons */}
                    <Box sx={{ mb: 2 }}>
                        <IconButton href="#" aria-label="Twitter" sx={{ color: '#CBD5E1', mx: 1 }}>
                            <TwitterIcon />
                        </IconButton>
                        <IconButton href="#" aria-label="Facebook" sx={{ color: '#CBD5E1', mx: 1 }}>
                            <FacebookIcon />
                        </IconButton>
                        <IconButton href="#" aria-label="Instagram" sx={{ color: '#CBD5E1', mx: 1 }}>
                            <InstagramIcon />
                        </IconButton>
                    </Box>
                    <Typography variant="body2" sx={{ fontSize: 14, color: '#94A3B8' }}>
                        © 2024 ASTU - Department of Electronics and Communication Engineering. All rights reserved.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;