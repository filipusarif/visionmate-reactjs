import React, { useState } from "react";

const FAQ = () => {
    const faqs = [
        {
        question: "Enim sodales consequat adipiscing facilisis massa venenatis, non lorem lobortis?",
        answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at tincidunt lacus, et ultrices sapien.",
        },
        {
        question: "Venenatis nulla sagittis nunc, lobortis nec sollicitudin neque, dolor?",
        answer: "Proin a lacinia felis. Pellentesque vehicula libero non velit laoreet, sed fermentum augue ultricies.",
        },
        {
        question: "Varius ultricies molestie tellus fermentum, viverra ipsum scelerisque etiam lorem?",
        answer: "Fusce sit amet nibh et sapien tincidunt dignissim. Sed a leo hendrerit, pellentesque tortor sed, suscipit nunc.",
        },
        {
        question: "Nulla etiam vitae, at sagittis, nibh ultrices mattis feugiat faucibus?",
        answer: "Integer volutpat nulla ac sapien efficitur, quis tincidunt est consequat.",
        },
        {
        question: "Sagittis consectetur gravida nec turpis eros, id sit et, dictum?",
        answer: "Maecenas aliquet eros in quam sodales, sed tincidunt ligula dictum.",
        },
    ];

    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="container mx-auto px-4 py-20">
        <h2 className="text-2xl  font-bold text-center mb-6">Answers to your questions</h2>
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
