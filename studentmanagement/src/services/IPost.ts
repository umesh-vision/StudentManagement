export interface PostDTO {
    PostId :number
    Type: string
    Description:string
    InsertPersonId?:number
    Create_Person:string
    UpdatePersonId?:number
    Person_Photo:string
    Created_on?:any
    Updated_on?:any 
    lstImages?:Images[] 
    TotalLikes:number
    TotalComments:number
    IsLiked:boolean
}

export interface Images{
    PostImageId?:number 
    Image:string 
    IsCopy?:boolean
}