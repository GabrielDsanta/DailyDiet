import { HStack, Text, VStack } from "native-base";

type DataListInfosProps = {
    total: number;
    inDietTotal: number;
    outDietTotal: number;
    bestSequence: number;
}

export function DataListInfos({ total, inDietTotal, outDietTotal, bestSequence }: DataListInfosProps) {

    return (
        <VStack h="full" rounded="2xl" mt="-10px" py="6" px="8" bg="#FFF">
            <Text fontWeight="bold" fontSize="16" mt="2" color="gray.700" textAlign="center">
                Estatísticas gerais
            </Text>

            <VStack bg="gray.100" py="4" rounded="lg" mt={4} alignItems="center">
                <Text fontWeight="bold" fontSize="27" color="gray.800">
                    {bestSequence}
                </Text>

                <Text color="gray.600">
                    melhor sequência de pratos dentro da dieta
                </Text>
            </VStack>

            <VStack bg="gray.100" py="4" rounded="lg" mt={4} alignItems="center">
                <Text fontWeight="bold" fontSize="27" color="gray.800">
                    {total}
                </Text>

                <Text color="gray.600">
                    refeições registradas
                </Text>
            </VStack>

            <HStack mt="-15px">
                <VStack mr="4" bg="#E5F0DB" py="2" px="2" rounded="lg" mt={8} alignItems="center">
                    <Text fontWeight="bold" fontSize="27" color="gray.800">
                        {inDietTotal}
                    </Text>

                    <Text mt="2" textAlign="center" w="150px" fontSize="16" color="gray.600">
                        refeições dentro da dieta
                    </Text>
                </VStack>

                <VStack bg="#F4E6E7" py="2" px="2" rounded="lg" mt={8} alignItems="center">
                    <Text fontWeight="bold" fontSize="27" color="gray.800">
                        {outDietTotal}
                    </Text>

                    <Text mt="2" textAlign="center" w="150px" fontSize="16" color="gray.600">
                        refeições fora da dieta
                    </Text>
                </VStack>
            </HStack>
        </VStack>
    )
}