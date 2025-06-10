import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  IconButton,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
} from '@mui/material';
import { motion } from 'framer-motion';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import CustomLogEntry from './CustomLogEntry';
import './CustomLogs.css';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Suggested custom log templates
const logTemplates = [
  {
    name: 'Daily Food Expenses',
    description: 'Track your daily food spending',
    fieldType: 'number',
    options: { unit: '$', min: 0 },
    category: 'finance',
    icon: '🍴',
    color: '#4caf50'
  },
  {
    name: 'Sugar Intake',
    description: 'Monitor your daily sugar consumption',
    fieldType: 'boolean',
    category: 'nutrition',
    icon: '🍬',
    color: '#f44336'
  },
  {
    name: 'Mood Rating',
    description: 'Track your daily mood',
    fieldType: 'rating',
    options: { maxRating: 5 },
    category: 'health',
    icon: '😊',
    color: '#2196f3'
  },
  {
    name: 'Steps Goal Met',
    description: 'Did you meet your daily steps goal?',
    fieldType: 'boolean',
    category: 'fitness',
    icon: '👟',
    color: '#ff9800'
  },
  {
    name: 'Meditation Duration',
    description: 'Track your daily meditation practice',
    fieldType: 'number',
    options: { unit: 'minutes', min: 0 },
    category: 'lifestyle',
    icon: '🧘',
    color: '#9c27b0'
  },
  {
    name: 'Reading Time',
    description: 'Track time spent reading',
    fieldType: 'number',
    options: { unit: 'minutes', min: 0 },
    category: 'productivity',
    icon: '📚',
    color: '#795548'
  },
  {
    name: 'Water Cost',
    description: 'Track spending on bottled water',
    fieldType: 'number',
    options: { unit: '$', min: 0 },
    category: 'finance',
    icon: '💧',
    color: '#00bcd4'
  }
];

const CustomLogs = () => {
  const [definitions, setDefinitions] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedDefinition, setSelectedDefinition] = useState(null);
  const [newDefinition, setNewDefinition] = useState({
    name: '',
    description: '',
    fieldType: 'number',
    options: {},
    category: 'other',
    trackStreak: true
  });
  const [entries, setEntries] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetchDefinitions();
  }, []);

  useEffect(() => {
    if (selectedDefinition) {
      fetchEntries(selectedDefinition._id);
    }
  }, [selectedDefinition]);

  const fetchDefinitions = async () => {
    try {
      const response = await fetch('/api/custom-logs/definitions', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setDefinitions(data);
    } catch (error) {
      console.error('Error fetching definitions:', error);
    }
  };

  const fetchEntries = async (definitionId) => {
    try {
      const response = await fetch(`/api/custom-logs/entries?definition=${definitionId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setEntries(data.entries);
      setStats(data.stats);
    } catch (error) {
      console.error('Error fetching entries:', error);
    }
  };

  const handleCreateEntry = async (entryData) => {
    try {
      const response = await fetch('/api/custom-logs/entries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(entryData)
      });
      
      if (response.ok) {
        fetchEntries(selectedDefinition._id);
      }
    } catch (error) {
      console.error('Error creating entry:', error);
    }
  };

  const handleCreateDefinition = async () => {
    try {
      const response = await fetch('/api/custom-logs/definitions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newDefinition)
      });

      if (response.ok) {
        setOpenDialog(false);
        fetchDefinitions();
      }
    } catch (error) {
      console.error('Error creating custom log definition:', error);
    }
  };

  const handleTemplateSelect = (template) => {
    setNewDefinition({
      ...newDefinition,
      ...template
    });
    setSelectedTemplate(template);
  };

  const renderChart = () => {
    if (!selectedDefinition || entries.length === 0) return null;
    
    const chartData = {
      labels: entries.map(entry => new Date(entry.date).toLocaleDateString()),
      datasets: [{
        label: selectedDefinition.name,
        data: entries.map(entry => entry.value),
        fill: false,
        borderColor: selectedDefinition.color || '#1976d2',
        tension: 0.1
      }]
    };

    const options = {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: `${selectedDefinition.name} Trend`
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };

    return (
      <div className="custom-log-chart">
        <Line data={chartData} options={options} />
      </div>
    );
  };

  return (
    <Box p={3}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Custom Logs</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
        >
          Create New Log
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item size={{ xs: 12, md: 4 }}>
          {definitions.map((def) => (
            <motion.div
              key={def._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedDefinition(def)}
            >
              <Card className={`custom-log-card ${selectedDefinition?._id === def._id ? 'selected' : ''}`}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6">{def.name}</Typography>
                    <Box>
                      <IconButton size="small">
                        <EditIcon />
                      </IconButton>
                      <IconButton size="small" color="error">
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                  <Typography color="textSecondary" gutterBottom>
                    {def.description}
                  </Typography>
                  {def.trackStreak && stats[def._id] && (
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                      <div className="streak-badge">
                        🔥 {stats[def._id].currentStreak} day streak
                      </div>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </Grid>

        <Grid item size={{ xs: 12, md: 8 }}>
          {selectedDefinition ? (
            <>
              <CustomLogEntry
                definition={selectedDefinition}
                onSubmit={handleCreateEntry}
              />
              {renderChart()}
            </>
          ) : (
            <Typography className="no-logs-message">
              Select a custom log to view details and add entries
            </Typography>
          )}
        </Grid>
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Create New Custom Log</DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Choose a Template (Optional)
            </Typography>
            <Grid container spacing={2}>
              {logTemplates.map((template, index) => (
                <Grid item size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                  <Card
                    className={`template-card ${selectedTemplate === template ? 'selected' : ''}`}
                    onClick={() => handleTemplateSelect(template)}
                  >
                    <CardContent>
                      <Typography variant="h3" sx={{ mb: 1 }}>{template.icon}</Typography>
                      <Typography variant="subtitle1">{template.name}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {template.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          <TextField
            fullWidth
            label="Log Name"
            value={newDefinition.name}
            onChange={(e) => setNewDefinition({ ...newDefinition, name: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Description"
            value={newDefinition.description}
            onChange={(e) => setNewDefinition({ ...newDefinition, description: e.target.value })}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Field Type</InputLabel>
            <Select
              value={newDefinition.fieldType}
              onChange={(e) => setNewDefinition({ ...newDefinition, fieldType: e.target.value })}
            >
              <MenuItem value="number">Number</MenuItem>
              <MenuItem value="boolean">Yes/No</MenuItem>
              <MenuItem value="text">Text</MenuItem>
              <MenuItem value="multipleChoice">Multiple Choice</MenuItem>
              <MenuItem value="rating">Rating</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={newDefinition.category}
              onChange={(e) => setNewDefinition({ ...newDefinition, category: e.target.value })}
            >
              <MenuItem value="health">Health</MenuItem>
              <MenuItem value="fitness">Fitness</MenuItem>
              <MenuItem value="nutrition">Nutrition</MenuItem>
              <MenuItem value="lifestyle">Lifestyle</MenuItem>
              <MenuItem value="finance">Finance</MenuItem>
              <MenuItem value="productivity">Productivity</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
          <FormControlLabel
            control={
              <Switch
                checked={newDefinition.trackStreak}
                onChange={(e) => setNewDefinition({ ...newDefinition, trackStreak: e.target.checked })}
              />
            }
            label="Track Streak"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleCreateDefinition} variant="contained" color="primary">
            Create Log
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CustomLogs;
