"use client";
//REACT
import { useEffect } from 'react';
//NEXTJS
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
//FORMIK & YUP
import { Formik, Form, Field, ErrorMessage, FormikHelpers, FormikProps } from 'formik';
import * as Yup from 'yup';
//REACT-LOADER-SPINNER
import { RotatingLines } from 'react-loader-spinner';
//ALERTS
import { successAlert, errorAlert } from '@/alerts';
//AWS-AMPLIFY
import { resetPassword, confirmResetPassword } from 'aws-amplify/auth';


interface FormValuesForgotPassword {
    email: string;
}


export default function ForgotPassword(): JSX.Element {
    const router = useRouter();


    const searchParams = useSearchParams();
    const email = searchParams.get("email") || '';
    const code = searchParams.get("code") || '';


    const initialValues: FormValuesForgotPassword = {
        email: ""
    }


    const validationSchema = Yup.object().shape({
        email: Yup
            .string()
            .email('Must be a valid email')
            .required('Email is required')
    });


    const onSubmit = async (values: FormValuesForgotPassword, { setSubmitting }: FormikHelpers<FormValuesForgotPassword>) => {
        setSubmitting(true);

        try {
            await resetPassword({
                username: values.email
            });
            console.log('successfully reset password');
            successAlert('Password Reset Link sent on email');
        }
        catch (error: any) {
            console.log('error reset password', error);
            errorAlert(error);
        }

        setSubmitting(false);
    }


    const accessToken = (typeof window !== 'undefined')
        ? localStorage.getItem("accessToken")
            ? JSON.parse(JSON.stringify(localStorage.getItem("accessToken") || '')) : null
        : null;


    useEffect(() => {
        if (accessToken) {
            router.push("/");
        }
    }, []);


    if (accessToken) return <></>;


    if (email && code) return <ResetPassword />;


    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <div className="mx-auto bg-white shadow-md rounded-md p-6">
                <div className="text-center font-bold text-3xl sm:text-5xl mb-6 text-black"> Forgot Password </div>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {({ isSubmitting }: FormikProps<FormValuesForgotPassword>) => (
                        <Form autoComplete="off" className="bg-black shadow-md rounded-md p-3 sm:p-6 flex justify-center flex-col">
                            <div className="mb-2 sm:mb-4">
                                <label htmlFor="username" className="block text-white font-medium mb-1 sm:mb-2 text-xs sm:text-sm">
                                    Email
                                </label>
                                <Field
                                    type="text"
                                    name="email"
                                    id="email"
                                    className="w-full px-2 py-1 sm:px-3 sm:py-2 rounded-md border border-gray-400 text-xs sm:text-sm text-black"
                                    placeholder="Enter your email"
                                />
                                <ErrorMessage name="email" component="div" className="text-red-500 text-xs sm:text-sm mt-1" />
                            </div>
                            <button
                                type="submit"
                                className="bg-green-500 text-white font-medium py-1 px-2 sm:py-2 sm:px-4 rounded-md w-full flex items-center justify-center transition-all duration-200 hover:shadow-lg text-xs sm:text-sm mt-1"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? <RotatingLines visible={true} width="20" strokeWidth="3" animationDuration="0.75" strokeColor="#eee" /> : `Send Verification Link`}
                            </button>
                            <Link href="/signup" className="m-auto text-gray-300 text-xs sm:text-sm mt-4 sm:mt-6"> Don't have an account? </Link>
                        </Form>
                    )}
                </Formik>
                <button
                    className="bg-red-500 text-white font-medium py-1 px-2 sm:py-2 sm:px-4 rounded-md w-full flex items-center justify-center transition-all duration-200 hover:shadow-lg mt-4 sm:mt-5 text-xs sm:text-sm"
                    onClick={() => router.push("/")}
                >
                    Go back to Home
                </button>
            </div>
        </div>
    );
}


interface FormValuesCode {
    password: string;
    confirmPassword: string;
}


function ResetPassword(): JSX.Element {
    const router = useRouter();


    const searchParams = useSearchParams();
    const email = searchParams.get("email") || '';
    const code = searchParams.get("code") || '';


    const initialValues: FormValuesCode = {
        password: "",
        confirmPassword: ""
    }


    const validationSchema = Yup.object().shape({
        password: Yup
            .string()
            .min(6, 'Must be at least 6 characters')
            .matches(/[a-z]/, 'Must have at least 1 lowercase letter')
            .matches(/[A-Z]/, 'Must have at least 1 uppercase letter')
            .matches(/[0-9]/, 'Must have at least 1 number')
            .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Must have at least 1 symbol')
            .required('Password is required'),
        confirmPassword: Yup
            .string()
            .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
            .required('Confirm Password is required')
    });



    const onSubmit = async (values: FormValuesCode, { setSubmitting }: FormikHelpers<FormValuesCode>) => {
        setSubmitting(true);

        try {
            await confirmResetPassword({
                username: email,
                confirmationCode: code,
                newPassword: values.password || ''
            });
            console.log('successfully confirm reset password');
            successAlert('Password has been Reset');
            router.push("/");
        }
        catch (error: any) {
            console.log('error confirm reset password', error);
            errorAlert(error);
        }

        setSubmitting(false);
    }


    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <div className="mx-auto bg-white shadow-md rounded-md p-6">
                <div className="text-center font-bold text-3xl sm:text-5xl mb-6 text-black"> Forgot Password </div>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {({ isSubmitting }: FormikProps<FormValuesCode>) => (
                        <Form autoComplete="off" className="bg-black shadow-md rounded-md p-3 sm:p-6 flex justify-center flex-col">
                            <div className="mb-2 sm:mb-4">
                                <label htmlFor="password" className="block text-white font-medium mb-1 sm:mb-2 text-xs sm:text-sm">
                                    Create New Password
                                </label>
                                <Field
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="w-full px-2 py-1 sm:px-3 sm:py-2 rounded-md border border-gray-400 text-xs sm:text-sm text-black"
                                    placeholder="Enter your New password"
                                    disabled={isSubmitting}
                                />
                                <ErrorMessage name="password" component="div" className="text-red-500 text-xs sm:text-sm mt-1" />
                            </div>
                            <div className="mb-2 sm:mb-4">
                                <label htmlFor="confirmPassword" className="block text-white font-medium mb-1 sm:mb-2 text-xs sm:text-sm">
                                    Re-type New Password
                                </label>
                                <Field
                                    type="password"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    className="w-full px-2 py-1 sm:px-3 sm:py-2 rounded-md border border-gray-400 text-xs sm:text-sm text-black"
                                    placeholder="Re-type your New password"
                                    disabled={isSubmitting}
                                />
                                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-xs sm:text-sm mt-1" />
                            </div>
                            <button
                                type="submit"
                                className="bg-green-500 text-white font-medium py-1 px-2 sm:py-2 sm:px-4 rounded-md w-full flex items-center justify-center transition-all duration-200 hover:shadow-lg text-xs sm:text-sm mt-1"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? <RotatingLines visible={true} width="20" strokeWidth="3" animationDuration="0.75" strokeColor="#eee" /> : `Submit`}
                            </button>
                            <Link href="/login" className="m-auto text-gray-300 text-xs sm:text-sm mt-4 sm:mt-6"> Already have an account? </Link>
                        </Form>
                    )}
                </Formik>
                <button
                    className="bg-red-500 text-white font-medium py-1 px-2 sm:py-2 sm:px-4 rounded-md w-full flex items-center justify-center transition-all duration-200 hover:shadow-lg mt-4 sm:mt-5 text-xs sm:text-sm"
                    onClick={() => router.push("/")}
                >
                    Go back to Home
                </button>
            </div>
        </div>
    );
}