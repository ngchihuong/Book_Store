import cafeBookPic from "@/assets/public/cafe-book.webp"
import { IoArrowDownCircleSharp } from "react-icons/io5"
import SocialGroup from "../../../components/SocialGroup"

export default function Hero() {
    return (
        <>
            <div className="mx-auto flex max-w-6xl flex-col gap-y-4 px-4 py-6 md:flex-row-reverse md:gap-x-4 md:px-8 lg:py-14">
                <div className="image-wrapper flex-1 p-4 lg:p-0">
                    <img src={cafeBookPic} alt="Open Book"
                        className="drop-shadow-[0_35px_35px_rgba(0,0,0,0.4)]"
                    />
                </div>
                <div className="info-wrapper flex flex-1 flex-col gap-y-4 md:justify-center lg:justify-end lg:gap-y-8">
                    <h1 className="font-serif text-4xl font-semibold md:!leading-tight lg:text-5xl xl:text-6xl">
                        Best Place to Find <br />
                        Your Favourite <br />
                        Books.
                    </h1>

                    <p className="font-sans xl:text-lg">
                        Unleash your imagination with our online bookstore! Discover a vast
                        selection of books for all ages and interests, with something for
                        everyone. Shop now and find your next favorite read!
                    </p>
                    <div className="flex items-center">
                        <a
                            href="#books"
                            className="outline hover:bg-gray-100 inline-flex items-center rounded py-2 px-4 text-lg font-semibold"
                        >
                            Browse
                            <IoArrowDownCircleSharp className="ml-2 animate-bounce !stroke-skin-dark stroke-2 mt-2 text-3xl" />
                        </a>
                    </div>


                    <SocialGroup className="!justify-start" />

                    <div className="mt-12 flex gap-2 divide-x divide-skin-dark md:w-[125%] lg:w-auto">
                        <div className="">Fast Delivery</div>
                        <div className=" pl-2">Exclusive Deals</div>
                        <div className=" pl-2">Curated Collections</div>
                    </div>
                </div>
            </div>
        </>
    )
}