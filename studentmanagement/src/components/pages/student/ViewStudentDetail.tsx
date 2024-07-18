import { Component } from "react";
import { studentDTO } from "../../../services/IComman";
import withNavigate from "../../layouts/NavigationExtenstion";
import withAuth from "../../../context/AuthContextExtenstion";
import { getStudentById } from "../../../Redux/Reducers/Student/StudentReducer";
import { getCookie } from "../../../services/cookie";
import { AuthContextProps } from "../../../services/IContext";
import StudentProfile from "./StudentProfile";
import EducationDetail from "./EducationDetail";
import { Box, Tab, Tabs, Typography } from "@material-ui/core";


type Props = { 
    auth:AuthContextProps,
    navigate: (path: string) => void;   
};

interface student{
    data?:studentDTO;   
    value:number
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {  
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p:2 }}>
          <Typography component="span">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

class ViewStudentDetail extends Component<Props,student>{ 
    constructor(props:Props) {
      super(props);
      this.state={
        data:{
            studentId: 0,
            studentName: '',
            address:  '',
            age: 0,
            gender:'',
            hobbies: '',
            city:  '',
            state: '',
            pincode: 0,
            image: '',
            stateId:0,
            cityId:0,
            studClass:0,
        },
        value:0
      }
    }

    async componentDidMount(){
        const id=this.props.auth.state.profile?.userId;
        if(id===undefined || id===0){
            let id= await getCookie("userId");
            const result=await getStudentById(parseInt(id));
            this.setState({data:result})
        }
        else{
            const result=await getStudentById(id);
            this.setState({data:result})
        }     
    }

    onBackList=()=>{      
        this.props.navigate('/pages/admin/dashboard')
    }

    tabChange = (event: any, newValue: number) => {
      this.setState({ value: newValue });
    };

    render(){ 
        const { value,data } = this.state;
        return(
          <>
            <div className="container">
               <div className="row">
                  <div className="col-md-12">
                    <Tabs
                      value={value}
                      onChange={this.tabChange}
                      aria-label="basic tabs example"
                    >
                      <Tab label="Basic Information"  />
                      {
                        this.props.auth.state.user?.role==="student" &&
                        <Tab label="Education Detail"  />
                      }
                    </Tabs>  
                    <TabPanel value={value} index={0}>      
                        <StudentProfile data={data} onBackList={this.onBackList} role={this.props.auth.state.user?.role} />
                    </TabPanel>
                    {
                      this.props.auth.state.user?.role==="student" &&
                      <TabPanel value={value} index={1}>     
                        <EducationDetail />
                      </TabPanel>
                    }
                  </div>
               </div>
            </div>
          </>
        );
    }
}

export default withAuth(withNavigate(ViewStudentDetail));