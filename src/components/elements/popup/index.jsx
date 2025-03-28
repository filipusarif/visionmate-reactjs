import { useEffect } from "react";

export default function Popup({text, showPopup, isListening}) {
    useEffect(() => {
        if (isListening) {
            const audio = new Audio("/assets/audio/mate.mp3");
            audio.play();
        }
    }, [isListening]);

    return (
        <div
        className={`absolute  inset-0 flex items-end lg:items-center px-0 justify-center bg-black bg-opacity-20 z-50 
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
            <div className="bg-white  gap-12 relative  p-10  rounded-t-3xl lg:rounded-3xl shadow w-full lg:w-[30%] h-fit flex justify-center items-center flex-col min-h-[23rem] max-h-[23rem]">
                <div className="w-[50px] h-[3px] rounded-full bg-non-active absolute top-3 block lg:hidden" />
                <img
                    src="/assets/images/assistant/mic.svg"
                    className="p-5 bg-secondary rounded-full shadow-xl mt-12 "
                    alt=""
                />
                <div className="absolute w-[10rem] h-[10rem] -translate-y-[28px] border-[1px] border-non-active rounded-full z-0 opacity-40"/>
                <div className="absolute w-[12rem] h-[12rem] -translate-y-[28px] border-[1px] border-non-active rounded-full z-0 opacity-20"/>
                <div className="absolute w-[14rem] h-[14rem] -translate-y-[28px] border-[1px] border-non-active rounded-full z-0 opacity-10"/>
                <div className="flex flex-col gap-1 justify-center items-center">
                    <p className="text-lg font-medium">{text}</p>
                    {isListening ? (
                        <p>Mendengarkan...</p>
                    ):(
                        <p>...</p>
                    )}
                </div>
            </div>
        </div>
    )
}