import React, { useState } from 'react';
import { LayoutProps } from './Contract';
import { AppBar, Box, Button, Container, createTheme, CssBaseline, Divider, Drawer, Fade, IconButton, List, ListItem, ListItemButton, ListItemText, Switch, ThemeProvider, Toolbar, Typography } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import beachImage from '../../assets/beach.jpg';
import authService from '../../service/auth';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;


const InsideLayout: React.FC<LayoutProps> = ({ children }) => {
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const [isDarkMode, setMode] = useState(false);
	const navigate = useNavigate();

	const darkTheme = createTheme({
		palette: {
			mode: isDarkMode ? 'dark' : 'light',
		},
	});

	function handleLogout() {
		authService.removeUser();
		navigate('/login');
	}

	function handleToggleColorMode() {
		setMode(!isDarkMode);
	}

	function handleDrawerToggle() {
		setMobileOpen((prevState) => !prevState);
	};

	const drawer = (
		<Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
			<Typography variant="h6" sx={{ my: 2 }}>
				Beach Conference 2024
			</Typography>
			<Divider />
			<List>
				<ListItem disablePadding>
					<ListItemButton sx={{ textAlign: 'center' }} onClick={handleLogout}>
						<ListItemText primary="Logout" />
					</ListItemButton>
				</ListItem>
			</List>
		</Box>
	);

	return (
		<ThemeProvider theme={darkTheme}>
			<Fade in>
				<Box sx={{
					display: 'flex',
					backgroundImage: 'url(' + beachImage + ')',
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					position: 'relative',
					minHeight: '100vh',
					hieght: '100%',
					'::before': {
						content: '""',
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						backgroundColor: isDarkMode ? `rgba(0, 0, 0, 0.4)` : `rgba(255, 255, 255, 0.2)`,
						zIndex: 1,
					},
				}}>
					<CssBaseline />

					<AppBar component="nav">
						<Toolbar>
							<IconButton
								color="inherit"
								aria-label="open drawer"
								edge="start"
								onClick={handleDrawerToggle}
								sx={{ mr: 2, display: { sm: 'none' } }}
							>
								<MenuIcon />
							</IconButton>
							<Typography
								variant="h6"
								component="div"
								sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
							>
								Beach Conference 2024
							</Typography>

							<Box sx={{
								ml: 'auto',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								color: '#fff',
							}}>
								<Typography fontSize={'1.5em'}>
									{isDarkMode ? '🌚' : '🌞'}
								</Typography>
								<Switch
									onChange={handleToggleColorMode}
								/>
							</Box>

							<Box sx={{ display: { xs: 'none', sm: 'block' } }}>
								<Button sx={{ color: '#fff' }} onClick={handleLogout}>
									Logout
								</Button>
							</Box>
						</Toolbar>
					</AppBar>
					<nav>
						<Drawer
							variant="temporary"
							open={mobileOpen}
							onClose={handleDrawerToggle}
							ModalProps={{
								keepMounted: true, // Better open performance on mobile.
							}}
							sx={{
								display: { xs: 'block', sm: 'none' },
								'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
							}}
						>
							{drawer}
						</Drawer>
					</nav>

					{/* Main Content */}
					<Box
						component="main"
						sx={{
							flexGrow: 1,
							p: 3,
							width: { sm: `calc(100% - ${drawerWidth}px)` },
							position: 'relative',
							zIndex: 2,
						}}
					>
						<Toolbar />
						<Container>
							{children} {/* This will render the content passed as children */}
						</Container>
					</Box>
				</Box>
			</Fade>
		</ThemeProvider>
	);
};

export default InsideLayout;
