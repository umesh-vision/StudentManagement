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
      console.log(education)
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
    const education:EducationDTO={
      eduId:0,
      university:null,
      degree:null,
      fromDate:null,
      toDate:null,
      isStudy:false,
      percentage:0
    };
    return education;
  }
};
