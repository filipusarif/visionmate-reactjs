export default function Popup({text, showPopup, isListening}) {
    return (
        <div
        className={`absolute  inset-0 flex items-center px-5 lg:px-0 justify-center bg-black bg-opacity-20 z-50 
            ${showPopup ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"}
            transition-all duration-2000 ease-in-out`}
        >
            {/* <div className="bg-white lg:hidden gap-5 relative border-secondary border-t-[25px] p-4 rounded-t-xl shadow w-full lg:w-[40%] h-[20rem] lg:h-[30%] flex justify-center items-center flex-col">
                <div className="w-[20%] left-[40%] h-[5px] bg-background absolute -top-3.5 rounded-full z-50" />
                <p className="text-lg font-medium">{text}</p>
                <img
                    src="/assets/images/assistant/mic.svg"
                    className="p-5 bg-secondary rounded-full shadow-xl"
                    alt=""
                />
                {isListening ? (
                    <p>Mendengarkan...</p>
                ):(
                    <p>...</p>
                )}
            </div> */}
            <div className="bg-white  gap-8 relative  p-5 rounded-xl shadow w-full lg:w-[30%] h-fit flex justify-center items-center flex-col">
                <p className="text-lg font-medium">{text}</p>
                <img
                    src="/assets/images/assistant/mic.svg"
                    className="p-5 bg-secondary rounded-full shadow-xl"
                    alt=""
                />
                <div className="absolute w-[9rem] h-[9rem] translate-y-0.5 border-[1px] border-non-active rounded-full z-0 opacity-60"/>
                <div className="absolute w-[10rem] h-[10rem] translate-y-0.5 border-[1px] border-non-active rounded-full z-0 opacity-30"/>
                <div className="absolute w-[11rem] h-[11rem] translate-y-0.5 border-[1px] border-non-active rounded-full z-0 opacity-15"/>
                {isListening ? (
                    <p>Mendengarkan...</p>
                ):(
                    <p>...</p>
                )}
            </div>
        </div>
    )
}