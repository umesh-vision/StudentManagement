export const onChange=(context:any,name:string,newValue:any)=>{
    context.setState({[name]:{...context.state.name,value:newValue}});
}

export const validationForm=(context:any)=>{     
    const cs=JSON.parse(JSON.stringify(context.state));
    let status=true;
    for(let key in cs){
        if(cs.hasOwnProperty(key)){
           if(key!=="submitted" && key!=="stateOptions" && key!=="cityOption" && key!=="selectedHobbies" && key!=="hobbies" && key!=="hobbiesOptions" && key!=="removeSelectedOptions"){
              const isRequired=cs[key].value!==undefined && cs[key].value!==""?false:true;
              if(isRequired){
                status=false
              }
            }
        }
    }
  return status;
}