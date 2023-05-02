import { useNavigation } from "@react-navigation/native";
import { FlatList, HStack, Text, View } from "native-base";
import { TouchableOpacity } from 'react-native'

import { AppNavigationRoutesProps } from '@routes/app.routes'

export type CardMealList = {
    id: string;
    name: string;
    description: string;
    date: string;
    time: string;
    isInDiet: boolean;
}

type MealListProps = {
    sectionTitle: string;
    meals: CardMealList[];
}

export function MealList({ sectionTitle, meals }: MealListProps) {
    const navigation = useNavigation<AppNavigationRoutesProps>()

    function HandleNavigateToMealInfo(item: CardMealList) {
        navigation.navigate("mealInfo" as never, item  as never)
    }

    return (
        <FlatList
            ListHeaderComponent={() => (
                <Text fontWeight="bold" fontSize={24} mb={2}>
                    {sectionTitle}
                </Text>
            )}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={() => HandleNavigateToMealInfo(item)}>
                    <HStack mb={4} flex={1} alignItems="center" justifyContent="space-between" h={12} borderColor="gray.300" borderWidth="1" rounded="md" px={4}>
                        <HStack alignItems="center">
                            <Text fontWeight="bold" fontSize={16} mr={2}>
                                {item.time}
                            </Text>

                            <Text color="gray.300" fontSize={24}>|</Text>

                            <Text w="56" textTransform="capitalize" numberOfLines={1} color="gray.700" fontSize={18} ml={2}>
                                {item.name}
                            </Text>
                        </HStack>


                        <View h={4} w={4} bg={item.isInDiet === true ? "#CBE4B4" : "#F3BABD"} rounded="full"></View>

                    </HStack>
                </TouchableOpacity>
            )}
            my={8}
            pb={2}
            mb={-2}
            data={meals}
            keyExtractor={item => item.id}
        />
    )
}