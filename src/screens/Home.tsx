import { HomeHeader } from "@components/HomeHeader";
import { InfoCard } from "@components/InfoCard";
import { MealList } from "@components/MealList";
import { NewSnackSession } from "@components/NewSnackSession";
import { useDaily } from "@hooks/useDaily";
import { StorageMealRemove } from "@storage/storageMeals";
import { formattedDate } from "@utils/dateUtils";
import { ScrollView, VStack } from "native-base";

export function Home() {
    const { meals } = useDaily()
    
    return (
        <VStack px={6} py={12}>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <HomeHeader />

                <InfoCard
                    isArrowVisible
                    size="large"
                    subtitle="das refeições dentro da dieta"
                />

                <NewSnackSession />

                {meals[0]?.meals?.length > 0 && (
                    meals.map((item) => {
                        return (
                            <MealList
                                meals={item.meals}
                                sectionTitle={formattedDate(new Date(item.sectionTitle))}
                                key={item.id}
                            />
                        )
                    })
                )}
            </ScrollView>
        </VStack>
    )
}