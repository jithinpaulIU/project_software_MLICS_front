import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate, NavLink } from 'react-router-dom';
import Auth from '../../auth';
import { customToast, CustomToastComponent } from '../../customToast';
import { 
  Avatar,
  Button,
  CssBaseline,
  Container,
  Box,
  Typography
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { styled } from '@mui/system';

// Styled components
const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: '#1977cc',
}));

const StyledForm = styled('div')(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(1),
}));

function Login() {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const login = async (fields) => {
    localStorage.clear();
    setLoader(true);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL1}login`, {
        email: fields.email,
        password: fields.password,
      });

      if (response.status === 200) {
        console.log('Login response:', response);
        const credentials = {
          email: response?.data?.user?.email,
          name: response?.data?.user?.username,
          token: response?.data?.user?.token,
          firstName: response?.data?.user?.firstName,
          lastName: response?.data?.user?.lastName,
          role: response?.data?.user?.role,
        };
        
        localStorage.setItem('user', JSON.stringify(credentials));
        localStorage.setItem('loggedin', 'true');
        console.log('Login successful:', credentials);

        Auth.login(() => {
          const userInfo = JSON.parse(localStorage.getItem('user'));
          console.log('User logged in:', userInfo);
          setLoader(false);
          if (userInfo.role === 'Admin' ) {
            navigate('/admindashboard');
          } else if (userInfo.role === 'Doctor') {
            navigate('/drdashboard');
          }
        });
      } else {
        customToast('Something Went Wrong', 'error');
      }
    } catch (error) {
      customToast('Username or password is incorrect', 'error');
    } finally {
      setLoader(false);
    }
  };

  return (
    <section id="counts" className="d-flex align-items-center">
      <div className="container">
        <StyledContainer component="main" maxWidth="xs">
          <CssBaseline />
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <center>
              <StyledAvatar>
                <LockOutlined />
              </StyledAvatar>
            </center>
            
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .email('Must be a valid email')
                  .required('Email is required'),
                password: Yup.string()
                  .min(6, 'Password must be at least 6 characters')
                  .max(12, 'Password must be at maximum of 12 characters')
                  .required('Password is required'),
              })}
              onSubmit={login}
            >
              {({ errors, touched }) => (
                <Form>
                  <StyledForm>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <Field
                        name="email"
                        type="text"
                        className={
                          'form-control' +
                          (errors.email && touched.email ? ' is-invalid' : '')
                        }
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <Field
                        name="password"
                        type="password"
                        className={
                          'form-control' +
                          (errors.password && touched.password ? ' is-invalid' : '')
                        }
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>

                    <div className="form-group" align="center">
                      <Button
                        type="submit"
                        variant="contained"
                        disabled={loader}
                        style={{
                          backgroundColor: '#1977cc',
                          color: '#FFFFFF',
                          borderRadius: '50px',
                          padding: '7px 20px',
                        }}
                      >
                        {loader ? 'Logging in...' : 'Login'}
                      </Button>
                    </div>
                  </StyledForm>
                </Form>
              )}
            </Formik>

            <Box mt={4}>
              <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                <NavLink color="inherit" to="/">
                  MLICS
                </NavLink>{' '}
                {new Date().getFullYear()}
                {'. All Rights Reserved'}
              </Typography>
            </Box>
            <CustomToastComponent />
          </Box>
        </StyledContainer>
      </div>
    </section>
  );
}

export default Login;