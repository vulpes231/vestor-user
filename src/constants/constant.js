const getAccessToken = () => {
  try {
    const accessTokenString = sessionStorage.getItem("accessToken");
    if (accessTokenString) {
      return accessTokenString;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error.message);
  }
};

const sendError = (error) => {
  if (error.response) {
    const errMsg = error.response.data.message;
    throw new Error(errMsg);
  } else {
    throw error;
  }
};

const liveServer = `https://vestor-server.onrender.com`;
const devServer = `http://localhost:4000`;

export { sendError, getAccessToken, liveServer, devServer };
