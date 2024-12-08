import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetEmployeeByIdQuery, useUpdateEmployeeMutation } from '../../../Service/Api/employeeService';
import * as Yup from 'yup';
import EmployeeEditForm from './components/EmployeeEditForm';
import { toast } from 'react-toastify';

const EmployeeEditWrapper = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Fetch employee data by ID
  const { data: employee, isLoading, isError } = useGetEmployeeByIdQuery(id || '');
  
  // State to store initial form values
  const initialValues = {
    name: employee?.data?.name || '',
    email: employee?.data?.email || '',
    mobile: employee?.data?.mobile || '',
    designation: employee?.data?.designation || '',
    gender: employee?.data?.gender || 'Male',
    course: employee?.data?.course || '',
    image: employee?.data?.image || null,
  }

  // Mutation to create employee
  const [editEmployee, { isLoading: isCreating }] = useUpdateEmployeeMutation();

  // Redirect if no ID is found
  useEffect(() => {
    if (!id) {
      navigate("/employees");
    }
  }, [id, navigate]);



  // Loading state while waiting for employee data
  if (isLoading) return <div>Loading...</div>;

  // Handle error when fetching employee
  if (isError) return <div>Error loading employee data.</div>;

  // Validation schema for the form
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
      .required("Mobile number is required"),
    designation: Yup.string().required("Designation is required"),
    gender: Yup.string().required("Gender is required"),
    course: Yup.string().required("Course is required"),
    image: Yup.mixed().required("Image is required"),
  });

  // Form submit handler
  const handleSubmit = async (values: any, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
  
    try {
        const response = await editEmployee({ id, data: values }).unwrap();
        
        const { status, message } = response;
        if (status) {
          toast.success(message);
          navigate('/dashboard/employee');
        } else {
          toast.error(message);
        }
      } catch (error) {

        toast.error('Error adding Employee. Please try again.');
      } finally {
        setSubmitting(false);
      }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <EmployeeEditForm
        initialValues={initialValues} // Pass updated initial values
        onSubmit={handleSubmit}
        btnLabel={isCreating ? 'Saving...' : 'Save'}
        onCancel={() => navigate("/dashboard/employee")}
        validationSchema={validationSchema}
      />
    </div>
  );
};

export default EmployeeEditWrapper;
