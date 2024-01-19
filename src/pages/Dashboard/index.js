import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Badge, Card, CardBody, Col, Container, Row } from "reactstrap";
import { Link } from "react-router-dom";
import "../Dashboard/index.css";
import TradingViewWidget, { Themes } from "react-tradingview-widget";
// import { WidgetsData } from "../../common/data/dashboard";
import Trading from "./Trading";
import openSocket from "socket.io-client";
import TwitterTabs from "./Tabs-Section/TwitterTabs";
import { SOCKETURL } from "../../Utilitiess/Const";
import { APIURL } from "../../Utilitiess/Const";

// let isSet = false
const Dashboard = (props) => {
  const [showCoin, setShowCoin] = useState(false);
  const {setTweetData,tweetData} = props;
  const [charts, setCharts] = useState(true);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [chartButton, setChartButton] = useState(true);
  const [previewButton, setPreviewButton] = useState(true);
  const [settingData, setSettingData] = useState(null);
  const [restoreBalanceData, setRestorebalanceData] = useState(null);
  const [basecurrency, setBasecurrency] = useState([]);
  const [twitterColor, setTwitterColor] = useState("");
  const [twiterGetApi, setTwiterGetApi] = useState(null);
  const [errorfounder, setErrorfounder] = useState(null);
  const [refreshDataList, setRefreshList] = useState(false);
  const [newData, setNewData] = useState(null);
  const [spot, setSpot] = useState([]);
  const [future, setFuture] = useState([]);
  const [symbolPair, setSymbolPair] = useState("BTC/default");
  const [userBalanceDataUsd, setUserBalanceDataUsd] = useState(null);
  const [userBalanceDataUsdt, setsetUserBalanceDataUsdt] = useState(null);
  const [symbolPairCoin, setSymbolPairCoin] = useState(null);
  const [symbolPairValue, setSymbolPairValue] = useState(null);
  const [initialState, setInitialState] = useState(true);
  const [spotChartMap, setSpotChartMap] = useState(false);
  const [futureChartMap, setFutureChartMap] = useState(false);
  const [coinData, setCoinData] = useState([]);
  const [apiSymbol, setApiSymbol] = useState(null);
  const [tweetUserData, setTweetUserData] = useState(null);
  const [leverageLimitMax, setLeverageLimitMax] = useState("");
  const [refreshDataNow, setRefreshDataNow] = useState(false);
  const [isFuture, setIsFuture] = useState(false);
  // const [showLeverage,setShowLeverage]= useState(false)
  // working

  const [socket] = useState(
    openSocket(SOCKETURL, { transports: ["websocket"] })
  );
  // const previewBtnRef = useRef()
  const openCharts = () => {
    setCharts(true);
    // setShowPreview(false)
    setChartButton(true);
    setPreviewButton(true);
  };

  const openPreview = () => {
    setCharts(false);
    // setShowPreview(true)

    setChartButton(false);
    setPreviewButton(false);
  };

  useEffect(() => {
    const authId = JSON.parse(localStorage.getItem("authUser"));
    const token = localStorage.getItem("accessToken");
    var requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: {
        Authorization: token,
      },
    };

    fetch(`${APIURL}/user/${authId.uid}/tweets`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setTweetData(result.body);
        setRestorebalanceData(result.body.USDT);
        //total apply after usdt
      })
      .catch((error) => console.log("error", error));
  }, []);
  useEffect(() => {
    
    socket.on("tweet", (data) => {
      console.log("socket chala")
     
      if (data.user_id === JSON.parse(localStorage.getItem("authUser")).uid) {
      
        setErrorfounder(false);
        setNewData(data.id);
        setTweetData((prev) => {
          return [
            {
              ...data,
              fromSocket: true,
              currentDate: new Date().toISOString(),
              className: "new_data",
            },
            ...prev,
          ];
        });
        setRefreshList((prev) => !prev);
      }
    });
  }, []);
 
  useEffect(() => {
    const authId = JSON.parse(localStorage.getItem("authUser")).uid;
    const token = localStorage.getItem("accessToken");
    const emitdata = {
      user_id: authId,
      token: token,
    };
      
    socket.emit("listenTweet", { emitdata });
  }, []);


  function isOneSecondOverHandler(date) {
    if (!date) {
      return false;
    }
    let newDate = new Date(date);
    let milliSecond = new Date().getTime() - new Date(newDate).getTime();
    if (milliSecond > 40000) {
      return false;
    }
    return true;
  }

  useEffect(() => {
    setTimeout(() => {
      const tweetDataCopy = [...tweetData];
      let isChange = false;
      let count = 0;
      for (let data of tweetDataCopy) {
        if (data.currentDate && isOneSecondOverHandler(data.currentDate)) {
          isChange = true;
          data.className = "";
        } else {
          count += 1;
          if (count === 10) {
            break;
          }
        }
      }

      if (isChange) {
        setTweetData((prev) => {
          return [...tweetDataCopy];
        });
      }
    }, 30000);
  }, [refreshDataList]);

  useEffect(() => {
    const authId = JSON.parse(localStorage.getItem("authUser"));
    const token = localStorage.getItem("accessToken");
    var requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: {
        Authorization: token,
      },
    };
    fetch(`${APIURL}/${authId.uid}/balance`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.error === false && result.body.free.length !== 0) {
          setUserBalanceDataUsd(result.body.free.USD);
          setsetUserBalanceDataUsdt(result.body.free.USDT);
        }
      })
      .catch((error) => console.log("error", error));
  }, [refreshDataNow]);

  const findcoin = (elem) => {
    setTweetUserData(elem);
    setFutureChartMap((prev) => false);
    setSpotChartMap((prev) => false);
    setBasecurrency([]);

    var textVal = elem.text
    if (coinData.length === 0) {
      fetch(`${APIURL}/getFtxMarket?pageNum=0&pagePerRecords=500`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.error === false) {
            const coinDataRes = json.body.body;
            setCoinData(coinDataRes);
            const arr = [];
            coinDataRes.filter((item) => {
              const base_currency = item.base_currency;
              // if (item.base_currency == 'T' || item.base_currency == 't') {
              //   const tIndex = textVal.indexOf(base_currency);
              //   console.log("innnnnnnnnnnnnnnnnn",textVal,base_currency,textVal.indexOf(base_currency))
              // }
              const quote_currency = item.quote_currency;
              if (textVal.search(base_currency) > -1) {
                if (base_currency === 'T') {
                  const tIndex = textVal.indexOf(base_currency);
                  if (textVal[tIndex-1] === '#' && textVal[tIndex+1] === ' ' ) {
                    if (!arr.includes(base_currency)) {
                      arr.push(base_currency);
                    }
                  } 
                } else if (!arr.includes(base_currency)) {
                  arr.push(base_currency);
                }
              } else if (textVal.search(quote_currency) > -1) {
                // setSelectedCoin(quote_currency);
                if (base_currency === 'T') {
                  const tIndex = textVal.indexOf(quote_currency);
                  if (textVal[tIndex-1] === '#' && textVal[tIndex+1] === ' ' ) {
                    if (!arr.includes(quote_currency)) {
                      arr.push(quote_currency);
                    }
                  } 
                } else if (!arr.includes(quote_currency)) {
                  arr.push(quote_currency);
                }
              } else {
                // setSelectedCoin("")
              }
              return (
                textVal.search(base_currency) > -1 ||
                textVal.search(quote_currency) > -1
              );
            });

            setBasecurrency(arr);
            searchTermFilter(elem.text);
          } else {
          }
        });
    } else {
      const arr = [];
      coinData.filter((item) => {
        const base_currency = item.base_currency;
        const quote_currency = item.quote_currency;
                
        if (textVal.search(base_currency) > -1) {
          if(base_currency==="T"){
            const tIndex = textVal.indexOf(quote_currency);
            if(textVal[tIndex-1]==='#' && textVal[tIndex+1]===' '){
              if (!arr.includes(base_currency)) {
                arr.push(base_currency);
              }
            }
          }
          else if (!arr.includes(base_currency)) {
            arr.push(base_currency);
          }
        } else if (textVal.search(quote_currency) > -1) {
          // setSelectedCoin(quote_currency);
          if(quote_currency==='T'){
            const tIndex = textVal.indexOf(quote_currency);
            if(textVal[tIndex-1]==='#' && textVal[tIndex+1]===' '){
              if (!arr.includes(quote_currency)) {
                arr.push(quote_currency);
              }
            }
            
          }
          else if (!arr.includes(quote_currency)) {
            arr.push(quote_currency);
          }
        } else {
          // setSelectedCoin("")
        }
        return (
          textVal.search(base_currency) > -1 ||
          textVal.search(quote_currency) > -1
        );
      });
      // console.log("findcoin arr", arr);
      setBasecurrency(arr);
      searchTermFilter(elem.text);
    }

    setShowCoin(true);
    setInitialState((prev) => true);
  };

  const iframeAction = (url) => {
    // console.log("url", url)
    setPreviewUrl(url);

    openPreview();
    setPreviewButton(false);
    setChartButton(false);
  };

  useEffect(() => {
    const authId = JSON.parse(localStorage.getItem("authUser"));
    const token = localStorage.getItem("accessToken");
    // console.log(token)
    var requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: {
        Authorization: token,
      },
    };

    fetch(`${APIURL}/${authId.uid}/setting`, requestOptions)
      .then((response) => response.json())
      .then((result) => setSettingData(result.body))
      .catch((error) => console.log("error", error));
  }, []);

  useEffect(() => {
    const authId = JSON.parse(localStorage.getItem("authUser"));
    const token = localStorage.getItem("accessToken");
    var requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: {
        Authorization: token,
      },
    };
    fetch(` ${APIURL}/twitter/${authId.uid}/setting`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // console.log(result)
        setTwiterGetApi(result.body);
      })
      .catch((error) => console.log("error", error));
  }, []);
  // console.log("twiterGetApi", twiterGetApi)

  const searchTermFilter = (textTerm) => {
    const authId = JSON.parse(localStorage.getItem("authUser"));
    const token = localStorage.getItem("accessToken");
    var requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: {
        Authorization: token,
      },
    };
    fetch(`${APIURL}/user/${authId.uid}/identifers`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // console.log(result)
        // setSearchTerm(result.body)
        if (result.error === false) {
          let serchTermData = result.body;
          // console.log("serchTermData", serchTermData)
          const arr = [];
          serchTermData.forEach((ele) => {
            if (
              textTerm.toLowerCase().includes(ele.search_terms.toLowerCase())
            ) {
              arr.push(ele.symbol);
            } else {
              // arr.push(ele.symbol);
            }
          });
          setBasecurrency((prev) => {
            return Array.from(new Set([...prev, ...arr]));
          });
        }
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    if (basecurrency.length > 0) {
      getCoinByid(basecurrency);
    } else {
      setSpot([]);
      setFuture([]);
    }
  }, [basecurrency]);

  useEffect(() => {
    if (props.searchResponse !== null) {
      const spotValue = props.searchResponse.filter(
        (elem) => elem.future === false
      );
      const futureValue = props.searchResponse.filter(
        (elem) => elem.future === true
      );
      filterCoinHandler(spotValue, futureValue, true);
      setShowCoin(true);
    }
  }, [props.searchResponse]);

  const getCoinByid = (arr) => {
    // console.log("basecurrencyyyy", arr)
    const authId = JSON.parse(localStorage.getItem("authUser"));
    const token = localStorage.getItem("accessToken");
    // const coins = { "coins": basecurrency }
    const coins = { coins: [...arr] };
    
    // console.log("coinsssss", coins)
    var requestOptions = {
      method: "POST",
      // body: coins,
      body: JSON.stringify(coins),
      headers: {
        Authorization: token,
        "Content-type": "application/json",
      },
    };

    fetch(`${APIURL}/${authId.uid}/checkMarketCoin`, requestOptions)
      .then((response) => response.json())
      .then((result) => {   

        if (result.error === false) {
          let coinValue = result.body;
          // const spotValue = coinValue.filter((elem) => elem.quote_currency === "USDT")
          // const futureValue = coinValue.filter((elem) => elem.quote_currency === "USD")

          const spotValue = coinValue.filter((elem) => elem.future === false);
          const futureValue = coinValue.filter((elem) => elem.future === true);
          filterCoinHandler(spotValue, futureValue);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const filterCoinHandler = (spotValue, futureValue, flag = false) => {
    const uniqueSpotValue = [];
    spotValue.forEach((data, index) => {
      if (index === 0) {
        data.isSpot = true;
        uniqueSpotValue.push(data);
      } else {
        let isExist = false;
        let count = 0;
        let deleteIndex = null;
        for (let data2 of uniqueSpotValue) {
          if (
            data2.base_currency === data.base_currency &&
            data2.quote_currency === "USDT"
          ) {
            // ok
            isExist = true;
            break;
          } else if (
            data2.base_currency === data.base_currency &&
            data2.quote_currency === "USD" &&
            data.quote_currency === "USDT"
          ) {
            deleteIndex = count;
            isExist = true;
            break;
          }
          count++;
        }
        if (!isExist) {
          uniqueSpotValue.push(data);
        } else {
          if (deleteIndex != null) {
            uniqueSpotValue.splice(deleteIndex, 1);
            data.isSpot = true;
            uniqueSpotValue.push(data);
          }
        }
      }
    });
    // const spotValueFilter = spotValue.filter(data=>uniqueSpotValue.includes(data.symbol_pair))
    const uniqueFutureValue = [];
    futureValue.forEach((data, index) => {
      data.symbol_pair = data.base_currency + "/PERP";
      if (index == 0) {
        data.isSpot = false;
        uniqueFutureValue.push(data);
      } else {
        let isExist = false;
        for (let data2 of uniqueFutureValue) {
          if (data2.base_currency === data.base_currency) {
            // ok
            isExist = true;
            break;
          }
        }
        if (!isExist) {
          data.isSpot = false;
          uniqueFutureValue.push(data);
        }
      }
    });
    if (flag) {
      if (uniqueSpotValue.length > 0) {
        graphSymbol(uniqueSpotValue[0].symbol_pair);
      } else {
        if (uniqueFutureValue.length > 0) {
          graphSymbol(uniqueFutureValue[0].symbol_pair, true, 'future');
        }
      }
    } 
    setSpot(uniqueSpotValue);
    setFuture(uniqueFutureValue);
  };

  const graphSymbol = (symbol_pair, flag = false, from = null) => {
    if (flag) {
      if (from === 'future') {
        const leverage_limit_max = future.filter(
          (data) => data.symbol_pair === symbol_pair
        );
        if (leverage_limit_max.length === 1) {
          setLeverageLimitMax(leverage_limit_max[0].leverage_limit_max);
        }
      } else if (from === 'spot') {
        const leverage_limit_max = spot.filter(
          (data) => data.symbol_pair === symbol_pair
        );
        if (leverage_limit_max.length === 1) {
          setLeverageLimitMax(leverage_limit_max[0].leverage_limit_max);
        }
      }
    } else {
      setLeverageLimitMax("");
    }

    setInitialState(false);
    setApiSymbol(symbol_pair);
    let text = symbol_pair;
    const tabsvalue = text.split("/");
    setSymbolPairCoin(tabsvalue[0]);
    setSymbolPairValue(tabsvalue[1]);

    setSymbolPair(symbol_pair);
    setCharts(true);
    setChartButton(true);
    setPreviewButton(true);
    setFutureChartMap(false);
    setSpotChartMap(false);
    setIsFuture(from === 'future' ? true : false);
  };

  const SpotHandler = () => {
    setInitialState(true);
    setSpotChartMap(true);
    setFutureChartMap(false);
  };

  const FutureChartHandeler = () => {
    setInitialState(false);
    setFutureChartMap(true);
    setSpotChartMap(false);
    setIsFuture(true);
  };
  const getsymbolgoal = (symbolPair) => {
    if (symbolPair) {
      var symbolArr = symbolPair.split("/");
      if (symbolArr.includes("USDT") || symbolArr.includes("USD")) {
        const symbole = symbolArr.join("");

        return `BINANCE:${symbole}`;
      } else if (symbolArr.includes("default")) {
        const symbole = symbolArr[0];

        return `BINANCE:${symbole}USD`;
      } else {
        // const symbole = symbolArr.join("");
        if (symbolArr[0].includes("PERP")) {
          const dataValuee = symbolArr[0].replace("-PERP", "PERP");
          return `BINANCE:${dataValuee}`;
        } else {
          return `BINANCE:${symbolArr[0]}PERP`;
        }
      }
    }
  };

  return (
    <React.Fragment>

      <div className="page-content">

        <MetaTags>
          <title>Dashboard | Twitter Crypto007</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            title="Dashboard"
            
            // breadcrumbItem={`Dashboard ${basecurrency.length > 0 ? basecurrency[0] : ''}`} />
            breadcrumbItem={`Dashboard`}
            
          />

          <Row>
            <Col xl={8} md={8}>
              <Row>
                {twiterGetApi &&
                !twiterGetApi.api_key &&
                !twiterGetApi.secret_key ? (
                  <div
                    className="alert alert-warning text-center fade show"
                    role="alert"
                    // bis_skin_checked="1"
                  >
                    Please add your
                    <Link to="/twitterApi">
                      {" "}
                      <a
                        className="alert-link BeforHover"
                        href="/ui-alerts"
                      >
                        Twitter Settings
                      </a>
                    </Link>{" "}
                    to start receiving tweets in real time from people you
                    follow.
                  </div>
                ) : (
                  ""
                )}

                {settingData &&
                !settingData.api_key &&
                !settingData.secret_key ? (
                  <div
                    className="alert alert-warning text-center fade show"
                    role="alert"
                    // bis_skin_checked="1"
                  >
                    Please add your
                    <Link to="/setting">
                      {" "}
                      <a
                        className="alert-link BeforHover"
                        href="/ui-alerts"
                      >
                        CEX API Settings
                      </a>
                    </Link>{" "}
                    to start trading.
                  </div>
                ) : (
                  ""
                )}

                <Row>
                  <Col xl={4} md={6}>
                    <Card
                      className="card-h-100  shadow  mb-4  rounded  "
                      style={{ minHeight: "130px" }}
                    >
                      <CardBody>
                        <Row className="align-items-center">
                          <Col xs={12}>
                            <span
                              className="mb-2"
                              style={{ fontWeight: "700", fontSize: "16px" }}
                            >
                              SPOT
                            </span>
                            <span
                              className="mb-2"
                              style={{
                                float: "right",
                                fontWeight: "700",
                                fontSize: "16px",
                              }}
                            >
                              {userBalanceDataUsdt
                                ? userBalanceDataUsdt.toFixed(2)
                                : 0}
                            </span>
                          </Col>
                        </Row>
                        <div className="text-nowrap">

                          {showCoin ? (
                            <Row>
                              <Col>
                                <div className="d-flex justify-content-between">
                                  <div
                                    style={{
                                      display: "flex",
                                      flexWrap: "wrap",
                                    }}
                                  >
                                    {spot.length > 0 &&
                                      spot.map((data, index) => {
                                        return (
                                          <span key={index} className="h4 m-1">
                                            {
                                              <Badge
                                                bg="success"
                                                width="50px"
                                                height="50px"
                                                className="bg-success"
                                                style={{
                                                  background: "#6B9362",
                                                  fontWeight: "121%!important",
                                                  cursor: "pointer",
                                                }}
                                                onClick={(id) =>
                                                  graphSymbol(data.symbol_pair, true, 'spot')
                                                }
                                              >
                                                {data.base_currency}
                                              </Badge>
                                            }
                                          </span>
                                        );
                                      })}
                                  </div>
                                  <div className="h4 ">
                                    {spot.length > 1 && (
                                      <Badge
                                        bg="danger"
                                        width="50px"
                                        height="50px"
                                        className="bg-danger"
                                        style={{
                                          background: "#6B9362",
                                          fontWeight: "121%!important",
                                          cursor: "pointer",
                                        }}
                                        onClick={SpotHandler}
                                      >
                                        All
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              </Col>
                            </Row>
                          ) : (
                            ""
                          )}
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col xl={4} md={6}>
                    <Card
                      className="card-h-100 bg-light shadow  mb-4  rounded  "
                      style={{ minHeight: "130px" }}
                    >
                      <CardBody>
                        <Row className="align-items-center">
                          <Col xs={12}>
                            <span
                              className="mb-2"
                              style={{ fontWeight: "700", fontSize: "16px" }}
                            >
                              MARGIN
                            </span>
                            <span
                              className="mb-2"
                              style={{
                                float: "right",
                                fontWeight: "700",
                                fontSize: "16px",
                              }}
                            >
                              ${restoreBalanceData ? restoreBalanceData : 0}
                            </span>
                          </Col>
                        </Row>
                        <div className="text-nowrap">
                          {/* <h1>Empty</h1> */}
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col xl={4} md={6}>
                    <Card
                      className="card-h-100 shadow  mb-4  rounded  "
                      style={{ minHeight: "130px" }}
                    >
                      <CardBody>
                        <Row className="align-items-center">
                          <Col xs={12}>
                            <span
                              className="mb-2"
                              style={{ fontWeight: "700", fontSize: "16px" }}
                            >
                              FUTURE
                            </span>
                            <span
                              className="mb-2"
                              style={{
                                float: "right",
                                fontWeight: "700",
                                fontSize: "16px",
                              }}
                            >
                              $
                              {userBalanceDataUsd
                                ? userBalanceDataUsd.toFixed(2)
                                : 0}
                            </span>
                          </Col>
                        </Row>
                        <div className="text-nowrap">
                          {showCoin ? (
                            <Row>
                              <Col>
                                <div className="d-flex justify-content-between">
                                  <div
                                    style={{
                                      display: "flex",
                                      flexWrap: "wrap",
                                    }}
                                  >
                                    {
                                      future.length > 0 &&
                                      future.map((data, index) => {
                                        return (
                                          <span key={index} className="h4 m-1">
                                            {/* {data.future===1 && <Badge bg="success" width="50px" height="50px" className='bg-success' style={{ background: '#6B9362', fontWeight: '121%!important', cursor: "pointer" }} onClick={(id) => graphSymbol(data.symbol_pair, true)} >{data.base_currency}</Badge> } */}
                                            {
                                              <Badge
                                                bg="success"
                                                width="50px"
                                                height="50px"
                                                className="bg-success"
                                                style={{
                                                  background: "#6B9362",
                                                  fontWeight: "121%!important",
                                                  cursor: "pointer",
                                                }}
                                                onClick={(id) =>
                                                  graphSymbol(
                                                    data.symbol_pair,
                                                    true,
                                                    'future'
                                                  )
                                                }
                                              >
                                                {data.base_currency}
                                              </Badge>
                                            }
                                          </span>
                                        );
                                      })}
                                  </div>
                                  <div className="h4 ">
                                    {future.length > 1 && (
                                      <Badge
                                        bg="danger"
                                        width="50px"
                                        height="50px"
                                        className="bg-danger"
                                        style={{
                                          background: "#6B9362",
                                          fontWeight: "121%!important",
                                          cursor: "pointer",
                                        }}
                                        onClick={FutureChartHandeler}
                                      >
                                        All
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              </Col>
                            </Row>
                          ) : (
                            ""
                          )}
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Row>

              <div>
                {chartButton ? (
                  <button
                    type="button"
                    onClick={openCharts}
                    className="btn btn-primary btn-lg waves-effect waves-light chartBytn"
                  >
                    Charts
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={openCharts}
                    className="btn btn-secondary btn-lg waves-effect waves-light chartBytn"
                  >
                    Charts
                  </button>
                )}
                {previewButton ? (
                  <button
                    type="button"
                    onClick={openPreview}
                    className="btn btn-secondary btn-lg waves-effect waves-ligh chartBytns"
                  >
                    Preview
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={openPreview}
                    className="btn btn-primary btn-lg waves-effect waves-light chartBytns"
                  >
                    Preview
                  </button>
                )}
              </div>

              {charts ? (
                <div className="mt-4">
                  <Row>
                    {!spotChartMap && !futureChartMap && (
                      <Col xl={12} md={12}>
                        <TradingViewWidget
                          interval={1}
                          symbol={getsymbolgoal(symbolPair)}
                          theme={Themes.LIGHT}
                          locale="en"
                          width="100%"
                          time={1000}
                        />
                      </Col>
                    )}

                    {!spotChartMap && !futureChartMap && (
                      <Trading
                        userBalanceDataUsd={
                          userBalanceDataUsd
                            ? userBalanceDataUsd.toFixed(2)
                            : userBalanceDataUsd
                        }
                        userBalanceDataUsdt={
                          userBalanceDataUsdt
                            ? userBalanceDataUsdt.toFixed(2)
                            : userBalanceDataUsdt
                        }
                        symbolPairCoin={symbolPairCoin}
                        symbolPairValue={symbolPairValue}
                        initialState={initialState}
                        apiSymbol={apiSymbol}
                        tweetUserData={tweetUserData}
                        spot={spot}
                        future={future}
                        leverage_limit_max={leverageLimitMax}
                        setRefreshDataNow={setRefreshDataNow}
                        isFuture={isFuture}
                      />
                    )}

                    {spotChartMap && "spot" && (
                      <Col xl={12} md={12}>
                        {spot &&
                          spot.map((ele, index) => {
                            return (
                              <div key={index} className="mb-2">
                                <TradingViewWidget
                                  interval={1}
                                  symbol={getsymbolgoal(ele.symbol_pair)}
                                  theme={Themes.LIGHT}
                                  locale="en"
                                  width="100%"
                                  time={1000}
                                />

                                <Trading
                                  userBalanceDataUsd={
                                    userBalanceDataUsd
                                      ? userBalanceDataUsd.toFixed(2)
                                      : userBalanceDataUsd
                                  }
                                  userBalanceDataUsdt={
                                    userBalanceDataUsdt
                                      ? userBalanceDataUsdt.toFixed(2)
                                      : userBalanceDataUsdt
                                  }
                                  symbolPairCoin={ele.base_currency}
                                  symbolPairValue={ele.quote_currency}
                                  initialState={initialState}
                                  key={index}
                                  apiSymbol={ele.symbol_pair}
                                  tweetUserData={tweetUserData}
                                  spot={spot}
                                  future={future}
                                  setRefreshDataNow={setRefreshDataNow}
                                  isFuture={isFuture}
                                />
                              </div>
                            );
                          })}
                      </Col>
                    )}

                    {futureChartMap && "future" && (
                      <Col xl={12} md={12}>
                        {future &&
                          future.map((ele, index) => {
                            return (
                              <div key={index} className="mb-2">
                                <TradingViewWidget
                                  interval={1}
                                  symbol={getsymbolgoal(ele.symbol_pair)}
                                  theme={Themes.LIGHT}
                                  locale="en"
                                  width="100%"
                                  time={1000}
                                />
                                <Trading
                                  userBalanceDataUsd={
                                    userBalanceDataUsd
                                      ? userBalanceDataUsd.toFixed(2)
                                      : userBalanceDataUsd
                                  }
                                  userBalanceDataUsdt={
                                    userBalanceDataUsdt
                                      ? userBalanceDataUsdt.toFixed(2)
                                      : userBalanceDataUsdt
                                  }
                                  symbolPairCoin={ele.base_currency}
                                  symbolPairValue={ele.quote_currency}
                                  initialState={initialState}
                                  key={index}
                                  apiSymbol={ele.symbol_pair}
                                  tweetUserData={tweetUserData}
                                  spot={spot}
                                  future={future}
                                  leverage_limit_max={ele.leverage_limit_max}
                                  setRefreshDataNow={setRefreshDataNow}
                                  isFuture={isFuture}
                                />
                              </div>
                            );
                          })}
                      </Col>
                    )}
                  </Row>
                </div>
              ) : (
                <Row>
                  <h2 className="mt-3">
                    {" "}
                    {previewUrl !== null ? (
                      <span className="h3 m-2">
                        <a href={previewUrl} target="_blank" rel="noreferrer">
                          {" "}
                          Open in New Tab
                        </a>
                      </span>
                    ) : (
                      ""
                    )}
                  </h2>
                  {previewUrl == null ? (
                    <div
                      className="text-center border"
                      style={{ height: "400px", width: "100%" }}
                    >
                      <h1 className="m-5"> No Preview Selected</h1>
                    </div>
                  ) : (
                    <iframe
                      src={previewUrl}
                      height="600"
                      width="300"
                      title="Iframe Example"
                    ></iframe>
                  )}
                </Row>
              )}
            </Col>
            <Col xl={4} md={4}>
              <div className="NewCard">
                <TwitterTabs
                  className="border"
                  tweetData={tweetData}
                  findcoin={findcoin}
                  iframeAction={iframeAction}
                  setTwitterColor={setTwitterColor}
                  twitterColor={twitterColor}
                  twiterGetApi={twiterGetApi}
                  errorfounder={errorfounder}
                  newData={newData}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
     
    </React.Fragment>
  );
};

export default Dashboard;
