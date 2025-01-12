import React, { useState, useEffect } from "react";

const reviews = [
    {
        id: 1,
        name: "Marie Poirot",
        role: "BigApp",
        text: "Aplikasi ini benar-benar membantu meningkatkan kemandirian saya sehari-hari. Fitur navigasinya sangat membantu saya dalam menjelajahi kota. Saya merasa lebih percaya diri dan aman berkat teknologi yang disediakan.",
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
        <div className="flex items-center justify-center py-10 bg-blue-50">
            <div className="container mx-auto">

        <div className="relative w-full bg-white rounded-lg shadow-md p-6">
            {/* Ulasan konten */}
            <div className="flex items-center gap-4">
            <div className="w-1/3">
                <img
                src={reviews[currentIndex].image}
                alt={reviews[currentIndex].name}
                className="rounded-full object-cover w-full h-full"
                />
            </div>
            <div className="w-2/3">
                <h3 className="text-lg font-semibold text-gray-800">ULASAN PENGGUNA</h3>
                <p className="text-sm text-gray-600 mt-2 italic">"{reviews[currentIndex].text}"</p>
                <p className="text-sm font-medium text-gray-800 mt-4">
                {reviews[currentIndex].name}, {reviews[currentIndex].role}
                </p>
            </div>
            </div>

            {/* Navigasi */}
            <div className="absolute top-1/2 transform -translate-y-1/2 left-0">
            <button
                onClick={handlePrev}
                className="p-2 bg-gray-100 rounded-full shadow hover:bg-gray-200"
                >
                &lt;
            </button>
            </div>
            <div className="absolute top-1/2 transform -translate-y-1/2 right-0">
            <button
                onClick={handleNext}
                className="p-2 bg-gray-100 rounded-full shadow hover:bg-gray-200"
            >
                &gt;
            </button>
            </div>

            {/* Indicator */}
            <div className="flex justify-center mt-4 gap-2">
            {reviews.map((_, index) => (
                <span
                key={index}
                className={`w-2 h-2 rounded-full ${
                    index === currentIndex ? "bg-blue-500" : "bg-gray-300"
                }`}
                ></span>
            ))}
            </div>
        </div>
                </div>
        </div>
    );
};

export default Carousel;
