import axios from "axios";
import { TimeTable } from "../../../services/ITimeTable";

export const getSloteById = async (id:number): Promise<TimeTable[]> => {
    try { 
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}Student/get/GetTimeTable?id=${id}`);
      const timeTable: TimeTable[] = response.data.map((st: any) => ({
            Id:st.id,
            Slot1: st.timeSlot1,
            Slot2: st.timeSlot2,
            Slot3: st.timeSlot3,
            Slot4: st.timeSlot4,
            TeacherId: st.teacherId,
            Day:st.day ,   
            Name: st.name,
            DayId: st.dayId               
         
        }));
    return timeTable;
    } catch (error) {  
      console.error('Error fetching students:', error);
      return [] as TimeTable[];
    }
}

export const saveTimeTable = async (model:any): Promise<boolean> => {
    let status=false;
    var authOptions = {
      method: "post",
      url: process.env.REACT_APP_BASE_URL+'Student/post/SaveTimeTable',
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