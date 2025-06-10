import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  IconButton,
  useScrollTrigger,
  Slide,
} from '@mui/material';
import {
  MonitorHeart,
  LocalDrink,
  DirectionsRun,
  Restaurant,
  Bedtime,
  Assessment,
  KeyboardArrowDown,
  Timeline,
  Favorite,
  TrendingUp,
  CheckCircle,
  Security,
  PhoneIphone,
  Speed,
  DevicesOther,
  CloudSync,
  Star,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import './HomePage.css';

const benefits = [
  {
    icon: <Security sx={{ fontSize: 40 }} />,
    title: 'Secure & Private',
    description: 'Your health data is encrypted and protected with industry-standard security protocols.'
  },
  {
    icon: <PhoneIphone sx={{ fontSize: 40 }} />,
    title: 'Mobile Ready',
    description: 'Track your health metrics on the go with our mobile-responsive platform.'
  },
  {
    icon: <Speed sx={{ fontSize: 40 }} />,
    title: 'Real-time Updates',
    description: 'Get instant insights and updates about your health progress.'
  },
  {
    icon: <DevicesOther sx={{ fontSize: 40 }} />,
    title: 'Cross Platform',
    description: 'Access your health data from any device, anywhere, anytime.'
  }
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Fitness Enthusiast',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
    text: 'This platform has transformed how I track my fitness journey. The insights are invaluable!'
  },
  {
    name: 'Michael Chen',
    role: 'Health Coach',
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
    text: 'I recommend this to all my clients. The comprehensive tracking makes goal setting so much easier.'
  },
  {
    name: 'Emma Wilson',
    role: 'Wellness Blogger',
    image: 'https://randomuser.me/api/portraits/women/3.jpg',
    text: 'The AI-powered insights have helped me maintain a better sleep schedule and improve my habits.'
  }
];

const features = [
  {
    title: 'Track Vital Signs',
    description: 'Monitor your blood pressure, heart rate, and other important health metrics in real-time',
    icon: <MonitorHeart fontSize="large" sx={{ fontSize: 40 }} />,
    color: '#2196f3',
  },
  {
    title: 'Smart Hydration',
    description: 'Personalized water intake recommendations based on your activity level',
    icon: <LocalDrink fontSize="large" sx={{ fontSize: 40 }} />,
    color: '#00bcd4',
  },
  {
    title: 'Fitness Journey',
    description: 'Track workouts, set goals, and celebrate your fitness milestones',
    icon: <DirectionsRun fontSize="large" sx={{ fontSize: 40 }} />,
    color: '#4caf50',
  },
  {
    title: 'Nutrition AI',
    description: 'Smart meal tracking with nutritional insights and recommendations',
    icon: <Restaurant fontSize="large" sx={{ fontSize: 40 }} />,
    color: '#ff9800',
  },
  {
    title: 'Sleep Insights',
    description: 'Analyze your sleep patterns and improve your rest quality',
    icon: <Bedtime fontSize="large" sx={{ fontSize: 40 }} />,
    color: '#9c27b0',
  },
  {
    title: 'Health Analytics',
    description: 'AI-powered health insights and personalized recommendations',
    icon: <Assessment fontSize="large" sx={{ fontSize: 40 }} />,
    color: '#f44336',
  },
];

const stats = [
  { value: '10k+', label: 'Active Users', icon: <Timeline /> },
  { value: '87%', label: 'Health Goals Met', icon: <TrendingUp /> },
  { value: '92%', label: 'User Satisfaction', icon: <Favorite /> },
];

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const HomePage = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-icon" />
      </div>
    );
  }

  const appFeatures = [
    'Real-time health monitoring',
    'Personalized AI recommendations',
    'Comprehensive progress tracking',
    'Smart notifications and reminders',
    'Detailed analytics and reports',
    'Cross-device synchronization'
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
      {/* Navigation Bar */}
      <HideOnScroll>
        <AppBar className={scrolled ? 'glass-nav' : ''} elevation={scrolled ? 1 : 0}>
          <Toolbar>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                Health Tracker
              </Typography>
            </motion.div>
            <Box sx={{ flexGrow: 1 }} />
            <Button className="nav-button" color="inherit" onClick={() => navigate('/login')}>Login</Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate('/signup')}
              sx={{ ml: 2 }}
            >
              Sign Up Free
            </Button>
          </Toolbar>
        </AppBar>
      </HideOnScroll>

      {/* Hero Section */}
      <Box
        className="hero-gradient"
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          color: 'white',
          pt: 8,
          overflow: 'hidden',
        }}
      >
        <div className="animated-bg">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item size={{ xs: 12, md: 6 }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography
                  component="h1"
                  variant="h2"
                  className="hero-text"
                  sx={{ 
                    fontWeight: 900,
                    mb: 3,
                    background: 'linear-gradient(45deg, #fff, #f0f0f0)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  Transform Your Health Journey
                </Typography>
                <Typography variant="h5" sx={{ mb: 4, color: 'rgba(255,255,255,0.9)' }}>
                  Track your health metrics, get AI-powered insights, and achieve your wellness goals
                  with our comprehensive health tracking platform.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={() => navigate('/signup')}
                    sx={{
                      py: 1.5,
                      px: 4,
                      borderRadius: '30px',
                      fontSize: '1.1rem',
                    }}
                  >
                    Start Free Trial
                  </Button>
                  <Button
                    variant="outlined"
                    color="inherit"
                    size="large"
                    sx={{
                      py: 1.5,
                      px: 4,
                      borderRadius: '30px',
                      fontSize: '1.1rem',
                    }}
                  >
                    Watch Demo
                  </Button>
                </Box>
              </motion.div>
            </Grid>
            <Grid item size={{ xs: 12, md: 6 }}>
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Grid container spacing={2}>
                  {stats.map((stat, index) => (
                    <Grid item size={{ xs: 12, md: 4 }} key={index}>
                      <Card className="stat-card">
                        <CardContent sx={{ textAlign: 'center' }}>
                          <IconButton
                            sx={{
                              backgroundColor: `rgba(${index * 50}, 100, 255, 0.1)`,
                              mb: 2,
                            }}
                          >
                            {stat.icon}
                          </IconButton>
                          <Typography variant="h4" className="health-stat" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                            {stat.value}
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {stat.label}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
        <IconButton
          className="scroll-indicator"
          color="inherit"
          aria-label="scroll down"
          sx={{ position: 'absolute', bottom: 40 }}
        >
          <KeyboardArrowDown />
        </IconButton>
      </Box>

      {/* Benefits Section */}
      <Container sx={{ py: 15 }} maxWidth="lg">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Typography
            component="h2"
            variant="h3"
            align="center"
            className="animated-text"
            sx={{ fontWeight: 'bold', mb: 8 }}
          >
            Why Choose Health Tracker?
          </Typography>
          <Grid container spacing={4}>
            {benefits.map((benefit, index) => (
              <Grid item size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.05 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="benefit-card glass-card">
                    <CardContent sx={{ textAlign: 'center', py: 4 }}>
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className="benefit-icon"
                      >
                        {benefit.icon}
                      </motion.div>
                      <Typography variant="h6" sx={{ mt: 2, mb: 1, fontWeight: 600 }}>
                        {benefit.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {benefit.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>

      {/* Features Section */}
      <Container sx={{ py: 15 }} maxWidth="lg">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Typography
            component="h2"
            variant="h3"
            align="center"
            className="animated-text"
            sx={{ fontWeight: 'bold', mb: 8 }}
          >
            Powerful Features for Your Health
          </Typography>
          <Grid container spacing={4} className="feature-grid">
            {features.map((feature, index) => (
              <Grid item key={index} size={{ xs: 12, sm: 6, md: 4 }}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card
                    className="feature-card glass-card"
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                    }}
                  >
                    <CardContent className="feature-card-content" sx={{ flexGrow: 1, textAlign: 'center' }}>
                      <Box
                        className="feature-icon"
                        sx={{
                          mb: 3,
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: 80,
                          height: 80,
                          borderRadius: '50%',
                          backgroundColor: `${feature.color}15`,
                          margin: '0 auto',
                          color: feature.color,
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Typography gutterBottom variant="h5" component="h3" sx={{ fontWeight: 600 }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>

      {/* Testimonials Section */}
      <Box sx={{ py: 15, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Typography
              component="h2"
              variant="h3"
              align="center"
              className="animated-text"
              sx={{ fontWeight: 'bold', mb: 8 }}
            >
              What Our Users Say
            </Typography>
            <Grid container spacing={4}>
              {testimonials.map((testimonial, index) => (
                <Grid item size={{ xs: 12, md: 4 }} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                  >
                    <Card className="testimonial-card glass-card">
                      <CardContent sx={{ p: 4 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                          <motion.div whileHover={{ scale: 1.1 }}>
                            <Box
                              component="img"
                              src={testimonial.image}
                              alt={testimonial.name}
                              sx={{
                                width: 60,
                                height: 60,
                                borderRadius: '50%',
                                mr: 2,
                              }}
                            />
                          </motion.div>
                          <Box>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                              {testimonial.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {testimonial.role}
                            </Typography>
                          </Box>
                        </Box>
                        <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                          "{testimonial.text}"
                        </Typography>
                        <Box sx={{ display: 'flex', mt: 2 }}>
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} sx={{ color: '#ffc107', fontSize: 20 }} />
                          ))}
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* App Features Section */}
      <Box sx={{ py: 15, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item size={{ xs: 12, md: 6 }}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 4 }}>
                  Smart Features for Your Health Journey
                </Typography>
                <Box>
                  {appFeatures.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Box className="feature-list-item">
                        <CheckCircle sx={{ color: 'primary.main', mr: 2 }} />
                        <Typography variant="h6">{feature}</Typography>
                      </Box>
                    </motion.div>
                  ))}
                </Box>
              </motion.div>
            </Grid>
            <Grid item size={{ xs: 12, md: 6 }}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Box className="feature-image">
                  <Box
                    component="img"
                    src="https://placehold.co/600x400/png"
                    alt="App Features"
                    sx={{
                      width: '100%',
                      borderRadius: 4,
                      boxShadow: 3,
                    }}
                  />
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box sx={{ py: 10, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} className="stats-grid">
            {stats.map((stat, index) => (
              <Grid item size={{ xs: 12, md: 4 }} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <Card className="stat-card">
                    <CardContent sx={{ textAlign: 'center' }}>
                      <IconButton
                        sx={{
                          backgroundColor: `rgba(${index * 50}, 100, 255, 0.1)`,
                          mb: 2,
                        }}
                      >
                        {stat.icon}
                      </IconButton>
                      <Typography variant="h4" className="health-stat" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {stat.label}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Call to Action */}
      <Box className="cta-section" sx={{ py: 15, color: 'white', position: 'relative' }}>
        <div className="animated-bg">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
        </div>
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Typography variant="h3" align="center" sx={{ fontWeight: 'bold', mb: 3 }}>
              Start Your Health Journey Today
            </Typography>
            <Typography variant="h6" align="center" sx={{ mb: 4, opacity: 0.9 }}>
              Join thousands of users who are transforming their lives with our comprehensive health tracking platform.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={() => navigate('/signup')}
                sx={{
                  py: 2,
                  px: 6,
                  borderRadius: '30px',
                  fontSize: '1.1rem',
                }}
              >
                Get Started Free
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                size="large"
                sx={{
                  py: 2,
                  px: 6,
                  borderRadius: '30px',
                  fontSize: '1.1rem',
                }}
              >
                View Plans
              </Button>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;