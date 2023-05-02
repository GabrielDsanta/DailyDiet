import { useNavigation } from "@react-navigation/native";
import { AppNavigationRoutesProps } from "@routes/app.routes";
import { Button as ButtonNativeBase, HStack, Text, VStack } from "native-base";
import { Plus } from "phosphor-react-native";


export function NewSnackSession() {
    const navigation = useNavigation<AppNavigationRoutesProps>()

    return (
        <VStack mt={34}>
            <Text color="gray.800" fontSize={18} fontFamily="body">
                Refeições
            </Text>

            <ButtonNativeBase
                onPress={() => navigation.navigate('newMeal' as never, { isEditing: false } as never)}
                mt={2}
                w="full"
                h="60px"
                rounded="md"
                bg="gray.800"
                _pressed={{
                    bg: "gray.500"
                }}
            >
                <HStack alignItems="center" justifyContent="center">
                    <Plus size={24} color="#FFF" />
                    <Text ml={4} color="#FFF" fontFamily="body" fontSize={16} fontWeight="bold">
                        Nova refeição
                    </Text>
                </HStack>
            </ButtonNativeBase>
        </VStack>
    )
}