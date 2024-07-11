import { Component, createRef} from 'react'
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import { Button } from 'react-bootstrap';
import ResponsivePagination from 'react-responsive-pagination';
import { AuthContextProps } from '../../../services/IContext';
import { GetStudentList } from '../../../Redux/Reducers/StudentReducer';
import withNavigate from '../../layouts/NavigationExtenstion';
import withAuth from '../../../context/AuthContextExtenstion';

type Props = {
    auth:AuthContextProps,
    navigate: (path: string) => void;
};

interface AdminState {
    columnDefs: ColDef[];
    rowData: any[]; 
    currentPage: number;
    totalPages: number;
    pageSize:number;
  }
  
class AdminDashboard extends Component<Props,AdminState>{  
    gridRef = createRef<AgGridReact>();
    constructor(props: any) {
      super(props);

      this.state = {
        columnDefs: [
          { field: 'studentId', headerName: 'ID',flex:1 },
          { field: 'studentName', headerName: 'Name',flex:1  },
          { field: 'address', headerName: 'Address',flex:1  },
          { field: 'age', headerName: 'Age',flex:1  },
          { field: 'hobbies', headerName: 'Hobbies',flex:1  },
          { field: 'city', headerName: 'city',flex:1  },
          { field: 'state', headerName: 'state',flex:1  },
          { field: 'pincode', headerName: 'pincode',flex:1},
          {      
            headerName:'Actions',
            cellRenderer: (cell:any) => {  
            console.log(cell);        
              return (
                <div>
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"  width="50px" height="25px"><path fill="#3a97df" d="M572.5 241.4C518.3 135.6 410.9 64 288 64S57.7 135.6 3.5 241.4a32.4 32.4 0 0 0 0 29.2C57.7 376.4 165.1 448 288 448s230.3-71.6 284.5-177.4a32.4 32.4 0 0 0 0-29.2zM288 400a144 144 0 1 1 144-144 143.9 143.9 0 0 1 -144 144zm0-240a95.3 95.3 0 0 0 -25.3 3.8 47.9 47.9 0 0 1 -66.9 66.9A95.8 95.8 0 1 0 288 160z"/></svg>   
                 <svg xmlns="http://www.w3.org/2000/svg"  width="50px" height="25px" viewBox="0 0 512 512"><path fill="#ea9a10" d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/></svg>         
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"  width="50px" height="25px"><path fill="#f20707" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1 -32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1 -32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1 -32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.7 23.7 0 0 0 -21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0 -16-16z"/></svg>
                </div>
              );
            },
            field:'studentId',
            flex:1.5
          }
        ],
        rowData:[],
        currentPage:1,
        pageSize:5,
        totalPages:0   
      };
    }
    async componentDidMount(){         
        const response = await GetStudentList(this.state.currentPage,this.state.pageSize,''); 
        this.setState({
            rowData:response.record,
            totalPages: Math.ceil(response.totalRecord / this.state.pageSize)           
        })                  
    } 
    
    onPageChange = (page: number) => {
        this.setState({ currentPage: page }, async() => {
            const response = await GetStudentList(page,this.state.pageSize,''); 
            this.setState({ 
                rowData:response.record,
                totalPages: Math.ceil(response.totalRecord / this.state.pageSize)            
            })                
        });
    };

    onSearch = async(e: any) => {
        let value=e.target.value;
        const response = await GetStudentList(this.state.currentPage,this.state.pageSize,value); 
        this.setState({ 
            rowData:response.record,
            totalPages: Math.ceil(response.totalRecord / this.state.pageSize)            
        })   
    };


    render(){
        return(
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <div style={{height:"261px", width:"100%"}}>
                            <div style={{paddingTop:"5px"}}>  
                                <Button className="btn btn-primary">Add New Student</Button> 
                                <input type="text" onChange={this.onSearch} style={{float:'right',width:'20%'}}/>       
                            </div>                                   
                            <div className="ag-theme-quartz">
                                <AgGridReact 
                                    ref={this.gridRef}
                                    columnDefs={this.state.columnDefs}
                                    rowData={this.state.rowData}                      
                                    cacheBlockSize={100}                                
                                    suppressAggFuncInHeader={true}
                                />
                                
                                <ResponsivePagination
                                    current={this.state.currentPage}
                                    total={this.state.totalPages}
                                    onPageChange={this.onPageChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withAuth(withNavigate(AdminDashboard));

