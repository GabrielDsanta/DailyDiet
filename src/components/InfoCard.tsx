import { Button as ButtonNativeBase, Heading, IButtonProps, Text, VStack, View } from "native-base";
import { ArrowUpRight } from 'phosphor-react-native'
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { AppNavigationRoutesProps } from "@routes/app.routes";
import { useCallback, useState } from "react";
import { fetchInDietData } from "@utils/fetchInDietData";

type InfoCardProps = IButtonProps & {
    subtitle: string;
    isArrowVisible: boolean;
    size: 'large' | 'small';
}


export function InfoCard({ subtitle, isArrowVisible = true, size = 'large', ...rest }: InfoCardProps) {
    const [newTitle, setNewTitle] = useState("")
    const [cardColor, setCardColor] = useState("")
    const navigation = useNavigation<AppNavigationRoutesProps>()

    useFocusEffect(useCallback(() => {
        async function callfetchInDietData() {
            const total = await fetchInDietData()

            if (Number(total) > 50) {
                setCardColor("#E5F0DB")
            }else{
                setCardColor("#F4E6E7")
            }

            setNewTitle(total + "%")
        }

        callfetchInDietData()
    }, []))

    return (
        <ButtonNativeBase
            onPress={() => navigation.navigate("statistics" as never, { color: cardColor } as never)}
            mt={8}
            rounded="md"
            bg={cardColor}
            w="full"
            _pressed={{
                bg: cardColor === "#F4E6E7" ? "red.100" : "green.100"
            }}
            {...rest}
        >

            <View alignItems="flex-end" mr="-70px">
                <ArrowUpRight size={30} color={cardColor === '#E5F0DB' ? "#639339" : "#BF3B44"} />
            </View>


            <VStack alignItems="center" justifyContent="center">
                <Heading fontSize={40} mt="-4">
                    {newTitle}
                </Heading>


                <Text fontFamily="body" fontSize={16} pb={2} color="gray.700">
                    {subtitle}
                </Text>
            </VStack>


        </ButtonNativeBase>
    )
}