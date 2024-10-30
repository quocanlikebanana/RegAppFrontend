import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert, CircularProgress, Slide, Grid2, Fade } from '@mui/material';
import { backendService, BackendError } from '../../service/backend.ts';
import authService from '../../service/auth';
import { useNavigate } from 'react-router-dom';


// Define the shape of the form data and errors
interface FormData {
	username: string;
	email: string;
	password: string;
}

interface FormErrors {
	username?: string;
	email?: string;
	password?: string;
}

const Register: React.FC = () => {
	const [formData, setFormData] = useState<FormData>({
		username: '',
		email: '',
		password: '',
	});
	const [formErrors, setFormErrors] = useState<FormErrors>({});
	const [backendError, setBackendError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	function handleNavigate() {
		navigate('/login');
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (validateForm()) {
			setIsLoading(true);
			try {
				const response = await backendService.post('/user/register', formData);
				const user = response.data as {
					username: string,
					email: string
				};
				authService.setUser(user);
				setBackendError(null);
				navigate('/');
			} catch (error) {
				if (error instanceof BackendError) {
					setBackendError(error.message);
				} else {
					setBackendError('An unexpected error occurred!');
				}
			} finally {
				setIsLoading(false);
			}
		}
	};

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	function validateForm(): boolean {
		const newErrors: FormErrors = {};

		// Username
		if (!formData.username) newErrors.username = 'Username is required';

		// Email
		if (!formData.email) newErrors.email = 'Email is required';
		else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';

		// Password
		if (!formData.password) newErrors.password = 'Password is required';
		else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

		setFormErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	return (
		<Fade in>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Box
					sx={{
						width: 400,
						padding: 4,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						boxShadow: 3,
						borderRadius: 2,
						backgroundColor: '#fff',
					}}
				>
					{/* Gradient Title */}
					<Typography
						variant="h4"
						component="h1"
						sx={{
							background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
							WebkitBackgroundClip: 'text',
							WebkitTextFillColor: 'transparent',
							fontWeight: 'bold',
							mb: 3,
						}}
					>
						Create Your Account
					</Typography>

					{/* Announcement */}
					<Slide in={isLoading} direction="up" mountOnEnter unmountOnExit>
						<CircularProgress sx={{ my: 1 }} color='primary' />
					</Slide>
					{(backendError) &&
						<Alert
							sx={{
								width: '100%',
								mt: 1,
								mb: 3,
							}} severity="error">
							{backendError}
						</Alert>
					}

					<TextField
						label="Username"
						variant="outlined"
						name="username"
						value={formData.username}
						onChange={handleChange}
						error={Boolean(formErrors.username)}
						helperText={formErrors.username}
						fullWidth
						sx={{ mb: 2 }}
					/>
					<TextField
						label="Email"
						variant="outlined"
						name="email"
						value={formData.email}
						onChange={handleChange}
						error={Boolean(formErrors.email)}
						helperText={formErrors.email}
						fullWidth
						sx={{ mb: 2 }}
					/>
					<TextField
						label="Password"
						variant="outlined"
						name="password"
						type="password"
						value={formData.password}
						onChange={handleChange}
						error={Boolean(formErrors.password)}
						helperText={formErrors.password}
						fullWidth
						sx={{ mb: 2 }}
					/>

					<Grid2 container spacing={1} width={1}>
						<Grid2 size={{ xs: 12, sm: 6 }}>
							<Button variant="contained" color="secondary" disabled={isLoading} onClick={handleSubmit} fullWidth
								sx={{
									height: "3rem",
									fontWeight: 'bold',
								}}>
								Register
							</Button>
						</Grid2>
						<Grid2 size={{ xs: 12, sm: 6 }}>
							<Button variant="outlined" color="secondary" disabled={isLoading} onClick={handleNavigate} fullWidth
								sx={{
									height: "3rem",
									fontWeight: 'bold',
								}}>
								Login
							</Button>
						</Grid2>
					</Grid2>
				</Box>
			</Box>
		</Fade>
	);
};

export default Register;
