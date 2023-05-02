import { Button as ButtonNativeBase, Radio, HStack, Heading, ScrollView, Text, VStack, View } from "native-base";

import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "@components/Input";
import { ArrowLeft } from "phosphor-react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigationRoutesProps } from "@routes/app.routes";

import { MaskedTextInput } from 'react-native-mask-text';
import { useDaily } from "@hooks/useDaily";
import { DailyDietMealsType } from "@contexts/DailyDietContext";

import uuid from 'react-native-uuid';
import { StorageMealGet, StorageMealSave } from "@storage/storageMeals";
import { CardMealList } from "@components/MealList";
import { useEffect } from 'react'

export type FormDataType = {
    id: string;
    name: string;
    description: string;
    date: string;
    time: string;
    isInDiet: boolean;
    isEditing?: boolean;
}

const ValidationSchema = yup.object({
    name: yup.string().required("Informe o nome da refeição"),
    description: yup.string().required("Informe a descrição da refeição"),
    date: yup.string().required("Informe a data").min(4, "Informe uma data válida"),
    time: yup.string().required("Informe o horário").min(4, "Informe um horário válido"),
    isInDiet: yup.boolean().required("Informe se a refeição está dentro ou fora da dieta")
})

export function NewMeal() {
    const { CallSetMeals, meals } = useDaily()
    const navigation = useNavigation<AppNavigationRoutesProps>()

    const route = useRoute()
    const { isEditing, name, description, date, isInDiet, time, id } = route.params as FormDataType;

    const { control, handleSubmit, formState: { errors }, setValue } = useForm<FormDataType>({
        resolver: yupResolver(ValidationSchema)
    })

    async function SetDatasRegisterNewMeal(meals: DailyDietMealsType[]) {
        CallSetMeals(meals)
        await StorageMealSave(meals)
    }

    async function HandleRegisterNewMeal(data: FormDataType) {
        try {
            let mealsInStorage = await StorageMealGet()

            const newMeal = {
                ...data,
                id: uuid.v4().toString()
            }

            let newSessionOrMeal: DailyDietMealsType = {
                id: uuid.v4().toString(),
                sectionTitle: String(new Date()),
                meals: []
            }

            if (mealsInStorage.length === 0) {
                let newMeals: CardMealList[] = []

                newMeals.push(newMeal)
                newSessionOrMeal.meals = newMeals

                const newSessionOnStorage: DailyDietMealsType[] = []
                newSessionOnStorage.push(newSessionOrMeal)

                SetDatasRegisterNewMeal(newSessionOnStorage)
            } else {
                const lastDateMealInStorage = mealsInStorage[0].meals[0].date
                if (lastDateMealInStorage === newMeal.date) {
                    mealsInStorage[0].meals.unshift(newMeal)
                    SetDatasRegisterNewMeal(mealsInStorage)
                } else {
                    newSessionOrMeal.meals.unshift(newMeal)
                    let newMeals = meals
                    newMeals.unshift(newSessionOrMeal)
                    SetDatasRegisterNewMeal(newMeals)
                }
            }

            if (data.isInDiet === false) {
                navigation.navigate('mealResult' as never, { title: "Que pena!", subtitle: "Você saiu da dieta dessa vez, mas continue se esforçando e não desista!" } as never)
            } else {
                navigation.navigate('mealResult' as never, { title: "Continue assim!", subtitle: "Você continua dentro da dieta. Muito bem!" } as never)
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function HandleSaveChanges(data: FormDataType) {
        let mealsInStorage = await StorageMealGet()

        mealsInStorage.map((item) => {
            item.meals.map((item2, index) => {
                if (item2.id === id) {
                    const updatedMeet: FormDataType = {
                        date: data.date,
                        description: data.description,
                        id,
                        isInDiet: data.isInDiet,
                        name: data.name,
                        time: data.time,
                    }
                    item.meals.splice(index, 1, updatedMeet)
                }
            })
        })

        await SetDatasRegisterNewMeal(mealsInStorage)
        navigation.navigate("home")
    }

    function LoadInputsValue() {
        setValue("name", name)
        setValue("date", date)
        setValue("description", description)
        setValue("time", time)
        setValue("isInDiet", isInDiet)
    }

    useEffect(() => {
        LoadInputsValue()
    }, [])

    return (
        <ScrollView>
            <VStack pb="10" px={2} bg="#DDDEDF">

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


                    {isEditing ? (
                        <Heading ml="20" fontSize="20" fontFamily="heading">
                            Editar refeição
                        </Heading>
                    ) : (
                        <Heading ml="20" fontSize="20" fontFamily="heading">
                            Nova refeição
                        </Heading>
                    )}
                </HStack>

            </VStack>

            <VStack h="full" rounded="2xl" mt="-15px" py="6" px="8" bg="#FFF">

                <Text color="gray.700" mt="4" fontFamily="NunitoSans_700Bold" mb="2" fontSize="16" lineHeight="xs">
                    Nome
                </Text>
                <Controller
                    control={control}
                    render={({ field: { value, onChange } }) => (
                        <Input
                            onChangeText={onChange}
                            errorMessage={errors.name?.message}
                            value={value}
                        />
                    )}
                    name="name"
                />

                <Text color="gray.700" mt="4" fontFamily="NunitoSans_700Bold" mb="2" fontSize="16" lineHeight="xs">
                    Descrição
                </Text>
                <Controller
                    control={control}
                    render={({ field: { value, onChange } }) => (
                        <Input
                            textAlignVertical="top"
                            h={32}
                            onChangeText={onChange}
                            value={value}
                            errorMessage={errors.description?.message}
                        />
                    )}
                    name="description"
                />

                <HStack alignItems="center" justifyContent="space-between">
                    <VStack mb="4">
                        <Text color="gray.700" mt="4" fontFamily="NunitoSans_700Bold" mb="2" fontSize="16" lineHeight="xs">
                            Data
                        </Text>
                        <Controller
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <MaskedTextInput
                                    value={value}
                                    mask="99/99"
                                    onChangeText={onChange}
                                    cursorColor="black"
                                    style={{
                                        height: 48.0,
                                        borderColor: "#c9c6c6",
                                        borderWidth: 1.0,
                                        width: 161.0,
                                        borderRadius: 4.0,
                                        marginTop: 10.0,
                                        paddingLeft: 15.0,
                                        paddingRight: 15.0,
                                        fontSize: 16.0,
                                    }}
                                />
                            )}
                            name="date"
                        />
                    </VStack>

                    <VStack mb="4">
                        <Text color="gray.700" mt="4" fontFamily="NunitoSans_700Bold" mb="2" fontSize="16" lineHeight="xs">
                            Hora
                        </Text>
                        <Controller
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <MaskedTextInput
                                    value={value}
                                    mask="99:99"
                                    onChangeText={onChange}
                                    cursorColor="black"
                                    style={{
                                        height: 48.0,
                                        borderColor: "#c9c6c6",
                                        borderWidth: 1.0,
                                        width: 161.0,
                                        borderRadius: 4.0,
                                        marginTop: 10.0,
                                        paddingLeft: 15.0,
                                        paddingRight: 15.0,
                                        fontSize: 16.0,
                                    }}
                                />
                            )}
                            name="time"
                        />
                    </VStack>
                </HStack>

                <Text color="gray.700" fontFamily="NunitoSans_700Bold" mb="2" fontSize="16" lineHeight="xs">
                    Está dentro da dieta?
                </Text>

                <Controller
                    control={control}
                    render={({ field: { value, onChange } }) => (
                        <Radio.Group
                            _radio={{
                                borderWidth: 0,
                                h: 0,
                                w: 0,
                                display: "none"
                            }}
                            name="myRadioGroup"
                            accessibilityLabel="Está dentro da sua dieta ?"
                        >

                            <HStack pb="56">
                                <Radio
                                    isPressed={isInDiet ? true : false}
                                    _pressed={{
                                        _stack: {
                                            bg: "#E5F0DB",
                                            borderWidth: 1,
                                            borderColor: "#639339"
                                        }
                                    }}
                                    _stack={{
                                        bg: "gray.100",
                                        h: 12,
                                        w: 40,
                                        rounded: "sm",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}
                                    _checked={{
                                        _stack: {
                                            bg: "#E5F0DB",
                                            borderWidth: 1,
                                            borderColor: "#639339"
                                        }
                                    }}
                                    onTouchStart={() => onChange(true)}
                                    value="true"
                                    my={1}
                                >
                                    <View h={2} w={2} bg="green.700" rounded="full"></View>
                                    Sim
                                </Radio>

                                <Radio
                                    isPressed={isInDiet === false ? true : false}
                                    _pressed={{
                                        _stack: {
                                            bg: "red.100",
                                            borderWidth: 1,
                                            borderColor: "red.500"
                                        }
                                    }}
                                    _stack={{
                                        bg: "gray.100",
                                        h: 12,
                                        w: 40,
                                        rounded: "sm",
                                        ml: 25,
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}
                                    _checked={{
                                        _stack: {
                                            bg: "red.100",
                                            borderWidth: 1,
                                            borderColor: "red.500"
                                        }
                                    }}
                                    onTouchStart={() => onChange(false)}
                                    value="false"
                                    my={1}
                                >
                                    <View bg="red.700" h={2} w={2} rounded="full"></View>
                                    Não
                                </Radio>

                            </HStack>
                        </Radio.Group>
                    )}
                    name="isInDiet"
                />

                <ButtonNativeBase
                    onPress={isEditing === true ? handleSubmit(HandleSaveChanges) : handleSubmit(HandleRegisterNewMeal)}
                    mt={2}
                    w="full"
                    h="60px"
                    rounded="md"
                    bg="gray.800"
                    _pressed={{
                        bg: "gray.500"
                    }}
                >
                    {isEditing ? (
                        <Text ml={4} color="#FFF" fontFamily="body" fontSize={16} fontWeight="bold">
                            Salvar alterações
                        </Text>
                    ) : (
                        <Text ml={4} color="#FFF" fontFamily="body" fontSize={16} fontWeight="bold">
                            Cadastrar refeição
                        </Text>
                    )}

                </ButtonNativeBase>
            </VStack>


        </ScrollView>
    )
}