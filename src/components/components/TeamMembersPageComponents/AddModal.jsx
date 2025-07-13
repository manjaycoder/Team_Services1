import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, Grid } from '@mui/material';
import PropTypes from 'prop-types';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 600,
  maxHeight: '90vh',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const initialEmployee = {
  EmpId: '',
  Name: '',
  Grade: '',
  Designation: '',
  Project: '',
  Skills: '',
  Location: '',
  ContactNo: '',
};

const AddModal = ({ open, handleClose, handleSave }) => {
  const [newEmployee, setNewEmployee] = useState(initialEmployee);
  const [errors, setErrors] = useState({});

  // Reset form on modal close
  useEffect(() => {
    if (!open) {
      setNewEmployee(initialEmployee);
      setErrors({});
    }
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;

    // Only allow digits in ContactNo
    if (name === 'ContactNo') {
      updatedValue = updatedValue.replace(/\D/g, '');
    }

    setNewEmployee((prev) => ({
      ...prev,
      [name]: updatedValue.trimStart(), // Prevents leading spaces
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const validateForm = () => {
    const validationErrors = {};
    Object.keys(newEmployee).forEach((field) => {
      if (!newEmployee[field]) {
        validationErrors[field] = `${field} is required`;
      }
    });

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleSave(newEmployee);
      handleClose(); // Optional: close after save
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="add-employee-modal"
      aria-describedby="add-employee-modal-description"
    >
      <Box sx={style} component="form" onSubmit={handleSubmit}>
        <Typography id="add-employee-modal" variant="h6" mb={2}>
          Add Employee
        </Typography>

        <Grid container spacing={2}>
          {Object.entries(newEmployee).map(([field, value]) => (
            <Grid key={field} item xs={12} sm={6}>
              <TextField
                label={field}
                name={field}
                value={value}
                onChange={handleChange}
                fullWidth
                margin="dense"
                required
                error={!!errors[field]}
                helperText={errors[field]}
              />
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
          <Button onClick={handleClose} variant="outlined" color="secondary">
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

AddModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
};

export default AddModal;
