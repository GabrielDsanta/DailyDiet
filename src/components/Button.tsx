import { Button as ButtonNativeBase, Text, View } from "native-base";
import { PencilSimpleLine, Trash } from "phosphor-react-native";

type ButtonProps = {
    theme: "dark" | "light";
    icon: "pencil" | "trash";
    title: string;
    onPress: () => void;
}

export function Button({ onPress, theme, title, icon }: ButtonProps) {

    return (
        <ButtonNativeBase
            mb={2}
            onPress={onPress}
            alignItems="center"
            justifyContent="center"
            flexDirection="row"
            mt={2}
            w="full"
            h="60px"
            rounded="lg"
            bg={theme === "dark" ? "#333638" : "#FFF"}
            borderColor={theme === "dark" ? "transparent" : "#1B1D1E"}
            borderWidth={theme === "dark" ? 0 : 1}
            _pressed={{
                bg: theme === "dark" ? "#1B1D1E" : "#DDDEDF"
            }}
        >
            <View alignItems="center" justifyContent="center" flexDirection="row">
                {icon === "pencil" ? (
                    <PencilSimpleLine color="#FFF" size={24} />
                ) : (
                    <Trash size={24} />
                )}
                <Text ml={4} color={theme === "dark" ? "#FFF" : "#1B1D1E"} fontFamily="NunitoSans_700Bold" fontSize={16} fontWeight="bold">
                    {title}
                </Text>
            </View>

        </ButtonNativeBase>
    )
}