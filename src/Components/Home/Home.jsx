import React from "react";
import Banner from "./Banner";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="relative">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-fixed bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://i.ibb.co.com/wgHfmZV/photo-1571325654970-9c00c5432fcb-1.jpg')",
                }}
            />

            {/* Overlay for better readability */}
            <div className="relative bg-black/50 min-h-screen text-white">
                {/* Hero Section */}
                <Banner />

                {/* About Us Section */}
                <section className="py-12 bg-white text-center">
                    <div className="max-w-screen-lg mx-auto px-4">
                        <motion.h1
                            className="text-4xl md:text-4xl text-black font-bold leading-tight mb-3"
                            initial={{ x: 700, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                        >
                            About Us
                        </motion.h1>
                        <p className="text-gray-700">
                            At PetHaven, we believe every pet deserves a loving home. Our platform connects caring individuals
                            with pets in need of adoption, creating lasting relationships and better lives for everyone.
                        </p>
                    </div>
                </section>

                <section className="relative items-center justify-center bg-gray-100 p-10">
                    <div className="w-9/12 m-auto">
                        {/* Left Side - Image */}
                    <div
                        className="w-full md:w-1/2 h-80 md:h-auto bg-cover bg-center"
                        style={{
                            backgroundImage:
                                "url('https://onleash.ancorathemes.com/wp-content/uploads/2017/04/bg-12.jpg')",
                        }}
                    ></div>

                    {/* Right Side - Content */}
                    <div className="w-full flex p-8 bg-white shadow-lg">
                    <div>
                        <img src="https://onleash.ancorathemes.com/wp-content/uploads/2017/04/bg-12.jpg" alt="" />
                    </div>
                      <div className="w-1/2 ml-14">
                      <h4 className="text-2xl font-bold text-gray-800">Daily Dog Care</h4><br />
                        <p className="text-gray-600 mt-4">
                            Hundreds of dog owners trust OnLeash to take care of their beloved
                            furry family members. Give us a try, and you won’t be disappointed!
                        </p><br /><br />

                        {/* Services List */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                            {/* Service Item */}
                            <div className="flex flex-col items-center text-center">
                                <a href="https://onleash.ancorathemes.com/services/daily-walking/">
                                    <img
                                        src="https://onleash.ancorathemes.com/wp-content/themes/onleash/trx_addons/css/icons.png/daily_walking.png"
                                        alt="Daily Walking"
                                        className="w-12 h-12"
                                    />
                                </a>
                                <h6 className="text-lg text-gray-600 font-normal mt-2">
                                  
                                        Daily Walking
                                   
                                </h6>
                               
                            </div>

                            {/* Service Item */}
                            <div className="flex flex-col items-center text-center">
                                <a href="https://onleash.ancorathemes.com/services/easy-process/">
                                    <img
                                        src="https://onleash.ancorathemes.com/wp-content/themes/onleash/trx_addons/css/icons.png/easy%20process.png"
                                        alt="Easy Process"
                                        className="w-12 h-12"
                                    />
                                </a>
                                <h6 className="text-lg text-gray-600 font-normal mt-2">
                    
                                        Easy Process
                                   
                                </h6>
                              
                            </div>

                            {/* Service Item */}
                            <div className="flex flex-col items-center text-center">
                                <a href="https://onleash.ancorathemes.com/services/saving-your-time/">
                                    <img
                                        src="https://onleash.ancorathemes.com/wp-content/themes/onleash/trx_addons/css/icons.png/saving_time.png"
                                        alt="Saving Time"
                                        className="w-12 h-12 mb-2"
                                    />
                                </a>
                                <h6 className="text-lg text-gray-600 font-normal">
                                   
                                        Saving Your Time
                                   
                                </h6>
                            </div>
                        </div>
                      </div>
                    </div>
                    </div>
                </section>

               

                 {/* Call to Action Section */}
                 <section className="py-16 bg-transparent text-white text-center ">
                    <h2 className="text-4xl font-bold mb-4">Adopt a Pet, Change a Life</h2>
                    <p className="text-lg mb-6">
                        Give a loving home to a pet and make a difference. Every adoption helps save lives!
                    </p>
                   <Link to='/petlist'> <button className="px-6 py-3 bg-white text-[#6d165D] rounded-lg font-bold hover:bg-gray-100">
                        Find Your Companion
                    </button></Link>
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
                          <Link to='/donation'>  <button className="px-6 py-3 bg-white text-[#6d165D] rounded-lg font-bold hover:bg-gray-100">
                                Donate Now
                            </button></Link>
                        </div>
                    </div>
                </section>
                  {/* Testimonials Section */}
                  <section className="py-12 bg-gray-100">
                    <div className="max-w-screen-lg mx-auto px-4">
                        <h2 className="text-3xl text-black font-bold text-center mb-6">What People Say</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                "Adopting my cat from PetHaven changed my life. She's my best friend now!",
                                "Thanks to PetHaven, I found a perfect companion in my dog, Max!",
                                "The adoption process was so easy, and now my bunny brings so much joy to my family!",
                            ].map((testimonial, index) => (
                                <div key={index} className="bg-white shadow-md rounded-lg p-4">
                                    <p className="text-gray-700 italic">"{testimonial}"</p>
                                    <p className="text-right mt-4 font-bold">- Happy Adopter</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Home;
