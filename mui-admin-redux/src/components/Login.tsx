'use client';

import { Button, Container, IconButton, InputAdornment, Paper, TextField } from '@mui/material';
import React, { useState } from 'react';
import Grid from '@mui/material/Grid2';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/Visibility';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../Redux/store/store';
import { setEmail, setPassword, loginUser } from '../Redux/slices/login/authSlice';

export default function Login() {
    const [showPass, setShowPass] = useState(false);
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    // Access state from Redux
    const { email, password, errorMessage, isLoading } = useSelector((state: RootState) => state.auth);

    const handlePassVisibility = () => {
        setShowPass(!showPass);
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const loginData = { email, password };

        // Dispatch the thunk
        const result = await dispatch(loginUser(loginData));

        if (loginUser.fulfilled.match(result)) {
            router.push('/dashboard');
        }
    };

    return (
        <div>
            <Container maxWidth="sm">
                <Grid container spacing={2} direction="column" justifyContent="center" style={{ minHeight: '100vh' }}>
                    <Paper elevation={2} sx={{ padding: 5 }}>
                        <form onSubmit={handleLogin}>
                            <Grid container direction="column" spacing={2}>
                                <Grid>
                                    <TextField
                                        autoComplete="email"
                                        onChange={(e) => dispatch(setEmail(e.target.value))}
                                        value={email}
                                        type="email"
                                        fullWidth
                                        label="Enter your email"
                                        placeholder="Email address"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid>
                                    <TextField
                                        onChange={(e) => dispatch(setPassword(e.target.value))}
                                        value={password}
                                        type={showPass ? 'text' : 'password'}
                                        fullWidth
                                        label="Enter your password"
                                        placeholder="Password"
                                        variant="outlined"
                                        autoComplete="current-password"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={handlePassVisibility} aria-label="toggle password" edge="end">
                                                        {showPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                                {errorMessage && (
                                    <Grid>
                                        <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>
                                    </Grid>
                                )}
                                <Grid>
                                    <Button type="submit" fullWidth variant="contained" disabled={isLoading}>
                                        {isLoading ? 'Logging In...' : 'Log In'}
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </Grid>
            </Container>
        </div>
    );
}
