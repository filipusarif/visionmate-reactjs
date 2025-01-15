import React, { useState } from "react";

const FAQ = () => {
    const faqs = [
        {
        question: "Bagaimana cara kerja tongkat penglihatan",
        answer: "Tongkat penglihatan dilengkapi dengan sensor yang mampu mendeteksi objek di depan pengguna. Sensor tersebut terhubung dengan device pengguna yang nantinya akan mengidentifikasi objek dan memberikan informasi kepada pengguna secara audio.",
        },
        {
        question: "Apakah ada batasan mengenai objek apa saja yang dapat dideteksi dari tongkat penglihatan?",
        answer: "Tidak ada batasan! Sensor yang kami miliki mampu mendeteksi beragam objek yang berada di depan pengguna tanpa adanya masalah.",
        },
        {
        question: "Seberapa jauh tongkat tersebut dapat mendeteksi objek di depannya?",
        answer: "Tongkat ini dapat mendeteksi objek dengan jarak maksimal hingga 1 meter  di depan pengguna.",
        },
        {
        question: "Apakah tongkat ini aman terhadap air, terutama air hujan?",
        answer: "Sayangnya, tongkat kami tidak dirancang untuk tahan terhadap air. Oleh sebab itu, kami menyarankan untuk menghindari paparan langsung antara tongkat dengan air, terutama air hujan.",
        },
        {
        question: "Bagaimana jika saya mengalami masalah ketika melakukan pembelian?",
        answer: "Anda dapat dengan segera menghubungi kami melalui Kontak yang sudah tersedia dibawah.",
        },
    ];

    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="container mx-auto px-4 py-20">
        <h2 className="text-2xl  font-bold text-center mb-6">Pertanyaan yang sering diajukan</h2>
        <div className="space-y-4 w-full md:w-[80%] mx-auto ">
            {faqs.map((faq, index) => (
            <div
                key={index}
                className="border-b border-gray-200 pb-2"
            >
                <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full text-left text-secondary font-medium text-lg"
                >
                {faq.question}
                <span
                    className={`transform transition-transform duration-300 ${openIndex === index ? "rotate-180" : "rotate-0"}`}
                >
                    <img src="assets/images/arrow-down.svg" alt="" className="w-[50px] md:w-auto"/>
                </span>
                </button>
                <div
                className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
                    openIndex === index ? "max-h-screen" : "max-h-0"
                }`}
                >
                <p className="mt-2 text-gray-600">{faq.answer}</p>
                </div>
            </div>
            ))}
        </div>
        </div>
    );
};

export default FAQ;
