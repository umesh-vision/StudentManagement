import axios from "axios";
import { getCookie } from "../../../services/cookie";
import { PostDTO } from "../../../services/IPost";
import moment from "moment";

export const addUpdatePost=async(form:any):Promise<boolean>=>{    
    let status=false;
    let model ={      
      type:"Default",
      description: form.description,
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
      } 
    })
    .catch((err) => {  
       console.log(err)
       status=false;
    }); 
    return status;
}

export const getPostList=async():Promise<PostDTO[]>=>{
    try{
    let model={
      pageSize:0,
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
    const post: PostDTO[] = response.data.data.map((post: any) => ({
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
    console.log(post);
    return post;  
  }
  catch(erro){
    return [] as PostDTO[];
  }

}