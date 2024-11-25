import Hero from "@/pages/home/layouts/Hero";
import InstagramSection from "./layouts/InstagramSection";
import BooksSection from "./layouts/BooksSection";

export default function Home() {
    return (
        <>
            <main>
                <Hero />
                <BooksSection/>
                <InstagramSection />
            </main>
        </>
    )
}