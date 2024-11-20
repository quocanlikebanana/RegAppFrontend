import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from '../stores/authSlice';
import authApi from '../routes/auth/services/authApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import protectedApi from '../routes/content/services/protectedApi';


// Create the root reducer so it can be used in configureStore
const rootReducer = combineReducers({
	auth: authReducer,
	authApi: authApi.reducer,
	protectedApi: protectedApi.reducer,
});

const store = configureStore({
	reducer: rootReducer,
	middleware:
		(getDefaultMiddleware) =>
			getDefaultMiddleware({
				serializableCheck: false,
			})
				.concat(authApi.middleware)
				.concat(protectedApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

setupListeners(store.dispatch);

// Only used in App.tsx
export default store;