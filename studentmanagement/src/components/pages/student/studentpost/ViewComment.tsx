import { Component } from "react";
import { getCookie } from "../../../../services/cookie";

type Props={
    postId:number,
    commentId:number,
    commentList:any,
    index:number,
    commentIndex:number,
    userId:number,
    onDeleteComment:(postId:number,commentId:number,index:number,commentIndex:number)=>any;

}
interface IState{
    postId:number,
    commentList:any,
    index:number,
    userId:number,
    loggedUser:number,
    commentIndex:number,
    commentId:number
}

export default class ViewComment extends Component<Props, IState> {    
    constructor(props: Props) {
        super(props);
        this.state = {
          postId:0,
          commentId:0,
          commentList:{},
          index:0,
          userId:0,
          loggedUser:0,
          commentIndex:0
        }
    }

    async componentDidMount(){
        const userId=parseInt(await getCookie("userId"))
        this.setState({
            commentList:this.props.commentList,
            postId:this.props.postId,
            userId:this.props.userId,
            loggedUser:userId,
            index:this.props.index,
            commentIndex:this.props.commentIndex,
            commentId:this.props.commentId,
        })
    }

    async componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<IState>, snapshot?: any){
        if (prevProps.commentList !== this.props.commentList ) {
            const userId=parseInt(await getCookie("userId"))
            this.setState({
                commentList:this.props.commentList,
                postId:this.props.postId,        
                userId:this.props.userId,
                loggedUser:userId,
                index:this.props.index,
                commentIndex:this.props.commentIndex,
                commentId:this.props.commentId,
            });
        }
    }

    onDelete=async()=>{
        const {index,postId,commentIndex,commentId}=this.state
        this.props.onDeleteComment(postId,commentId,index,commentIndex);
    }

    render(){
       const {commentList,loggedUser,userId}=this.state
       return(        
        <div  className={"row " +(loggedUser===userId?'justify-content-end':'')}>           
            <div className='col-md-10' >   
                <div className="card text-bg-light mt-2 ">   
                    <div className="card-header" >
                        <div className="row">
                            <div className='col-md-10'>
                                {commentList.userName} - {commentList.inserted_on}  
                            </div>
                            {loggedUser===userId &&
                                <div className='col-md-2 justify-content-end'>
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                       viewBox="0 0 448 512"
                                       width="30px"
                                       height="20px" 
                                       onClick={this.onDelete}   
                                    >
                                      <path fill="#f20707" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1 -32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1 -32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1 -32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.7 23.7 0 0 0 -21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0 -16-16z"/>
                                    </svg>                          
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="30px" height="20px"><path fill="#ea9a10" d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/></svg>                                             
                                </div>
                            }
                        </div>
                    </div>
                    <div className="card-body">
                        {commentList.comment}  
                    </div>  
                </div>  
            </div>  
        </div>        
       )
    }  
}
