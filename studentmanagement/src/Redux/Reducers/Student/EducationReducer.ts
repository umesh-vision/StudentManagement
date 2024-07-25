import axios from 'axios';
import { EducationDTO} from '../../../services/IComman';
import { getCookie } from '../../../services/cookie';
import moment from 'moment';

export const getEduList =async(): Promise<EducationDTO[]>=> {
    try { 
      let id=await getCookie("userId");
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}Education/education_detail/get?UserId=${id}`); 
      const education: EducationDTO[] = response.data.data.map((ed: any) => ({
          eduId:ed.educationDetailId,
          university:ed.university,
          degree:ed.degree,
          fromDate:ed.fromYear?moment(ed.fromYear).format("YYYY-MM-DD"):null,
          toDate:ed.toYear?moment(ed.toYear).format("YYYY-MM-DD"):null,
          isStudy:ed.currentStudy?ed.currentStudy:false,
          percentage:ed.percentage
      }));
      return education;        
    } 
    catch (error){   
      return [];
    }
};

export const getEduById =async(id:any): Promise<EducationDTO>=> {
  try { 
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}Education/education_detail/get_education_detail_by_id?EducationDetailId=${id}`); 
    const education:EducationDTO ={
        eduId: response.data.educationDetailId,
        university: response.data.university,
        degree: response.data.degree,
        fromDate: response.data.fromYear?moment( response.data.fromYear).format("YYYY-MM-DD"):null,
        toDate: response.data.toYear?moment( response.data.toYear).format("YYYY-MM-DD"):null,
        isStudy: response.data.currentStudy? response.data.currentStudy:false,
        percentage: response.data.percentage
    };
    return education;  
    
  } 
  catch (error){  
    return {} as EducationDTO;
  }
};

export const addUpdateEducation=async(form:any):Promise<number>=>{    
  let status=0;
  let model ={
    educationDetailId:form.id,
    userId:await getCookie("userId"),
    university:form.university,
    degree:form.degree,
    percentage:form.percentage,
    fromYear:form.fromDate,
    toYear:form.toDate,
    currentStudy:form.isStudy,
  }
  
  var authOptions = {
      method: "post",
      url: process.env.REACT_APP_BASE_URL+'Education/education_detail/save',
      data:JSON.stringify(model),
      headers: {
        "Content-Type": "application/json",
      },
      json: true,
  };    
  await axios(authOptions)       
  .then(async(res) => { 
    if(res.status===200){  
      status=res.data;   
    } 
  })
  .catch((err) => {            
     console.log(err)
     status=0;
  }); 
  return status;
}

export const deleteEducation=async(id:any):Promise<boolean>=>{  
  let status=true;    
  await axios.delete(`${process.env.REACT_APP_BASE_URL}Education/education_detail/delete/${id}`)       
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