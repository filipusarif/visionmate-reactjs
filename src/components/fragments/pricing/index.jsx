import PricingCard from "../../elements/pricingCard";

const prices = [
    {
        name: "Silver",
        price: "Gratis",
        popular: false,
        features: [
                "Akses semua fitur",
                "Tongkat penglihatan",
                "Layanan prioritas",
        ],
        aos: "slide-right",
    },
    {
        name: "Diamond",
        price: "159.999",
        popular: true,
        features: [
                "Akses semua fitur",
                "Tongkat penglihatan",
                "Layanan prioritas",
        ],
        aos: "slide-up",
    },
    {
        name: "Gold",
        price: "129.999",
        popular: false,
        features: [
                "Akses semua fitur",
                "Tongkat penglihatan",
                "Layanan prioritas",
        ],
        aos: "slide-left",
    },
    
];

export default function Pricing(){
    return (
        <>
            <section id="price" className="relative w-screen overflow-x-hidden h-[50vh] bg-primary overflow-hidden flex flex-col gap-5 justify-center items-center">
                <div className="absolute h-[30rem] z-0 w-[40rem]  lg:w-[60rem] lg:h-[60rem] border-2 border-background rounded-full opacity-10"/>
                <div className="absolute h-[30rem] z-0 w-[35rem]  lg:w-[50rem] lg:h-[50rem] border-2 border-background rounded-full opacity-30"/>
                <div className="absolute h-[30rem] z-0 w-[30rem]  lg:w-[40rem] lg:h-[40rem] border-2 border-background rounded-full opacity-50"/>
                <div className="container w-full flex  flex-col justify-center items-center">
                <h1 className="text-4xl lg:text-5xl text-background font-extrabold">Harga Terjangkau!</h1>
                <p className="text-lg text-center text-background opacity-85 font-normal">Bantu Kemandirian, Tanpa Menguras Banyak Anggaran</p>
                </div>
            </section>
            <section className="w-screen overflow-hidden min-h-screen py-14 container mx-auto gap-5 lg:gap-0 flex flex-col lg:flex-row justify-center items-center lg:px-32">
            {prices.map((price, index) => (
                <PricingCard key={index} plan={price} />
            ))}
            </section>
        </>
    )
}