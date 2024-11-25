import React from 'react'
import EmployeeForm from './components/EmployeeAddForm'
import { useCreateEmployeeMutation } from '../../../Service/Api/employeeService'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import * as Yup from "yup";



const AddEmployeeWrapper = () => {

  const [createEmployee] =useCreateEmployeeMutation()
  const navigate = useNavigate()

  const initialValues = {
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: "",
    image: "",
  }

  // Define validation schema using Yup
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



  const handleSubmit = async (values: any, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    setSubmitting(true);
    try {
      const response = await createEmployee(values);
      const { status, message } = response.data;
      if (status) {
        toast.success(message);
        navigate('/dashboard/employee');
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error('Error adding category. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/dashboard/employee');
  };

  return (
    <EmployeeForm 
    initialValues={initialValues}
    onSubmit={handleSubmit}
    btnLabel="Submit"
    validationSchema={validationSchema}
    onCancel={handleCancel}/>
  )
}

export default AddEmployeeWrapper