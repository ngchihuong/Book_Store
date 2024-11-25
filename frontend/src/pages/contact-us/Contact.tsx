
export default function Contact() {
    return (
        <>
            <section id="contact" className="py-12 px-4 md:px-10 lg:px-40 bg-gray-100">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">Your Bookstore Name</h2>

                    <p className="text-gray-700 mb-2">📧 Email: <a href="mailto:yourshop@example.com" className="text-blue-600 hover:underline">yourshop@example.com</a></p>
                    <p className="text-gray-700 mb-2">📞 Support Phone: <a href="tel:+123456789" className="text-blue-600 hover:underline">+123 456 789</a></p>

                    <p className="mt-6 text-gray-600 text-lg">
                        Thank you for following our shop! We hope to inspire you with the best books and a passion for reading.
                    </p>

                    <div className="mt-8 w-full h-64 rounded-lg overflow-hidden">
                        <iframe
                            className="w-full h-full"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.234474380582!2d105.8482718!3d21.0285115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab856c7039df%3A0x1e3e7a39acac0b84!2zSG_DoCBHdXJtLCBIw6AgS2nhu4FjLCBIYW5vaSwgVmlldG5hbQ!5e0!3m2!1sen!2s!4v1699999999999"
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>
            </section>


        </>
    )
}