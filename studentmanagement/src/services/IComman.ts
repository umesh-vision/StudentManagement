export interface studentDTO{
    image:any
    studentId: number
    studentName: string
    address: string
    age:number
    gender:string
    hobbies:string
    city:string
    state:string
    pincode:number 
    cityId:number
    stateId:number
    hobbiesOption?:OptionType[]
    cityOption?:OptionType[]
 }


export interface PaginationData{
    record: studentDTO[]
    totalRecord: number;   
}

export interface StudentState{
    isShowDeleteModel?: boolean
    isShowAddEditModel?:boolean
    studentData?:studentDTO
    stateOption?:OptionType[]
    cityOption?:OptionType[]
}


export interface OptionType{
    value: string;
    text: string;
};