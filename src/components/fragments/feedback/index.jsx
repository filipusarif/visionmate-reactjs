import React, { useState, useEffect } from "react";

const reviews = [
    {
        id: 1,
        name: "Marie Poirot",
        role: "BigApp",
        text: "Aplikasi ini benar-benar membantu meningkatkan kemandirian saya sehari-hari. Fitur navigasinya sangat membantu saya dalam menjelajahi kota.  Saya merasa lebih percaya diri dan aman berkat teknologi yang disediakan.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvJaoIeJQU_V9rL_ZII61whWyqSFbmMgTgwQ&s" 
    },
    {
        id: 2,
        name: "John Doe",
        role: "TechCorp",
        text: "Teknologi yang ditawarkan sangat inovatif dan mudah digunakan. Ini benar-benar mempermudah hidup saya dalam berbagai aspek.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvJaoIeJQU_V9rL_ZII61whWyqSFbmMgTgwQ&s" 
    },
    {
        id: 3,
        name: "Jane Smith",
        role: "InnovateX",
        text: "Pengalaman menggunakan aplikasi ini sangat luar biasa. Navigasi yang intuitif dan fitur yang lengkap benar-benar memberikan nilai tambah.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvJaoIeJQU_V9rL_ZII61whWyqSFbmMgTgwQ&s" 
    }
];

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
        );
    };

    useEffect(() => {
        const interval = setInterval(() => {
        handleNext();
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex items-center justify-center py-10 bg-[#F1F5F9]">
            <div className="container mx-auto md:px-28 md:py-10">
                    <div className="relative w-full md:px-16 md:pt-10">
                        {/* Ulasan konten */}
                        <div className="flex items-center">
                            <div className="w-1/2">
                                <img
                                src={reviews[currentIndex].image}
                                alt={reviews[currentIndex].name}
                                className="rounded-xl object-cover w-[80%] h-[80%]"
                                />
                            </div>
                            <div className="w-1/2">
                                <h3 className="text-lg font-bold text-non-active">ULASAN PENGGUNA</h3>
                                <p className="text-xl text-dark mt-2 italic text-justify"><span className="text-yellow-500">"      </span>{reviews[currentIndex].text}<span className="text-yellow-500">      "</span></p>
                                <div className="flex flex-col gap-0 justify-center mt-5">
                                    <p className="text-md font-medium text-gray-800">
                                    {reviews[currentIndex].name}
                                    </p>
                                    <p className="text-lg font-bold text-gray-800">
                                    {reviews[currentIndex].role}
                                    </p>
                                </div>
                                <div className="flex justify-start items-center mt-8 gap-2 ">
                                    {reviews.map((_, index) => (
                                        <span
                                        key={index}
                                        className={` h-2 rounded-full transition-all duration-300 ${
                                            index === currentIndex ? "bg-blue-500 w-10" : "bg-gray-300 w-2"
                                        }`}
                                        ></span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Navigasi */}
                        <div className="absolute top-1/2 transform -translate-y-1/2 -left-2">
                            <button
                                onClick={handlePrev}
                                className="p-2"
                                >
                                <img src="assets/images/next.svg" alt="" />
                            </button>
                            </div>
                            <div className="absolute top-1/2 transform -translate-y-1/2 -right-2">
                            <button
                                onClick={handleNext}
                                className="p-2"
                            >
                                <img src="assets/images/next.svg" alt="" className="transform -scale-x-100"/>
                            </button>
                        </div>

                        {/* Indicator */}
                        
                    </div>
                </div>
        </div>
    );
};

export default Carousel;
