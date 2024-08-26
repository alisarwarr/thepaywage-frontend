//REACT
import { ReactNode, Suspense } from 'react';
//NEXTJS
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
//AMPLIFY
import ConfigureAmplifyClientSide from './aws-exports';
//STYLES
import '@/styles/index.css';


const poppins = Poppins({ subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] });


export const metadata: Metadata = {
    title: "Thepaywage"
}

interface RootLayoutProps {
    children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en">
            <body className={poppins.className}>
                <ConfigureAmplifyClientSide />
                <Suspense> {children} </Suspense>
            </body>
        </html>
    )
}