import { ColDef } from 'ag-grid-community';
export interface studentDTO{
    image:any
    studentId: number
    studentName: string
    studClass:number
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

 export interface EducationDTO{
    eduId:any,
    university:any
    degree:any
    fromDate:any
    toDate:any
    isStudy:any
    percentage:any
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

export interface AdminState {
    columnDefs: ColDef[];
    rowData: any[]; 
    currentPage: number;
    totalPages: number;
    pageSize:number;
    studentState?:any;   
    isEdit?:boolean;
    userId?:number;
}