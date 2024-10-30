import { Container, Typography, Box, Card, CardContent, Avatar, Alert } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React, { useEffect, useState } from 'react';
import userService, { UserInfo } from '../../service/users';
import { BackendError } from '../../service/backend';


const Home: React.FC = () => {
	const [users, setUsers] = useState<UserInfo[]>([]);
	const [loading, setLoading] = useState(true);
	const [backendError, setBackendError] = useState<string | null>(null);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const users = await userService.getAll();
				setUsers(users);
				setBackendError(null);
			} catch (error) {
				if (error instanceof BackendError) {
					setBackendError(error.message);
				} else {
					setBackendError('An error has occurred.');
				}
			} finally {
				setLoading(false);
			}
		};

		fetchUsers();
	}, []);

	const errorDisplay = backendError ? (
		<Alert severity="error" sx={{ my: 2, width: 1 }}>
			{backendError}
		</Alert>
	) : null;

	const loadingDisplay = loading ? (
		<Typography variant="body2">Loading...</Typography>
	) : null;

	return (
		<Container maxWidth="lg">
			{/* Header Section */}
			<Box sx={{ textAlign: 'center', my: 5 }}>
				<Typography variant="h2" gutterBottom>
					Register for the Conference
				</Typography>
				<Typography variant="h5" color="textSecondary	">
					Connect with experts and enthusiasts in marine and environmental sciences
				</Typography>
			</Box>

			{/* User List Section */}
			<Box sx={{ my: 4 }}>
				<Typography variant="h4" gutterBottom>
					Attendees
				</Typography>

				{/* Message Display */}
				{errorDisplay}
				{loadingDisplay}

				<Grid container spacing={3}>
					{users.map(user => (
						<Grid size={
							{
								xs: 12,
								sm: 6,
								md: 4,
								lg: 3,
							}} key={user.id}>
							<Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>
								<Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56, mb: 2 }}>
									{user.username.charAt(0)}
								</Avatar>
								<CardContent>
									<Typography variant="h6">{user.username}</Typography>
									<Typography variant="body2" color="textSecondary">
										{user.email}
									</Typography>
								</CardContent>
							</Card>
						</Grid>
					))}
				</Grid>
			</Box>
		</Container>
	);
}

export default Home;
