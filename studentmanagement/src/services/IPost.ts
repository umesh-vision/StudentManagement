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
    IsLiked:boolean,  
    IsShowComment?:boolean,
    CommentList?:Comment[]
    CommentIndex?:number
    Comment?:string
    CommentId?:number
}

export interface Images{
    PostImageId?:number 
    Image:string 
    IsCopy?:boolean
}

export interface Comment{
    postCommentId: number,
    userId: number,
    userName:string,
    comment:string,
    inserted_on:Date
}
