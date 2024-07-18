import axios from 'axios';
import { OptionType, PaginationData,  studentDTO } from '../../../services/IComman';

export const getStudentList = async (page:number,pageSize:number,search?:any): Promise<PaginationData> => {
    try { 
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}Student/get?pageNumber=${page}&pageSize=${pageSize}&serchText=${search}`);
      const students: studentDTO[] = response.data.data.map((student: any) => ({
            studentId: student.studentId,
            studentName: student.studentName,
            studClass:student.class,
            address: student.address,
            age: student.age,
            gender: student.gender,
            hobbies:student.hobbies,
            city: student.city,
            cityId:student.cityId,
            state:student.state,
            stateId:student.stateId,
            pincode: student.pincode,
            image:student.image,
            hobbiesOption: student.hobbies !== null ? student.hobbies.split(',').map((option: string) => ({
              value: option.trim(),
              text: option.trim()
            })) : []
        }));
     
        const paginationData: PaginationData= {
          record:students,
          totalRecord:response.data.total
        };
        return paginationData;
    } catch (error) {
      const paginationData: PaginationData= {
        record:[],
        totalRecord:0
      };
      console.error('Error fetching students:', error);
      return paginationData;
    }
};

export const getStudentById = async (id:number): Promise<studentDTO> => {
  try { 
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}Student/get_by_id/${id}`);
    const students: studentDTO = {
          studentId: response.data.studentId,
          studentName: response.data.studentName,
          address: response.data.address,
          age: response.data.age,
          gender: response.data.gender,
          hobbies:response.data.hobbies,
          city: response.data.city,
          cityId:response.data.cityId,
          stateId:response.data.stateId,
          state:response.data.state,
          pincode: response.data.pincode,
          image:response.data.image,
          studClass:response.data.class,
          cityOption:await getCityByStateId(response.data.stateId),
          hobbiesOption: response.data.hobbies !== null && response.data.hobbies !== "" ? response.data.hobbies.split(',').map((option: string) => ({
            value: option.trim(),
            text: option.trim()
          })) : []
      };
      return students;
  } catch (error) {
      const students: studentDTO={
        studentId: 0,
        studentName: '',
        address:  '',
        age: 0,
        gender:'',
        hobbies: '',
        city:  '',
        state: '',
        pincode: 0,
        image: '',
        stateId:0,
        cityId:0,
        studClass:0,
      };
    console.error('Error fetching students:', error);
    return students;
  }
}
export const getState=async() :Promise<OptionType[]>=>{  
   const stateList=await axios.get(`${process.env.REACT_APP_BASE_URL}Student/getState?`);
   const state: OptionType[] = stateList.data.map((st: any) => ({
      value:st.stateId,
      text:st.stateName
    }));
   return state;
}
export const getCityByStateId=async(id:number) :Promise<OptionType[]>=>{
   const cityList=await axios.get(`${process.env.REACT_APP_BASE_URL}Student/getCity/${id}`);
   const city: OptionType[] = cityList.data.map((st: any) => ({
     value:st.cityId,
     text:st.cityName
    }));
   return city;
}

export const saveStudent=async(model:any):Promise<boolean>=>{  
  let status=true;
  var authOptions = {
      method: "post",
      url: process.env.REACT_APP_BASE_URL+'Student/save',
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

export const deleteStudent=async(id:any):Promise<boolean>=>{  
  let status=true;  
  await axios.delete(process.env.REACT_APP_BASE_URL+'Student/delete/'+id)       
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