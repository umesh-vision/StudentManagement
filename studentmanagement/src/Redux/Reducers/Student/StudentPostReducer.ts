import axios from "axios";
import { getCookie } from "../../../services/cookie";

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