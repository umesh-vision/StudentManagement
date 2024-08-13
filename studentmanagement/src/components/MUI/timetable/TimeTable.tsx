import { Component } from "react"
import { AuthContextProps } from "../../../services/IContext"
import withNavigate from "../../layouts/NavigationExtenstion";
import withAuth from "../../../context/AuthContextExtenstion";
import { Button, Checkbox, FormControl, InputLabel, Paper, Select, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from "@material-ui/core";
import { getSloteById, saveTimeTable } from "../../../Redux/Reducers/Student/TimeTable";


type IProps={ 
    auth:AuthContextProps
}

interface IState{
    teacherId:number,
    monDayChecked: [boolean, boolean, boolean, boolean],
    tueDayChecked: [boolean, boolean, boolean, boolean],
    wedDayChecked: [boolean, boolean, boolean, boolean],
    thursDayChecked: [boolean, boolean, boolean, boolean],
    friDayChecked: [boolean, boolean, boolean, boolean],
    selectedOption:string
}

class TimeTable extends Component<IProps,IState>{ 
    constructor(props: IProps) {
        super(props);
        this.state = {
            teacherId:0,
            selectedOption:'',
            monDayChecked: [false, false, false, false],
            tueDayChecked: [false, false, false, false],
            wedDayChecked: [false, false, false, false],
            thursDayChecked: [false, false, false, false],
            friDayChecked: [false, false, false, false]
        };
    }
     
    componentDidMount(): void {
        this.setState({         
            monDayChecked: [false, false, false, false],
            tueDayChecked: [false, false, false, false],
            wedDayChecked: [false, false, false, false],
            thursDayChecked: [false, false, false, false],
            friDayChecked: [false, false, false, false]
        })
    }

    fetch=async(id:number)=>{
       const response= await getSloteById(id);
        if(response.length>0){
            for(let i=0;i<=response.length-1;i++){
                if(response[i].DayId===1){
                    this.setState({  
                        monDayChecked:[response[i].Slot1===true?true:false, response[i].Slot2===true?true:false, response[i].Slot3===true?true:false,response[i].Slot4===true?true:false]
                    })
                }
                if(response[i].DayId===2){
                    this.setState({  
                        tueDayChecked:[response[i].Slot1===true?true:false, response[i].Slot2===true?true:false, response[i].Slot3===true?true:false,response[i].Slot4===true?true:false]
                    })
                }
                if(response[i].DayId===3){
                    this.setState({  
                        wedDayChecked:[response[i].Slot1===true?true:false, response[i].Slot2===true?true:false, response[i].Slot3===true?true:false,response[i].Slot4===true?true:false]
                    })
                }
                if(response[i].DayId===4){
                    this.setState({  
                        thursDayChecked:[response[i].Slot1===true?true:false, response[i].Slot2===true?true:false, response[i].Slot3===true?true:false,response[i].Slot4===true?true:false]
                    })
                }
                if(response[i].DayId===5){
                    this.setState({  
                        friDayChecked:[response[i].Slot1===true?true:false, response[i].Slot2===true?true:false, response[i].Slot3===true?true:false,response[i].Slot4===true?true:false]
                    })
                }
            }        
        }else{
            this.componentDidMount();
        }
    }
   
    search=async()=>{
        if(this.state.teacherId>0){
         await this.fetch(this.state.teacherId);
       }
    }

    onChange=(e:any)=>{
        this.setState({selectedOption:e.target.value,teacherId:e.target.value})
    }

    handleCheckboxChange = (day:string, index:number) => {          
        if(day==="mon"){
            const updatedState = [...this.state.monDayChecked];
            updatedState[index] = !updatedState[index];     
            this.setState({monDayChecked:[updatedState[0],updatedState[1],updatedState[2],updatedState[3]]})            
        }    
        if(day==="tue"){
            const updatedState = [...this.state.tueDayChecked];
            updatedState[index] = !updatedState[index];     
            this.setState({tueDayChecked:[updatedState[0],updatedState[1],updatedState[2],updatedState[3]]})            
        } 
        if(day==="wed"){
            const updatedState = [...this.state.wedDayChecked];
            updatedState[index] = !updatedState[index];     
            this.setState({wedDayChecked:[updatedState[0],updatedState[1],updatedState[2],updatedState[3]]})            
        } 
        if(day==="thurs"){
            const updatedState = [...this.state.thursDayChecked];
            updatedState[index] = !updatedState[index];     
            this.setState({thursDayChecked:[updatedState[0],updatedState[1],updatedState[2],updatedState[3]]})            
        }       
        if(day==="fri"){
            const updatedState = [...this.state.friDayChecked];
            updatedState[index] = !updatedState[index];     
            this.setState({friDayChecked:[updatedState[0],updatedState[1],updatedState[2],updatedState[3]]})            
        }   
    };
    
    save=async()=>{
        if(this.state.teacherId>0){
            let model=[
            {
                dayId:1,
                teacherId:this.state.teacherId,
                slotes:[{
                    slot1:this.state.monDayChecked[0],
                    slot2:this.state.monDayChecked[1],
                    slot3:this.state.monDayChecked[2],
                    slot4:this.state.monDayChecked[3]
                }]
            },
            {
                dayId:2,
                teacherId:this.state.teacherId,
                slotes:[{
                    slot1:this.state.tueDayChecked[0],
                    slot2:this.state.tueDayChecked[1],
                    slot3:this.state.tueDayChecked[2],
                    slot4:this.state.tueDayChecked[3]
                }]
            },
            {
                dayId:3,
                teacherId:this.state.teacherId,
                slotes:[{
                    slot1:this.state.wedDayChecked[0],
                    slot2:this.state.wedDayChecked[1],
                    slot3:this.state.wedDayChecked[2],
                    slot4:this.state.wedDayChecked[3]
                }]
            },
            {
                dayId:4,
                teacherId:this.state.teacherId,
                slotes:[{
                    slot1:this.state.thursDayChecked[0],
                    slot2:this.state.thursDayChecked[1],
                    slot3:this.state.thursDayChecked[2],
                    slot4:this.state.thursDayChecked[3]
                }]
            },
            {
                dayId:5,
                teacherId:this.state.teacherId,
                slotes:[{
                    slot1:this.state.friDayChecked[0],
                    slot2:this.state.friDayChecked[1],
                    slot3:this.state.friDayChecked[2],
                    slot4:this.state.friDayChecked[3]
                }]
            }]               
            await saveTimeTable(model)
        }
    }

    reset=()=>{
        this.setState({ selectedOption: '' ,teacherId:0});
        this.componentDidMount();
    }
    
    render(){
        return(
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                    <Paper elevation={5}>
                        <form name="studentform">   
                            <div className='row'>                                      
                                <div className="col-md-6">
                                <FormControl className={"form-control"}>
                                    <InputLabel htmlFor="age-native-simple">Teacher's</InputLabel>
                                    <Select
                                        onChange={this.onChange}
                                        inputProps={{
                                            name: 'name',
                                        }}           
                                        value={this.state.selectedOption}
                                        label="Options"                             
                                    >
                                        <option aria-label="None" value="" />
                                        <option value={1}>Suresh</option>
                                        <option value={2}>Ramesh</option>
                                        <option value={3}>Tanu</option>
                                    </Select>
                                </FormControl>
                                </div>
                                <div className="col-md-6">                                   
                                  <Button variant="contained" onClick={this.search} color="primary" >Search</Button>                                
                                </div>
                            </div>
                        </form>
                    </Paper>
                    <Paper elevation={5} style={{marginTop:"5px"}}>                  
                        <TableContainer component={Paper}>
                            <Table  aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Day's</TableCell>
                                        <TableCell align="right">Slot-1(8AM to 10AM)</TableCell>
                                        <TableCell align="right">Slot-2(10AM to 12PM)</TableCell>
                                        <TableCell align="right">Slot-3(12PM to 02PM)</TableCell>
                                        <TableCell align="right">Slot-4(02PM to 04PM)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>      
                                    <TableRow>
                                        <TableCell component="th" scope="row">Monday</TableCell>
                                        {this.state.monDayChecked.map((checked, index) => (
                                            <TableCell align="center" key={index}>
                                            <Checkbox
                                                checked={checked} 
                                                onChange={() => this.handleCheckboxChange('mon', index)}                                              
                                                inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
                                            />
                                            </TableCell>
                                        ))}
                                    </TableRow>  
                                    <TableRow>
                                    <TableCell component="th" scope="row">Tuesday</TableCell>
                                        {this.state.tueDayChecked.map((checked, index) => (
                                            <TableCell align="center" key={index}>
                                            <Checkbox
                                                checked={checked}        
                                                onChange={() => this.handleCheckboxChange('tue', index)}                                            
                                                inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
                                            />
                                            </TableCell>
                                        ))}
                                    </TableRow>  
                                    <TableRow>
                                        <TableCell component="th" scope="row">Wednesday</TableCell>
                                        {this.state.wedDayChecked.map((checked, index) => (
                                            <TableCell align="center" key={index}>
                                            <Checkbox
                                                checked={checked}                   
                                                onChange={() => this.handleCheckboxChange('wed', index)}                                 
                                                inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
                                            />
                                            </TableCell>
                                        ))}
                                    </TableRow>  
                                    <TableRow>
                                    <TableCell component="th" scope="row">Thursday</TableCell>
                                        {this.state.thursDayChecked.map((checked, index) => (
                                            <TableCell align="center" key={index}>
                                            <Checkbox
                                                checked={checked}                        
                                                onChange={() => this.handleCheckboxChange('thurs', index)}                            
                                                inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
                                            />
                                            </TableCell>
                                        ))}
                                    </TableRow>       
                                    <TableRow> 
                                        <TableCell component="th" scope="row">Friday</TableCell>
                                        {this.state.friDayChecked.map((checked, index) => (
                                            <TableCell align="center" key={index}>
                                            <Checkbox
                                                checked={checked}     
                                                onChange={() => this.handleCheckboxChange('fri', index)}                                               
                                                inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
                                            />
                                            </TableCell>
                                        ))}
                                    </TableRow>                              
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                       <TableCell colSpan={5} align="right">
                                         <Button variant="contained" color="primary" onClick={this.save}>Save</Button>&nbsp;
                                         <Button variant="contained" color="default" onClick={this.reset}>Reset</Button>
                                       </TableCell>
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </TableContainer>
                    </Paper>
                </div>
              </div>
            </div>   
        )    
    }
}  
export default withAuth(withNavigate(TimeTable));
