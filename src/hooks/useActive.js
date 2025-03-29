import { supabase } from "../services/lib/supabaseClient";

const useActive = async (id, status) => {
    try {
        if(id){
            await supabase.from("users").update({ active: status }).eq("id", id);
        }else{
            console.log("fail fetch")
        }
    } catch (error) {
        console.error("error with ", error)
    }
}

export default useActive;