export interface studentDTO{
    studentId: number
    studentName: string
    address: string
    age:number
    geneder:string
    hobbies:string
    city:string
    state:string
    pincode:number
 }


export interface PaginationData{
    record: studentDTO[];
    totalRecord: number;
  }