import React from 'react';
import Banner from "./Banner";
import Petlist from '../Petlist';

const Home = () => {
    return (
        <div>
            <Banner />
            
            {/* Pets Category Section */}
            <section className="py-10 bg-gray-100">
                <div className="max-w-screen-xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-6">Browse by Pet Categories</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {['Cats', 'Dogs', 'Rabbits', 'Fish', 'Birds', 'Reptiles'].map((category, index) => (
                            <div key={index} className="bg-white shadow-md rounded-lg p-4 text-center">
                                <h3 className="text-lg font-semibold">{category}</h3>
                                <button className="mt-4 px-4 py-2 bg-[#6d165D] text-white rounded hover:bg-[#ECA511]">
                                    Explore
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="py-16 bg-[#ECA511] text-white text-center">
                <h2 className="text-4xl font-bold mb-4">Adopt a Pet, Change a Life</h2>
                <p className="text-lg mb-6">
                    Give a loving home to a pet and make a difference. Every adoption helps save lives!
                </p>
                <button className="px-6 py-3 bg-white text-[#6d165D] rounded-lg font-bold hover:bg-gray-100">
                    Find Your Companion
                </button>
            </section>

            {/* About Us Section */}
            <section className="py-12 bg-gray-50">
                <div className="max-w-screen-lg mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">About Us</h2>
                    <p className="text-gray-700">
                        At PetHaven, we believe every pet deserves a loving home. Our platform connects caring individuals
                        with pets in need of adoption, creating lasting relationships and better lives for everyone.
                    </p>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-12 bg-gray-100">
                <div className="max-w-screen-lg mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-6">What People Say</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            "Adopting my cat from PetHaven changed my life. She's my best friend now!",
                            "Thanks to PetHaven, I found a perfect companion in my dog, Max!",
                            "The adoption process was so easy, and now my bunny brings so much joy to my family!"
                        ].map((testimonial, index) => (
                            <div key={index} className="bg-white shadow-md rounded-lg p-4">
                                <p className="text-gray-700 italic">"{testimonial}"</p>
                                <p className="text-right mt-4 font-bold">- Happy Adopter</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Volunteer & Donation Section */}
            <section className="py-16 bg-[#6d165D] text-white">
                <div className="max-w-screen-lg mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-6">Help Us Make a Difference</h2>
                    <p className="text-lg mb-6">
                        Join us as a volunteer or donate to support our mission of helping animals in need.
                    </p>
                    <div className="flex justify-center space-x-4">
                        <button className="px-6 py-3 bg-[#ECA511] text-white rounded-lg font-bold hover:bg-[#ffc75f]">
                            Become a Volunteer
                        </button>
                        <button className="px-6 py-3 bg-white text-[#6d165D] rounded-lg font-bold hover:bg-gray-100">
                            Donate Now
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
