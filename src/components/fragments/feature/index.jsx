import { useState, useEffect } from "react";
import Card from "../../elements/card";

const slides = [
    {
        title: "Pendeteksi Rintangan",
        content:
        "Dengan bantuan kecerdasan buatan, sistem dapat mendukung perjalanan Anda dengan mendeskripsikan objek yang terlihat di kamera sekaligus memberikan saran atau solusi yang relevan.",
    },
    {
        title: "Chatbot",
        content:
        "Membantu Anda berkomunikasi secara interaktif untuk menemukan solusi dengan cepat.",
    },
    {
        title: "Support Sistem",
        content:
        "Dukungan sistem kami memastikan Anda selalu mendapatkan bantuan yang dibutuhkan kapan pun.",
    },
];


const Feature = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [slides.length]);

    const handleLogoClick = (index) => {
        setCurrentSlide(index);
    };


    return (
        <>
            <section className="bg-[#F4F8FB] min-h-[60vh] py-10 w-screen overflow-hidden flex flex-col lg:flex-row gap-16 lg:gap-10 justify-center items-center container mx-auto">
                <Card image={"assets/images/feat/2.svg"} title={"Navigasi"} text={"Navigasi kami memastikan panduan akurat dan nyaman."} color={"bg-[#D1FAE5]"}/>
                <Card image={"assets/images/feat/3.svg"} title={"Pendeteksi Rintangan"} text={"Mengidentifikasi objek yang menghalangi jalan bagi pengguna."} color={"bg-[#CFFAFE]"}/>
                <Card image={"assets/images/feat/1.svg"} title={"Sinyal Bantuan"} text={"Mengirim pesan darurat ke pendamping saat membutuhkan bantuan."} color={"bg-[#DBEAFE]"}/>
                <Card image={"assets/images/feat/4.svg"} title={"Suara Interaktif"} text={"Berkomunikasi dengan pengguna melalui panduan suara untuk kemudahan fitur."} color={"bg-[#EDE9FE]"}/>
            </section>
            <section className="w-screen overflow-x-hidden min-h-screen flex flex-col gap-16 justify-center items-center py-20 container mx-auto">
                <div className="flex text-center flex-col gap-2">
                    <h1 className="text-2xl lg:text-[56px] font-extrabold" 
                    data-aos="slide-up"
                    data-aos-easing="ease-in-out"
                    data-aos-duration="800"
                    data-aos-offset="100">Intergrasi Kecerdasan Buatan</h1>
                    <p className="text-md lg:text-lg font-normal"
                    data-aos="slide-up"
                    data-aos-easing="ease-in-out"
                    data-aos-duration="800"
                    data-aos-offset="100">Sistem kami telah menerapkan kecerdasan buatan untuk membantu user dalam pengguna</p>
                </div>
                <main className="flex flex-col lg:flex-row justify-center items-center w-full h-full gap-10">
                    <div className="w-full lg:w-1/2 relative h-fit flex justify-center items-center"
                    data-aos="slide-right"
                    data-aos-easing="ease-in-out"
                    data-aos-duration="800"
                    data-aos-offset="250">
                        <div className="absolute hidden lg:block w-[30rem] h-[30rem] rounded-full border-8 border-danger"/>
                        <div className="absolute hidden lg:block w-[25rem] h-[25rem] rounded-full border-2 border-danger"/>
                        <video
                        src="assets/videos/malas.mp4"
                        className=" w-full lg:w-auto lg:h-[50rem] z-10 object-cover rounded-lg border-8 border-slate-500 shadow-xl"
                        autoPlay
                        loop
                        muted
                        ></video>
                    </div>
                    <div className="w-full md:w-1/2 flex flex-col items-start justify-center mt-8 md:mt-0"
                    data-aos="slide-left"
                    data-aos-easing="ease-in-out"
                    data-aos-duration="800"
                    data-aos-offset="100">
                        <div className="relative w-full max-w-[400px]">
                        
                        <div className="ml-6">
                            {slides.map((slide, index) => (
                            <div key={index} className={`mb-4 border-l-2  pl-10 ${
                                currentSlide === index ? "border-primary" : "border-slate-500"
                            }`}>
                                {/* Judul */}
                                <h1
                                className={`text-lg font-bold cursor-pointer ${
                                    currentSlide === index
                                    ? "text-primary"
                                    : "text-gray-500 hover:text-primary-hover"
                                }`}
                                onClick={() => handleLogoClick(index)}
                                >
                                {slide.title}
                                </h1>

                                {/* Konten */}
                                <p
                                className={`mt-2 text-gray-600 text-sm transition-all duration-300 ${
                                    currentSlide === index ? "block" : "hidden"
                                }`}
                                >
                                {slide.content}
                                </p>
                            </div>
                            ))}
                        </div>
                        </div>

                        {/* Logo Tombol untuk Slide */}
                        <div className="flex gap-4 mt-6 ml-6">
                        {slides.map((_, index) => (
                            <button
                            key={index}
                            onClick={() => handleLogoClick(index)}
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                currentSlide === index
                                ? "bg-primary text-white"
                                : "bg-gray-300 text-black"
                            }`}
                            >
                            {index + 1}
                            </button>
                        ))}
                        </div>
                    </div>

                </main>
            </section>
        </>
    )
}

export default Feature;