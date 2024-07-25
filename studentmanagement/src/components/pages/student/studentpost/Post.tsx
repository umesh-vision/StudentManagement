import React, { Component } from 'react';
import Slider from 'react-slick';
import { Button, Dropdown, DropdownButton } from 'react-bootstrap';
import Lightbox from "yet-another-react-lightbox";
import { getPostList } from '../../../../Redux/Reducers/Student/StudentPostReducer';


type Props = {
  postDtos:any[]
};

interface IState {
  postDtos: any[],
  isShow: boolean,
  lstImg: any[],
  menu:string
}

class Post extends Component<Props, IState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      postDtos: [],
      isShow: false,
      lstImg: [],
      menu:"none",
    }
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<IState>, snapshot?: any): void {    debugger
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
 
  handleMenu=()=>{
   this.setState({menu:this.state.menu==="none"?"inline":"none"})
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
                        <DropdownButton id="dropdown-basic-button" title="Dropdown button">
                          <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </DropdownButton>      
                        <div className="dropdown show">                       
                          <svg xmlns="http://www.w3.org/2000/svg" className="btn btn-secondary dropdown-toggle" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"  viewBox="0 0 128 512" width={"8px"} height={"50px"}>
                              <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
                          </svg>
                          <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                            <span className="dropdown-item" >Edit</span>
                            <span className="dropdown-item" >Delete</span>                           
                          </div>
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
                          <Slider {...settings}>
                            {post.lstImages.map((img: any) => (
                              <div key={img.postImageId}>
                                <img src={img.image} alt='' height={"400px"} width={"100%"} />
                              </div>
                            ))}
                          </Slider>
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
      </>
    )
  }
}

export default Post;
