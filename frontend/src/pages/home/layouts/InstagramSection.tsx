import igOne from "@/assets/public/instagram-photos/ig_1.jpg";
import igTwo from "@/assets/public/instagram-photos/ig_2.jpg"
import igThree from "@/assets/public/instagram-photos/ig_3.jpg"
import igFour from "@/assets/public/instagram-photos/ig_4.jpg"
import igFive from "@/assets/public/instagram-photos/ig_5.jpg"

const igPhotos = [
    { id: 1, image: igOne, desc: "Instagram Photo 1" },
    { id: 2, image: igTwo, desc: "Instagram Photo 2" },
    { id: 3, image: igThree, desc: "Instagram Photo 3" },
    { id: 4, image: igFour, desc: "Instagram Photo 4" },
    { id: 5, image: igFive, desc: "Instagram Photo 5" },
]

export default function InstagramSection() {

    return (
        <>
            <section className="mt-8 flex flex-col items-center gap-y-8 bg-skin-muted px-4 py-12 md:py-14 md:px-8 lg:py-16">
                <h2 className="font-serif text-xl font-bold md:text-3xl lg:text-4xl">
                    # Follow Us on Instagram
                </h2>
                <div className="image_container grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5 lg:gap-8">
                    {igPhotos.map(photo => (
                        <img
                            key={photo.id}
                            src={photo.image}
                            alt={photo.desc}
                            className="last:hidden lg:last:block"
                        />
                    ))}
                </div>
            </section>
        </>
    )
}