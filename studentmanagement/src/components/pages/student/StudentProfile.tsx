import { Component } from "react";
import withNavigate from "../../layouts/NavigationExtenstion";
import withAuth from "../../../context/AuthContextExtenstion";
import { studentDTO } from "../../../services/IComman";

type prop={
    data?:studentDTO;
    onBackList: () => void;  
    role:string
}

class StudentProfile extends Component<prop,any>{ 
   
    render(){  
        return(
        <>
            <div className="container">
                <div className="main-body">  
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                    <div className="card">
                        <div className="card-body">
                        <div className="d-flex flex-column align-items-center text-center">
                            <img src={this.props.data?.image} alt="Admin" width={200} height={250} />                          
                        </div>
                        </div>
                    </div>                
                    </div>
                    <div className="col-md-8">
                    <div className="card mb-3">
                        <div className="card-body">
                        <div className="row">
                            <div className="col-sm-3">
                            <h6 className="mb-0">Full Name</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                            {this.props.data?.studentName}
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-sm-3">
                            <h6 className="mb-0">Class</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                {this.props.data?.studClass}
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-sm-3">
                            <h6 className="mb-0">Age</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                {this.props.data?.age}
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-sm-3">
                            <h6 className="mb-0">Hobbies</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                {this.props.data?.hobbies}
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-sm-3">
                            <h6 className="mb-0">Address</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                {this.props.data?.address}
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-sm-3">
                            <h6 className="mb-0">City</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                {this.props.data?.city}
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-sm-3">
                            <h6 className="mb-0">State</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                {this.props.data?.state}
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-sm-3">
                            <h6 className="mb-0">Pincode</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                {this.props.data?.pincode}
                            </div>
                        </div>
                        
                        { this.props.role!=="student" &&
                      
                            <div className="row">
                              <hr />
                                <div className="col-sm-12">
                                    <button className="btn btn-info" onClick={this.props.onBackList}>Back to List</button>
                                </div>
                            </div>
                        }
                        </div>
                    </div>
                    </div>
                </div>        
                </div>
            </div>
        </>
        );
    }
}
export default withAuth(withNavigate(StudentProfile));