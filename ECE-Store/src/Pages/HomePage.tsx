import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Box,    
    Button,
    Typography,
    Container,
    Card,
    CardContent,
    CardMedia,
    Link,
    Paper,
} from '@mui/material';
import { styled } from '@mui/system';
import Grid from '@mui/material/Grid';

import Footer from '../Components/Footer';

// Define the featured equipments data
const featuredEquipments = [
    {
        title: 'Advanced Oscilloscope',
        description: 'High-precision oscilloscope for detailed signal analysis.',
        img: '/images/Store.webp',
    },
    {
        title: 'Signal Generator',
        description: 'Versatile signal generator for various testing needs.',
        img: '/images/Store.webp',
    },
    {
        title: 'Function Generator',
        description: 'Reliable function generator for waveform generation.',
        img: '/images/Store.webp',
    },
    {
        title: 'Digital Multimeter',
        description: 'Essential tool for measuring voltage, current, and resistance.',
        img: '/images/Store.webp',
    },
];

// Custom styled components for unique styles
const GradientBackground = styled(Box)({
    background: 'linear-gradient(120deg, #e3eafc 0%, #f8fafc 100%)',
    minHeight: '100vh',
    padding: '0 0 40px 0',
});

const HeroCard = styled(Paper)({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    boxShadow: '0 8px 40px rgba(37, 99, 235, 0.13), 0 2px 8px rgba(0,0,0,0.04)',
    borderRadius: 28,
    overflow: 'hidden',
    border: '1.5px solid #e3e8f0',
    width: '100%',
    maxWidth: 1100,
    minWidth: 0,
});

const HeroImageSection = styled(Box)({
    flex: 1.2,
    minWidth: 320,
    background: '#fff', // Remove blue gradient background
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <GradientBackground>
            {/* Header */}
            <AppBar position="static" color="transparent" elevation={0}>
                <Toolbar
                    sx={{
                        width: '100%',
                        maxWidth: 1373,
                        margin: '0 auto',
                        minHeight: { xs: 56, sm: 64 },
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: { xs: 'stretch', sm: 'center' },
                        justifyContent: 'space-between',
                        borderBottom: '1px solid #eaedf1',
                        px: { xs: 1, sm: 4 },
                        py: { xs: 1, sm: 0 },
                        gap: { xs: 1, sm: 0 },
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: { xs: 1, sm: 'unset' } }}>
                        {/* Logo placehoder */}
                        <Box sx={{ width: 16, height: 16, bgcolor: 'white', borderRadius: 1 }} />
                        <Box sx={{ width: 16, height: 16, bgcolor: 'white', borderRadius: 1 }} />
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                fontWeight: 700,
                                color: '#0F1417',
                                marginLeft: 4,
                                fontSize: { xs: 16, sm: 20 },
                            }}
                        >
                            ECELabStore
                        </Typography>
                    </Box>
                    <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 4, flex: 1, justifyContent: 'center' }}>
                        <Link href="#" color="textPrimary" underline="none">
                            <Typography variant="body2" fontWeight={500}>Equipment</Typography>
                        </Link>
                        <Link href="#" color="textPrimary" underline="none">
                            <Typography variant="body2" fontWeight={500}>Services</Typography>
                        </Link>
                        <Link href="#" color="textPrimary" underline="none">
                            <Typography variant="body2" fontWeight={500}>About Us</Typography>
                        </Link>
                        <Link href="#" color="textPrimary" underline="none">
                            <Typography variant="body2" fontWeight={500}>Contact</Typography>
                        </Link>
                    </Box>
                    <Box sx={{ display: 'flex', flex: { xs: 1, sm: 'unset' }, justifyContent: { xs: 'flex-end', sm: 'unset' } }}>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: '#DBE8F2',
                                color: '#0F1417',
                                fontWeight: 700,
                                borderRadius: 3,
                                minWidth: 90,
                                px: 2,
                                fontSize: { xs: 13, sm: 16 },
                                '&:hover': {
                                    backgroundColor: '#cce2f4',
                                },
                            }}
                            onClick={() => navigate('/login')}
                        >
                            Login
                        </Button>
                    </Box>
                    {/* Mobile nav links below header */}
                    <Box sx={{ display: { xs: 'flex', sm: 'none' }, width: '100%', justifyContent: 'center', mt: 1, gap: 2 }}>
                        <Link href="#" color="textPrimary" underline="none">
                            <Typography variant="body2" fontWeight={500}>Equipment</Typography>
                        </Link>
                        <Link href="#" color="textPrimary" underline="none">
                            <Typography variant="body2" fontWeight={500}>Services</Typography>
                        </Link>
                        <Link href="#" color="textPrimary" underline="none">
                            <Typography variant="body2" fontWeight={500}>About Us</Typography>
                        </Link>
                        <Link href="#" color="textPrimary" underline="none">
                            <Typography variant="body2" fontWeight={500}>Contact</Typography>
                        </Link>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Main Card Section */}
            <Container
                maxWidth="xl"
                disableGutters
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: { xs: 'auto', md: 'calc(100vh - 64px - 80px)' },
                    paddingTop: { xs: 2, md: '48px' },
                    paddingBottom: { xs: 2, md: '32px' },
                    width: '100%',
                    overflowX: 'hidden',
                }}
            >
                <HeroCard>
                    {/* Left Side: Hero Image */}
                    <HeroImageSection>
                        <Box
                            component="img"
                            src="/images/HeroImage.png"
                            alt="Lab Hero"
                            sx={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                opacity: 0.85,
                            }}
                        />
                        {/* Removed blue overlay Box for a cleaner image */}
                    </HeroImageSection>

                    {/* Right Side: Main Content */}
                    <Box
                        sx={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            p: 6,
                            bgcolor: 'background.paper',
                            position: 'relative',
                        }}
                    >
                        <Typography
                            variant="h3"
                            component="h1"
                            align="center"
                            sx={{
                                fontWeight: 900,
                                color: '#1a237e',
                                mb: 2,
                                letterSpacing: 0.5,
                            }}
                        >
                            Empowering Innovation in Electronics
                        </Typography>
                        <Typography
                            variant="body1"
                            align="center"
                            color="text.secondary"
                            sx={{ mb: 4, maxWidth: 380 }}
                        >
                            Access cutting-edge equipment and expert services to fuel your research and projects.
                        </Typography>
                        <Button
                            variant="contained"
                            size="large"
                            sx={{
                                backgroundColor: '#2563eb',
                                color: 'white',
                                borderRadius: 3,
                                minWidth: 160,
                                mb: 4,
                                '&:hover': {
                                    backgroundColor: '#1e40af',
                                },
                            }}
                            onClick={() => navigate('/student-explore')}
                        >
                            Browse Equipment
                        </Button>

                        {/* Featured Equipment */}
                        <Box sx={{ width: '100%' }}>
                            <Typography
                                variant="h5"
                                component="h2"
                                sx={{ fontWeight: 700, mb: 2 }}
                            >
                                Featured Equipment
                            </Typography>
                            <Grid container spacing={1.5}>
                                {featuredEquipments.map((eq, idx) => (
                                    <Grid key={idx} size= {{xs:12, sm:6, md:3}}>
                                        
                                        <Card elevation={0} sx={{ borderRadius: 2, bgcolor: '#f8fafc' }}>
                                            <CardMedia
                                                component="img"
                                                height="90"
                                                image={eq.img}
                                                alt={eq.title}
                                            />
                                            <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                                                <Typography variant="subtitle2" component="h3" fontWeight={600} mb={0.5}>
                                                    {eq.title}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    {eq.description}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Box>
                </HeroCard>
            </Container>

            {/* Announcements */}
            <Container maxWidth="md" sx={{ mt: 5 }}>
                <Typography variant="h5" component="h2" sx={{ fontWeight: 700, mb: 3 }}>
                    Announcements
                </Typography>
                <Grid container spacing={3}>
                    {/* Announcement 1 */}
                    <Grid size= {{xs:12}}>
                        <Paper
                            sx={{
                                p: 3,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                borderRadius: 3,
                                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                            }}
                        >
                            <Box sx={{ flex: 1, mr: 3 }}>
                                <Typography variant="subtitle1" fontWeight={700} mb={1}>
                                    New Equipment Arrival
                                </Typography>
                                <Typography variant="body2" color="text.secondary" mb={2}>
                                    We've added new oscilloscopes and signal generators to our inventory. Check them out!
                                </Typography>
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: '#EBEDF2',
                                        color: '#0F1417',
                                        borderRadius: 3,
                                        '&:hover': {
                                            backgroundColor: '#c4c8d2',
                                        },
                                    }}
                                >
                                    View New Arrivals
                                </Button>
                            </Box>
                            <Box
                                component="img"
                                src="/images/Store.webp"
                                alt="New Equipment"
                                sx={{
                                    width: 120,
                                    height: 120,
                                    objectFit: 'cover',
                                    borderRadius: 3,
                                }}
                            />
                        </Paper>
                    </Grid>
                    {/* Announcement 2 */}
                    <Grid size= {{xs:12}}>
                        
                        <Paper
                            sx={{
                                p: 3,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                borderRadius: 3,
                                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                            }}
                        >
                            <Box sx={{ flex: 1, mr: 3 }}>
                                <Typography variant="subtitle1" fontWeight={700} mb={1}>
                                    Maintenance Schedule
                                </Typography>
                                <Typography variant="body2" color="text.secondary" mb={2}>
                                    The lab will be closed for maintenance on July 15th. We apologize for any inconvenience.
                                </Typography>
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: '#EBEDF2',
                                        color: '#0F1417',
                                        borderRadius: 3,
                                        '&:hover': {
                                            backgroundColor: '#c4c8d2',
                                        },
                                    }}
                                >
                                    View Schedule
                                </Button>
                            </Box>
                            <Box
                                component="img"
                                src="/images/Store.webp"
                                alt="Maintenance"
                                sx={{
                                    width: 120,
                                    height: 120,
                                    objectFit: 'cover',
                                    borderRadius: 3,
                                }}
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>

            {/* Footer */}
            <Footer />
        </GradientBackground>
    );
};

export default HomePage;