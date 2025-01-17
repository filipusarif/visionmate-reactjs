
export default function PricingCard({  plan  }){

    return (
        <>
            <div
            className={`flex w-full flex-col items-center text-center border rounded-lg p-6 ${
                plan.popular
                ? "bg-blue-50 border-secondary shadow-lg scale-105 w-[40%]"
                : "bg-white border-gray-200 w-[30%]"
            }`}
            data-aos={plan.aos}
            data-aos-easing="ease-in-out"
            data-aos-duration="800"
            data-aos-offset="100"
            >
            {plan.popular && (
                <div className="text-white bg-secondary rounded-full px-3 py-1 mb-4 text-sm font-medium">
                Paling popular ⭐
                </div>
            )}
            <h3 className="text-lg font-bold">{plan.name}</h3>
            <p className="text-4xl font-extrabold mt-2">{plan.price === "Gratis" ? `${plan.price}` : `Rp. ${plan.price}`}</p>
            <p className="text-sm text-gray-500">{plan.price === "Gratis" ? "/-" : "/Bulan"}</p>
            <ul className="mt-6 mb-6 text-sm text-gray-700 space-y-3">
            {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center">
                    <img
                        src={
                            (plan.price === "Gratis" && (idx === 1 || idx === 2)) || 
                            (plan.name === "Gold" && idx === 2) 
                            ? "/assets/images/pricing/X.svg" 
                            : "/assets/images/pricing/Check.svg"
                        }
                        alt={ (plan.price === "Gratis" && (idx === 1 || idx === 2)) || (plan.name === "Gold" && idx === 2) ? "X" : "Check" }
                        className="w-4 h-4 mr-2"
                    />
                    {feature}
                </li>
            ))}
            </ul>
            <button
                className={`w-full py-2 rounded ${
                plan.popular
                    ? "bg-secondary text-white"
                    : "bg-white text-secondary border border-secondary"
                }`}
            >
                Get started
            </button>
            </div>
    </>
    )
}