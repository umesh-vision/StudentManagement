import {Component} from 'react'
import { Button, Modal } from 'react-bootstrap';
import { OptionType, studentDTO, StudentState } from '../../../services/IComman';
import Multiselect from 'multiselect-react-dropdown';
import { getCityByStateId, getState } from '../../../Redux/Reducers/StudentReducer';
import { onChange, validationForm } from '../../../utils/util';
import Validation from '../../../utils/validation';

type ModalProps = { 
    handleClose: () => void;
    studentState?:StudentState;
    isEdit?:boolean;   
};

interface student{
    student?:studentDTO
    stateOptions:OptionType[];
    cityOption:OptionType[];
    hobbiesOptions:OptionType[];
    selectedHobbies:OptionType[];
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
            studentName:{name:"studentName", value:""},
            address:{name:"address",value:""},
            age:{name:"age",value:""},
            gender:{name:"gender",value:""},
            hobbies:{name:"hobbies",value:""},
            pincode:{name:"pincode",value:""},
            city:{name:"city",value:""},
            state:{name:"state",value:""},
            submitted:false
        }
    }
    
    async componentDidMount(){       
        const stateList=await getState();
        this.setState({stateOptions:stateList})
    }
    componentDidUpdate(prevProps: Readonly<ModalProps>, prevState: Readonly<student>, snapshot?: any): void {
        if (prevProps.studentState !== this.props.studentState) {
            this.setState({
                studentName:{name:"studentName", value:this.props.studentState?.studentData?.studentName},
                address:{name:"address",value:this.props.studentState?.studentData?.address},
                age:{name:"age",value:this.props.studentState?.studentData?.age},
                gender:{name:"gender",value:this.props.studentState?.studentData?.gender},
                hobbies:{name:"hobbies",value:this.props.studentState?.studentData?.hobbies},
                pincode:{name:"pincode",value:this.props.studentState?.studentData?.pincode},
                city:{name:"city",value:this.props.studentState?.studentData?.city},
                state:{name:"state",value:this.props.studentState?.studentData?.state}
            })
        }
    }
  
  
    addOptions = (selected: OptionType[]) => {debugger
        this.setState({selectedHobbies:selected});
    };
    
    removeOption = (selected: OptionType[]) => {
        this.setState({selectedHobbies:selected});
    };

    onChnageState=async(e:any)=>{      
       const id=e.target.value;
        if(id>0){
            const city=await getCityByStateId(e.target.value);
            this.setState({cityOption:city})
        }
    }

    onChange=async(e:any)=>{  debugger
        const name=e.target.name;
        let value=e.target.value;
        onChange(this,name,value);
        if(name==='state'){
           await this.onChnageState(e);
        }   
    }
    
    onSubmit=async(e:any)=>{ 
        debugger
        e.preventDefault(); 
        this.setState({submitted:true})    
  
        if(validationForm(this))
        {    debugger
          
        } 
    }

    onChnageCity=(e:any)=>{
        
    }

    onclose =() =>{
        this.setState({
            studentName:{name:"studentName",value:""},
            address:{name:"address",value:""},
            age:{name:"age",value:""},
            gender:{name:"gender",value:""},
            hobbies:{name:"hobbies",value:""},
            pincode:{name:"pincode",value:""},
            city:{name:"city",value:""},
            state:{name:"state",value:""},
            submitted:false
        });

        this.setState({cityOption:[]});
        this.props.handleClose();
    }

    render(){ 
        const { studentName, address,age,gender,hobbies,city,state,pincode,submitted} = this.state;
        return(
            <div>
                <Modal show={this.props.studentState?.isShowDeleteModel} onHide={this.onclose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>  
                        <div className='col-md-10'>
                            <div>
                                <strong><p>Are you sure you want to delete this Student?</p></strong>
                            </div>
                            <div style={{paddingTop:'10px'}}>
                                <Button  style={{marginLeft:'5px'}}>Yes</Button>  
                                <Button style={{marginLeft:'5px'}}>No</Button>                                   
                            </div> 
                        </div>
                    </Modal.Body>
                </Modal>

                <Modal show={this.props.studentState?.isShowAddEditModel}  onHide={this.onclose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.isEdit?"Edit":"Add"} Student</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>       
                        <div className='row'>    
                            <div className='col-md-12'>
                                <form onSubmit={this.onSubmit}>   
                                    <div className='row'>  
                                        <div className='form-group col-md-6'>
                                            <label htmlFor='name'>Student Name</label>
                                            <input type='text' maxLength={30} value={studentName.value} onChange={this.onChange} className="form-control" name="studentName"  placeholder='Student Name' />
                                            <Validation fieldName='Name' fieldType='string' value={studentName.value} showValidation={submitted} />           
                                        </div>                     
                                        <div className='form-group col-md-3'>
                                            <label htmlFor='discription'>Age</label>   
                                            <input type='text' maxLength={30} value={age.value}  onChange={this.onChange} className="form-control" name="age"  placeholder='Age' />   
                                            <Validation fieldName='Age' fieldType='number' value={age.value} showValidation={submitted} />                         
                                        </div>                  
                                        <div className='form-group col-md-3'>
                                            <label htmlFor='discription'>Gender</label>   
                                            <input type='text' maxLength={30} value={gender.value===""?(this.props.studentState?.studentData?.gender):gender.value} onChange={this.onChange} className="form-control" name="gender" placeholder='Gender' />                            
                                            <Validation fieldName='Gender' fieldType='string' value={gender.value} showValidation={submitted} />           
                                        </div> 
                                        <div className='form-group col-md-12'>
                                            <label htmlFor='discription'>Address</label>   
                                            <input type='text' maxLength={30} value={address.value===""?(this.props.studentState?.studentData?.address):address.value} name="address" onChange={this.onChange} className="form-control" placeholder='Address' />                  
                                            <Validation fieldName='Address' fieldType='string' value={address.value} showValidation={submitted} />           
                                        </div>      
                                        <div className='form-group col-md-6'>
                                            <label htmlFor='discription'>Hobbies</label>  
                                            <Multiselect
                                                options={this.state.hobbiesOptions} 
                                                displayValue="value"     
                                                key={"value"}                                                                            
                                                selectedValues={this.props.studentState?.studentData?.hobbiesOption} 
                                                onSelect={this.addOptions}
                                                onRemove={this.removeOption}
                                            />                                  
                                            <div className="text-danger"></div>
                                        </div>  
                                        <div className='form-group col-md-6'>
                                            <div className='form-group'>
                                                <label htmlFor='discription'>State</label>
                                                <select className='form-control' name="state" onChange={this.onChange}>
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
                                                <div className="text-danger"></div>
                                            </div>   
                                        </div>
                                        <div className='form-group col-md-6'>
                                            <div className='form-group'>
                                                <label htmlFor='discription'>City</label>    
                                                <select className='form-control' name="city" onChange={this.onChange}>
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
                                        </div>                             
                                        <div className='form-group col-md-6'>
                                            <div className='form-group'>
                                                <label htmlFor='discription'>Pincode</label>   
                                                <input type='text' maxLength={30}  onChange={this.onChange} value={pincode.value===""?(this.props.studentState?.studentData?.pincode):pincode.value} className="form-control" name="pincode" placeholder='Pincode' />    
                                                <Validation fieldName='Pincode' fieldType='number' value={pincode.value} showValidation={submitted} />    
                                            </div>   
                                        </div>
                                      
                                        <div style={{paddingTop:'10px'}}>
                                            <input type="submit" className='btn btn-success' value="Save Changes" />
                                            <Button style={{marginLeft:'5px'}} onClick={this.onclose}>close</Button>                                   
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