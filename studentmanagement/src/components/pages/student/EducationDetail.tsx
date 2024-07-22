import  { Component } from 'react';
import AddEditEducationDetail from './AddEditEducationDetail';
import { addUpdateEducation, deleteEducation, getEduById, getEduList } from '../../../Redux/Reducers/Student/EducationReducer';
import { Button } from 'react-bootstrap';
import toast from 'react-hot-toast';

interface IEdu{
  forms:any[],
  isAdd:boolean
}

class EducationDetail extends Component<any,IEdu>{ 
  constructor(props:any) {
    super(props);
    this.state = {
      forms: [],
      isAdd:false
    };
  }
  
  async componentDidMount() {  
    let data=await getEduList();
    for(let i=0;i<=data.length-1;i++){   
      this.setState((prevState) => ({
        forms: [...prevState.forms, { id: data[i].eduId, university:data[i].university, degree:data[i].degree, fromDate:data[i].fromDate, toDate:data[i].toDate,isStudy:data[i].isStudy,percentage:data[i].percentage }],
      }));      
    }     
  }
  
  removeEducation=async(index:any)=>{
    var form = [...this.state.forms];
    if (index !== -1) {
      form.splice(index, 1);
      this.setState({forms: form});
    }
  }


  handleAddForm = () => {  
    this.setState({isAdd:true})
    this.setState((prevState) => ({
      forms: [{id:0},...prevState.forms],
    }));
  }
  

  handleSubmit = async(form:any,index:any,e:any) => {    
    e.preventDefault();
    if(form.id===0)this.setState({isAdd:false}); 
    const result=await addUpdateEducation(form);
    if(result>0){
      const data=await getEduById(result);
      let newForm={
        id :data.eduId,
        university:data.university,
        degree : data.degree,
        fromDate : data.fromDate,
        toDate : data.toDate,
        isStudy : data.isStudy,
        percentage : data.percentage
      }
      this.setState((prevState) => {
        const forms = [...prevState.forms];
        forms[index] = newForm;
        return { forms };
      }); 
      if(form.id>0) {
        toast.success('Update successfully');
      }else{    
        toast.success('Added successfully');     
      }
    } 
    else{
      toast.error('Something went wrong');   
    }
  }

  onDelete = async(id:any,index:any,e:any) => {    
    e.preventDefault();
    const result= await deleteEducation(id);
    if(result){
      this.removeEducation(index);
      toast.success('Deleted successfully');
    }  
    else{
      toast.error('Something went wrong');   
    }

  }

  onCancelForm= async(id:number) => {    
    if(id===0){
      this.setState({isAdd:false})
      if(this.state.forms.length>0){
        this.setState({
          forms: this.state.forms.filter(item => item.id !== id)
        })
      }else{
        this.setState({forms:[]})
      }
    }
  }

  render(){
    return(
      <div className='container'>  
        <div className='row'>    
          <div className='col-md-12'>
            {!this.state.isAdd ?(<Button className='btn btn-primary' 
            onClick={this.handleAddForm}>Add Education Detail</Button>):(<></>)}               
            {this.state.forms.map((form, index) => (                  
                <AddEditEducationDetail
                  key={form.id}
                  form={form}
                  index={index}
                  isAdd={this.state.isAdd}
                  onDelete={this.onDelete}
                  saveForm={this.handleSubmit}
                  onCancel={this.onCancelForm}
                />
              ))
            }              
          </div>
        </div>
      </div>    
    )
  }
}
export default EducationDetail;
