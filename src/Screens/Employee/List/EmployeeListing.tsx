import React, { useState } from "react";
import { ATMButton } from "../../../Components/Atoms/Buttons/ATMButton";
import ATMSearchBar from "../../../Components/Atoms/SearchBars/ATMSearchBar";
import ATMTable from "../../../Components/Atoms/Tables/ATMTable";
import { useNavigate } from "react-router-dom";
import { useSearchEmployeesQuery } from "../../../Service/Api/employeeService";

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

interface EmployeeListProps {
  employees: Employee[];
  onDelete: (id: string) => void;
  isLoading: boolean;
  currentPage: number;
  totalData: number;
  totalPages: number;
}

const EmployeeListing: React.FC<EmployeeListProps> = ({
  employees,
  onDelete,
  isLoading,
  currentPage,
  totalData,
  totalPages,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

   useSearchEmployeesQuery({ searchValue });

  // Function to handle page changes
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      navigate(`/dashboard/employees?page=${page}`);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  // Function to check if any field of the employee matches the search query
  const isMatch = (employee: Employee, searchValue: string) => {
    return (
      employee.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchValue.toLowerCase()) ||
      employee.mobile.toLowerCase().includes(searchValue.toLowerCase()) ||
      employee.designation.toLowerCase().includes(searchValue.toLowerCase()) ||
      employee.gender.toLowerCase().includes(searchValue.toLowerCase()) ||
      employee.course.toLowerCase().includes(searchValue.toLowerCase())
    );
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Heading with Add btn */}
      <div className="flex items-center justify-between ">
        <div className="text-2xl font-semibold text-slate-700">Employee</div>
        <div>
          <ATMButton
            variant="filled"
            color="success"
            size="md"
            children="Add Employee"
            onClick={() => navigate("/dashboard/add-employee")}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 p-4 overflow-auto border rounded border-slate-300">
        {/* Table Toolbar */}
        <ATMSearchBar value={searchValue} onChange={handleSearchChange} />

        {/* Table */}
        <ATMTable
          employees={employees}
          onDelete={onDelete}
          isLoading={isLoading}
          currentPage={currentPage}
          totalData={totalData}
          totalPages={totalPages}
          onPageChange={handlePageChange} // Pass the handler
          // Pass the search term and check for matching rows
          getRowClass={(employee: Employee) => isMatch(employee, searchValue) ? "bg-yellow-100" : ""}
        />
      </div>
    </div>
  );
};

export default EmployeeListing;
