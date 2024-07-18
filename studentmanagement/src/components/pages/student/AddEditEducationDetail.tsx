import React, { Component } from 'react';
import { onChange} from '../../../utils/util';
import Validation from '../../../utils/validation';

type props={
  form:any;
  saveForm:(e:any)=>void;
  handleChange:(id:any,e:any)=>void;
  onCancel:(e:any,index?:number)=>void;
  index:any; 
}

interface studForm{
form?:any
index:number
university:any
degree:any
fromDate:any
toDate:any
isStudy:any
percentage:any
submitted:boolean
isChecked:boolean
isComponentEdit:boolean
} 

class AddEditEducationDetail extends Component<props,studForm>{
  constructor(props:props) {
    super(props);
    this.state={
      index:0,
      university:{id:"",name:"university",value:""},
      degree:{id:"",name:"degree",value:""},
      fromDate:{id:"",name:"fromDate",value:""},
      toDate:{id:"",name:"toDate",value:""},
      percentage:{id:"",name:"percentage",value:""},
      isStudy:{id:"",name:"isStudy",value:false},
      submitted:false,
      isChecked:false,
      isComponentEdit:false,
      form:this.props.form
    }
  }

  componentDidMount(): void {   debugger
    this.setState({    
      university:{id:`university-${this.state.form.id}`,name:"university", value:this.props.form.university!==null?this.props.form.university:""},
      degree:{id:`degree-${this.props.form.id}`,name:"degree",value:this.props.form.degree!==null?this.props.form.degree:""},
      fromDate:{id:`fromDate-${this.props.form.id}`,name:"fromDate",value:this.props.form.fromDate!==null?this.props.form.fromDate:""},
      toDate:{id:`toDate-${this.props.form.id}`,name:"toDate",value:this.props.form.toDate!==null?this.props.form.toDate:""},
      percentage:{id:`percentage-${this.props.form.id}`,name:"percentage",value:this.props.form.percentage!==null?this.props.form.percentage:""},
      isStudy:{id:`study-${this.props.form.id}`,name:"isStudy",value:this.props.form.isStudy===true?true:false},
      form:this.props.form,
      index:this.props.index
    })          
 } 
  

  componentDidUpdate(prevProps: Readonly<props>, prevState: Readonly<studForm>, snapshot?: any): void {        
    if(prevState.form!==this.state.form)
      { debugger
        this.setState({    
          university:{id:`university-${this.state.form.id}`,name:"university", value:this.state.form.university!==null?this.state.form.university:""},
          degree:{id:`degree-${this.state.form.id}`,name:"degree",value:this.state.form.degree!==null?this.state.form.degree:""},
          fromDate:{id:`fromDate-${this.state.form.id}`,name:"fromDate",value:this.state.form.fromDate!==null?this.state.form.fromDate:""},
          toDate:{id:`toDate-${this.state.form.id}`,name:"toDate",value:this.state.form.toDate!==null?this.state.form.toDate:""},
          percentage:{id:`percentage-${this.state.form.id}`,name:"percentage",value:this.state.form.percentage!==null?this.state.form.percentage:""},
          isStudy:{id:`study-${this.state.form.id}`,name:"isStudy",value:this.state.form.isStudy===true?true:false},
          form:this.state.form,
          index:this.props.index
        })    
    }     
    else if(prevProps.form!==this.state.form && !this.state.isComponentEdit)
    { debugger
      this.setState({    
        university:{id:`university-${this.props.form.id}`,name:"university", value:this.props.form.university!==null?this.props.form.university:""},
        degree:{id:`degree-${this.props.form.id}`,name:"degree",value:this.props.form.degree!==null?this.props.form.degree:""},
        fromDate:{id:`fromDate-${this.props.form.id}`,name:"fromDate",value:this.props.form.fromDate!==null?this.props.form.fromDate:""},
        toDate:{id:`toDate-${this.props.form.id}`,name:"toDate",value:this.props.form.toDate!==null?this.props.form.toDate:""},
        percentage:{id:`percentage-${this.props.form.id}`,name:"percentage",value:this.props.form.percentage!==null?this.props.form.percentage:""},
        isStudy:{id:`study-${this.props.form.id}`,name:"isStudy",value:this.props.form.isStudy===true?true:false},
        form:this.props.form,
        index:this.props.index
      })   
    }  
  } 

  onChange=(index:any,e:any)=>{    
    debugger
    const { name, value,checked,form } = e.target; 
    if(name!=="isStudy"&& parseInt(form.id)>0){
      this.setState((prevState) => ({
        form: {
          ...prevState.form,
          [name]: value    
        }
      }))    
    }
    else if(parseInt(form.id)===0){debugger
      this.setState((prevState) => ({
        form: {
          ...prevState.form,
          [name]: value    
        }
        
      }))   
      this.props.handleChange(index, e)
    }else{
      
      this.setState((prevState) => ({
        form: {
          ...prevState.form,
          [name]: checked    
        }
      })) 
      this.setState({isChecked:this.state.isChecked===true?false:true});       
    }
  }
  
  validationForm=(context:any)=>{     
    const cs=JSON.parse(JSON.stringify(context.state));
    let status=true;
    for(let key in cs){
        if(cs.hasOwnProperty(key)){
           if(key!=="submitted" && key!=="forms"  && key!=="indexs" && key!=="isChecked"){
              const isRequired=cs[key].value!==undefined && cs[key].value!==""?false:true;
              if(isRequired){
                status=false
              }
            }
        }
    }
    return status;
  }
  
  onSubmit=(e:any)=>{    
    this.setState({submitted:true})    
    e.preventDefault(); 
    if(this.validationForm(this))
    {    
      console.log(this.state)
    }
  }

  onCheck=(index:any,e:any)=>{
    this.setState({isChecked:this.state.isChecked===true?false:true});
    this.props.handleChange(index, e)
  }

  onCancel=async(e:any,index?:any)=>{   
    debugger
    const id=parseInt(e.target.form.id);
    if(id===0)
    {
      this.props.onCancel(e);
    }
    else
    {
   //   this.props.onCancel(e,index);
      if(this.props.form.isStudy){              
        this.setState({isChecked:true});
      }
      else{
        this.setState({isChecked:false});
      }
      this.setState({isComponentEdit:false});      
    }
  }
  
  onFormEdit=(e:any)=>{
    if(this.state.isStudy.value){
      this.setState({isChecked:true});
    }else{
      this.setState({isChecked:false});
    }
    this.setState({isComponentEdit:true})
  }

  onDelete=(formId:any)=>{
    console.log(formId)
  }

  render(){
    const {university,degree,isStudy,percentage,fromDate,toDate,submitted,isChecked,isComponentEdit,form,index}=this.state;
    return(
      <div className='container'>  
        <div className='row'>    
          <div className='col-md-12'>      
            <form id={form.id} onSubmit={this.onSubmit}>
              <div className='row' >  
                <div className='form-group col-md-4' style={{"display":university.value==="" && form.id>0 && !isComponentEdit?"none":"inline"}}>
                  <label htmlFor={university.id}>University</label>
                  <input
                    type="text"
                    id={university.id}
                    name="university"
                    className='form-control'
                    value={university.value}
                    disabled={university.value!==undefined && !isComponentEdit?true:false}      
                    onChange={(event) => this.onChange(index, event)}
                  />
                  <Validation fieldName='University' fieldType='string' value={university.value} showValidation={submitted} />             
                </div>
                <div className='form-group col-md-4' style={{"display":degree.value==="" && form.id>0 && !isComponentEdit?"none":"inline"}}>
                  <label htmlFor={degree.id}>Degree</label>
                  <input
                    type="text"
                    id={degree.id}
                    name="degree"
                    className='form-control'
                    value={degree.value}
                    disabled={degree.value!==undefined && !isComponentEdit?true:false}      
                    onChange={(event) => this.onChange(index, event)}
                  />
                  <Validation fieldName='Degree' fieldType='string' value={degree.value} showValidation={submitted} />             
                </div>
                <div className='form-group col-md-4' >
                  <label htmlFor={isStudy.id}>Currently Study</label>
                  <input
                    type="checkbox"
                    id={isStudy.id}
                    name="isStudy"
                    className='form-check'                    
                    checked={isStudy.value}                  
                    disabled={!isComponentEdit}      
                    onChange={(event) => this.onChange(index, event)}
                  />                 
                </div>
                <div className='form-group col-md-4' style={{"display":fromDate.value==="" && form.id>0 && !isComponentEdit?"none":"inline"}}>
                  <label htmlFor={fromDate.id}>From Year</label>
                  <input
                    type="date"
                    id={fromDate.id}
                    name="fromDate"
                    className='form-control'
                    value={fromDate.value}
                    disabled={fromDate.value!==undefined && !isComponentEdit?true:false}      
                    onChange={(event) => this.onChange(index, event)}
                  />                 
                </div>
                {!isChecked ?
                  <>
                    <div className='form-group col-md-4'  style={{"display":toDate.value==="" && form.id>0 && !isComponentEdit?"none":"inline"}}>
                      <label htmlFor={toDate.id}>To Year</label>
                      <input
                        type="date"
                        id={toDate.id}
                        name="toDate"
                        className='form-control'
                        value={toDate.value}
                        disabled={toDate.value!==undefined && !isComponentEdit?true:false}       
                        onChange={(event) => this.onChange(index, event)}
                      />                 
                    </div>
                    <div className='form-group col-md-4' style={{"display":percentage.value==="" && form.id>0 && !isComponentEdit?"none":"inline"}}>
                      <label htmlFor={percentage.id}>Percentage</label>
                      <input
                        type="number"
                        id={percentage.id}
                        name="percentage"
                        className='form-control'     
                        disabled={percentage.value>0 && !isComponentEdit?true:false}             
                        value={percentage.value}
                        onChange={(event) => this.onChange(index, event)}
                      />             
                    </div>
                  </>
                  :<></>
                }
                <div className="form-group" style={{ paddingTop: "5px" }} >  
                {
                  form.id===0 ?
                  <>
                    <button type="submit" className='btn btn-success'>Save</button>
                    <button id={`cancel-${form.id}`} style={{marginLeft:'5px'}}  className='btn btn-danger' onClick={this.onCancel}>Cancel</button>                 
                          
                  </>: !isComponentEdit?
                  <>                 
                    <button className='btn btn-success' onClick={this.onFormEdit}>Edit</button>
                    <button id={`cancel-${form.id}`} style={{marginLeft:'5px'}}  className='btn btn-danger' onClick={()=>this.onDelete(form.id)}>Delete</button>
                  </>
                  :<></>
                }
                {
                  isComponentEdit?
                  <>
                    <button type="submit" className='btn btn-success'>Save</button>
                    <button id={`cancel-${form.id}`} style={{marginLeft:'5px'}}  className='btn btn-danger'   onClick={(event) => this.onCancel(event,index)}>Cancel</button>                 
                          
                  </>:<></>                  
                } 
                </div> 
              </div>
            </form>         
          </div>
        </div>
      </div>    
    )
  }
}
export default AddEditEducationDetail;

