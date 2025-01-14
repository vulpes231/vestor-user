import React, { useEffect } from "react";

const BitcoinChart = () => {
  useEffect(() => {
    // Create TradingView widget when the component is mounted
    new window.TradingView.widget({
      autosize: true,
      symbol: "BITFINEX:BTCUSD", // The symbol for Bitcoin in USD on the Bitfinex exchange
      interval: "D", // Daily chart
      timezone: "Etc/UTC",
      theme: "dark",
      style: "1",
      locale: "en",
      toolbar_bg: "#f1f3f6",
      enable_publishing: false,
      allow_symbol_change: true,
      container_id: "bitcoin-chart-container", // ID where the chart will be rendered
    });
  }, []);

  return (
    <div
      className="md:col-span-2 bg-stone-900 bg-opacity-40"
      id="bitcoin-chart-container"
    ></div>
  );
};

export default BitcoinChart;
