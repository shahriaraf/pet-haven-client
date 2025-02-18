import React from 'react';
import Banner from "./Banner";

const Home = () => {
    return (
        <div>
            <Banner />

            {/* Pets Category Section */}
            <section className="py-10 bg-gray-100">
                <div class="w-full md:w-1/3 p-4">
                    <div class="bg-white shadow-lg rounded-lg p-6 relative group overflow-hidden">
              
                        <div class="flex justify-center text-4xl text-yellow-500">
                            <span class="flaticon-016-pancake"></span>
                        </div>

                   
                        <div class="mt-4 text-center">
                            <h4 class="text-xl font-semibold text-gray-800">
                                <a href="https://shtheme.org/demosd/winta/?menu=dessert" class="hover:text-yellow-500 transition">
                                    Dessert
                                </a>
                            </h4>
                        </div>

                  
                        <ul
                            class="absolute bottom-0 left-0 w-full bg-white shadow-lg rounded-b-lg opacity-0 transform translate-y-full 
             group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-in-out text-gray-700 text-center">
                            <li class="border-b py-2">Bourbon Pecan Pie <span class="float-right font-semibold">$50</span></li>
                            <li class="border-b py-2">New York Cheesecake <span class="float-right font-semibold">$32</span></li>
                            <li class="py-2">Rusty’s Ice-Cream <span class="float-right font-semibold">$22</span></li>
                        </ul>
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
