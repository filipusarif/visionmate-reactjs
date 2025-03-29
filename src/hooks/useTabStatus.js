import { useEffect, useState } from "react";

const useTabStatus = () => {
    const [isTabActive, setIsTabActive] = useState(!document.hidden);
    const [isWindowFocused, setIsWindowFocused] = useState(document.hasFocus());

    useEffect(() => {
        const handleVisibilityChange = () => {
            setIsTabActive(!document.hidden);
        };

        const handleFocus = () => setIsWindowFocused(true);
        const handleBlur = () => setIsWindowFocused(false);

        const handleBeforeUnload = () => {
            console.log("Tab akan ditutup atau direfresh!");
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        window.addEventListener("focus", handleFocus);
        window.addEventListener("blur", handleBlur);
        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            window.removeEventListener("focus", handleFocus);
            window.removeEventListener("blur", handleBlur);
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);

    return { isTabActive, isWindowFocused };
};

export default useTabStatus;
