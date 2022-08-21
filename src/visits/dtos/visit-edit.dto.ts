export class VisitEditDto {
    date: Date
    pet: string = ''
    nickname: string = ''
    age: number
    gender: string = ''
    disease: string = ''
    treatment: string = ''
    payType: string = 'НАЛ'
    paySum: number

    constructor(data) {
        this.date = data.date.toISOString()
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