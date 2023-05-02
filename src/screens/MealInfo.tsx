import { ArrowLeft } from "phosphor-react-native";
import { FormDataType } from "./NewMeal";
import { Button as ButtonNativeBase, VStack, HStack, Heading, Text, View, Modal } from "native-base"
import { useNavigation, useRoute } from "@react-navigation/native";
import { Button } from "@components/Button";
import { AppNavigationRoutesProps } from "@routes/app.routes";
import { useState } from "react";
import { StorageMealGet, StorageMealSave } from "@storage/storageMeals"
import { DailyDietMealsType } from "@contexts/DailyDietContext";
import { useDaily } from "@hooks/useDaily";

export function MealInfo() {
    const { CallSetMeals } = useDaily()

    const [showModal, setShowModal] = useState(false)

    const navigation = useNavigation<AppNavigationRoutesProps>()
    const route = useRoute()
    const { date, description, isInDiet, name, time, id } = route.params as FormDataType;

    async function SetDatasRegisterNewMeal(meals: DailyDietMealsType[]) {
        CallSetMeals(meals)
        await StorageMealSave(meals)
    }

    async function HandleDeleteMeal() {
        let mealsInStorage = await StorageMealGet()
        mealsInStorage.map((item) => {
            if (item.meals.length > 0) {
                item.meals.map((itemMeal, index) => {
                    if(itemMeal.id === id){
                        item.meals.splice(index, 1)
                    }
                })
            }
        })

        SetDatasRegisterNewMeal(mealsInStorage)

        navigation.navigate("home")
    }

    return (
        <VStack>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <Modal.Content maxWidth="600px">
                    <Modal.Body>
                        <Text pt="4" mb="6" fontSize="18" fontFamily="NunitoSans_700Bold" textAlign="center">Deseja realmente excluir o registro da refeição?</Text>

                        <HStack pb="2" alignItems="center" justifyContent="center">

                            <ButtonNativeBase
                                borderColor="#1B1D1E"
                                borderWidth="1"
                                rounded="md"
                                mr="4"
                                px="6"
                                py="3"
                                bg="#FFF"
                                onPress={() => {
                                    setShowModal(false);
                                }}
                                _pressed={{
                                    bg: "#DDDEDF"
                                }}
                            >
                                <Text fontFamily="NunitoSans_700Bold" color="#1B1D1E">
                                    Cancelar
                                </Text>
                            </ButtonNativeBase>

                            <ButtonNativeBase
                                bg="#333638"
                                rounded="md"
                                px="6"
                                py="3"
                                onPress={HandleDeleteMeal}
                                _pressed={{
                                    bg: "#1B1D1E"
                                }}
                            >

                                <Text fontSize={14} fontFamily="NunitoSans_700Bold" color="#FFF">
                                    Sim, excluir
                                </Text>
                            </ButtonNativeBase>
                        </HStack>
                    </Modal.Body>
                </Modal.Content>
            </Modal>

            <VStack pb="8" px={2} bg={isInDiet === false ? "#F4E6E7" : "#E5F0DB"}>
                <HStack mt="10" alignItems="center">
                    <ButtonNativeBase
                        _pressed={{
                            bg: 'transparent'
                        }}
                        bg="transparent"
                        onPress={() => navigation.goBack()}
                    >
                        <ArrowLeft size={30} color="#333638" />
                    </ButtonNativeBase>


                    <Heading ml="100px" fontSize="20" fontFamily="heading">
                        Refeição
                    </Heading>
                </HStack>

            </VStack>

            <VStack h="full" rounded="2xl" mt="-15px" py="6" px="8" bg="#FFF">
                <Heading fontFamily="NunitoSans_700Bold" mt={4} mb={2} color="#1B1D1E">
                    {name}
                </Heading>

                <Text fontFamily="NunitoSans_400Regular" w="370px" mb="6" fontSize="17" color="#1B1D1E">
                    {description}
                </Text>

                <Heading fontFamily="NunitoSans_700Bold" fontSize="17" color="#1B1D1E">
                    Data e hora
                </Heading>

                <Text fontFamily="NunitoSans_400Regular" fontSize="17" mt={2} mb={6} color="#333638">
                    {date} ás {time}
                </Text>

                <HStack mb="175px" bg="#EFF0F0" w="40" h="9" rounded="full" alignItems="center" justifyContent="center">
                    <View mt={1} mr={2} rounded="full" h={2} w={2} bg={isInDiet === false ? "#BF3B44" : "#639339"}></View>
                    <Text fontSize="16">{isInDiet === false ? "fora da dieta" : "dentro da dieta"}</Text>
                </HStack>

                <Button
                    theme="dark"
                    title="Editar refeição"
                    icon="pencil"
                    onPress={() => navigation.navigate("newMeal" as never, { isEditing: true, date, description, isInDiet: isInDiet, name, time, id } as never)}
                />

                <Button
                    theme="light"
                    title="Excluir refeição"
                    icon="trash"
                    onPress={() => setShowModal(true)}
                />
            </VStack>

        </VStack>
    )
}