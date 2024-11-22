import protectedApi from "./protectedApi";

const logoutApi = protectedApi.injectEndpoints({
    endpoints: (builder) => ({
        logout: builder.mutation<void, void>({
            query: () => ({
                url: 'auth/logout',
                method: 'GET',
            })
        }),
    }),
    overrideExisting: true,
});

export default logoutApi;