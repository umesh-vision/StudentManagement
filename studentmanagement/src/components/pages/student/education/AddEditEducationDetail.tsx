import { Component } from 'react';
import { onChange} from '../../../../utils/util';
import Validation from '../../../../utils/validation';

type props={
  form:any;
  saveForm:(form:any,index:any,e:any)=>void;
  onDelete:(id:any,index:any,e:any)=>void;
  onCancel:(id:number)=>void;
  index:any; 
  isAdd:boolean;
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

  componentDidMount(): void { 
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
      { 
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
    { 
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

  onChange=(e:any)=>{            
    const { name, value,checked,form } = e.target; 
    let id=parseInt(form.id);
    if(id>0){
      if(name!=="isStudy"){
        this.setState((prevState) => ({
          form: {
            ...prevState.form,
            [name]: value    
          }
        }))    
      }
      else{
        this.setState((prevState) => ({
          form: {
            ...prevState.form,
            [name]: checked    
          }
        }))      
        this.setState({isChecked:this.state.isChecked===true?false:true});      
      }  
    }
    if(id===0){      
      if(name!=="isStudy"){
        onChange(this,name,value,id);
      }else{
        onChange(this,name,checked,id);
        this.setState({isChecked:this.state.isChecked===true?false:true});  
      }    
    }  
  }
  
  validationForm=(context:any)=>{     
    const cs=JSON.parse(JSON.stringify(context.state));
    let status=true;
    for(let key in cs){
        if(cs.hasOwnProperty(key)){
           if(key==='university' || key==='degree'){
              const isRequired=cs[key].value!==undefined && cs[key].value!==""?false:true;
              if(isRequired){
                status=false
              }
            }
        }
    }
    return status;
  }
  
  onSubmit=async (index:any,e:any)=>{        
    this.setState({submitted:true})    
    e.preventDefault(); 
    if(this.validationForm(this))
    {  
      let percentage;
      let date;      
      if(this.state.isStudy.value){
        percentage=null;
        date=null;
      }
     else{
      percentage=this.state.percentage.value===undefined || this.state.percentage.value===""?null:this.state.percentage.value;
      date=this.state.toDate.value===undefined ||this.state.toDate.value===""?null:this.state.toDate.value;;
     }

      let model={
        id:this.state.form.id,
        university:this.state.university.value,
        degree:this.state.degree.value,
        fromDate:this.state.fromDate.value!==""?this.state.fromDate.value:null,
        toDate:date!==null?this.state.toDate.value:date,
        isStudy:date ===null && percentage===null ?true:false,
        percentage:percentage!==null?this.state.percentage.value:percentage     
      }
      await this.props.saveForm(model,index,e);
      this.setState({isComponentEdit:false})
    }
  }

  onCancel=async(e:any)=>{      
    const id=parseInt(e.currentTarget.form.id);
    if(id===0)
    {
      this.props.onCancel(id);
    }
    else
    {   
      if(this.props.form.isStudy){              
        this.setState({isChecked:true});
      }
      else{
        this.setState({isChecked:false});
      }      
      this.setState({isComponentEdit:false});      
      this.props.onCancel(id);
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

  onDelete=(index:any,e:any)=>{ 
    e.preventDefault(); 
    this.props.onDelete(this.state.form.id,index,e);    
  }

  render(){
    const {university,degree,isStudy,percentage,fromDate,toDate,submitted,isChecked,isComponentEdit,form,index}=this.state;
    return(       
      <form id={form.id} onSubmit={(event)=>this.onSubmit(index,event)}  style={{paddingTop:"15px"}}>
        <div className="card text-bg-light" style={{backgroundColor:""}}>   
          <div className="card-body">       
            <div className='row' >  
              {
                !isComponentEdit && form.id>0 ?
                <> 
                  <div className='form-group col-md-12' style={{textAlign:"end"}}>
                    <button className="btn btn-sm btn-outline-dark" onClick={this.onFormEdit}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="30px" height="20px"><path fill="#ea9a10" d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/></svg></button>     
                    <button className="btn btn-sm btn-outline-dark" style={{marginLeft:"5px"}} onClick={(event)=>this.onDelete(index,event)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="30px" height="20px"><path fill="#f20707" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1 -32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1 -32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1 -32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.7 23.7 0 0 0 -21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0 -16-16z"/></svg></button>                    
                  </div> 
                </>
                :<></>
              }
              <div className='form-group col-md-5' style={{"display":university.value==="" && form.id>0 && !isComponentEdit?"none":"inline"}}>
                <label className="form-label fw-bold" htmlFor={university.id}>University</label><span className="text-danger" >*</span>
                <input
                  type="text"
                  id={university.id}
                  name="university"
                  className='form-control'
                  value={university.value}
                  disabled={                    
                    university.value !== undefined || university.value !== "" ? 
                    !isComponentEdit && form.id === 0 ? false : 
                    isComponentEdit && form.id>0? false : true : true                    
                  }   
                  onChange={(event) => this.onChange(event)}
                />
                <Validation fieldName='University' fieldType='string' value={university.value} showValidation={submitted} />             
              </div>
              <div className='form-group col-md-5' style={{"display":degree.value==="" && form.id>0 && !isComponentEdit?"none":"inline"}}>
                <label className="form-label fw-bold" htmlFor={degree.id}>Degree</label><span className="text-danger" >*</span>
                <input
                  type="text"
                  id={degree.id}
                  name="degree"
                  className='form-control'
                  value={degree.value}
                  disabled={                    
                      degree.value!==undefined ||  degree.value!=="" ?
                      !isComponentEdit && form.id===0 ?false:
                      isComponentEdit && form.id>0?false:true:true
                  
                  }       
                  onChange={(event) => this.onChange(event)}
                />
                <Validation fieldName='Degree' fieldType='string' value={degree.value} showValidation={submitted} />             
              </div>
              <div className='form-group col-md-2' >
                <label className="form-label fw-bold" htmlFor={isStudy.id}>Currently Study</label>
                <input
                  type="checkbox"
                  id={isStudy.id}
                  name="isStudy"
                  className='form-check'                 
                  checked={isStudy.value}  
                  disabled={                    
                      isStudy.value!==undefined ||  isStudy.value!==false ?
                      !isComponentEdit && form.id===0 ? false:isComponentEdit 
                      && form.id>0?false:true:true
                  }       
                  onChange={(event) => this.onChange(event)}
                />                 
              </div>
              <div className='form-group col-md-4' style={{"display":fromDate.value==="" && form.id>0 && !isComponentEdit?"none":"inline"}}>
                <label className="form-label fw-bold" htmlFor={fromDate.id}>From Year</label>
                <input
                  type="date"
                  id={fromDate.id}
                  name="fromDate"
                  className='form-control'
                  value={fromDate.value}
                  disabled={                    
                    fromDate.value!==undefined ||  fromDate.value!=="" ?
                    !isComponentEdit && form.id===0 ? false:isComponentEdit 
                    && form.id>0?false:true:true
                  }     
                  onChange={(event) => this.onChange(event)}
                />                 
              </div>
              {!isChecked ?
                <>
                  <div className='form-group col-md-4'  style={{"display":toDate.value==="" && form.id>0 && !isComponentEdit?"none":"inline"}}>
                    <label className="form-label fw-bold" htmlFor={toDate.id}>To Year</label>
                    <input
                      type="date"
                      id={toDate.id}
                      name="toDate"
                      className='form-control'
                      value={toDate.value}
                      disabled={                    
                        toDate.value!==undefined ||  toDate.value!=="" ?
                        !isComponentEdit && form.id===0 ? false:isComponentEdit 
                        && form.id>0?false:true:true
                      }        
                      onChange={(event) => this.onChange(event)}
                    />                 
                  </div>
                  <div className='form-group col-md-4' style={{"display":percentage.value==="" && form.id>0 && !isComponentEdit?"none":"inline"}}>
                    <label className="form-label fw-bold" htmlFor={percentage.id}>Percentage</label>
                    <input
                      type="number"
                      id={percentage.id}
                      name="percentage"
                      className='form-control' 
                      value={percentage.value}
                      disabled={                    
                        percentage.value!==undefined || percentage.value!=="" ?
                        !isComponentEdit  && form.id===0 ? false:isComponentEdit
                        && form.id>0?false:true:true
                      }  
                      onChange={(event) => this.onChange(event)}
                    />             
                  </div>
                </>
                :<></>
              }
             </div>
              <div className='row'> 
              { form.id===0?
                <>
                  <div className="form-group" style={{paddingTop:"5px",textAlign:"center"}}> 
                    <button className="btn btn-primary" >Save</button>
                    <button className='btn btn-secondary' style={{marginLeft:"5px"}} onClick={this.onCancel}>Cancel</button>                 
                  </div>   
                </>:<></>
              }
              {
                isComponentEdit?
                <>
                  <div className="form-group" style={{paddingTop:"5px",textAlign:"center"}}> 
                    <button className="btn btn-primary" >Save</button>
      
                    <button className='btn btn-secondary' style={{marginLeft:"5px"}} onClick={this.onCancel}>Cancel</button>                 
                  </div> 
                </>:<></>                  
              } 
            </div>
          </div>     
        </div>    
      </form> 
    )
  }
}
export default AddEditEducationDetail;

