import {Component} from 'react'
import { Button, Modal } from 'react-bootstrap';
import { OptionType, studentDTO, StudentState } from '../../../services/IComman';
import Multiselect from 'multiselect-react-dropdown';
import { deleteStudent, getCityByStateId, getState, saveStudent } from '../../../Redux/Reducers/Student/StudentReducer';
import { onChange, validationForm } from '../../../utils/util';
import Validation from '../../../utils/validation';
import toast from 'react-hot-toast';
import { DeleteModel } from './common/DeleteModel';

type ModalProps = { 
    handleClose: (isDeleted?:boolean) => void;
    studentState?:StudentState;
    isEdit?:boolean;   
};

interface student{
    student?:studentDTO
    stateOptions:OptionType[];
    cityOption:OptionType[];
    hobbiesOptions:OptionType[];
    selectedHobbies:OptionType[];
    hobbiesData?:string
    removeSelectedOptions:OptionType[];
    image?:any
    studentId?: any
    studentName: any
    address: any
    age:any
    gender:any
    hobbies:any
    pincode:any 
    city:any
    state:any
    submitted:boolean
    studClass:any
    stateId?:any
    cityId?:any
}

export class StudentModel extends Component<ModalProps,student>{      
    constructor(props: ModalProps) {   
        super(props);
        this.state = {
            stateOptions:[],
            cityOption:[],
            selectedHobbies:[],
            removeSelectedOptions:[],
            hobbiesOptions:[{value: "Dancing", text: "Dancing" },
            { value: "Reading", text: "Reading" },
            { value: "Cooking", text: "Cooking" },
            { value: "Music", text: "Music" },
            { value: "Gardening", text: "Gardening" },
            { value: "Painting", text: "Painting" },
            { value: "Sports", text: "Sports" }],
            studentId:{name:"studentId", value:0},
            studentName:{name:"studentName", value:""},
            address:{name:"address",value:""},
            age:{name:"age",value:0},
            gender:{name:"gender",value:"1"},
            hobbies:{name:"hobbies",value:""},
            pincode:{name:"pincode",value:0},
            studClass:{name:"studClass",value:0},
            city:{name:"city",value:""},
            state:{name:"state",value:""},          
            image:{name:"image",value:""},
            cityId:{name:"cityId",value:0},
            stateId:{name:"stateId",value:0},
            submitted:false        
        }
        
        this.addOptions = this.addOptions.bind(this);    
        this.removeOption = this.removeOption.bind(this);    
        this.onSubmit = this.onSubmit.bind(this);    
        this.onUpload = this.onUpload.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChnageState = this.onChnageState.bind(this);
        this.onChnageCity = this.onChnageCity.bind(this);
        this.onclose = this.onclose.bind(this);        
    }
    
    async componentDidMount(){       
        const stateList=await getState();
        this.setState({stateOptions:stateList})
    }

    componentDidUpdate(prevProps: Readonly<ModalProps>, prevState: Readonly<student>, snapshot?: any): void {
        if (prevProps.studentState !== this.props.studentState) {
            this.setState({    
                studentId:{name:"studentId", value:this.props.studentState?.studentData?.studentId===undefined?0:this.props.studentState?.studentData?.studentId},
                studentName:{name:"studentName", value:this.props.studentState?.studentData?.studentName},
                address:{name:"address",value:this.props.studentState?.studentData?.address},
                studClass:{name:"studClass",value:this.props.studentState?.studentData?.studClass},
                age:{name:"age",value:this.props.studentState?.studentData?.age},
                gender:{name:"gender",value:this.props.studentState?.studentData?.gender===undefined?"1":this.props.studentState?.studentData?.gender},
                hobbies:{name:"hobbies",value:this.props.studentState?.studentData?.hobbies===undefined?"":this.props.studentState?.studentData?.hobbies},
                pincode:{name:"pincode",value:this.props.studentState?.studentData?.pincode},
                city:{name:"city",value:this.props.studentState?.studentData?.city},
                state:{name:"state",value:this.props.studentState?.studentData?.state},
                stateId:{name:"stateId",value:this.props.studentState?.studentData?.stateId},
                cityId:{name:"cityId",value:this.props.studentState?.studentData?.cityId},
                image:{name:"image",value:this.props.studentState?.studentData?.image}
            })
        }
    }
  
  
    addOptions = (selected: OptionType[]) => {
        this.setState({selectedHobbies:selected});   
    };
    
    removeOption = (selected: OptionType[]) => {
        this.setState({selectedHobbies:selected});
    };

    onChnageState=async(e:any)=>{      
       const id=e.target.value;      
        if(id>0){
            this.setState({stateId:{name:"stateId",value:id}});
            const city=await getCityByStateId(e.target.value);
            this.setState({cityOption:city})
        }
    }

    onChange=async(e:any)=>{  
        const name=e.target.name;
        let value=e.target.value;
        onChange(this,name,value);
        if(name==='state')await this.onChnageState(e);   
        if(name==='city')await this.onChnageCity(e);   
    }

    onUpload=async(e:any)=>{  
        const file = e.target.files?.[0];
        if (file) {
          this.previewImage(file);
        }      
    }

    previewImage = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = e.target?.result as string;
          this.setState({image:{name:"image",value:img}});
        };
        reader.readAsDataURL(file);
    };
    
    onSubmit=async(e:any)=>{   
        e.preventDefault(); 
        this.setState({submitted:true}) 
        if(validationForm(this))
        { 
            let model={
                studentId:this.state.studentId.value,
                studentName: this.state.studentName.value,
                address: this.state.address.value,
                class: this.state.studClass.value,
                age: this.state.age.value,
                hobbies: this.state.selectedHobbies.map((h:any) => `${h.value}`).join(','),
                gender: this.state.gender.value,
                stateId: this.state.stateId.value,
                cityId: this.state.cityId.value,
                pincode: this.state.pincode.value,
                image: this.state.image.value
            }  
            let result=await saveStudent(model)
            if(result){
                toast.success('Saved successfully!');
                this.onclose();
            }else{
                toast.error('Failed to save!');
            }
        } 
    }

    onChnageCity=(e:any)=>{
        const id=e.target.value;   
        if(id>0)this.setState({cityId:{name:"cityId",value:id}});
    }

    onDelete=async(e?:any,status?:boolean)=>{
        let result=await deleteStudent(this.state.studentId.value);
        if(result){
            toast.success('Deleted successfully!');
            this.onclose(true);
        }else{
            toast.error('Failed to delete!');
        }
    }

    onclose=(isDeleted?:boolean)=>{
        this.setState({
            studentId:{name:"studentId",value:0},
            studentName:{name:"studentName",value:""},
            address:{name:"address",value:""},
            studClass:{name:"studClass",value:0},
            age:{name:"age",value:0},
            gender:{name:"gender",value:1},
            hobbies:{name:"hobbies",value:""},
            pincode:{name:"pincode",value:0},
            city:{name:"city",value:""},
            state:{name:"state",value:""},
            cityId:{name:"cityId",value:0},
            stateId:{name:"stateId",value:0},
            image:{name:"image",value:""},
            submitted:false
        });  
        this.setState({cityOption:[]});
        this.props.handleClose(isDeleted);     
    }

    render(){ 
        const {studentName, address,age,gender,city,state,pincode,image,submitted,studClass} = this.state;
        return(
            <div>
                {
                    this.props.studentState?.isShowDeleteModel && 
                    <DeleteModel   onclose={this.onclose}
                        onDelete={this.onDelete}  
                        isShowDeleteModel={this.props.studentState?.isShowDeleteModel} 
                        title="Student"
                    />
                }           

                <Modal show={this.props.studentState?.isShowAddEditModel}  onHide={this.onclose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.isEdit?"Edit":"Add"} Student</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>       
                        <div className='row'>    
                            <div className='col-md-12'>
                                <form onSubmit={this.onSubmit} name="studentform">   
                                    <div className='row'>  
                                        <div className='form-group col-md-6'>
                                            <label htmlFor='name'>Student Name</label>
                                            <input type='text' maxLength={30} value={studentName.value} onChange={this.onChange} className="form-control" name="studentName"  placeholder='Student Name' />
                                            <Validation fieldName='Name' fieldType='string' value={studentName.value} showValidation={submitted} />           
                                        </div>     
                                        <div className='form-group col-md-6'>
                                            <label htmlFor='class'>Class</label>   
                                            <input type='number' value={studClass.value}  onChange={this.onChange} className="form-control" name="studClass"  placeholder='Class' />   
                                            <Validation fieldName='Class' fieldType='number' value={studClass.value} showValidation={submitted} />                         
                                        </div>                  
                                        <div className='form-group col-md-6'>
                                            <label htmlFor='age'>Age</label>   
                                            <input type='number' value={age.value}  onChange={this.onChange} className="form-control" name="age"  placeholder='Age' />   
                                            <Validation fieldName='Age' fieldType='number' value={age.value} showValidation={submitted} />                         
                                        </div>                  
                                        <div className='form-group col-md-6'>
                                            <label htmlFor='gender'>Gender</label> <br/>  
                                            <div className='form-check form-check-inline'>
                                                <input
                                                    type="radio"
                                                    name="gender"
                                                    className="form-check-input" 
                                                    defaultValue={1}
                                                    checked={gender.value===undefined?true:gender.value==="1"?true:false}
                                                    onChange={this.onChange}
                                                /> 
                                                <label className="form-check-label" htmlFor="male">Male</label>
                                            </div>       
                                            <div className='form-check form-check-inline'>
                                                <input
                                                    type="radio"
                                                    name="gender"
                                                    className="form-check-input" 
                                                    defaultValue={2}
                                                    checked={gender.value==="2"?true:false}
                                                    onChange={this.onChange}
                                                />  
                                                <label className="form-check-label" htmlFor="female">Female</label>                                             
                                            </div>                                              
                                        </div> 
                                        <div className='form-group col-md-12'>
                                            <label htmlFor='address'>Address</label>   
                                            <textarea maxLength={30} value={address.value===""?(this.props.studentState?.studentData?.address):address.value} name="address" onChange={this.onChange} className="form-control" placeholder='Address' />                  
                                            <Validation fieldName='Address' fieldType='string' value={address.value} showValidation={submitted} />           
                                        </div>      
                                        <div className='form-group col-md-6'>
                                            <label htmlFor='hobbies'>Hobbies</label>  
                                            <Multiselect
                                                options={this.state.hobbiesOptions} 
                                                displayValue="value"     
                                                key={"value"}                                                                         
                                                selectedValues={this.props.studentState?.studentData?.hobbiesOption} 
                                                onSelect={this.addOptions}
                                                onRemove={this.removeOption}
                                            />               
                                        </div>  
                                        <div className='form-group col-md-6'>
                                            <label htmlFor='state'>State</label>
                                            <select className='form-select' name="state" onChange={this.onChange}>
                                                {
                                                    this.props.studentState?.studentData?.state!==undefined?(
                                                        <option key={this.props.studentState?.studentData?.stateId} value={this.props.studentState?.studentData?.stateId}>
                                                            {this.props.studentState?.studentData?.state}
                                                        </option>                                                            
                                                    ):(<option key={0} value={''}>Select state</option>)
                                                }
                                                {                                            
                                                    this.state.stateOptions.map((obj:any) => {
                                                        return <option key={obj.value} value={obj.value}>{obj.text}</option>
                                                    })
                                                }
                                            </select>       
                                            <Validation fieldName='State' fieldType='number' value={state.value} showValidation={submitted} />                                               
                                        </div>
                                        <div className='form-group col-md-6'>                                            
                                            <label htmlFor='city'>City</label>    
                                            <select className='form-select'  name="city" onChange={this.onChange}>
                                                {
                                                    this.props.studentState?.studentData?.city!==undefined && this.state.cityOption.length===0?(
                                                        this.props.studentState?.studentData?.cityOption?.map((obj:any) => {
                                                            return <option key={obj.value} value={obj.value}>{obj.text}</option>
                                                        })
                                                    ):(<option key={0} value={''}>Select city</option>)}
                                                    {                                            
                                                        this.state.cityOption.map((obj:any) => {
                                                        return <option key={obj.value} value={obj.value}>{obj.text}</option>
                                                    })
                                                }       
                                            </select>   
                                            <Validation fieldName='City' fieldType='number' value={city.value} showValidation={submitted} />                                                
                                        </div>                             
                                        <div className='form-group col-md-6'>                                         
                                            <label htmlFor='pincode'>Pincode</label>   
                                            <input type='number' maxLength={30}  onChange={this.onChange} value={pincode.value===""?(this.props.studentState?.studentData?.pincode):pincode.value} className="form-control" name="pincode" placeholder='Pincode' />    
                                            <Validation fieldName='Pincode' fieldType='number' value={pincode.value} showValidation={submitted} />                                      
                                        </div>
                                        <div className='form-group col-md-6'>                                            
                                            <label htmlFor='image'>Upload</label>   
                                            <input type='file' onChange={this.onUpload} className="form-control" name="image" />                                                   
                                        </div>
                                        { 
                                            image.value !==undefined && image.value!=="" &&
                                            <div className='form-group col-md-6'>                                                
                                                <label htmlFor='photo'>Photo</label> <br />
                                                <img src={image.value}  style={{width:'100%x'}} width="100%" height="100%" alt="" />  
                                            </div>                                              
                                        }
                                        <div style={{paddingTop:'10px'}}>                                            
                                            <input type="submit" className='btn btn-success' value="Save Changes" />
                                            <Button style={{marginLeft:'5px'}} onClick={()=>this.onclose()}>close</Button>                                   
                                        </div>  
                                    </div>                 
                                </form>
                            </div>          
                        </div>                
                    </Modal.Body>              
                </Modal>    
            </div>        
        )
    }
}