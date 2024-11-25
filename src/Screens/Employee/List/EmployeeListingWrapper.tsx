import React, { useEffect, useState } from "react";
import EmployeeListing from "./EmployeeListing";
import { useDeleteEmployeeMutation, useGetEmployeeQuery } from "../../../Service/Api/employeeService";
import Swal from "sweetalert2";

interface Employee {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  designation: string;
  gender: string;
  course: string;
  image: string;
}
const EmployeeListingWrapper = () => {
  const { data, isLoading } = useGetEmployeeQuery(0);
  const [deleteCategory] = useDeleteEmployeeMutation()

  const currentPage = data?.currentPage;
  const totalPages = data?.totalPages;
  const totalData = data?.totalData;
  
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    if (data && Array.isArray(data.data)) {
      const mappedEmployees = data.data.map(
        (employee: {
          _id: string;
          name: string;
          email: string;
          mobile: string;
          designation: string;
          gender: string;
          course: string;
          image: string;
        }) => ({
          _id: employee._id,
          name: employee.name,
          email: employee.email,
          mobile: employee.mobile,
          designation: employee.designation,
          gender: employee.gender,
          course: employee.course,
          image: employee.image,
        })
      );

      setEmployees(mappedEmployees);
    } else {
      setEmployees([]); // If no valid employees, reset to empty array
    }
  }, [data]);

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result: any) => {
      if (result.isConfirmed) {
        try {
          // Delete category using API service
          await deleteCategory(id).unwrap();
          setEmployees(employees.filter((employee) => employee._id !== id)); // Update state after deletion
          Swal.fire('Deleted!', 'The category has been deleted.', 'success');
        } catch (error) {
          Swal.fire('Error!', 'There was an error deleting the category.', 'error');
        }
      }
    });
  };

  return (
    <EmployeeListing
      employees={employees}
      onDelete={handleDelete}
      isLoading={isLoading}
      currentPage={currentPage}
      totalData={totalData}
      totalPages={totalPages}
    />
  );
};

export default EmployeeListingWrapper;
