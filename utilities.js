const getEndpoint = () => {
  const productionEndpoint = "https://facewithnobook.cyclic.app";
  const localEndpoint = "https://localhost:3001";

  return import.meta.env.PROD ? productionEndpoint : localEndpoint;
};

export default getEndpoint;
