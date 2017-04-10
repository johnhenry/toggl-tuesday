const getInput = async (question, rl)=>new Promise((resolve)=>rl.question(question, resolve))

module.exports = ({key, question, defaultOPT, value, rl}) =>{
  return async()=>{
    if(value === true){
      value = defaultOPT
    }
    if(value){
      return {key, value}
    }
    value = await getInput(`${question} (${defaultOPT})`, rl);
    value = value || defaultOPT;
    return {key, value}
  }
};
