import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import DashboardLayout from './layOuts/DashboardLayout'
import ErrorPage from './Components/ErrorPage'
import Dashboard from './Screens/Dashboard'
import EmployeeListingWrapper from './Screens/Employee/List/EmployeeListingWrapper'
import AddEmployeeWrapper from './Screens/Employee/Add/AddEmployeeWrapper'
import Auth from './Screens/Auth/Auth'
import LoginWrapper from './Screens/Auth/Login/LoginWrapper'
import EmployeeEditWrapper from './Screens/Employee/Edit/EmployeeEditWrapper'

type Props = {}

const PageRoutes = (props: Props) => {
    const router = createBrowserRouter([
        {
            path:"/",
            element:<Auth><LoginWrapper/></Auth>
        },
        {
            path:"/dashboard",
            element:(
                <Auth><DashboardLayout/></Auth>
            ),
           errorElement: <ErrorPage/>,
           children:[
            {
                path:"",
                element:<Dashboard/>
            },
            {
                path:"employee",
                element: <EmployeeListingWrapper/>
            },
            {
                path:"add-Employee",
                element:<AddEmployeeWrapper/>
            },
            {
                path: "employee-edit/:id",
                element: <EmployeeEditWrapper/>,
              },
            
           ]
        }
    ])
  return (
    <RouterProvider router={router}/>
  )
}

export default PageRoutes