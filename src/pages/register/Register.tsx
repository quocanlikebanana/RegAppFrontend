import React from 'react';
import { TextField, Button, Box, Typography, Alert, CircularProgress, Slide, Grid2, Fade } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/strore';
import { register } from '../../features/auth/authSlice';
import { zodResolver } from '@hookform/resolvers/zod';


const formSchema = z.object({
	firstName: z.string().regex(/^[A-Za-z]+$/, 'First name must contain only letters'),
	lastName: z.string().regex(/^[A-Za-z]+$/, 'Last name must contain only letters'),
	email: z.string().email('Invalid email provided'),
	password: z.string().min(6, 'Password must be at least 6 characters long'),
});

type FormFields = z.infer<typeof formSchema>;

const Register: React.FC = () => {
	// API State management
	const dispatch = useDispatch<AppDispatch>();
	const { loading, error } = useSelector((state: RootState) => state.auth);

	// Form management
	const {
		register: formRegister,
		handleSubmit,
		formState: {
			errors,
		},
	} = useForm<FormFields>({
		resolver: zodResolver(formSchema),
	});
	const onSubmit: SubmitHandler<FormFields> = (data) => {
		dispatch(
			register({
				firstName: data.firstName,
				lastName: data.lastName,
				email: data.email,
				password: data.password,
			})
		);
		navigate('/');
	}

	// Navigation
	const navigate = useNavigate();
	function handleNavigate() {
		navigate('/login');
	}

	return (
		<Fade in>
			<form onSubmit={handleSubmit(onSubmit)}>
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
						<Slide in={loading} direction="up" mountOnEnter unmountOnExit>
							<CircularProgress sx={{ my: 1 }} color='primary' />
						</Slide>
						{(error) &&
							<Alert
								sx={{
									width: '100%',
									mt: 1,
									mb: 3,
								}} severity="error">
								{error}
							</Alert>
						}
						<TextField
							{...formRegister("firstName")}
							label="First Name"
							variant="outlined"
							name="firstName"
							error={Boolean(errors.firstName != null)}
							helperText={errors.firstName?.message}
							fullWidth
							sx={{ mb: 2 }}
						/>
						<TextField
							{...formRegister("lastName")}
							label="Last Name"
							variant="outlined"
							name="lastName"
							error={Boolean(errors.lastName != null)}
							helperText={errors.lastName?.message}
							fullWidth
							sx={{ mb: 2 }}
						/>
						<TextField
							{...formRegister("email")}
							label="Email"
							variant="outlined"
							name="email"
							error={Boolean(errors.email != null)}
							helperText={errors.email?.message}
							fullWidth
							sx={{ mb: 2 }}
						/>
						<TextField
							{...formRegister("password")}
							label="Password"
							variant="outlined"
							name="password"
							type="password"
							error={Boolean(errors.password != null)}
							helperText={errors.password?.message}
							fullWidth
							sx={{ mb: 2 }}
						/>

						<Grid2 container spacing={1} width={1}>
							<Grid2 size={{ xs: 12, sm: 6 }}>
								<Button type='submit' variant="contained" color="secondary" disabled={loading} fullWidth
									sx={{
										height: "3rem",
										fontWeight: 'bold',
									}}>
									Register
								</Button>
							</Grid2>
							<Grid2 size={{ xs: 12, sm: 6 }}>
								<Button variant="outlined" color="secondary" disabled={loading} onClick={handleNavigate} fullWidth
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
			</form>
		</Fade>
	);
};

export default Register;
