import React from "react";

export default class ActiveListDaily extends React.PureComponent {
  constructor(props) {
    super(props);
    this._ref = React.createRef();
  }

  componentDidMount() {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-hotlists.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      colorTheme: "dark",
      dateRange: "12m",
      exchange: "US",
      showChart: true,
      locale: "en",
      largeChartUrl: "",
      isTransparent: false,
      width: "400",
      height: "600",
      plotLineColorGrowing: "rgba(33, 150, 243, 1)",
      plotLineColorFalling: "rgba(33, 150, 243, 1)",
      gridLineColor: "rgba(240, 243, 250, 1)",
      scaleFontColor: "rgba(120, 123, 134, 1)",
      belowLineFillColorGrowing: "rgba(33, 150, 243, 0.12)",
      belowLineFillColorFalling: "rgba(33, 150, 243, 0.12)",
      symbolActiveColor: "rgba(33, 150, 243, 0.12)",
    });
    this._ref.current.appendChild(script);
  }
  render() {
    return (
      <div class="tradingview-widget-container" ref={this._ref}>
        <div class="tradingview-widget-container__widget"></div>
      </div>
    );
  }
}
