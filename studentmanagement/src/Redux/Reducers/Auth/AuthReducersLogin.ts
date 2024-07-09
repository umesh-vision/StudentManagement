import axios from 'axios';
import { setCookie } from '../../../services/cookie';


export const AuthReducersLogin=(async(model:any)=>{   
    let dto={
      role:'',
      status:true,
      token:'',
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
          await response.data.map((i:any)=>i.type==='Role'?(setCookie('role',i.value,1,''),dto.role=i.value):console.log('fetching role...'));
        });
        dto.token=res.data.toke;
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

