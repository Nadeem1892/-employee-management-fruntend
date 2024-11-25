import { api } from "./ApiService"

const employeeService = api.injectEndpoints({
    endpoints: (bulder) => ({

        getEmployee: bulder.query({
          query: ({ page = 1, limit = 10 }) => ({
            url: 'employee/employee-list',  // Endpoint for getting employee list
            method: 'GET',
            params: { page, limit },  // Pass pagination parameters
          }),
            providesTags: ["employee"],
          }),

          getEmployeeById: bulder.query({
            query: (id) => ({
              url: `employee/get-employee/${id}`,
              method: "GET",
            }),
          }),

        createEmployee: bulder.mutation({
        query:(data) => ({
            url: "employee/create-employee",
            method:"POST",
            body: data,
        }),
        invalidatesTags: ["employee"],
        }),
         
    updateEmployee: bulder.mutation({
      query: ({ id, data }) => ({
        url: `employee/update-employee/${id}`,
        method: 'PATCH',
        body: data, // Pass the updated employee data in the request body
      }),
      invalidatesTags: ["employee"], // Invalidate cache for that specific employee after update
    }),
    deleteEmployee: bulder.mutation({
      query: (id) => ({
        url: `employee/delete-employee/${id}`, // Endpoint for deleting employee
        method: 'DELETE',
      }),
      invalidatesTags: ["employee"], // Optionally invalidate cache for employee list
    }),
    searchEmployees: bulder.query({
      query: ({ searchQuery }) => ({
        url: 'employee/search',
        method: 'GET',
        params: { searchQuery },  // Pass search query and status filter
      }),
      providesTags: ['employee'], // Ensure cache is handled properly for search
    }),
    })
})

export const { useCreateEmployeeMutation, useGetEmployeeQuery, useGetEmployeeByIdQuery, useUpdateEmployeeMutation, useDeleteEmployeeMutation, useSearchEmployeesQuery } = employeeService