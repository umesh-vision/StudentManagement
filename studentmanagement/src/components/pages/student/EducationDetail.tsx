import React, { Component } from 'react';
import AddEditEducationDetail from './AddEditEducationDetail';
import { addUpdateEducation, deleteEducation, getEduById, getEduList } from '../../../Redux/Reducers/Student/EducationReducer';

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
  async componentDidMount(id?:any) {  
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
      forms: [...prevState.forms, { id: 0}],
    }));
  }

  handleChange = (index:any, event:any) => {
    const { name, value } = event.target;
    this.setState((prevState) => {
      const forms = [...prevState.forms];
      forms[index][name] = value;
      return { forms };
    });
  }

  handleSubmit = async(form:any,index:any,e:any) => {    
    e.preventDefault();
    if(form.id===0)this.setState({isAdd:false}); 
    const result=await addUpdateEducation(form);
    if(result>0){
      const data=await await getEduById(result);
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
    } 
  }

  onDelete = async(id:any,index:any,e:any) => {    
    e.preventDefault();
    const result= await deleteEducation(id);
    if(result) this.removeEducation(index);
  }

  onCancelForm= async(e:any,index?:number) => {
    e.preventDefault();
    const id=parseInt(e.target.form.id);
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
              {!this.state.isAdd ?(<button className='btn btn-primary' onClick={this.handleAddForm}>Add Detail</button>):(<></>)}
               {this.state.forms.map((form, index) => (                  
                  <AddEditEducationDetail
                    key={form.id}
                    form={form}
                    index={index}
                    isAdd={this.state.isAdd}
                    handleChange={this.handleChange}
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
