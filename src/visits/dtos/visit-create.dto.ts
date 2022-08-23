export class VisitCreateDto {
    date: Date
    pet: string
    nickname: string
    age: number
    gender: string
    disease: string
    treatment: string
    payType: string
    paySum: number

    constructor(data) {
        this.date = data.date
        this.nickname = data.nickname
        this.age = data.age
        this.disease = data.disease
        this.treatment = data.treatment
        this.paySum = data.paySum
        this.gender = data.gender
        this.paySum = data.paySum

        this.pet = data.pet.toUpperCase()

    }
}