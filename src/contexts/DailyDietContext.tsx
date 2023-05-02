import { CardMealList } from "@components/MealList";
import { StorageMealGet } from "@storage/storageMeals";
import { ReactNode, createContext, useEffect, useState } from "react";

export type DailyDietMealsType = {
    id: string;
    sectionTitle: string;
    meals: CardMealList[];
}

export type DailyDietContextDataProps = {
    meals: DailyDietMealsType[];
    CallSetMeals: (meal: DailyDietMealsType[]) => void
}

export const DailyDietContext = createContext<DailyDietContextDataProps>({} as DailyDietContextDataProps)

type AuthContextProviderProps = {
    children: ReactNode;
}

export function DailyDietContextProvider({ children }: AuthContextProviderProps) {
    const [meals, setMeals] = useState<DailyDietMealsType[]>([])

    function CallSetMeals(section: DailyDietMealsType[]) {
        setMeals(section)
    }

    useEffect(() => {
        async function LoadUserData() {
            const mealsInStorage: DailyDietMealsType[] = await StorageMealGet()

            setMeals(mealsInStorage)
        }

        LoadUserData()

    }, [meals])

    return (
        <DailyDietContext.Provider
            value={{
                meals,
                CallSetMeals
            }}
        >
            {children}

        </DailyDietContext.Provider>
    )
}

