import { DailyDietContext } from "@contexts/DailyDietContext";
import { useContext } from "react";

export function useDaily(){
    const context = useContext(DailyDietContext)

    return context
}

