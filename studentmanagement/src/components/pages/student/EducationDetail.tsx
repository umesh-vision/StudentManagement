import React, { Component } from 'react';
import AddEditEducationDetail from './AddEditEducationDetail';
import { getEduById, getEduList } from '../../../Redux/Reducers/Student/EducationReducer';

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
  async componentDidMount(id?:any) {    debugger
    let data=await getEduList();
    for(let i=0;i<=data.length-1;i++){   
      this.setState((prevState) => ({
        forms: [...prevState.forms, { id: data[i].eduId, university:data[i].university, degree:data[i].degree, fromDate:data[i].fromDate, toDate:data[i].toDate,isStudy:data[i].isStudy,percentage:data[i].percentage }],
      }));      
    }     
  }

  educationDetailById=async(id:any,index?:any)=>{   
    debugger
    // let data=await getEduById(id);
    // if(data.eduId>0){   
    //   this.setState((prevState) => {
    //     const forms = [...prevState.forms];
    //     forms[index] = {
    //       ...forms[index],
    //       university: data.university,
    //       degree: data.degree,
    //       fromDate: data.fromDate,
    //       toDate: data.toDate,
    //       isStudy: data.isStudy,
    //       percentage: data.percentage
    //     };
    //     return { forms };
      //});
      // let updatedItemList =this.state.forms.map((item) => {
      //     if (item.id === data.eduId) {
      //       return { ...item, id: data.eduId,university:data.university, degree:data.degree, fromDate:data.fromDate, toDate:data.toDate,isStudy:data.isStudy,percentage:data.percentage };
      //     }
      //     return item;
      // });

      // this.setState((prevState) => ({
      //   forms: [...prevState.forms, { id: data.eduId, university:data.university}]
      // }));
            
        // if(this.state.editForms[index]!==undefined){
        //   this.setState((prevState) => {
        //     const editForms = [...prevState.editForms];       
        //       editForms[index]["id"] = data.eduId;
        //       editForms[index]["university"] = data.university;
        //       editForms[index]["degree"] = data.degree;
        //       editForms[index]["fromDate"] = data.fromDate;
        //       editForms[index]["toDate"] = data.toDate;
        //       editForms[index]["isStudy"] = data.isStudy;
        //       editForms[index]["percentage"] = data.percentage;
        //       return { editForms };          
        //   });     
        // }else{
        //   this.setState((prevState) => ({
        //     editForms: [...prevState.editForms, { id: data.eduId, university: data.university, degree: data.degree, fromDate:data.fromDate, toDate:data.toDate,isStudy:data.isStudy,percentage:data.percentage }],
        //   }));
        // }
   
   //  }  
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

  handleSubmit = (event:any) => {
    event.preventDefault();
    console.log(this.state.forms);
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
    else{            
      await this.educationDetailById(id,index); 
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
                    handleChange={this.handleChange}
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
