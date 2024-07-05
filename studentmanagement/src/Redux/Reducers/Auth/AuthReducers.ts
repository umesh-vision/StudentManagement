import axios from 'axios';
import { setCookie } from '../../../services/cookie';

export const login=(async(model:any)=>{
  let status=true;
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
          await response.data.map((i:any)=>i.type==='Role'?setCookie('role',i.value,1,''):console.log('fetching role...'));
        });
        await setCookie('token',res.data.token,1,'');
        status=true;
      } 
    })
    .catch((err) => {            
       console.log(err)
       status=false;
    }); 
  return status;
});
