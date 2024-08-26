"use client";
//REACT
import { useEffect } from 'react';
//NEXTJS
import { useRouter } from 'next/navigation';
import Link from 'next/link';
//FORMIK & YUP
import { Formik, Form, Field, ErrorMessage, FormikHelpers, FormikProps } from 'formik';
import * as Yup from 'yup';
//REACT-LOADER-SPINNER
import { RotatingLines } from 'react-loader-spinner';
//CAPTCHA
import HCaptcha from '@hcaptcha/react-hcaptcha';
//ALERTS
import { successAlert, errorAlert } from '@/alerts';
//AWS-AMPLIFY
import { signUp } from 'aws-amplify/auth';


interface FormValues {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    password: string;
    confirmPassword: string;
    termsAccepted: boolean;
    captchaToken: string;
}


export default function SignUp(): JSX.Element {
    const router = useRouter();


    const initialValues: FormValues = {
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        password: "",
        confirmPassword: "",
        termsAccepted: false,
        captchaToken: "10000000-aaaa-bbbb-cccc-000000000001"
    }


    const validationSchema = Yup.object().shape({
        firstName: Yup
            .string()
            .required('First Name is required'),
        lastName: Yup
            .string()
            .required('Last Name is required'),
        phoneNumber: Yup
            .string()
            .required('Phone Number is required'),
        email: Yup.
            string()
            .email('Must be a valid email')
            .required('Email is required'),
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
            .required('Confirm Password is required'),
        termsAccepted: Yup
            .bool()
            .oneOf([true], 'Acceptance is required').
            required('Acceptance of terms is required'),
        captchaToken: Yup
            .string()
            .required('Captcha is required')
    });


    const onSubmit = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
        setSubmitting(true);

        try {
            await signUp({
                username: values.email,
                password: values.password,
                options: {
                    userAttributes: {
                        given_name: values.firstName,     /*firstName*/
                        family_name: values.lastName,     /*lastName*/
                        email: values.email,              /*email*/
                        phone_number: values.phoneNumber  /*phone*/
                    }
                }
            });
            console.log('successfully signup');
            successAlert('Verification Link sent on email');
            router.push("/login");
        }
        catch (error: any) {
            console.log('error signup', error);
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


    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <div className="mx-auto bg-white shadow-md rounded-md p-6">
                <div className="text-center font-bold text-3xl sm:text-5xl mb-6 text-black"> Signup </div>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {({ isSubmitting, setFieldValue }: FormikProps<FormValues>) => (
                        <Form autoComplete="off" className="bg-black shadow-md rounded-md p-3 sm:p-6 flex justify-center flex-col">
                            <div className="mb-2 sm:mb-4">
                                <label htmlFor="firstName" className="block text-white font-medium mb-1 sm:mb-2 text-xs sm:text-sm">
                                    First Name
                                </label>
                                <Field
                                    type="text"
                                    name="firstName"
                                    id="firstName"
                                    className="w-full px-2 py-1 sm:px-3 sm:py-2 rounded-md border border-gray-400 text-xs sm:text-sm "
                                    placeholder="Enter your first name"
                                    disabled={isSubmitting}
                                />
                                <ErrorMessage name="firstName" component="div" className="text-red-500 text-xs sm:text-sm mt-1" />
                            </div>
                            <div className="mb-2 sm:mb-4">
                                <label htmlFor="lastName" className="block text-white font-medium mb-1 sm:mb-2 text-xs sm:text-sm">
                                    Last Name
                                </label>
                                <Field
                                    type="text"
                                    name="lastName"
                                    id="lastName"
                                    className="w-full px-2 py-1 sm:px-3 sm:py-2 rounded-md border border-gray-400 text-xs sm:text-sm text-black"
                                    placeholder="Enter your last name"
                                    disabled={isSubmitting}
                                />
                                <ErrorMessage name="lastName" component="div" className="text-red-500 text-xs sm:text-sm mt-1" />
                            </div>
                            <div className="mb-2 sm:mb-4">
                                <label htmlFor="phoneNumber" className="block text-white font-medium mb-1 sm:mb-2 text-xs sm:text-sm">
                                    Phone Number
                                </label>
                                <Field
                                    type="text"
                                    name="phoneNumber"
                                    id="phoneNumber"
                                    className="w-full px-2 py-1 sm:px-3 sm:py-2 rounded-md border border-gray-400 text-xs sm:text-sm text-black"
                                    placeholder="Enter your phone number"
                                    disabled={isSubmitting}
                                />
                                <ErrorMessage name="phoneNumber" component="div" className="text-red-500 text-xs sm:text-sm mt-1" />
                            </div>
                            <div className="mb-2 sm:mb-4">
                                <label htmlFor="email" className="block text-white font-medium mb-1 sm:mb-2 text-xs sm:text-sm">
                                    Email Address
                                </label>
                                <Field
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="w-full px-2 py-1 sm:px-3 sm:py-2 rounded-md border border-gray-400 text-xs sm:text-sm text-black"
                                    placeholder="Enter your email address"
                                    disabled={isSubmitting}
                                />
                                <ErrorMessage name="email" component="div" className="text-red-500 text-xs sm:text-sm mt-1" />
                            </div>
                            <div className="mb-2 sm:mb-4">
                                <label htmlFor="password" className="block text-white font-medium mb-1 sm:mb-2 text-xs sm:text-sm">
                                    Create Password
                                </label>
                                <Field
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="w-full px-2 py-1 sm:px-3 sm:py-2 rounded-md border border-gray-400 text-xs sm:text-sm text-black"
                                    placeholder="Enter your password"
                                    disabled={isSubmitting}
                                />
                                <ErrorMessage name="password" component="div" className="text-red-500 text-xs sm:text-sm mt-1" />
                            </div>
                            <div className="mb-2 sm:mb-4">
                                <label htmlFor="confirmPassword" className="block text-white font-medium mb-1 sm:mb-2 text-xs sm:text-sm">
                                    Re-type Password
                                </label>
                                <Field
                                    type="password"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    className="w-full px-2 py-1 sm:px-3 sm:py-2 rounded-md border border-gray-400 text-xs sm:text-sm text-black"
                                    placeholder="Re-type your password"
                                    disabled={isSubmitting}
                                />
                                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-xs sm:text-sm mt-1" />
                            </div>
                            <div className="mb-2 sm:mb-4">
                                <label htmlFor="captchaToken" className="block text-white font-medium mb-1 sm:mb-2 text-xs sm:text-sm">
                                    Captcha
                                </label>
                                <HCaptcha
                                    sitekey='2c74102f-5038-413c-8357-c9462b20c488'
                                    onVerify={(token: string) => {
                                        console.log('captchaToken:', token);
                                        setFieldValue('captchaToken', token);
                                    }}
                                />
                                <ErrorMessage name="captchaToken" component="div" className="text-red-500 text-xs sm:text-sm mt-1" />
                            </div>
                            <div className="mb-2 sm:mb-4">
                                <div className="flex items-center">
                                    <Field
                                        type="checkbox"
                                        name="termsAccepted"
                                        id="termsAccepted"
                                        className="mr-2 cursor-pointer"
                                        disabled={isSubmitting}
                                    />
                                    <label htmlFor="termsAccepted" className="block text-white font-medium text-xs sm:text-sm">
                                        I accept <Link href="/terms-of-use" className="text-blue-300 underline">Terms of use</Link> , <Link href="/privacy-note" className="text-blue-300 underline">Privacy note</Link> , & <Link href="/offer-details" className="text-blue-300 underline">offer details</Link>
                                    </label>
                                </div>
                                <ErrorMessage name="termsAccepted" component="div" className="text-red-500 text-xs sm:text-sm mt-1" />
                            </div>
                            <button
                                type="submit"
                                className="bg-green-500 text-white font-medium py-1 px-2 sm:py-2 sm:px-4 rounded-md w-full flex items-center justify-center transition-all duration-200 hover:shadow-lg text-xs sm:text-sm mt-1"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? <RotatingLines visible={true} width="20" strokeWidth="3" animationDuration="0.75" strokeColor="#eee" /> : `Sign Up`}
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