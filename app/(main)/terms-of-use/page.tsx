"use client";
//NEXTJS
import { useRouter } from 'next/navigation';


export default function TermsOfUse(): JSX.Element {
    const router = useRouter();


    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <div className="mx-auto p-6">
                <div className="text-center font-bold text-3xl sm:text-5xl mb-6 text-white"> Terms of Use </div>
                <div className="content text-xs sm:text-sm text-black">
                    <p className="content-heading">
                        Terms of Use
                    </p>

                    <p className="content-text">
                        Welcome to our Terms of Use page. These terms govern your use of our services provided by Union Projekt Bau S.r.l. Please read them carefully before using our services.
                    </p>

                    <p className="content-text">
                        By accessing or using our services, you agree to be bound by these Terms of Use. If you disagree with any part of the terms, then you may not access the services.
                    </p>

                    <p className="content-text">
                        Our services are intended for users who are at least 18 years old. By accessing or using our services, you confirm that you are at least 18 years old.
                    </p>

                    <p className="content-text">
                        We reserve the right to update or change these Terms of Use at any time without prior notice. Continued use of the services after any such changes shall constitute your consent to such changes.
                    </p>

                    <p className="content-heading">
                        Your Account
                    </p>

                    <ul className="content-ul">
                        <li>
                            <span>Account Security:</span> You are responsible for maintaining the security of your account and password.
                        </li>
                        <li>
                            <span>Account Termination:</span> We reserve the right to terminate accounts at our sole discretion.
                        </li>
                    </ul>

                    <p className="content-heading">
                        User Conduct
                    </p>

                    <ul className="content-ul">
                        <li>
                            <span>Prohibited Activities:</span> You agree not to engage in certain prohibited activities on our platform.
                        </li>
                        <li>
                            <span>Compliance:</span> You agree to comply with all applicable laws and regulations.
                        </li>
                    </ul>

                    <p className="content-heading">
                        Limitation of Liability
                    </p>

                    <p className="content-text">
                        In no event shall Union Projekt Bau S.r.l., its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages.
                    </p>

                    <p className="content-text">
                        These Terms of Use shall be governed by and construed in accordance with the laws of Italy, without regard to its conflict of law provisions.
                    </p>

                    <p className="content-text">
                        If you have any questions about these Terms of Use, please contact us at legal@example.com.
                    </p>
                </div>
                <button
                    className="bg-red-500 text-white font-medium py-1 px-2 sm:py-2 sm:px-4 rounded-md flex items-center justify-center transition-all duration-200 hover:shadow-lg mt-4 sm:mt-5 text-xs sm:text-sm mx-auto"
                    onClick={() => router.push("/")}
                >
                    Go back to Home
                </button>
            </div>
        </div>
    );
}