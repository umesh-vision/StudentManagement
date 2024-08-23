import React, { Component } from "react";
import Dropzone, { Accept } from "react-dropzone";
import toast from 'react-hot-toast';
const acceptValue: Accept = {
    "image/*": [".png", ".jpg", ".jpeg"],
};
interface IState{
  files: [],
  activeTab:any
}

class DropZonePage extends Component<any,IState> {
  constructor(props:any) {
    super(props);
    this.state = {
      files: [],
      activeTab:"row"
    };
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(acceptedFiles:any) {
    const previewFiles = acceptedFiles.map((file: Blob) => Object.assign(file, {
      preview: URL.createObjectURL(file)
    }));
    toast.success('Imaage uploaded successfully');
    this.setState({ files: previewFiles });
  }

  handleTabClick=(classname:string)=>{debugger
    this.setState({activeTab:classname})
  }

  render() {
    const {activeTab} =this.state
    return ( 
      <div className="container">
        <div className="card text-bg-light mt-2">
          <div className="card-header" style={{ backgroundColor: "#fff"}}>
            <div className="row">
              <div className="col-md-12">
                <Dropzone  onDrop={this.onDrop}  accept={acceptValue}>
                  {({ getRootProps, getInputProps}) => (
                    <div
                      {...getRootProps()}
                      style={{
                        border: "2px dashed #007bff",
                        padding: "20px",
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                    >
                      <input {...getInputProps()} />
                      <p>Drag and drop some files here, or click to select files</p>                     
                    </div>
                  )}
                </Dropzone>
              </div>
            </div>
          </div>
          <div>
            <ul className="nav nav-tabs">
              <li 
                className="nav-item"
                onClick={() => this.handleTabClick('row')}
              >
                <label className={`nav-link  ${this.state.activeTab === 'row' ? 'active' : ''}`} aria-current="page" onClick={() => this.handleTabClick('row')}>Row</label>
              </li>         
              <li        
                className="nav-item"      
                onClick={() => this.handleTabClick('column')}
              >
                <label className={`nav-link  ${this.state.activeTab === 'column' ? 'active' : ''}`} aria-current="page" onClick={() => this.handleTabClick('column')}>Column</label>
              </li>
              <li
                className="nav-item"
                onClick={() => this.handleTabClick('row-reverse')}
              >
                <label  className={`nav-link  ${this.state.activeTab === 'row-reverse' ? 'active' : ''}`} aria-current="page" onClick={() => this.handleTabClick('column')}>Row-Reverse</label>           
              </li>
              <li
                className="nav-item"
                onClick={() => this.handleTabClick('column-reverse')}
              >
               <label className={`nav-link  ${this.state.activeTab === 'column-reverse' ? 'active' : ''}`} aria-current="page" onClick={() => this.handleTabClick('column')}>Column-Reverse</label>           
              </li>
            </ul>
          </div>   
          <div className="card-body" style={{ backgroundColor: "#fff"}}> 
            <div className="row" style={{display:"flex",flexDirection:activeTab}}>
              {this.state.files.map((file:any) => (
                <div className="col-md-2">
                  <img src={file.preview} alt={""} width={"200px"} height={"100px"}/>
                </div>                     
              ))}           
            </div>   
          </div>
        </div>
      </div>
    );
  }
}

export default DropZonePage;
