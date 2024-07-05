export const onChange=(context:any,name:string,newValue:any,callback?:any)=>{
    context.setState({[name]:{...context.state.name,value:newValue,name:name}},callback && callback);
}

export const setError=(context:any,name:string,error:string,callback?:any)=>{
    context.setState({[name]:{...context.state.name,name:name,error:error}},callback && callback);
}

export const validationForm=(context:any)=>{    debugger
    const cs=JSON.parse(JSON.stringify(context.state));
    let status=true;
    for(let key in cs){
        if(cs.hasOwnProperty(key)){
            const isRequired=cs[key]?cs[key].required:false;
            if(isRequired){
                const name=cs[key].name;
                const value=cs[key].value;
                const type=typeof value;
                if((type===null || type===undefined || type.length===0) && type !=='number'){
                    status=false;
                    setError(context,name,'error found')
                }else{
                    status=false;
                    setError(context,name,'required filed')
                }
            }
        }

    }
  return status;
}