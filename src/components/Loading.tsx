import { Center, Spinner } from "native-base";

import LogoDailyDiet from "@assets/LogoDailyDiet.svg"


export function Loading(){
    return(
        <Center flex={1} bg="gray.100">
            <LogoDailyDiet height={150} width={150} />
            <Spinner size={30} color="green.700" />
        </Center>
    )
}