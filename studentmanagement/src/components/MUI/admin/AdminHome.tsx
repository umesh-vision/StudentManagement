import { Component, createRef} from 'react'
import { AgGridReact } from 'ag-grid-react';
import { Button } from 'react-bootstrap';
import { AuthContextProps } from '../../../services/IContext';
import { getState, getStudentById, getStudentList } from '../../../Redux/Reducers/Student/StudentReducer';
import withNavigate from '../../layouts/NavigationExtenstion';
import withAuth from '../../../context/AuthContextExtenstion';
import { AdminState, StudentState } from '../../../services/IComman';

import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Tooltip } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { StudentModel } from '../student/AddStudent';

type Props = {
    auth:AuthContextProps,
    navigate: (path: string) => void;   
};


class AdminDashboard extends Component<Props,AdminState>{  
    gridRef = createRef<AgGridReact>();
    constructor(props: Props) {   
      super(props);
      this.state = {
        columnDefs: [
          { field: 'studentId', headerName: 'ID',flex:1},
          { field: 'studentName', headerName: 'Name',flex:1  },
          { field: 'image', headerName: 'Image',
            cellRenderer: (cell:any) => 
            { 
               return (<img src={cell.value} width="70px" height="40px" alt="" />)
            }, flex:1},
          { field: 'studClass', headerName: 'Class',flex:1},       
          { field: 'address', headerName: 'Address',flex:1  },
          { field: 'age', headerName: 'Age',flex:1  },
          { field: 'gender', headerName: 'gender',flex:1  },
          { field: 'hobbies', headerName: 'Hobbies',flex:1  },
          { field: 'city', headerName: 'City',flex:1  },
          { field: 'state', headerName: 'State',flex:1  },
          { field: 'pincode', headerName: 'Pincode',flex:1},       
          {      
            headerName:'Actions',
            cellRenderer: (cell:any) => {     
              return (
                <div>
                 <button className="btn btn-sm" onClick={()=>this.onView(cell.value)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"  width="50px" height="25px"><path fill="#3a97df" d="M572.5 241.4C518.3 135.6 410.9 64 288 64S57.7 135.6 3.5 241.4a32.4 32.4 0 0 0 0 29.2C57.7 376.4 165.1 448 288 448s230.3-71.6 284.5-177.4a32.4 32.4 0 0 0 0-29.2zM288 400a144 144 0 1 1 144-144 143.9 143.9 0 0 1 -144 144zm0-240a95.3 95.3 0 0 0 -25.3 3.8 47.9 47.9 0 0 1 -66.9 66.9A95.8 95.8 0 1 0 288 160z"/></svg></button>
                 <button className="btn btn-sm" onClick={()=>this.onEdit(cell.value)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="50px" height="25px"><path fill="#ea9a10" d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/></svg></button>     
                 <button className="btn btn-sm" onClick={()=>this.onDelete(cell.value)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"  width="50px" height="25px"><path fill="#f20707" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1 -32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1 -32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1 -32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.7 23.7 0 0 0 -21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0 -16-16z"/></svg></button>
                </div>
              );
            },
            field:'studentId',
            flex:2.5
          }
        ],
        rowData:[],
        currentPage:0,
        pageSize:5,
        totalPages:0,
        userId:0
      };

      this.onPageChange = this.onPageChange.bind(this);    
      this.onSearch = this.onSearch.bind(this);    
      this.onAdd = this.onAdd.bind(this);    
      this.onEdit = this.onEdit.bind(this);
      this.onClose = this.onClose.bind(this);    
      this.onDelete = this.onDelete.bind(this);    
    }

    async componentDidMount(){   
        if(this.props.auth.state.profile!==undefined){    
           this.setState({totalPages:this.props.auth.state.profile?.totalPages}) 
           this.setState({rowData:this.props.auth.state.profile?.rowData})
           this.setState({currentPage:this.props.auth.state.profile?.currentPage})
           this.setState({pageSize:this.props.auth.state.profile?.pageSize})
           this.setState({studentState:this.props.auth.state.profile?.studentState})
           this.setState({isEdit:this.props.auth.state.profile?.isEdit})
        }
        else{
            const response = await getStudentList(this.state.currentPage,this.state.pageSize,''); 
            this.setState({
                rowData:response.record,
                totalPages:response.totalRecord       
            })      
        }        
    } 

    setPageSize=(e:any)=>{ 
        this.setState({ currentPage: 0 }, async() => {
            const response = await getStudentList(0,e.target.value,''); 
            this.setState({ 
                pageSize:e.target.value,
                rowData:response.record,
                totalPages: response.totalRecord           
            })                
        });
    }
    onPageChange = (e:any,page: number) => {
        if(e.currentTarget.ariaLabel==='Previous page'){
            this.setState({ currentPage: page-1 }, async() => {
                const response = await getStudentList(page-1,this.state.pageSize,''); 
                this.setState({ 
                    rowData:response.record,
                    totalPages: response.totalRecord           
                })                
            });
        }
        else{
            this.setState({ currentPage: page+1 }, async() => {
                const response = await getStudentList(page+1,this.state.pageSize,''); 
                this.setState({ 
                    rowData:response.record,
                    totalPages: response.totalRecord           
                })                
            });
        }
    };

    onSearch = async(e: any) => {
        let value=e.target.value;
        const response = await getStudentList(this.state.currentPage,this.state.pageSize,value); 
        this.setState({ 
            rowData:response.record,
            totalPages: response.totalRecord          
        })   
    };
    
    onAdd=async()=>{
        const state= await getState();
        const students: StudentState= {
            isShowAddEditModel:true,
            isShowDeleteModel:false,
            stateOption:state
        };
        this.setState({studentState:students,isEdit:false})
    }

    onEdit=async(id:number)=>{        
        const data=await getStudentById(id);
        const students: StudentState= {
            isShowAddEditModel:true,
            isShowDeleteModel:false,
            studentData:data
        };
        this.setState({studentState:students,isEdit:true})
    }

    onView=async(id:number)=>{   
        await this.setState({userId:id}); 
        this.props.auth.setProfile(this.state);
        this.props.navigate('/mui/student/viewstudent')
    }
    
    onDelete=async(id:number)=>{        
        const data=await getStudentById(id);
        const students: StudentState= {
            isShowAddEditModel:false,
            isShowDeleteModel:true,
            studentData:data
        };
        this.setState({studentState:students})   
    }

    onClose=async(isDeleted?:boolean)=>{
        const students: StudentState= {
            isShowAddEditModel:false,
            isShowDeleteModel:false
        };
        this.setState({studentState:students})
        this.props.auth.setProfile(undefined);
        if(isDeleted)await this.setState({currentPage:1})
        await this.componentDidMount();
    }

    render(){
        return(
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>                      
                        <StudentModel studentState={this.state.studentState} handleClose={this.onClose} isEdit={this.state.isEdit} />
                        <div style={{height:"261px", width:"100%"}}>
                            <div style={{paddingTop:"5px"}}>  
                                <Tooltip title="Add Student"> 
                                    <Button className="btn btn-primary" onClick={this.onAdd}>
                                      <PersonAddIcon />
                                    </Button>
                                </Tooltip>
                                <TextField                              
                                    onChange={this.onSearch}     
                                    placeholder='Search here ...'
                                   style={{float:'right'}}
                                />                   
                            </div>                                   
                            <div className="ag-theme-quartz">        
                                <Paper>   
                                    <TableContainer>
                                        <Table aria-label="simple table">
                                            <TableHead>
                                                <TableRow>         
                                                    <TableCell colSpan={1}>ID</TableCell>
                                                    <TableCell colSpan={1}>Name</TableCell>
                                                    <TableCell colSpan={1}>Photo</TableCell>
                                                    <TableCell colSpan={1}>Clas</TableCell>
                                                    <TableCell colSpan={1}>Address</TableCell>
                                                    <TableCell colSpan={1}>Age</TableCell>
                                                    <TableCell colSpan={1}>Gender</TableCell>
                                                    <TableCell colSpan={1}>Hobbies</TableCell>
                                                    <TableCell colSpan={1}>City</TableCell>
                                                    <TableCell colSpan={1}>State</TableCell>
                                                    <TableCell colSpan={1}>Pincode</TableCell>
                                                    <TableCell colSpan={5}>Action</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {this.state.rowData.map((student) => (
                                                    <TableRow style={{maxWidth:"100px"}} key={student.studentId}>
                                                        <TableCell>{student.studentId}</TableCell>
                                                        <TableCell>{student.studentName}</TableCell>
                                                        <TableCell>{<img src={student.image} width="70px" height="40px" alt="" />}</TableCell>
                                                        <TableCell>{student.studClass}</TableCell>
                                                        <TableCell>{student.address}</TableCell>
                                                        <TableCell>{student.age}</TableCell>
                                                        <TableCell>{student.gender}</TableCell>
                                                        <TableCell>{student.hobbies}</TableCell>
                                                        <TableCell>{student.city}</TableCell>
                                                        <TableCell>{student.state}</TableCell>
                                                        <TableCell>{student.pincode}</TableCell>
                                                        <TableCell>
                                                            <Tooltip title="View">
                                                                <button className="btn btn-sm"
                                                                   onClick={()=>this.onView(student.studentId)}
                                                                >
                                                                   <VisibilityIcon color="primary" style={{ width:"30px", height:"25px"}} />     
                                                                </button>
                                                            </Tooltip>
                                                            <Tooltip title="Edit">
                                                                <button className="btn btn-sm"
                                                                  onClick={()=>this.onEdit(student.studentId)}
                                                                >
                                                                  <EditIcon style={{color:'orange', width:"30px", height:"25px"}} />     
                                                                </button>    
                                                            </Tooltip>                                                                                                   
                                                            <Tooltip title="Delete">
                                                                <button className="btn btn-sm"
                                                                  onClick={()=>this.onDelete(student.studentId)}
                                                                >                                                                 
                                                                  <DeleteIcon style={{color:'red', width:"30px", height:"25px"}} />     
                                                                </button>     
                                                            </Tooltip>                                  
                                                        </TableCell>
                                                    </TableRow>
                                                ))}                                                                  
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 50]}
                                        component="div"
                                        rowsPerPage={this.state.pageSize}
                                        page={this.state.currentPage}
                                        count={this.state.totalPages}      
                                        onRowsPerPageChange={(e)=>this.setPageSize(e)}                        
                                        onPageChange={(e)=>this.onPageChange(e,this.state.currentPage)}
                                    />
                                </Paper>  
                            </div>
                        </div>
                    </div>                
                </div>
            </div>
        )
    }
}

export default withAuth(withNavigate(AdminDashboard));

