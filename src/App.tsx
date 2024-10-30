import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './pages/error/Error';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/home/Home';
import authService from './service/auth';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Layout from './layouts/Layout';
import InsideLayout from './layouts/SubLayout/InsideLayout';
import OutsideLayout from './layouts/SubLayout/OutsideLayout';


const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/register",
				element:
					<OutsideLayout>
						<Register />
					</OutsideLayout>
			},
			{
				path: "/login",
				element:
					<OutsideLayout>
						<Login />
					</OutsideLayout>
			},
			{
				path: "/",
				element: <ProtectedRoute protectorFunction={() => authService.isAuthenticated()} element={
					<InsideLayout >
						<Home />
					</InsideLayout>
				} />
			}
		]
	}
], {
	basename: '/Register-App/'
});

function App() {
	return (
		<RouterProvider router={router} />
	);
}

export default App;