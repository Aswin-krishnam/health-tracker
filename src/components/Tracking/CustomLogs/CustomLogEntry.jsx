import React, { useState } from 'react';
import {
  Box,
  Card,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  Rating,
  Typography,
  FormControlLabel
} from '@mui/material';
import { motion } from 'framer-motion';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const CustomLogEntry = ({ definition, onSubmit }) => {
  const [value, setValue] = useState('');
  const [notes, setNotes] = useState('');
  const [entryDate, setEntryDate] = useState(new Date());

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      value,
      notes,
      date: entryDate,
      definition: definition._id
    });
    setValue('');
    setNotes('');
  };

  const renderField = () => {
    switch (definition.fieldType) {
      case 'number':
        return (
          <TextField
            type="number"
            label={`${definition.name}${definition.options?.unit ? ` (${definition.options.unit})` : ''}`}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            fullWidth
            required
            inputProps={{
              min: definition.options?.min,
              max: definition.options?.max,
              step: 'any'
            }}
          />
        );
      case 'boolean':
        return (
          <FormControlLabel
            control={
              <Switch
                checked={value === true}
                onChange={(e) => setValue(e.target.checked)}
              />
            }
            label={definition.name}
          />
        );
      case 'text':
        return (
          <TextField
            label={definition.name}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            fullWidth
            required
            multiline
            rows={3}
          />
        );
      case 'multipleChoice':
        return (
          <FormControl fullWidth required>
            <InputLabel>{definition.name}</InputLabel>
            <Select
              value={value}
              onChange={(e) => setValue(e.target.value)}
              label={definition.name}
            >
              {definition.options?.choices?.map((choice, index) => (
                <MenuItem key={index} value={choice}>
                  {choice}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      case 'rating':
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography component="legend">{definition.name}</Typography>
            <Rating
              value={Number(value)}
              onChange={(_, newValue) => setValue(newValue)}
              max={definition.options?.maxRating || 5}
            />
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card sx={{ p: 3, mb: 2 }}>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date"
                value={entryDate}
                onChange={(newDate) => setEntryDate(newDate)}
                maxDate={new Date()}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
            {renderField()}
            <TextField
              label="Notes (optional)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              multiline
              rows={2}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Log Entry
            </Button>
          </Box>
        </form>
      </Card>
    </motion.div>
  );
};

export default CustomLogEntry;
