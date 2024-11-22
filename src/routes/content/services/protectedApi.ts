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

// Create a new empty API with the base query and the reducer path to be injected by groups of APIs.
const protectedApi = createApi({
	reducerPath: protectedApiReducerPath,
	baseQuery: protectedBaseQuery,
	endpoints: () => ({}),
});

export default protectedApi;