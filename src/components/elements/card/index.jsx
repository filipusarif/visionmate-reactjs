export default function Card({image, title, text, color}){
    return (
        <div className="basis-1/4 flex flex-col gap-4 justify-start h-[15rem] items-center text-center" data-aos="fade-up"
        data-aos-easing="ease-in-out"
        data-aos-duration="800"
        data-aos-offset="250">
            <div className={`flex justify-center items-center w-[90px] h-[90px] rounded-full ${color}`}>
                <img src={image} alt={title} />
            </div>
            <h1 className="text-lg font-bold">{title}</h1>
            <p className="text-md font-normal">{text}</p>
        </div>
    )
}