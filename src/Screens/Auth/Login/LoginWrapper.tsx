import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as Yup from "yup"
import { toast } from 'react-toastify';
import { setToken } from '../../../Service/Slices/Auth/AuthSlice';
import { Form, Formik } from 'formik';
import { useLoginMutation } from '../../../Service/Api/adminService';
import Login from './Login';


const LoginWrapper = () => {

  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = async (
    values: { email: string; password: string },
    { setSubmitting, setErrors }: { setSubmitting: (isSubmitting: boolean) => void; setErrors: (errors: any) => void }
  ) => {
    setSubmitting(true); // Start submitting state
    try {
        
      const admin = await login(values);
    
       const { data } = admin;
      const token = data?.token;
      const name = data?.name; 
      if (data?.status) {
      toast.success(data?.message);
      localStorage.setItem('userName', name); // Save user name

      dispatch(setToken(token));
      navigate("/dashboard");
      }else{
        toast.error(data?.message);
      }
      
    } catch (error) {
      // Handle unexpected errors
      setErrors({ api: "An unexpected error occurred. Please try again." });
    } finally {
      setSubmitting(false); // Reset submitting state
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Plase enter email '),
    password: Yup.string().min(4, 'Password must be at least 4 characters').required('Plase enter password'),
  });
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
    {
        (formikProps)=>{
      return (
        <Form> 
            <Login formikProps={formikProps}/>
        </Form>
      )
        }
    }
</Formik>

  )
}

export default LoginWrapper