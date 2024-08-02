import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import React,{ Component } from "react";
import { Button } from "react-bootstrap";
import { addComment } from "../../../../Redux/Reducers/Student/StudentPostReducer";

type Props={
    postId:number
    postCommentId:number
    handleAddComment:(id:any,index:number,commentIndex:number,commentId:number,comment:string)=>void
    onEditComment:(postId:number,commentId:number,index:number,commentIndex:number,comment:string)=>any;
    index:number
    commentText:string
    commentIndex:number
}
interface IState{
    showEmojiPicker:boolean
    commentText:string
    selectionStart: number | null
    selectionEnd: number | null
    postCommentId:number
    postId:number
    index:number
    commentIndex:number
}

export default class AddCommentArea extends Component<Props, IState> {
    textareaRef:any
    constructor(props: Props) {
      super(props);
      this.state = {
        postId:0,
        showEmojiPicker:false,
        commentText:"",
        selectionStart: null,
        selectionEnd: null,
        postCommentId:0,
        commentIndex:0,
        index:0
      }
      this.textareaRef = React.createRef();
    }

    async componentDidMount(){  
      this.setState({
        commentText:this.props.commentText,    
        postCommentId:this.props.postCommentId, 
        postId:this.props.postId,   
        index:this.props.index,  
        commentIndex:this.props.commentIndex    
      })
  }

  async componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<IState>, snapshot?: any){
      if (prevProps.commentText !== this.props.commentText ) {
          this.setState({
            commentText:this.props.commentText,
            postCommentId:this.props.postCommentId,   
            postId:this.props.postId,   
            index:this.props.index,
            commentIndex:this.props.commentIndex    
          });
      }
  }

    toggleEmojiPicker = (e:any) => {
      e.preventDefault();
      this.setState((prevState) => ({ showEmojiPicker: !prevState.showEmojiPicker }));  
    }    
        
    handleEmojiClick = (e: EmojiClickData) => {
      const emoji = String.fromCodePoint(...e.unified.split('-').map((el) => parseInt(el, 16)));
      const { selectionStart, selectionEnd, commentText } = this.state;  
      if (selectionStart !== null && selectionEnd !== null) {
        const newText =
          commentText.slice(0, selectionStart) +
          emoji +
          commentText.slice(selectionEnd);
        this.setState(
          {
            commentText: newText,
            selectionStart: selectionStart + emoji.length,
            selectionEnd: selectionStart + emoji.length,
          },
          () => {
            if (this.textareaRef.current) {
              this.textareaRef.current.selectionStart = this.state.selectionStart!;
              this.textareaRef.current.selectionEnd = this.state.selectionEnd!;
            }
          }
        );
      }
    };

    handleTextareaSelect = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
      const target = e.target as HTMLTextAreaElement;
      this.setState({
        selectionStart: target.selectionStart,
        selectionEnd: target.selectionEnd,
      });
    };
     
    addComment=async(postId:number,postCommentId:number,index:number)=>{
      if(this.state.commentText!==""){
        const result=await addComment(postId,postCommentId,this.state.commentText);
        if(result){
          this.setState({commentText:""});
          this.props.handleAddComment(postId,index,this.state.commentIndex,0,"");
        }     
      }
    }

    onCancel=async(postId:number,index:number)=>{     
      this.props.onEditComment(postId,0,index,this.state.commentIndex,"");
    }    
    
    render(){
        const {showEmojiPicker,commentText,postCommentId,index,postId}=this.state
        return(
            <div className='row'>
                <div className="col-md-1 mt-3">  
                    {showEmojiPicker && (                                            
                        <EmojiPicker onEmojiClick={this.handleEmojiClick} />                                             
                    )} 
                    <svg  onClick={this.toggleEmojiPicker} xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 -960 960 960" width="24"><path d="M620-520q25 0 42.5-17.5T680-580q0-25-17.5-42.5T620-640q-25 0-42.5 17.5T560-580q0 25 17.5 42.5T620-520Zm-280 0q25 0 42.5-17.5T400-580q0-25-17.5-42.5T340-640q-25 0-42.5 17.5T280-580q0 25 17.5 42.5T340-520Zm140 260q68 0 123.5-38.5T684-400H276q25 63 80.5 101.5T480-260Zm0 180q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Z"/></svg>
                </div>
                <div className="col-md-8">
                    <textarea value={commentText} 
                      onChange={(e) =>this.setState({commentText:e.target.value})}
                      className='form-control'
                      placeholder='Write Comment...'
                      ref={this.textareaRef}  
                      onSelect={this.handleTextareaSelect}
                    />
                </div>
                <div className="col-md-3 mt-3">
                  <Button 
                     className="btn"
                     onClick={()=>this.addComment(postId,postCommentId,index)}
                     style={{backgroundColor:"#212529"}}
                  > 
                     {postCommentId>0?'Save':"Comment"}
                  </Button>
                  {
                    postCommentId>0 && 
                    <Button 
                      onClick={()=>this.onCancel(postId,index)}
                      style={{marginLeft:"3px",backgroundColor:"#495057"}}
                    >
                      Cancel
                    </Button>
                  }
                </div>
            </div>
        )
    }
}