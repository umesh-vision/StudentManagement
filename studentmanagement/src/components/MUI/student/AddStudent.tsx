import {Component} from 'react'
import { Button, FormSelect, Modal } from 'react-bootstrap';
import { OptionType, studentDTO, StudentState } from '../../../services/IComman';
import Multiselect from 'multiselect-react-dropdown';
import { deleteStudent, getCityByStateId, getState, saveStudent } from '../../../Redux/Reducers/Student/StudentReducer';
import { onChange, validationForm } from '../../../utils/util';
import Validation from '../../../utils/validation';
import toast from 'react-hot-toast';
import { DeleteModel } from '../../pages/student/common/DeleteModel';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@material-ui/core';

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
                    <DeleteModel  onclose={this.onclose}
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
                                            <FormControl fullWidth margin="normal"> 
                                                <FormLabel component="legend">Student Name</FormLabel>
                                                <TextField
                                                    fullWidth                                       
                                                    variant="outlined"
                                                    margin="normal"
                                                    name="studentName"
                                                    value={studentName.value}
                                                    onChange={this.onChange}                                    
                                                    placeholder='Student Name' 
                                                />
                                                <Validation fieldName='Name' fieldType='string' value={studentName.value} showValidation={submitted} />           
                                            </FormControl> 
                                        </div>     
                                        <div className='form-group col-md-6'>
                                            <FormControl fullWidth margin="normal"> 
                                                <FormLabel component="legend">Class</FormLabel>
                                                <TextField
                                                    fullWidth                                       
                                                    variant="outlined"
                                                    margin="normal"
                                                    type="number"
                                                    name="studClass"
                                                    value={studClass.value}
                                                    onChange={this.onChange}
                                                    placeholder='Class' 
                                                /> 
                                                <Validation fieldName='Class' fieldType='number' value={studClass.value} showValidation={submitted} />                         
                                            </FormControl> 
                                        </div>                  
                                        <div className='form-group col-md-6'>
                                            <FormControl fullWidth margin="normal">   
                                                <FormLabel component="legend">Age</FormLabel>
                                                <TextField
                                                    fullWidth                                       
                                                    variant="outlined"
                                                    margin="normal"
                                                    type="number"
                                                    name="age"
                                                    value={age.value}
                                                    onChange={this.onChange}
                                                    placeholder='Age' 
                                                /> 
                                                <Validation fieldName='Age' fieldType='number' value={age.value} showValidation={submitted} />                         
                                            </FormControl>      
                                        </div>                  
                                        <div className='form-group col-md-6'>     
                                            <FormControl fullWidth margin="normal">                
                                                <FormLabel component="legend">Gender</FormLabel>
                                                <RadioGroup
                                                    row
                                                    name="gender"
                                                    value={gender.value}
                                                    onChange={this.onChange}
                                                >
                                                    <FormControlLabel value="1"  checked={gender.value==="1"?true:false} control={<Radio />} label="Male" />
                                                    <FormControlLabel value="2"  checked={gender.value==="2"?true:false} control={<Radio />} label="Female" />
                                                </RadioGroup>  
                                            </FormControl>                          
                                        </div> 
                                        <div className='form-group col-md-12'>
                                            <FormControl fullWidth margin="normal">   
                                                <FormLabel component="legend">Address</FormLabel>  
                                                <TextField
                                                    fullWidth                                       
                                                    variant="outlined"
                                                    margin="normal"
                                                    type="text"
                                                    multiline
                                                    maxRows={4}
                                                    name="address"
                                                    value={address.value===""?(this.props.studentState?.studentData?.address):address.value} 
                                                    onChange={this.onChange}
                                                    placeholder='Address' 
                                                />            
                                                <Validation fieldName='Address' fieldType='string' value={address.value} showValidation={submitted} />           
                                            </FormControl>     
                                        </div>      
                                        <div className='form-group col-md-6'>
                                            <FormControl fullWidth margin="normal">             
                                                <FormLabel component="legend">Hobbies</FormLabel> 
                                                <Multiselect
                                                    options={this.state.hobbiesOptions} 
                                                    displayValue="value"     
                                                    key={"value"}                                                                         
                                                    selectedValues={this.props.studentState?.studentData?.hobbiesOption} 
                                                    onSelect={this.addOptions}
                                                    onRemove={this.removeOption}
                                                />          
                                            </FormControl>     
                                        </div>  
                                        <div className='form-group col-md-6'>
                                            <FormControl fullWidth margin="normal">              
                                                <FormLabel component="legend">State</FormLabel> 
                                                <FormSelect className='form-select' name="state" onChange={this.onChange}>
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
                                                </FormSelect>       
                                                <Validation fieldName='State' fieldType='number' value={state.value} showValidation={submitted} />                                               
                                            </FormControl>
                                        </div>
                                        <div className='form-group col-md-6'>                 
                                            <FormControl fullWidth margin="normal">                           
                                                <FormLabel component="legend">City</FormLabel> 
                                                <FormSelect className='form-select'  name="city" onChange={this.onChange}>
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
                                                </FormSelect>   
                                                <Validation fieldName='City' fieldType='number' value={city.value} showValidation={submitted} />                                                
                                            </FormControl>
                                        </div>                             
                                        <div className='form-group col-md-6'>   
                                            <FormControl fullWidth margin="normal">                  
                                                <FormLabel component="legend">Pincode</FormLabel>
                                                <TextField
                                                    fullWidth                                       
                                                    variant="outlined"
                                                    margin="normal"
                                                    type="number"                                            
                                                    name="pincode"
                                                    value={pincode.value===""?(this.props.studentState?.studentData?.pincode):pincode.value}
                                                    onChange={this.onChange}
                                                    className="form-control" 
                                                    placeholder='Pincode' 
                                                />                                                      
                                                <Validation fieldName='Pincode' fieldType='number' value={pincode.value} showValidation={submitted} />                                      
                                            </FormControl>
                                        </div>
                                        <div className='form-group col-md-6'>     
                                             <FormControl fullWidth margin="normal">              
                                                <FormLabel component="legend">Upload</FormLabel>  
                                                <input type='file' onChange={this.onUpload} className="form-control" name="image" />                                                   
                                            </FormControl>
                                        </div>
                                        { 
                                            image.value !==undefined && image.value!=="" &&
                                            <div className='form-group col-md-6'>   
                                                <FormControl fullWidth margin="normal">                                               
                                                    <FormLabel component="legend">Photo</FormLabel>  <br />
                                                    <img src={image.value}  width="200px" height="100px" alt="" />  
                                                </FormControl>
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