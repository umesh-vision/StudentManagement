import React,{ Component} from 'react'
import { Button, Modal } from 'react-bootstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

import {
    ClassicEditor,
	AutoImage,
	Autosave,
	Base64UploadAdapter,
	Bold,
	CloudServices,
	Essentials,
	Heading,
	ImageBlock,
	ImageCaption,
	ImageInline,
	ImageInsert,
	ImageInsertViaUrl,
	ImageResize,
	ImageStyle,
	ImageTextAlternative,
	ImageToolbar,
	ImageUpload,
	Italic,
	LinkImage,
	Mention,
	Paragraph,
	SelectAll,
	Strikethrough,
	Underline,
	Undo
} from 'ckeditor5';
import { Images } from '../../../services/IPost';
import { AuthContextProps } from '../../../services/IContext';
import { addUpdatePost, getPostList, onDeleteAPI, onDeleteImageAPI, onEditAPI } from '../../../Redux/Reducers/Student/StudentPostReducer';
import Validation from '../../../utils/validation';
import withNavigate from '../../layouts/NavigationExtenstion';
import withAuth from '../../../context/AuthContextExtenstion';
import { Post } from './post/Post';

type Props = { 
    auth:AuthContextProps,
    navigate: (path: string) => void;   
};
interface IState{
  isShow:boolean;
  data: any;
  editImage:Images[];
  submitted:boolean;
  images:any[],
  postDTO:any[],
  postId:number,
  showEmojiPicker:boolean
}

class StudentDashboard extends Component<Props,IState>{  
    editorRef:any;
    private editorInstance: any = null; 
    constructor(props:Props) {   
        super(props);
        this.state = {
            isShow:false,
            data:'',
            submitted:false,
            images:[],
            showEmojiPicker:false,
            postDTO:[],
            postId:0,
            editImage:[]
        }
        this.editorRef = React.createRef();
    }

    async componentDidMount() {  
       this.setState({postDTO: await getPostList()})  
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<IState>, snapshot?: any): void {
        if(prevState.data !== this.state.data){            
            this.setState((prevState) => ({  
                data:this.state.data
            }))
        }

        if(prevState.postDTO !== this.state.postDTO){            
            this.setState((prevState) => ({  
                postDTO:this.state.postDTO
            }))
        }
    }

    onSave=async(e:any)=>{
        e.preventDefault(); 
        this.setState({submitted:true}) 
        setTimeout(async() => {     
            const imgList = this.state.editImage.filter((item) => item.postImageId===0);  
            if(imgList.length>0){
                imgList.forEach((img) => {
                    this.setState((prevState) => ({
                      images: [...prevState.images, { image: img.image }],
                    }));
                });
            }       
        
            let model={
                description:this.state.data,
                images:this.state.images,
                postId:this.state.postId
            }
            if(this.state.data!==undefined && this.state.data !==""){
                const result= await addUpdatePost(model);
                if(result) {        
                this.setState({postId:0});   
                this.setState({editImage:[]}); 
                this.onClose();
                await this.componentDidMount();
                }
            }
        },2000);
    }

    onEdit=async(e:any)=>{
       this.setState({postId:e.target.id})
       const response= await onEditAPI(e.target.id)
       this.setState({isShow:true})
       this.setState({data:response.Description});   
       this.setState({editImage:response.lstImages!==undefined?response.lstImages:[]})
    }

    onDeleteImage=async(id:any,index:any)=>{
        if(id===0){ 
            var images = [...this.state.images];
            if (index !== -1) {
                images.splice(index, 1);
                this.setState({images: images});
            } 
            await this.deleteImg(index);       
        }
        else
        {   
            const result=await onDeleteImageAPI(id);
            if(result){
                await this.deleteImg(index);       
                await this.componentDidMount();       
            }    
        }
    }
    
    deleteImg=async(index:number)=>{
        var images = [...this.state.editImage];
        if (index !== -1) {
            images.splice(index, 1);
            this.setState({editImage: images});
        }   
    }

    onDelete=async(id:number)=>{
        const response= await onDeleteAPI(id)
        if(response) {
            this.setState({postId:0});   
            this.setState({editImage:[]});   
            await this.componentDidMount();
        }
    }

    onModel=async()=>{
      this.setState({isShow:true})
    }

    onClose=async()=>{
        this.setState({isShow:false})
        this.setState({data:''})
        this.setState({submitted:false})
        this.setState({images:[]})
        this.setState({editImage:[]}); 
        this.setState({postId:0});   
        this.setState({showEmojiPicker:false})        
    }

    onEditor=async(data: any) => { 
        const imageList: Images[] = [...this.state.editImage];
        const figureRegex = /<figure.*?<\/figure>/g;
        let match;     
        while ((match = figureRegex.exec(data)) !== null ) {
            const figureContent = match[0];
            const srcStart = figureContent.indexOf('src="') + 5;
            const srcEnd = figureContent.indexOf('"', srcStart);
            const src = figureContent.substring(srcStart, srcEnd); 
            const imageExists = imageList.some(img => img.image === src); 
            if (!imageExists) {
                setTimeout(async() => {             
                    if (src.includes('data')) {    
                        imageList.push({
                            postImageId: 0,
                            image: src,
                            isCopy: false
                        }); 
                        this.setState({editImage:imageList})                            
                        const outputString = data.replace(figureRegex, '');
                        this.editorInstance.setData(outputString);            
                    }                 
                },1000);

            }
        } 
        this.setState({data:data})
    }
    
    onInitialText=(e:any) => {
        let value=e.target.value;
        this.setState({data:value});     
    }

    onUploadImage=(e:any)=>{ 
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
    
    handleEmojiClick = (emojiData: EmojiClickData) => {
        if (this.editorRef.current) {
          const editorInstance = this.editorRef.current.editor;
          editorInstance.model.change((writer: any) => {
            const insertPosition = editorInstance.model.document.selection.getFirstPosition();
            writer.insertText(emojiData.emoji, insertPosition);
          });
        }     
    };
    
    toggleEmojiPicker = (e:any) => {
        e.preventDefault();
        this.setState((prevState) => ({ showEmojiPicker: !prevState.showEmojiPicker }));
    }    

    render(){
        const editorConfig = {
            toolbar: {
                items: [
                    'undo',
                    'redo',
                    '|',
                    'selectAll',
                    '|',
                    'heading',
                    '|',
                    'bold',
                    'italic',
                    'underline',
                    'strikethrough',                         
                    'insertImage'                 
                
                ],
                shouldNotGroupWhenFull: false
            },
            plugins: [      
                AutoImage,
                Autosave,
                Base64UploadAdapter,
                Bold,
                CloudServices,
                Essentials,
                Heading,
                ImageBlock,
                ImageCaption,
                ImageInline,
                ImageInsert,
                ImageInsertViaUrl,
                ImageResize,
                ImageStyle,
                ImageTextAlternative,
                ImageToolbar,
                ImageUpload,
                Italic,            
                LinkImage,
                Mention,
                Paragraph,
                SelectAll,
                Strikethrough,
                Underline,
                Undo
            ],
            image: {
                toolbar: [
                    'toggleImageCaption',
                    'imageTextAlternative',
                    '|',
                    'imageStyle:inline',
                    'imageStyle:wrapText',
                    'imageStyle:breakText',
                    '|',
                    'resizeImage'
                ]
            },
        };
        
        const {isShow,data,submitted,postDTO,editImage}=this.state;
        return(
         <> 
           <div className='container'>
              <div className='row'>
                <Modal show={isShow} onHide={this.onClose} className='model'>
                    <Modal.Header closeButton>
                        <Modal.Title>Upload Post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>  
                        <div className='row'>
                        <div className='form-group col-md-12'>
                            <form onSubmit={this.onSave}>
                                <div className='row'>
                                    <div className='form-group col-md-12'>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            onChange={(e,editor)=>{
                                                this.onEditor(editor.getData());
                                            }}       
                                            config={editorConfig}                             
                                            data={data}          
                                            onReady={(editor) => {
                                                this.editorInstance = editor;
                                            }}                      
                                            ref={this.editorRef}                                                                       
                                        />
                                        <Validation fieldName='Input' fieldType='string' value={data} showValidation={submitted} />             
                                    </div>                              
                                    <div className='form-group col-md-2' style={{paddingTop:'10px'}}>   
                                            {this.state.showEmojiPicker && (                                            
                                                <EmojiPicker onEmojiClick={this.handleEmojiClick} />                                             
                                            )} 
                                            <Button className="btn btn-secondary" style={{borderRadius:"50%"}} onClick={this.toggleEmojiPicker}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"  width={"30px"} height={"30px"}>
                                                    <path fill="#FFD43B" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM164.1 325.5C182 346.2 212.6 368 256 368s74-21.8 91.9-42.5c5.8-6.7 15.9-7.4 22.6-1.6s7.4 15.9 1.6 22.6C349.8 372.1 311.1 400 256 400s-93.8-27.9-116.1-53.5c-5.8-6.7-5.1-16.8 1.6-22.6s16.8-5.1 22.6 1.6zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>
                                                </svg>
                                            </Button>  
                                    </div>
                                    <div className='form-group col-md-10' style={{paddingTop:'12px'}}>    
                                      <input type='file' multiple className="form-control" onChange={this.onUploadImage} />                                    
                                    </div>        
                                    { editImage !==null &&
                                        <div className='col-md-12' style={{paddingTop:"5px"}}>
                                            {editImage.map((i:any,index:number) => (
                                                <div  className='image-container' key={index}>
                                                   <img src={i.image} className="postImage" alt="" width={"100px"} height={"100px"} />
                                                   <div className="delete-overlay">
                                                        <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>this.onDeleteImage(i.postImageId,index)} className='svg' height="24" viewBox="0 -960 960 960" width="24"
                                                            fill="#ffffff">
                                                            <path
                                                                d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z" />
                                                        </svg>
                                                   </div>
                                                </div>                                                  
                                            ))}                                      
                                        </div>    
                                    }                                                         
                                </div>
                                <div style={{paddingTop:'10px',float:"right"}}>
                                    <Button type='submit'>Save</Button> 
                                    <Button className='btn btn-secondary' style={{marginLeft:'5px'}} onClick={this.onClose}>Cancel</Button>                                   
                                </div> 
                            </form>
                        </div>
                        </div>
                    </Modal.Body>
                </Modal> 
                <div className='col-md-3'>
                    <label htmlFor='post' className="form-label fw-bold" style={{float:"right",marginTop:"6px"}}>Create Post :</label>                  
                </div>
                <div className='col-md-6'>                           
                    <input type="text" className='form-control' value={data} onChange={this.onInitialText} />                                          
                </div>
                <div className='col-md-3'>
                    <Button onClick={this.onModel}>Post</Button>                                         
                </div> 
                <div className='col-md-12'>
                    <Post postDtos={postDTO} handleEdit={this.onEdit} handleDelete={this.onDelete} />
                </div> 
              </div>
            </div>
         </>
        )
    }
}
export default withAuth(withNavigate(StudentDashboard));
