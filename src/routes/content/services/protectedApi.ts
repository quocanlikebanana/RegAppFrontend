import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { backendURL } from '../../../app/env';
import { RootState } from '../../../app/store';
import ClientError from '../../../error/client.error';

const protectedApiReducerPath = 'protectedApi';

const protectedBaseQuery = fetchBaseQuery({
	baseUrl: backendURL,
	prepareHeaders: (headers, { getState }) => {
		const token = (getState() as RootState).auth.token;
		if (token == null) {
			throw new ClientError('Unauthorized');
		}
		headers.set('Authorization', `Bearer ${token}`);
		return headers;
	},
});

// Define a service using a base URL and expected endpoints
const protectedApi = createApi({
	reducerPath: protectedApiReducerPath,
	baseQuery: protectedBaseQuery,
	endpoints: (builder) => ({
		logout: builder.mutation<void, void>({
			query: () => ({
				url: 'auth/logout',
				method: 'GET',
			})
		}),
	}),
});

// Export hooks for usage in functional components
export const { useLogoutMutation } = protectedApi;
export default protectedApi;