import PricingCard from "../../elements/pricingCard";

const prices = [
    {
        name: "Basic",
        price: "80.000",
        popular: false,
        features: [
                "Consequat ex proident",
                "Consequat ex proident",
                "Consequat ex proident",
        ],
    },
    {
        name: "Essential",
        price: "140.000",
        popular: true,
        features: [
                "Consequat ex proident",
                "Consequat ex proident",
                "Consequat ex proident",
                "Consequat ex proident",
                "Consequat ex proident",
        ],
    },
    {
        name: "Premium",
        price: "100.000",
        popular: false,
        features: [
                "Consequat ex proident",
                "Consequat ex proident",
                "Consequat ex proident",
        ],
    },
    
];

export default function Pricing(){
    return (
        <>
        <section className="w-screen h-[50vh] bg-primary overflow-y-hidden flex flex-col gap-5 justify-center items-center">
            <div className="absolute w-[60rem] h-[60rem] border-2 border-background rounded-full opacity-10"/>
            <div className="absolute w-[50rem] h-[50rem] border-2 border-background rounded-full opacity-30"/>
            <div className="absolute w-[40rem] h-[40rem] border-2 border-background rounded-full opacity-50"/>
            <h1 className="text-5xl text-background font-extrabold">Harga Terjangkau!</h1>
            <p className="text-lg text-background opacity-85 font-normal">Ut aliquip anim laboris deserunt do cillum id amet aute veniam do do.</p>
        </section>
        <section className="w-screen min-h-screen container mx-auto flex justify-center items-center md:px-32">
        {prices.map((price, index) => (
            <PricingCard key={index} classes={""} plan={price} />
        ))}
        </section>
        </>
    )
}