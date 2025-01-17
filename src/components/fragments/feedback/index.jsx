import React, { useState, useEffect } from "react";

const reviews = [
    {
        id: 1,
        name: "Andi",
        role: "Penyandang Disabilitas Penglihatan",
        text: "Sejak menggunakan VisionMate, saya merasa lebih percaya diri saat beraktivitas di luar rumah. Fitur navigasi suara dan deteksi objek sangat membantu saya mengetahui lingkungan sekitar. Ini memberi saya kemandirian yang sebelumnya sulit saya dapatkan.",
        image: "../assets/images/gambar 1.webp" 
    },
    {
        id: 2,
        name: "Budi",
        role: "Penyandang Disabilitas Penglihatan",
        text: "VisionMate membuat saya merasa lebih aman saat berjalan di tempat umum. Fitur suaranya sangat jelas dan mudah dipahami.",
        image: "../assets/images/gambar 2.jpg" 
    },
    {
        id: 3,
        name: "Joko",
        role: "Penyandang Disabilitas Penglihatan",
        text: "Saya mendampingi banyak teman penyandang disabilitas, dan VisionMate benar-benar memberikan mereka kebebasan lebih. Aplikasi ini sangat membantu dalam menavigasi ruang publik tanpa bergantung pada orang lain. Sangat mudah digunakan dan efektif.",
        image: "../assets/images/gambar 3.jpg" 
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
        <div className="flex h-screen w-screen overflow-x-hidden lg:h-[70vh] items-center justify-center py-10 bg-[#F1F5F9]">
            <div className="container mx-auto lg:px-28 lg:py-10">
                    <div className="relative w-full lg:px-16 lg:pt-10">
                        {/* Ulasan konten */}
                        <div className="flex gap-5 lg:gap-0 items-center flex-col lg:flex-row"
                        data-aos="slide-up"
                        data-aos-easing="ease-in-out"
                        data-aos-duration="800"
                        data-aos-offset="100">
                            <div className="w-[80%] lg:w-1/2">
                                <img
                                src={reviews[currentIndex].image}
                                alt={reviews[currentIndex].name}
                                className="rounded-xl object-cover lg:w-[80%] h-[80%]"
                                />
                            </div>
                            <div className="w-[80%] lg:w-1/2">
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
                        <div className="absolute top-1/2 transform -translate-y-1/2 -left-5 lg:-left-2">
                            <button
                                onClick={handlePrev}
                                className="p-2"
                                >
                                <img src="assets/images/next.svg" alt="" />
                            </button>
                            </div>
                            <div className="absolute top-1/2 transform -translate-y-1/2 -right-5 lg:-right-2">
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
