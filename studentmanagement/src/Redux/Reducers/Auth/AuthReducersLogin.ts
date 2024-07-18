import axios from 'axios';
import { setCookie } from '../../../services/cookie';


export const AuthReducersLogin=(async(model:any)=>{   
    let dto={
      role:'',
      status:true,
      token:'',
      userId:0,
    }

    var authOptions = {
        method: "post",
        url: process.env.REACT_APP_BASE_URL+'Login/Login',
        data: JSON.stringify(model),
        headers: {
          "Content-Type": "application/json",
        },
        json: true,
    };    
    await axios(authOptions)       
    .then(async(res) => {            
      if(res.status===200){        
         await axios.post(process.env.REACT_APP_BASE_URL+'Login/AuthorizeToken?token='+res.data.token)
        .then(async(response) => {    
          await response.data.map((i:any)=>i.type==='Role'?((setCookie('role',i.value,1,''),dto.role=i.value)):(i.type==='UserId'?(setCookie('userId',i.value,1,''),dto.userId=i.value):console.log("Fetching ...")));
        });
        await setCookie('token',res.data.token,1,'');
        await setCookie('isLoggedIn',true,1,'');
        dto.status=true;
      } 
    })
    .catch((err) => {            
       console.log(err)
       dto.status=false;
    }); 
  return dto;
});

