import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

interface TableRow {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  designation: string;
  gender: string;
  course: string;
  image: string;
}

interface TableWithPaginationProps {
  employees: TableRow[];
  onDelete: (id: string) => void;
  isLoading: boolean;
  currentPage: number;
  totalData: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  getRowClass: (employee: any) => string;
}

const ATMTable: React.FC<TableWithPaginationProps> = ({
  employees,
  onDelete,
  isLoading,
  currentPage,
  totalData,
  totalPages,
  onPageChange,
  getRowClass,
}) => {
  const rowsPerPage = 5; // Adjust the number of rows per page

  // Calculate the rows to display based on currentPage
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = employees.slice(indexOfFirstRow, indexOfLastRow);

  // Handlers for pagination
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="overflow-x-auto">
      {/* Table */}
      <table className="min-w-full border border-collapse border-gray-200 table-auto">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 border border-gray-300 text-[#58bf81] font-medium">
              ID
            </th>
            <th className="px-4 py-2 border border-gray-300 text-[#58bf81] font-medium">
              Image
            </th>
            <th className="px-4 py-2 border border-gray-300 text-[#58bf81] font-medium">
              Name
            </th>
            <th className="px-4 py-2 border border-gray-300 text-[#58bf81] font-medium">
              Email
            </th>
            <th className="px-4 py-2 border border-gray-300 text-[#58bf81] font-medium">
              Mobile No
            </th>
            <th className="px-4 py-2 border border-gray-300 text-[#58bf81] font-medium">
              Designation
            </th>
            <th className="px-4 py-2 border border-gray-300 text-[#58bf81] font-medium">
              Gender
            </th>
            <th className="px-4 py-2 border border-gray-300 text-[#58bf81] font-medium">
              Course
            </th>
            <th className="px-4 py-2 border border-gray-300 text-[#58bf81] font-medium">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row) => (
            <tr key={row._id} className={getRowClass(row)}>
              <td className="px-4 py-2 border border-gray-300">{row._id}</td>
              <td className="px-4 py-2 border border-gray-300">
                <img
                  src={`/${row?.image.replace(/\\/g, "/")}`}
                  alt="image-employee"
                  className="w-12 h-12 object-cover"
                />
              </td>
              <td className="px-4 py-2 border border-gray-300">{row.name}</td>
              <td className="px-4 py-2 border border-gray-300">{row.email}</td>
              <td className="px-4 py-2 border border-gray-300">{row.mobile}</td>
              <td className="px-4 py-2 border border-gray-300">
                {row.designation}
              </td>
              <td className="px-4 py-2 border border-gray-300">{row.gender}</td>
              <td className="px-4 py-2 border border-gray-300">{row.course}</td>
              <td className="flex gap-2 px-4 py-2 border border-gray-300">
                {/* Action buttons like Delete, Edit, etc. */}
                <Link
                  to={`/dashboard/employee-edit/${row._id}`}
                  className="text-sky-500 hover:text-sky-800"
                >
                  <FaRegEdit className="text-2xl lg:text-xl" />
                </Link>
                <button
                  onClick={() => onDelete(row._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <MdDeleteOutline className="text-2xl lg:text-xl" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 text-white bg-blue-500 rounded disabled:bg-gray-300"
        >
          Previous
        </button>

        <div className="text-center">
          <span>
            Page {currentPage} of {totalPages}
          </span>
        </div>

        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-white bg-blue-500 rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>

      {/* Mobile Pagination (for smaller screens) */}
      <div className="flex justify-center mt-4 sm:hidden">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mr-2 text-white bg-blue-500 rounded disabled:bg-gray-300"
        >
          Prev
        </button>
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-white bg-blue-500 rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ATMTable;
