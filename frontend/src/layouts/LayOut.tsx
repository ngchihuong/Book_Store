import Footer from "@/components/Footer";
import Header from "@/components/Header";
import TopBar from "@/components/TopBar";
import React from "react"

interface Props {
    children: React.ReactNode;
}
export default function LayOut({ children }: Props) {
    return (
        <div className="flex flex-col min-h-screen min-w-full w-fit">
            <TopBar />
            <Header />
            <div className="max-md:container mx-auto py-10 flex-1">
                {children}
            </div>
            <Footer />
        </div>
    )
}