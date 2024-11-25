import { api } from "./ApiService";
const adminService = api.injectEndpoints({
    endpoints: (bulder) => ({
     // login End point
    login: bulder.mutation({
    query: ({ email, password }) => ({
      url: "admin/login",
      method: "POST",
      body: { email, password },
    }),
  }),
    })
})


export const {
    useLoginMutation
  } = adminService;









