import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Home } from '@screens/Home';
import { MealInfo } from '@screens/MealInfo';
import { MealResult } from '@screens/MealResult';
import { NewMeal } from '@screens/NewMeal';
import { Statistics } from '@screens/Statistics';

type AppRoutesType = {
    home: undefined;
    statistics: undefined;
    newMeal: undefined;
    mealResult: undefined;
    mealInfo: { date: string; description: string; isInDiet: boolean; name: string; time: string; } | undefined;
}

export type AppNavigationRoutesProps = NativeStackNavigationProp<AppRoutesType>

const { Screen, Navigator } = createNativeStackNavigator<AppRoutesType>()

export function AppRoutes() {

    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen
                name='home'
                component={Home}
            />

            <Screen
                name='statistics'
                component={Statistics}
            />

            <Screen
                name='newMeal'
                component={NewMeal}
            />

            <Screen
                name='mealResult'
                component={MealResult}
            />

            <Screen
                name='mealInfo'
                component={MealInfo}
            />
        </Navigator>
    )
}


