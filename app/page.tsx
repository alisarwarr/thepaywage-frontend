"use client";
//NEXTJS
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
//COMPONENTS
const Home = dynamic(() => import('@/components/Home'), { ssr: false });


export default function Page(): JSX.Element {
    const router = useRouter();


    const accessToken = (typeof window !== 'undefined')
        ? localStorage.getItem("accessToken")
            ? JSON.parse(JSON.stringify(localStorage.getItem("accessToken") || '')) : null
        : null;


    if (accessToken) return <Home/>;


    return (
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white min-h-screen flex items-center justify-center">
            <div className="max-w-3xl mx-auto text-center px-6">
                <h1 className="text-4xl sm:text-5xl font-bold mb-4">Thepaywage</h1>
                <p className="text-lg mb-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla at tellus augue.</p>
                <div className="flex justify-center gap-5">
                    <button
                        className="bg-red-500 text-white font-medium py-1.5 px-2.5 sm:py-3 sm:px-6 rounded-md flex items-center justify-center transition-all duration-200 hover:shadow-lg text-xs sm:text-sm"
                        onClick={() => router.push("/login")}
                    >
                        Log In
                    </button>
                    <button
                        className="bg-blue-500 text-white font-medium py-1.5 px-2.5 sm:py-3 sm:px-6 rounded-md flex items-center justify-center transition-all duration-200 hover:shadow-lg text-xs sm:text-sm"
                        onClick={() => router.push("/signup")}
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
}