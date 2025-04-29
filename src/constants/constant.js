const getAccessToken = () => {
  try {
    const accessTokenString = sessionStorage.getItem("accessToken");

    if (accessTokenString) {
      const accessToken = accessTokenString
        ? JSON.parse(accessTokenString)
        : null;
      return accessToken;
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

const authLinks = [
  {
    id: "dashboard",
    name: "dashboard",
    path: "/dashboard",
  },
  {
    id: "wallet",
    name: "wallet",
    path: "/wallet",
  },
  {
    id: "portfolio",
    name: "markets",
    path: "/markets",
  },
  {
    id: "history",
    name: "history",
    path: "/history",
  },
  // {
  //   id: "settings",
  //   name: "settings",
  //   path: "/settings",
  // },
  {
    id: "withdraw",
    name: "withdraw",
    path: "/withdraw",
  },
];

const testData = [
  {
    id: 1,
    date: "2025/11/01 12:56AM",
    coin: "btc",
    amount: 50,
    type: "deposit",
    status: "completed",
  },
  {
    id: 2,
    date: "2025/11/01 03:35PM",
    coin: "btc",
    amount: 10,
    type: "withdraw",
    status: "pending",
  },
  {
    id: 3,
    date: "2025/11/01 06:50PM",
    coin: "usdt",
    amount: 30,
    type: "transfer",
    status: "completed",
  },
];

const liveServer = `https://server.vestor.markets`; //https://vestor-server.onrender.com //https://server.vestor.markets
const devServer = `http://localhost:4000`;

function formatCurrency(amount, currencyCode = "USD") {
  // Check if the amount is undefined or null, return $0.00
  if (amount === null || amount === undefined) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
    }).format(0);
  }

  // Return formatted currency
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  }).format(amount);
}

export {
  sendError,
  getAccessToken,
  liveServer,
  devServer,
  authLinks,
  testData,
  formatCurrency,
};
