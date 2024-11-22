import protectedApi from "../../services/protectedApi";

export const workCreateApi = protectedApi.injectEndpoints({
    endpoints: () => ({
    }),
    overrideExisting: false,
});