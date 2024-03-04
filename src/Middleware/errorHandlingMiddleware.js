const errorHandlingMiddleware = (error, req, res, next) => {
    console.error(error.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  };
  
  export default errorHandlingMiddleware;