import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppNavigationRoutesProps } from "@routes/app.routes";
import { fetchInDietData } from "@utils/fetchInDietData";
import { Button as ButtonNativeBase, Heading, StatusBar, Text, VStack } from "native-base";
import { ArrowLeft } from "phosphor-react-native";
import { useCallback, useState } from 'react'

type DefaultHeaderProps = {
    subtitle?: string;
    color: "#E5F0DB" | "#DDDEDF" | "#F4E6E7";
    arrowColor: "#639339" | "#BF3B44" | "#333638";
    size: "small" | "regular";
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
}

export function DefaultHeader({ color = "#F4E6E7", arrowColor = "#333638", subtitle, size = "regular", isLoading, setIsLoading }: DefaultHeaderProps) {
    const [title, setTitle] = useState("")
    const [backgroundColor, setBackgroundColor] = useState("")
    const navigation = useNavigation<AppNavigationRoutesProps>()

    useFocusEffect(useCallback(() => {
        async function callfetchInDietData() {
            // setIsLoading (true)
            const total = await fetchInDietData()

            if (Number(total) > 50) {
                setBackgroundColor("#E5F0DB")
            } else {
                setBackgroundColor("#F4E6E7")
            }

            setTitle(total + "%")
            // setIsLoading(false)
        }

        callfetchInDietData()
    }, []))

    return (
        <VStack mt={color === "#DDDEDF" ? 2 : 0} px={2} bg={backgroundColor}>
            <StatusBar backgroundColor={color} />

            <ButtonNativeBase
                bg="transparent"
                flex={1}
                onPress={() => navigation.goBack()}
                mt={10}
                _pressed={{
                    bg: "transparent"
                }}
            >
                <ArrowLeft size={30} color={arrowColor} />
            </ButtonNativeBase>


            <VStack mt={color === "#DDDEDF" ? -2 : 0} alignItems="center" justifyContent="center">
                <Heading pb={color === "#DDDEDF" ? 10 : 0} fontSize={size === "regular" ? 40 : 20} mt="-4" fontFamily="heading">
                    {title}
                </Heading>

                {subtitle && (
                    <Text fontFamily="body" fontSize={16} pb={8} color="gray.700">
                        {subtitle}
                    </Text>
                )}
            </VStack>

        </VStack>
    )
}