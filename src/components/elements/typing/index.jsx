export default function Typing(){
    return (
        <div
            className={`chat-message text-left flex gap-3 items-center`}
        >
            <img src="/assets/images/profile.svg" alt="" />            
            <div
            className={`inline-block bg-[#0D2352] text-white rounded-bl-none p-2 px-3 rounded-xl mb-5`}
            >
                <div className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-background rounded-full animate-[bounce_1s_ease-out_infinite_0.2s]"></span>
                    <span className="w-2 h-2 bg-background rounded-full animate-[bounce_1s_ease-out_infinite_0.4s]"></span>
                    <span className="w-2 h-2 bg-background rounded-full animate-[bounce_1s_ease-out_infinite_0.6s]"></span>
                </div>
            </div>
        </div>
    )
}