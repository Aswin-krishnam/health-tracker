import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  AppBar,
  Toolbar,
} from '@mui/material';
import {
  MonitorHeart,
  LocalDrink,
  DirectionsRun,
  Restaurant,
  Bedtime,
  Assessment,
} from '@mui/icons-material';

const features = [
  {
    title: 'Track Vital Signs',
    description: 'Monitor your blood pressure, heart rate, and other important health metrics',
    icon: <MonitorHeart fontSize="large" color="primary" />,
  },
  {
    title: 'Water Intake',
    description: 'Stay hydrated by tracking your daily water consumption',
    icon: <LocalDrink fontSize="large" color="primary" />,
  },
  {
    title: 'Exercise Tracking',
    description: 'Log your workouts and track your fitness progress',
    icon: <DirectionsRun fontSize="large" color="primary" />,
  },
  {
    title: 'Nutrition Monitoring',
    description: 'Track your meals and maintain a balanced diet',
    icon: <Restaurant fontSize="large" color="primary" />,
  },
  {
    title: 'Sleep Analysis',
    description: 'Monitor your sleep patterns for better rest',
    icon: <Bedtime fontSize="large" color="primary" />,
  },
  {
    title: 'Health Reports',
    description: 'Get detailed insights about your health progress',
    icon: <Assessment fontSize="large" color="primary" />,
  },
];

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Navigation Bar */}
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Health Tracker
          </Typography>
          <Button color="primary" onClick={() => navigate('/login')}>Login</Button>
          <Button variant="contained" color="primary" onClick={() => navigate('/signup')}>
            Sign Up
          </Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6,
          background: 'linear-gradient(to right bottom, #ffffff, #f5f5f5)',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
            sx={{ fontWeight: 'bold' }}
          >
            Take Control of Your Health
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" paragraph>
            Track, monitor, and improve your health with our comprehensive health tracking platform.
            Get personalized insights and make informed decisions about your well-being.
          </Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate('/signup')}
            >
              Get Started
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={() => navigate('/login')}
            >
              Learn More
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 8 }} maxWidth="lg">
        <Typography
          component="h2"
          variant="h3"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Features
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {features.map((feature, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: '0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 3,
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                  <Typography gutterBottom variant="h5" component="h3">
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Call to Action */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          mt: 8,
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h4" align="center" gutterBottom>
            Ready to Start Your Health Journey?
          </Typography>
          <Typography variant="h6" align="center" paragraph>
            Join thousands of users who are already tracking their health with us.
          </Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => navigate('/signup')}
              sx={{ px: 4 }}
            >
              Sign Up Now
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;