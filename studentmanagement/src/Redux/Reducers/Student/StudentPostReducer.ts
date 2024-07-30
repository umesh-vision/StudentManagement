import axios from "axios";
import { getCookie } from "../../../services/cookie";
import { PostDTO } from "../../../services/IPost";
import moment from "moment";
import toast from "react-hot-toast";

export const addUpdatePost=async(form:any):Promise<boolean>=>{      
    let status=false;
    let model ={      
      type:"Default",
      description: form.description,
      postId:form.postId,
      insertPersonId: await getCookie("userId"),
      lstImages:form.images
    }

    var authOptions = {
        method: "post",
        url: process.env.REACT_APP_BASE_URL+'Student/post/save',
        data:JSON.stringify(model),
        headers: {
          "Content-Type": "application/json",
        },
        json: true,
    };    
    await axios(authOptions)       
    .then(async(res) => { 
      if(res.status===200){ 
        status=true;   
        toast.success('Post Saved successfully!');
      } 
    })
    .catch((err) => {  
       toast.error('Somthing went wrong!');  
       console.log(err)
       status=false;
    }); 
    return status;
}

export const getPostList=async(pageSize?:number):Promise<PostDTO[]>=>{
    try{
    let model={
      pageSize:pageSize!==undefined?pageSize:1,
      userId:await getCookie("userId")
    }
    
    var authOptions = {
      method: "get",
      url:`${process.env.REACT_APP_BASE_URL}Student/post/get?pageSize=${model.pageSize}&userId=${model.userId}`,
      data:JSON.stringify(model),
      headers: {
        "Content-Type": "application/json",
      },
      json: true,
    };    
    const response=await axios(authOptions)
    let post: PostDTO[] = response.data.data.map((post: any) => ({
      postId :post.postId,
      type: post.type,
      description:post.description,
      insertPersonId:post.insertPersonId,
      create_Person:post.create_Person,
      updatePersonId:post.updatePersonId,
      person_Photo:post.person_Photo,
      created_on:post.created_on?moment(post.created_on).format("MMM Do YYYY, h:mm:ss A"):null,
      updated_on:post.updated_on?moment(post.updated_on).format("MMM Do YYYY, h:mm:ss A"):null,
      lstImages:post.lstImages !== null ? post.lstImages.map((img: any) => ({
        postImageId:img.postImageId,
        image:img.image, 
        isCopy:img.isCopy    
      })) : [], 
      totalLikes:post.totalLikes,
      totalComments:post.totalComments,
      isLiked:post.isLiked 
    }));
    return post;  
  }
  catch(erro){
    toast.error('Somthing went wrong!');  
    return [] as PostDTO[];
  }

}

export const onEditAPI=async(id:any):Promise<PostDTO>=>{
  try{
    const userId=await getCookie("userId");
    const response=await axios.get(`${process.env.REACT_APP_BASE_URL}Student/post/get_by_id?postId=${id}&userId=${userId}`);
    const post:PostDTO ={
      PostId:response.data.data.postId,
      Type: response.data.data.type,
      Description:response.data.data.description,
      InsertPersonId:response.data.data.insertPersonId,
      Create_Person:response.data.data.create_Person,
      UpdatePersonId:response.data.data.updatePersonId,
      Person_Photo:response.data.data.person_Photo,
      Created_on:response.data.data.created_on?moment(response.data.data.created_on).format("MMM Do YYYY, h:mm:ss A"):null,
      Updated_on:response.data.data.updated_on?moment(response.data.data.updated_on).format("MMM Do YYYY, h:mm:ss A"):null,
      lstImages:response.data.data.lstImages !== null ? response.data.data.lstImages.map((img: any) => ({
        postImageId:img.postImageId,
        image:img.image, 
        isCopy:img.isCopy    
      })) : [], 
      TotalLikes:response.data.data.totalLikes,
      TotalComments:response.data.data.totalComments,
      IsLiked:response.data.data.isLiked 
    }
    return post;
  }
  catch(e){
    console.log(e)
    toast.error('Somthing went wrong!');  
    return {} as PostDTO;
  }
}

export const onDeleteAPI=async(id:any):Promise<boolean>=>{
  let status=false;   
  await axios.delete(`${process.env.REACT_APP_BASE_URL}Student/post/delete/${id}`)
  .then(async(res) => {            
    if(res.status===200){        
      status=true;
      toast.success('Post Deleted successfully!');
    } 
  })
  .catch((err) => {      
     toast.error('Somthing went wrong!');      
     console.log(err)
     status=false;
  }); 
  return status;

}

export const onDeleteImageAPI=async(id:any):Promise<boolean>=>{
  let status=false;   
  await axios.delete(`${process.env.REACT_APP_BASE_URL}Student/post/image/delete/${id}`)
  .then(async(res) => {            
    if(res.status===200){        
      status=true;     
    } 
  })
  .catch((err) => {            
     console.log(err)
     status=false;
  }); 
  return status;

}

export const onLikeUnlikePost=async(id:number):Promise<boolean>=>{   
  try{
    const userId =await getCookie("userId");
    await axios(`${process.env.REACT_APP_BASE_URL}Student/post/like?PostId=${id}&UserId=${userId}`)
    return true
  }
  catch(ex){
    return false;
  }
}

export const getUserNamesByPostId=async(id:number):Promise<string[]>=>{
  try{    
    const response=await axios(`${process.env.REACT_APP_BASE_URL}Student/post/get_liked_user?PostId=${id}`)
    return response.data.user;
  }
  catch(ex){
    return [];
  }
}