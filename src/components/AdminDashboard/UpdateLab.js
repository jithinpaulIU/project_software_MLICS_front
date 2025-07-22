import { useState } from 'react';
import axios from 'axios';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { 
  Button,
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useDispatch } from 'react-redux';
import { FetchLab } from '../../store/actions/fetchaction';
import { customToast } from '../../customToast';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  address: Yup.string().required('Address is required'),
  email: Yup.string()
    .email('Must be a valid email')
    .required('Email is required'),
});

const UpdateLabModel = ({ open, onClose, dataToUpdate }) => {
  const [phoneNumber, setPhoneNumber] = useState(dataToUpdate?.Phone || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      const userInfo = JSON.parse(localStorage.getItem('user') || '{}') ;
      
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          'Content-Type': 'application/json',
        },
      };

      const body = {
        name: values.name,
        address: values.address,
        email: values.email,
        mobileNo: phoneNumber,
      };

      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}lab/${dataToUpdate.id}`,
        body,
        config
      );

      if (response.status === 200) {
        customToast('Lab updated successfully', 'success');
        dispatch(FetchLab());
        onClose();
      }
    } catch (error) {
      console.error('Error updating lab:', error);
      customToast(
        error.response?.data?.message || 'Error updating lab', 
        'error'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Update Lab</Typography>
          <IconButton onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      
      <DialogContent dividers>
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} />
            
            <Formik
              initialValues={{
                name: dataToUpdate?.Name || '',
                address: dataToUpdate?.Address || '',
                email: dataToUpdate?.Email || '',
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, handleChange, values }) => (
                <Form style={{ width: '100%', marginTop: 1 }}>
                  <TextField
                    margin="normal"
                    fullWidth
                    id="name"
                    label="Lab Name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                  
                  <TextField
                    margin="normal"
                    fullWidth
                    id="address"
                    label="Address"
                    name="address"
                    multiline
                    rows={3}
                    value={values.address}
                    onChange={handleChange}
                    error={touched.address && Boolean(errors.address)}
                    helperText={touched.address && errors.address}
                  />
                  
                  <TextField
                    margin="normal"
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                  
                  <Box mt={2} mb={2}>
                    <Typography variant="subtitle2" gutterBottom>
                      Phone Number
                    </Typography>
                    <PhoneInput
                      defaultCountry="US"
                      value={phoneNumber}
                      onChange={setPhoneNumber}
                      style={{ width: '100%' }}
                    />
                  </Box>
                  
                  <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Updating...' : 'Update Lab'}
                    </Button>
                  </DialogActions>
                </Form>
              )}
            </Formik>
          </Box>
        </Container>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateLabModel;