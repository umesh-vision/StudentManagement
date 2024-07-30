import { Component } from "react";
import { Button, Modal } from "react-bootstrap";

type props={
   onclose:()=>void;
   onDelete:(e:any,status:boolean)=>void;
   isShowDeleteModel:boolean,
   title:string
}
export class DeleteModel extends Component<props>{

    onDeletePost=(e:any)=>{     
       this.props.onDelete(e,true)
    }

    render(){
        return(
            <>
               <Modal show={this.props.isShowDeleteModel} onHide={this.props.onclose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>  
                    <div className='col-md-10'>
                        <strong><p>Are you sure you want to delete this {this.props.title}?</p></strong> 
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div>
                       <Button className="btn btn-danger" style={{float:'right'}} onClick={()=>this.props.onclose()}>No</Button>  
                       <Button className="btn btn-success" style={{float:'right',marginRight:"5px"}} onClick={this.onDeletePost}>Yes</Button>                                                           
                    </div> 
                </Modal.Footer>
                </Modal>
            </>
        )
    }
}