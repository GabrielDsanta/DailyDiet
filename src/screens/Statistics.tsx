import { DataListInfos } from "@components/DataListInfos";
import { DefaultHeader } from "@components/DefaultHeader";
import { Loading } from "@components/Loading";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { StorageMealGet } from "@storage/storageMeals";
import { VStack } from "native-base";
import { useState, useCallback } from 'react'

export function Statistics() {
    const [isLoading, setIsLoading] = useState(false)
    
    const [total, setTotal] = useState(0)
    const [inDietTotal, setInDietTotal] = useState(0)
    const [outDietTotal, setOutDietTotal] = useState(0)
    const [bestSequence, setBestSequecence] = useState(0)

    const route = useRoute()

    const { color } = route.params as any;

    useFocusEffect(useCallback(() => {
        let newTotal = 0
        let inDiet = 0
        let outDiet = 0
        let bestSequence = 0

        async function callfetchInDietData() {
            try {
                setIsLoading(true)
                const dataInStorage = await StorageMealGet()
                dataInStorage.map((item) => {
                    item.meals.map((item2, index) => {
                        if (item2.isInDiet === true) {
                            inDiet++
                            setInDietTotal(inDiet)
                            if (item.meals[index + 1].isInDiet === true) {
                                bestSequence++
                                bestSequence++
                            }
                        } else {
                            outDiet++
                            setOutDietTotal(outDiet)
                        }

                        newTotal++
                        setTotal(newTotal)
                    })
                })
                setBestSequecence(bestSequence)
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }

        callfetchInDietData()
    }, []))

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
                        bestSequence={bestSequence}
                        inDietTotal={inDietTotal}
                        outDietTotal={outDietTotal}
                        total={total}
                    />
                </VStack>
            )}
        </>
    )
}