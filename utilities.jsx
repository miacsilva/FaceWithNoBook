

const getEndpoint = (isProduction) => {
    
    const productionEndpoint = 'http://facewithnobook.cyclic.com';
    const localEndpoint = 'http://localhost:3001';
  
    return isProduction ? productionEndpoint : localEndpoint;
  };

  export default getEndpoint
