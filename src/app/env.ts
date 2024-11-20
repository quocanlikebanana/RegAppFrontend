const backendURL = import.meta.env.VITE_BACKEND_URL as string;
const isDevelopment = import.meta.env.DEV;

const noAuth = isDevelopment ? import.meta.env.VITE_NO_AUTH as boolean : false;

export {
	backendURL,
	isDevelopment,
	noAuth,
};