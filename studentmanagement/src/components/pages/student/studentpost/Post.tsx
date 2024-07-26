import { Component } from 'react';
import Slider from 'react-slick';
import { Button} from 'react-bootstrap';
import Lightbox from "yet-another-react-lightbox";
import { DeleteModel } from '../common/DeleteModel';

type Props = {
  postDtos:any[],
  handleDelete:(e:any)=>void;
  handleEdit:(e:any)=>void;
};

interface IState {
  postDtos: any[],
  isShow: boolean,
  lstImg: any[],
  showDelete:boolean,
  postId:number
}

class Post extends Component<Props, IState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      postDtos: [],
      isShow: false,
      lstImg: [],
      showDelete:false,
      postId:0
    }
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<IState>, snapshot?: any): void {    
    if(prevProps.postDtos!==this.state.postDtos){
      this.setState({ postDtos: this.props.postDtos })
    }
  }

  showImage = (img: any) => {
    let imageList = img.map((i: any) => ({ src: i.image }));
    this.setState({ lstImg: imageList, isShow: true });
  }

  closeLightbox = () => {
    this.setState({ isShow: false, lstImg: [] });
  }
 
  onEdit=(e:any)=>{
     this.props.handleEdit(e);
  }

  onCloseDeleteModel=()=>{    
    this.setState({showDelete:false})
  }

  onDelete=(e:any,status:boolean)=>{
    if(status){
      this.props.handleDelete(this.state.postId);
      this.setState({showDelete:false})
    }else{
      this.setState({postId:e.target.id})
      this.setState({showDelete:true})
    }
  }

  render() {
    const settings = {
      className: "",
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: true,
      prevArrow: <div className="slick-arrow slick-prev" />,
      nextArrow: <div className="slick-arrow slick-next" />,
    };

    return (
      <>
        <div className='row mt-2'>
          <div className='col-md-2'></div>
          <div className='col-md-8'>
            {this.state.postDtos.map((post, index) => (
              <div className="card text-bg-light mt-2" key={index} style={{ backgroundColor: "" }}>
                <div>
                  <div className="card-header">
                    <div className='row'>
                      <div className='col-md-1'>
                        <img src={post.person_Photo} style={{ borderRadius: "50%" }} alt="" width={"50px"} height={"50px"}></img>
                      </div>
                      <div className='col-md-10 text-black'>
                        <span className="h5"><b>Name: </b>{post.create_Person}</span><br />
                        <span className="h6">Post Time: {post.updated_on === null ? post.created_on : post.updated_on}</span>
                      </div>
                      <div className='col-md-1'> 
                          <svg id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 128 512" width={"8px"} height={"50px"}>
                              <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
                          </svg>
                          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <span className="dropdown-item" id={post.postId} onClick={this.onEdit}>Edit</span>
                            <span className="dropdown-item" id={post.postId} onClick={(event)=>this.onDelete(event,false)}>Delete</span>                           
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
                        { post.lstImages.length > 0 &&
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
                          <Button className='btn btn-secondary' onClick={() => this.showImage(post.lstImages)}>View Image In Full Screen</Button>
                        </div>
                      }
                    </div>
                  </div>
                  <div className="card-footer"></div>
                </div>
              </div>
            ))}
          </div>
          <div className='col-md-2'></div>
        </div>
        {this.state.isShow && (        
          <Lightbox
            open={this.state.isShow}
            close={this.closeLightbox}
            slides={this.state.lstImg}
          />
        )}
        {this.state.showDelete &&
          <DeleteModel title='Post' onDelete={this.onDelete} isShowDeleteModel={this.state.showDelete} onclose={this.onCloseDeleteModel} />
        }
      </>
    )
  }
}

export default Post;
