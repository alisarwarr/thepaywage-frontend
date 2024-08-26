"use client";
//NEXTJS
import { useRouter } from 'next/navigation';


export default function PrivacyNote(): JSX.Element {
    const router = useRouter();


    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <div className="mx-auto p-6">
                <div className="text-center font-bold text-3xl sm:text-5xl mb-6 text-white"> Privacy Policy </div>
                <div className="content text-xs sm:text-sm text-black">
                    <p className="content-heading">
                        Privacy Note
                    </p>

                    <p className="content-text">
                        Last updated: March 27, 2024
                    </p>

                    <p className="content-text">
                        This Privacy Policy describes our policies and procedures on the collection, use, and disclosure of Your information when You use the Service and informs You of Your privacy rights and how the law protects You.
                    </p>

                    <p className="content-text">
                        We use Your Personal Data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.
                    </p>

                    <ul className="content-ul">
                        <li>
                            <span>Account</span> means a unique account created for You to access our Service or parts of our Service.
                        </li>
                        <li>
                            <span>Affiliate</span> means an entity that controls, is controlled by, or is under common control with a party, where "control" means ownership of 50% or more of the shares, equity interest, or other securities entitled to vote for the election of directors or other managing authority.
                        </li>
                        <li>
                            <span>Application</span> refers to LandID, the software program provided by the Company.
                        </li>
                        <li>
                            <span>Company</span> (referred to as "the Company", "We", "Us", or "Our" in this Agreement) refers to Union Projekt Bau S.r.l., Via Maso della Pieve 2/D 39100 Bolzano/Bozen.
                        </li>
                        <li>
                            <span>Country</span> refers to: Italy
                        </li>
                        <li>
                            <span>Device</span> means any device that can access the Service such as a computer, a cellphone, or a digital tablet.
                        </li>
                        <li>
                            <span>Personal Data</span> means any information relating to an identified or identifiable individual.
                        </li>
                        <li>
                            <span>Service Provider</span> means any natural or legal person who processes the data on behalf of the Company. It refers to third-party companies or individuals employed by the Company to facilitate the Service, to provide the Service on behalf of the Company, to perform services related to the Service, or to assist the Company in analyzing how the Service is used.
                        </li>
                    </ul>
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