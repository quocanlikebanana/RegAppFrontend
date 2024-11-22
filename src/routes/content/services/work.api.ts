import { WorkCard } from "../types/work";
import protectedApi from "./protectedApi";

export const workCreateApi = protectedApi.injectEndpoints({
    endpoints: (builder) => ({
        getAll: builder.query<WorkCard[], void>({
            query: () => 'work',
        }),
    }),
    overrideExisting: true,
});