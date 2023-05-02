import { DailyDietMealsType } from "@contexts/DailyDietContext"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const MEAL_STORAGE = "@dailydiet:meal"


export async function StorageMealSave(meal: DailyDietMealsType[]){
    await AsyncStorage.setItem(MEAL_STORAGE, JSON.stringify(meal))
}

export async function StorageMealGet(){
    const storage = await AsyncStorage.getItem(MEAL_STORAGE)

    const meals: DailyDietMealsType[] = storage ? JSON.parse(storage) : []

    return meals
}

export async function StorageMealRemove(){
    await AsyncStorage.removeItem(MEAL_STORAGE)
}