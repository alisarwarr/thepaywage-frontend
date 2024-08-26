"use client";
//NEXTJS
import { useRouter } from 'next/navigation';


export default function OfferDetails(): JSX.Element {
    const router = useRouter();


    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <div className="mx-auto p-6">
                <div className="text-center font-bold text-3xl sm:text-5xl mb-6 text-white"> Offer Details </div>
                <div className="content text-xs sm:text-sm text-black">
                    <p className="content-heading">
                        Offer Details
                    </p>

                    <p className="content-text">
                        Here are the current offers and promotions provided by Union Projekt Bau S.r.l.
                    </p>

                    <p className="content-text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.
                    </p>

                    <p className="content-text">
                        Ut gravida semper nisi. Proin pretium, leo ac pellentesque mollis, felis nunc ultrices eros, sed gravida augue augue mollis justo. Vestibulum eu odio. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae.
                    </p>

                    <p className="content-heading">
                        How to Redeem
                    </p>

                    <ul className="content-ul">
                        <li>
                            <span>Step 1:</span> Visit our website and select the products/services you wish to purchase.
                        </li>
                        <li>
                            <span>Step 2:</span> Enter the valid coupon code during checkout.
                        </li>
                        <li>
                            <span>Step 3:</span> Complete the transaction to enjoy the discount.
                        </li>
                    </ul>

                    <p className="content-heading">
                        Contact Information
                    </p>

                    <p className="content-text">
                        For any inquiries regarding this offer, please contact our customer support team at support@example.com.
                    </p>

                    <p className="content-heading">
                        Additional Terms
                    </p>

                    <ul className="content-ul">
                        <li>
                            <span>Availability:</span> This offer is subject to product availability.
                        </li>
                        <li>
                            <span>Geographical Limitations:</span> Offer valid only in specified regions/countries.
                        </li>
                        <li>
                            <span>Usage Limit:</span> Each customer is limited to one use of this offer.
                        </li>
                    </ul>

                    <p className="content-text">
                        Curabitur blandit mollis lacus. Duis nec justo rutrum leo feugiat tincidunt. Mauris eleifend est et turpis. Donec ut augue sed nisi ullamcorper posuere.
                    </p>

                    <p className="content-text">
                        Nulla vehicula fermentum nulla. Nam tincidunt varius magna. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante.
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