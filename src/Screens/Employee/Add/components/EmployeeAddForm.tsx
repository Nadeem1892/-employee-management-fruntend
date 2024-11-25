import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

interface AtmFormProps<T extends Record<string, any>> {
  initialValues: T;
  onSubmit: (
    values: T,
    actions: {
      setSubmitting: (isSubmitting: boolean) => void;
      setErrors: (errors: any) => void;
    }
  ) => Promise<void>;
  btnLabel: string;
  onCancel: () => void;
  validationSchema: Yup.ObjectSchema<any>;
}

const EmployeeForm = <T extends Record<string, any>>({
  initialValues,
  onSubmit,
  btnLabel,
  onCancel,
  validationSchema,
}: AtmFormProps<T>) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, setFieldValue, touched, errors }) => (
        <Form className="p-4 mt-10 space-y-6 shadow-md" encType="multipart/form-data">
          {/* Heading */}
          <div className="text-2xl font-semibold">Create Employee</div>

          {/* Name & Email */}
          <div className="flex gap-5">
            {/* Name */}
            <div className="relative w-full">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <Field
                id="name"
                name="name"
                type="text"
                className={`block w-full px-4 py-2 mt-1 border shadow-sm outline-none rounded-md transition-all duration-300 ${
                  touched.name && errors.name
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:ring-2 focus:ring-sky-500 focus:border-sky-500`}
              />
              {touched.name && errors.name && typeof errors.name === "string" && (
                <div className="absolute mt-1 text-sm text-red-500">
                  {errors.name}
                </div>
              )}
            </div>

            {/* Email */}
            <div className="relative w-full">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                className={`block w-full px-4 py-2 mt-1 border shadow-sm outline-none rounded-md transition-all duration-300 ${
                  touched.email && errors.email
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:ring-2 focus:ring-sky-500 focus:border-sky-500`}
              />
              {touched.email && errors.email && typeof errors.email === "string" && (
                <div className="absolute mt-1 text-sm text-red-500">
                  {errors.email}
                </div>
              )}
            </div>
          </div>

          {/* Mobile & Designation */}
          <div className="flex gap-5">
            {/* Mobile No */}
            <div className="relative w-full">
              <label
                htmlFor="mobile"
                className="block text-sm font-medium text-gray-700"
              >
                Mobile No
              </label>
              <Field
                id="mobile"
                name="mobile"
                type="tel"
                className={`block w-full px-4 py-2 mt-1 border shadow-sm outline-none rounded-md transition-all duration-300 ${
                  touched.mobile && errors.mobile
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:ring-2 focus:ring-sky-500 focus:border-sky-500`}
              />
              {touched.mobile && errors.mobile && typeof errors.mobile === "string" && (
                <div className="absolute mt-1 text-sm text-red-500">
                  {errors.mobile}
                </div>
              )}
            </div>

            {/* Designation */}
            <div className="relative w-full">
              <label
                htmlFor="designation"
                className="block text-sm font-medium text-gray-700"
              >
                Designation
              </label>
              <Field
                id="designation"
                name="designation"
                type="text"
                className={`block w-full px-4 py-2 mt-1 border shadow-sm outline-none rounded-md transition-all duration-300 ${
                  touched.designation && errors.designation
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:ring-2 focus:ring-sky-500 focus:border-sky-500`}
              />
              {touched.designation && errors.designation && typeof errors.designation === "string" && (
                <div className="absolute mt-1 text-sm text-red-500">
                  {errors.designation}
                </div>
              )}
            </div>
          </div>

          {/* Gender */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <div className="mt-1 space-x-4">
              <label className="inline-flex items-center">
                <Field
                  type="radio"
                  name="gender"
                  value="Male"
                  className="text-blue-500 form-radio"
                />
                <span className="ml-2">Male</span>
              </label>
              <label className="inline-flex items-center">
                <Field
                  type="radio"
                  name="gender"
                  value="Female"
                  className="text-blue-500 form-radio"
                />
                <span className="ml-2">Female</span>
              </label>
            </div>
            {touched.gender && errors.gender && typeof errors.gender === "string" && (
              <div className="absolute mt-1 text-sm text-red-500">
                {errors.gender}
              </div>
            )}
          </div>

          {/* Course & Upload Image */}
          <div className="flex gap-5">
            {/* Course */}
            <div className="relative w-full">
              <label
                htmlFor="course"
                className="block text-sm font-medium text-gray-700"
              >
                Course
              </label>
              <Field
                id="course"
                name="course"
                type="text"
                className={`block w-full px-4 py-2 mt-1 border shadow-sm outline-none rounded-md transition-all duration-300 ${
                  touched.course && errors.course
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:ring-2 focus:ring-sky-500 focus:border-sky-500`}
              />
              {touched.course && errors.course && typeof errors.course === "string" && (
                <div className="absolute mt-1 text-sm text-red-500">
                  {errors.course}
                </div>
              )}
            </div>

            {/* Image Upload */}
            <div className="relative w-full">
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700"
              >
                Upload Image
              </label>
              <input
                id="image"
                name="image"
                type="file"
                className={`block w-full p-2 mt-1 text-gray-700 border border-gray-300 rounded-lg ${
                  touched.image && errors.image
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:ring-2 focus:ring-sky-500 focus:border-sky-500`}
                onChange={(e) =>
                  setFieldValue(
                    "image",
                    e.currentTarget.files ? e.currentTarget.files[0] : null
                  )
                }
              />
              {touched.image && errors.image && typeof errors.image === "string" && (
                <div className="absolute mt-1 text-sm text-red-500">
                  {errors.image}
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 text-white bg-gray-500 rounded-md hover:bg-gray-600 focus:outline-none"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
            >
              {btnLabel}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EmployeeForm;
