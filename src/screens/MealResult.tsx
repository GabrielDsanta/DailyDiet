import { useNavigation, useRoute } from '@react-navigation/native';
import { Button as ButtonNativeBase, VStack, Text, Heading } from 'native-base'

import GoodMealIcon from '@assets/GoodMealIcon.svg'
import BadMealIcon from '@assets/BadMealIcon.svg'
import { AppNavigationRoutesProps } from '@routes/app.routes';

type MealResult = {
    title: "Continue assim!" | "Que pena!";
    subtitle: "Você saiu da dieta dessa vez, mas continue se esforçando e não desista!" | "Você continua dentro da dieta. Muito bem!";
}

export function MealResult() {
    const route = useRoute()
    const navigation = useNavigation<AppNavigationRoutesProps>()

    const { title } = route.params as MealResult;

    return (
        <VStack alignItems="center">
            <Heading fontSize={26} mb="2" color={title === "Continue assim!" ? "#639339" : "#BF3B44"} mt={24}>{title}</Heading>

            {title === "Que pena!" ? (
                <Text color="gray.800" fontSize={16} mb="-16" textAlign="center">
                    Você <Text fontWeight="bold">saiu da dieta</Text> dessa vez, mas continue se esforçando e não desista!
                </Text>
            ) : (
                <Text color="gray.800" fontSize={16} mb="-16" textAlign="center">
                    Você continua <Text fontWeight="bold">dentro da dieta.</Text> Muito bem!
                </Text>
            )}

            {title === "Continue assim!" ? (
                <GoodMealIcon height={500} />
            ) : (
                <BadMealIcon height={500} />
            )}

            <ButtonNativeBase
                onPress={() => navigation.navigate("home")}
                mt="-80px"
                w="200px"
                h="60px"
                rounded="md"
                bg="gray.800"
                _pressed={{
                    bg: "gray.500"
                }}
            >
                <Text color="#FFF" fontFamily="body" fontSize={16} fontWeight="bold">
                    Ir para a página inicial
                </Text>

            </ButtonNativeBase>
        </VStack>
    )
}