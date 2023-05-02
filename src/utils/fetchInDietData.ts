import { StorageMealGet } from "@storage/storageMeals"

export async function fetchInDietData() {
    let inDiet = 0
    let outDiet = 0

    const datasInStorage = await StorageMealGet()
    datasInStorage.map((item) => {
        item.meals.map((item) => {
            if (item.isInDiet === true) {
                inDiet++
            } else {
                outDiet++
            }
        })
    })

    if (outDiet === 0) {
        let total = 100
        return total
    }

    if (inDiet === 0) {
        let total = 0
        return total
    }

    if (inDiet === outDiet) {
        let total = 50
        return total
    }
    
    let percentageToBeSubtracted = 100 / (inDiet + outDiet)

    let total = 0
    for (let index = 0; index < inDiet; index++) {
        total = total + percentageToBeSubtracted
    }

    for (let index = 0; index < outDiet; index++) {
        total = total - percentageToBeSubtracted
    }
    total = Number(total.toFixed(2).replace("-", ""))
    return total


}