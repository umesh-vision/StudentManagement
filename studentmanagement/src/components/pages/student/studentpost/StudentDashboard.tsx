import { Component} from 'react'
import withAuth from '../../../../context/AuthContextExtenstion';
import { Button, Modal } from 'react-bootstrap';
import { AuthContextProps } from '../../../../services/IContext';
import withNavigate from '../../../layouts/NavigationExtenstion';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Validation from '../../../../utils/validation';
import { addUpdatePost } from '../../../../Redux/Reducers/Student/StudentPostReducer';

type Props = { 
    auth:AuthContextProps,
    navigate: (path: string) => void;   
};
interface IState{
  isShow:boolean;
  data: string;
  submitted:boolean;
  images:any[]
}

class StudentDashboard extends Component<Props,IState>{  
    constructor(props:Props) {   
        super(props);
        this.state = {
            isShow:false,
            data:'',
            submitted:false,
            images:[]
        }
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<IState>, snapshot?: any): void {
      debugger
        if(prevState.data !== this.state.data){
            debugger
            this.setState((prevState) => ({  
                data:this.state.data
            }))
        }
    }

    onSave=async(e:any)=>{
        e.preventDefault(); 
        this.setState({submitted:true})   
        let model={
            description:this.state.data,
            images:this.state.images
        }
        const result= await addUpdatePost(model);
        if(result) this.onClose();
    }

    onModel=async()=>{
        this.setState({isShow:true})
    }

    onClose=async()=>{
        this.setState({isShow:false})
        this.setState({data:''})
        this.setState({submitted:false})
        this.setState({images:[]})
    }

    onEditor=async(e:any,editor: any) => {
        const data = editor.getData();
        this.setState({data:data });     
    }
    
    onInitialText=async(e:any) => {
        let value=e.target.value;
        this.setState({data:value});     
    }

    onUploadImage=async(e:any)=>{ 
        e.preventDefault();
        if (e.target.files.length>=0) {
            for(let i=0;i<=e.target.files.length-1;i++){
              this.previewImage(e.target.files[i]);
            }
        }      
    }

    previewImage = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {   
          const img = e.target?.result as string;
          this.setState({images: [...this.state.images,{image:img}]});
        };
        reader.readAsDataURL(file);
    };

    render(){debugger
        const {isShow,data,submitted}=this.state;
        return(
         <>
            <div className='row'>
                <Modal show={isShow} onHide={this.onClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Upload Post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>  
                        <form onSubmit={this.onSave} >
                            <div className='col-md-12'>
                                <div className='form-group'>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        onChange={this.onEditor}  
                                        data={data}                                                                        
                                    />
                                    <Validation fieldName='Input' fieldType='string' value={data} showValidation={submitted} />             
                                </div>
                                <div className='form-group' style={{paddingTop:'10px'}}>                                
                                    <input type='file' multiple className="form-control" onChange={this.onUploadImage} />                                    
                                </div>
                                <div style={{paddingTop:'10px',float:"right"}}>
                                    <Button type='submit'>Save</Button> 
                                    <Button style={{marginLeft:'5px'}} onClick={this.onClose}>Cancel</Button>                                   
                                </div> 
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>
            </div>
            <div className='row'>      
                <div className='col-md-3'>
                    <label htmlFor='post' className="form-label fw-bold" style={{float:"right",marginTop:"6px"}}>Create Post :</label>                  
                </div>
                <div className='col-md-6'>                           
                    <input type="text" className='form-control' value={data} onChange={this.onInitialText} />                                          
                </div>
                <div className='col-md-3'>
                    <Button onClick={this.onModel}>Post</Button>                                         
                </div>
            </div>
         </>
        )
    }
}
export default withAuth(withNavigate(StudentDashboard));
