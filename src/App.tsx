import './App.css'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import ErrorPage from './pages/error/Error';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/home/Home';
import Register from './pages/register/Register';
import LoginForm from './pages/login/Login';
import Layout from './layouts/Layout';
import InsideLayout from './layouts/SubLayout/InsideLayout';
import OutsideLayout from './layouts/SubLayout/OutsideLayout';
import { Provider } from 'react-redux';
import store from './app/strore';
import Profile from './pages/profile/Profile';


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
						<LoginForm />
					</OutsideLayout>
			},
			{
				// Remember the order of the routes, the protected route should be below the login routes
				path: "/",
				children: [
					{
						path: "/",
						element: <Home />
					},
					{
						path: "/profile",
						element: <Profile />
					}
				],
				element:
					<ProtectedRoute element={
						<InsideLayout >
							<Outlet />
						</InsideLayout>
					} >
					</ProtectedRoute>
			}
		]
	}
], {
	basename: '/RegAppFrontend/'
});

function App() {
	return (
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	);
}

export default App;