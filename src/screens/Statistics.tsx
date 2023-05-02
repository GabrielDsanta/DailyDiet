import { DataListInfos } from "@components/DataListInfos";
import { DefaultHeader } from "@components/DefaultHeader";
import { Loading } from "@components/Loading";
import { useRoute } from "@react-navigation/native";
import { VStack } from "native-base";
import { useState} from 'react'

export function Statistics() {
    const [isLoading, setIsLoading] = useState(false)
    const route = useRoute()

    const { color } = route.params as any;

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <VStack>
                    <DefaultHeader
                        isLoading={isLoading}
                        setIsLoading={setIsLoading}
                        color={color}
                        subtitle="das refeições dentro da dieta"
                        arrowColor={color !== "#F4E6E7" ? "#639339" : "#BF3B44"}
                        size="regular"
                    />
                    <DataListInfos
                        isLoading={isLoading}
                        setIsLoading={setIsLoading}
                    />
                </VStack>
            )}
        </>
    )
}