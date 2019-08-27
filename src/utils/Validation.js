export const validator={
  email:{
    reg:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    err:"Email error"
  },
  phone: {
    reg: /^[0-9]{5,13}$/,
    err: '电话有误'
  }
};
//
export const inputValidation=(val,validation)=>{
  const isValid=validation.reg.test(val);
  return !isValid?validation.err:"";
};


