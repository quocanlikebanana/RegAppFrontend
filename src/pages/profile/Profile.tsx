import React, { useEffect, useState } from 'react';
import { Alert, Avatar, Card, CardContent, CardHeader, CircularProgress, Divider, Grid2 as Grid, IconButton, Typography } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import userService, { UserProfileInfo } from '../../service/users';
import { BackendError } from '../../service/backend';

// const user = {
// 	avatarUrl: 'https://source.unsplash.com/random',
// 	firstName: 'John',
// 	lastName: 'Doe',
// 	email: 'john.doe@example.com',
// 	joinedDate: '2021-10-01',
// 	location: 'New York, USA',
// 	bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.'
// }


const Profile: React.FC = () => {
	const [user, setUser] = useState<UserProfileInfo>();
	const [loading, setLoading] = useState(true);
	const [backendError, setBackendError] = useState<string | null>(null);

	useEffect(() => {
		setLoading(true);
		const fetchProfile = async () => {
			try {
				const data = await userService.getProfile();
				setUser(data);
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
		fetchProfile();
	}, []);

	if (loading) {
		return (
			<Card>
				<CardContent className="flex justify-center items-center h-40">
					<CircularProgress />
				</CardContent>
			</Card>
		);
	}

	if (backendError != null) {
		return (
			<Card>
				<CardContent>
					<Alert severity="error">{backendError}</Alert>
				</CardContent>
			</Card>
		);
	}

	const formattedJoinedDate = user?.joinedDate ? new Date(user.joinedDate).toLocaleDateString() : '';

	return (
		<Card>
			<CardHeader
				avatar={
					<Avatar alt={`${user?.firstName} ${user?.lastName}`} >
						{user?.firstName.charAt(0)}
					</Avatar>
				}
				action={
					<div>
						<IconButton aria-label="edit">
							<EditIcon />
						</IconButton>
						<IconButton aria-label="share">
							<ShareIcon />
						</IconButton>
					</div>
				}
				title={`${user?.firstName} ${user?.lastName}`}
				subheader={user?.email}
			/>
			<Divider />
			<CardContent>
				<Grid container spacing={2}>
					<Grid size={{ xs: 6 }}>
						<Typography variant="body2" color="text.secondary">
							Joined
						</Typography>
						<Typography variant="body1">{formattedJoinedDate}</Typography>
					</Grid>
					<Grid size={{ xs: 6 }}>
						<Typography variant="body2" color="text.secondary">
							Email
						</Typography>
						<Typography variant="body1">{user?.email}</Typography>
					</Grid>
					<Grid size={{ xs: 6 }}>
						<Typography variant="body2" color="text.secondary">
							First name
						</Typography>
						<Typography variant="body1">{user?.firstName}</Typography>
					</Grid>
					<Grid size={{ xs: 6 }}>
						<Typography variant="body2" color="text.secondary">
							Last name
						</Typography>
						<Typography variant="body1">{user?.lastName}</Typography>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
};

export default Profile;