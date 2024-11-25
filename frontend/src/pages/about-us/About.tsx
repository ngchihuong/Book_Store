import aboutBanner from "@/assets/public/about.webp";
import booksCollection from "@/assets/public/books-collection.webp";

export default function About() {
    return (
        <>
            <div className="relative h-[350px] w-full -mt-10">
                <img src={aboutBanner}
                    alt={"Pile of books"}
                    className="object-cover brightness-50 h-[350px] w-screen"
                />
                <h1 className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] font-serif text-2xl
                font-bold capitalize text-gray-100">
                    About Us
                </h1>
            </div>
            <main className="max-width pt-6 lg:px-20 mt-10 mx-5 md:mx-44 bg-[#f9ffff]">
                <div className="grid gap-4 pb-12 md:grid-cols-2 md:grid-rows-3 lg:grid-cols-5">
                    <section className="lg:col-span-3">
                        <h2 className="font-serif text-xl font-bold">Our Mission</h2>
                        <p className="my-2 font-sans opacity-80 md:whitespace-normal md:text-wrap">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam fugit id explicabo nisi
                            libero repellendus temporibus eius officiis deserunt odit ratione tempore, nemo provident
                            numquam magnam ipsa nam. At beatae quia earum tenetur laudantium voluptatum quod suscipit
                            assumenda, rerum fuga.
                        </p>
                    </section>
                    <section className="md:row-span-2 md-roww-start-2 lg:col-span-3">
                        <h2 className="font-serif text-xl font-bold">What We Are</h2>
                        <p className="my-2 font-sans opacity-80 whitespace-normal text-wrap">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Vel hic cumque, tempora, voluptates laudantium ut ipsum cum qui eaque ratione repellendus? Animi magnam
                            beatae labore ex facere. Temporibus accusamus architecto quia incidunt quibusdam perferendis, deserunt nam
                            maiores! Sequi ea possimus sint, et nesciunt dolore temporibus.
                        </p>
                        <p className="my-2 font-sans opacity-80 whitespace-normal text-wrap">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
                            volutpat odio et dapibus dignissim. Praesent maximus tincidunt
                            ultricies. Nam sodales dolor arcu, non venenatis odio tempor eu
                        </p>
                    </section>
                    <div className="image-container md:col-start-2 md:row-span-3 md:row-start-1 lg:col-span-2 lg:col-start-4">
                        <img
                            src={booksCollection}
                            alt="Books Collection"
                            className="border-8 border-black md:max-h-96 md:max-w-[24rem]"
                        />
                    </div>
                </div>
            </main>
        </>
    )
}