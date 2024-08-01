import React,{ Component } from 'react';
import Slider from 'react-slick';
import { Button } from 'react-bootstrap';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { DeleteModel } from '../common/DeleteModel';
import { deleteComment, getCommentListByPostId, getPostList, onLikeUnlikePost } from '../../../../Redux/Reducers/Student/StudentPostReducer';
import LikeButton from './LikeButton';
import CommentButton from './CommentButton';
import AddCommentArea from './AddCommentArea';
import ViewComment from './ViewComment';

type Props = {
  postDtos: any[],
  handleDelete: (e: any) => void;
  handleEdit: (e: any) => void;
};

interface IState {
  postDtos: any[],
  isShow: boolean,
  lstImg: any[],
  showDelete: boolean,
  postId: number,
  isLoading: boolean,
  page: number,
  showEmojiPicker:boolean,
}

export class Post extends Component<Props, IState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      postDtos: [],
      isShow: false,
      lstImg: [],
      showDelete: false,
      postId: 0,
      isLoading: false,
      page:1,
      showEmojiPicker:false
    }

    this.onEdit = this.onEdit.bind(this); 
    this.onDelete = this.onDelete.bind(this); 
    this.onCloseDeleteModel = this.onCloseDeleteModel.bind(this); 

    this.onComment = this.onComment.bind(this); 
    this.handleAddComment = this.handleAddComment.bind(this); 
    this.onEditComment = this.onEditComment.bind(this); 
    this.onDeleteComment = this.onDeleteComment.bind(this); 

    this.loadPosts = this.loadPosts.bind(this); 
    this.handleScroll = this.handleScroll.bind(this); 
    this.handleLike = this.handleLike.bind(this);   
    this.replacePostDtos = this.replacePostDtos.bind(this); 
    this.showImage = this.showImage.bind(this); 
    this.closeLightbox = this.closeLightbox.bind(this); 
       
  }
  
  async componentDidMount() {
    await window.addEventListener('scroll', this.handleScroll);
  }

  async componentWillUnmount() {
   await window.removeEventListener('scroll', this.handleScroll);
  }

  async componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<IState>, snapshot?: any){     
    if (prevProps.postDtos !== this.props.postDtos ) {
      this.replacePostDtos(this.props.postDtos);
    }
  }

  replacePostDtos =async(newPostDtos: any[]) => {
    if(this.state.postDtos.length>0){
       const ids = await new Set(newPostDtos.map(post => post.postId));
       const distinctPost = await this.state.postDtos.filter(post => ids.has(post.postId));
       const updatedPostDtos = await distinctPost.map(post => {
        const newPost = newPostDtos.find(newPost => newPost.postId === post.postId);
        if (newPost) {
          const { isShowComment,commentList, ...restNewPost } = newPost; 
          return { ...post, ...restNewPost }; 
        }
        return post;      
      });    
      this.setState({ postDtos: [...updatedPostDtos] });
    }
    else{
      const updatedPostDtos = this.state.postDtos.map(post => {
        const newPost = newPostDtos.find(newPost => newPost.postId === post.postId);
        return newPost ? newPost : post;
      });
      const newPosts = newPostDtos.filter(newPost => !this.state.postDtos.some(post => post.postId === newPost.postId));
      this.setState({ postDtos: [...updatedPostDtos, ...newPosts] });
    }
  }

  showImage = (img: any) => {
    let imageList = img.map((i: any) => ({ src: i.image }));
    this.setState({ lstImg: imageList, isShow: true });
  }

  
  closeLightbox = () => {
    this.setState({ isShow: false, lstImg: []});
  }


  onEdit = (e: any) => {
    this.props.handleEdit(e);
  }

  onCloseDeleteModel = () => {
    this.setState({ showDelete: false })
  }

  onDelete = async(e: any, status: boolean) => {
    if (status) {  
       this.props.handleDelete(this.state.postId);
       this.setState({ showDelete: false })
    } else {
      this.setState({ postId: e.target.id })
      this.setState({ showDelete: true })
    }
  }

  loadPosts=async() =>{
    const { page, postDtos } =this.state;
    this.setState({ isLoading: true });
    try {
      const result = await getPostList(page);
      if (result.length > 0) {
        this.setState({
          postDtos: [...postDtos, ...result],
          page: page + 1,
          isLoading: false
        });
      } else {
        this.setState({
          page:1,
          isLoading: false
        });
        this.loadPosts()
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      this.setState({ isLoading: false });
    }
  }

  handleScroll=async()=> {
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      const { isLoading } = this.state;
      if (!isLoading) {
        this.loadPosts()
      }
    }
  }
 
  handleLike=async(id:number,index:number)=>{
    const result=await onLikeUnlikePost(id);
    if(result){
      const response=await getPostList(1);   
      await this.replacePostDtos(response);
    }
  }

  handleAddComment=async(id:any,index:number)=>{    
    let response=await getCommentListByPostId(id);     
    this.setState((prevState) => {
      const updatedItems = [...prevState.postDtos];
      updatedItems[index] = { ...updatedItems[index],"commentList": response};
      updatedItems[index] = { ...updatedItems[index],"totalComments": response.length};
      return { postDtos: updatedItems };
    });
  }

  onComment=async(id:number,index:number)=>{
    const updatedItems = [...this.state.postDtos];
    const isShowComment=updatedItems[index]["isShowComment"]; 
    let response:any=[]  
    if(!isShowComment){
      response=await getCommentListByPostId(id);
    }
    
    this.setState((prevState) => {
      const updatedItems = [...prevState.postDtos];    
      updatedItems[index] = { ...updatedItems[index],"isShowComment": isShowComment?false:true };
      updatedItems[index] = { ...updatedItems[index],"commentList": !isShowComment? response:[] };
      return { postDtos: updatedItems };
    });
  }
  
  onDeleteComment=async(id:number,commentId:number,index:number,commentIndex:number)=>{  
     const result=await deleteComment(commentId);
     if(result){
      const response=await getCommentListByPostId(id);
      this.setState((prevState) => {
        const updatedItems = [...prevState.postDtos];  
        updatedItems[index]["commentList"].splice(commentIndex, 1);
        updatedItems[index] = { ...updatedItems[index],"commentList": response};
        return { postDtos: updatedItems };
      });
    }
  }

  onEditComment=()=>{

  }

  render() {
    const settings = {
      className: "",
      lazy:true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: true,
      prevArrow: <div className="slick-arrow slick-prev" />,
      nextArrow: <div className="slick-arrow slick-next" />,
    };
    const { lstImg, isShow, postDtos ,isLoading } = this.state;
    return (
      <>
        <div className='row mt-2'>
          <div className='col-md-2'></div>
          <div className='col-md-8'>
            {postDtos.map((post, index) => (
              <div className="card text-bg-light mt-2" key={index} style={{ backgroundColor: "" }}>
                <div>
                  <div className="card-header">
                    <div className='row'>
                      <div className='col-md-1'>
                        <img src={post.person_Photo} style={{ borderRadius: "50%" }} alt="" width={"50px"} height={"50px"} />
                      </div>
                      <div className='col-md-10 text-black'>
                        <span className="h5"><b>Name: </b>{post.create_Person}</span><br />
                        <span className="h6">Post Time: {post.updated_on === null ? post.created_on : post.updated_on}</span>
                      </div>
                      <div className='col-md-1'>
                        <svg id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512" width={"8px"} height={"50px"}>
                          <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
                        </svg>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                          <span className="dropdown-item" id={post.postId} onClick={this.onEdit}>Edit</span>
                          <span className="dropdown-item" id={post.postId} onClick={(event) => this.onDelete(event, false)}>Delete</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className='row'>
                      <div className='col-md-12'>
                        <div dangerouslySetInnerHTML={{ __html: post.description }} />
                      </div>
                      <div className='col-md-2' />
                      <div className='slider-container col-md-8'>
                        {post.lstImages.length > 0 &&
                          (post.lstImages.length > 1 ? (
                            <Slider {...settings}>
                              {post.lstImages.map((img: any) => (
                                <div key={img.postImageId}>
                                  <img src={img.image} alt='' height={"100%"} width={"100%"} />
                                </div>
                              ))}
                            </Slider>
                          ) : (
                            <div>
                              <img src={post.lstImages[0].image} alt='' height={"100%"} width={"100%"} />
                            </div>
                          ))
                        }
                      </div>
                      <div className='col-md-2' />
                      {post.lstImages.length > 0 &&
                        <div style={{ textAlign: "center" }}>
                          <Button className='btn btn-secondary mt-1' onClick={() => this.showImage(post.lstImages)}>View Image In Full Screen</Button>
                        </div>
                      }
                    </div>
                  </div>
                  <div className="card-footer">
                    <div className='row'>
                      <div className='col-md-12'>
                        <div style={{float:"left"}}>
                          <LikeButton postId={post.postId} handleLike={this.handleLike} index={index} isLiked={post.isLiked} totalLikes={post.totalLikes} />
                        </div>
                        <div style={{float:"right"}}>
                          <CommentButton handleComment={this.onComment} postId={post.postId} totalComment={post.totalComments} index={index}/>
                        </div>
                      </div>
                      <div className='col-md-12'  style={{"display":!post.isShowComment?"none":"inline"}}>          
                        <div className="card text-bg-light mt-2">                 
                          <div className="card-body">                       
                            {
                              post.isShowComment && post.commentList!==null &&                         
                              post.commentList.map((comment: any, commentIndex: number) => (                       
                                <ViewComment 
                                  commentId={comment.postCommentId} 
                                  postId={post.postId} 
                                  userId={comment.userId} 
                                  commentList={comment}
                                  commentIndex={commentIndex} 
                                  index={index}
                                  onDeleteComment={this.onDeleteComment}
                                /> 
                              ))
                            }   
                          </div>
                          <div className="card-footer">
                            <AddCommentArea postId={post.postId} handleAddComment={this.handleAddComment} index={index}/>
                          </div>
                        </div>                  
                      </div>
                    </div>                                     
                  </div>
                </div>
              </div>
            ))}
            {isLoading && <h3>Post Loading...</h3>}
          </div>
          <div className='col-md-2'></div>       
        </div>
        {this.state.isShow && (
          <Lightbox
            open={isShow}
            close={this.closeLightbox}
            slides={lstImg}   
          />
        )}
        {this.state.showDelete &&
          <DeleteModel title='Post' onDelete={this.onDelete} isShowDeleteModel={this.state.showDelete} onclose={this.onCloseDeleteModel} />
        }
      </>
    )
  }
}

