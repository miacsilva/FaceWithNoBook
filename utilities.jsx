

const getEndpoint = () => {
    
    const productionEndpoint = 'https://facewithnobook.cyclic.com';
    const localEndpoint = 'http://localhost:3001';
  
    return import.meta.env.PROD ? productionEndpoint : localEndpoint;
  };

  export default getEndpoint
