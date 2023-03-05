const handleError = (message = "Unauthorized") => {
  throw new Error(message);
};

export default handleError;
