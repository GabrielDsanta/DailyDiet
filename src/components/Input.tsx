import { Input as NativeBaseInput, IInputProps, FormControl } from "native-base"

type InputPropsData = IInputProps & {
    errorMessage?: string | null;
}

export function Input({ errorMessage = null, isInvalid, ...rest }: InputPropsData) {
    const inputIsInvalid = !!errorMessage || isInvalid
    
    return (
        <FormControl isInvalid={inputIsInvalid} mb={4}>
            <NativeBaseInput
                h={12}
                px={4}
                bg="#FFF"
                borderWidth={1}
                borderColor="#d4d4d4"
                fontSize="md"
                color="gray.800"
                fontFamily="body"
                mb={4}
                isInvalid={inputIsInvalid}
                _invalid={{
                    borderWidth: 1,
                    borderColor: "red.500"
                }}
                _focus={{
                    bg: "transparent",
                    borderColor: "#d4d4d4"
                }}
                {...rest}
            />

            <FormControl.ErrorMessage>
                {errorMessage}
            </FormControl.ErrorMessage>
        </FormControl>
    )
}