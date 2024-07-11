import axios from 'axios';
import { PaginationData, studentDTO } from '../../services/IComman';

export const GetStudentList = async (page:number,pageSize:number,search?:any): Promise<PaginationData> => {
    try { 
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}Student/get?pageNumber=${page}&pageSize=${pageSize}&serchText=${search}`);
        const students: studentDTO[] = response.data.data.map((student: any) => ({
            studentId: student.studentId,
            studentName: student.studentName,
            address: student.address,
            age: student.age,
            gender: student.gender,
            hobbies:student.hobbies,
            city: student.city,
            state:student.state,
            pincode: student.pincode
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