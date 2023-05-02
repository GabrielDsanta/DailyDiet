import { HStack } from "native-base";

import KnifeDailyDietLogo from '@assets/KnifeDailyDiet.svg'
import LetteringDailyDiet from '@assets/LetteringDailyDiet.svg'
import UserImage from '@assets/UserImage.svg'

export function HomeHeader() {
    return (
        <HStack flex={1} justifyContent="space-between" ml={-2}>
            <HStack>
                <KnifeDailyDietLogo />
                <LetteringDailyDiet height={45} width={45} />
            </HStack>

            <UserImage />

        </HStack>
    )
}