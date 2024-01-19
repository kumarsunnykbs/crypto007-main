import React, { useEffect, useState } from 'react';
import { TabContent, TabPane, Card, Col, CardBody, Row } from 'reactstrap';
import classnames from 'classnames';
import { ToastContainer, toast } from 'react-toastify';
import "../Dashboard/index.css";
import SliderComp from '../../components/sliderComp/SliderComp';
import MarkitNav from '../../components/MarketNav/MarkitNav';
import BorrowNavbar from '../../components/tradNav/BorrowNavbar';
import { APIURL } from '../../Utilitiess/Const';
import DemoSlider from './DemoSlider';
const Trading = (props) => {


    const [activeTab, setActiveTab] = useState('2');
    const percentVolume = (Number(props.userBalanceDataUsd) / Number(props.userBalanceDataUsd)) * 100
    const percentVolumeUsdt = (Number(props.userBalanceDataUsdt) / Number(props.userBalanceDataUsdt)) * 100

    const [volume, setVolume] = useState();
    const [inputValue, setInputValue] = useState('')
    const [isInputDataTouch, setIsInputDataTouch] = useState(false);
    //  const [rangeValue, setRangeValue] = useState('')
    // const [rangeChangedValue, setRangeChangedValue] = useState(null)
    const [leverageVal, setLeverageVal] = useState('')
    const [leverageNum, setLeverageNum] = useState(0)


    useEffect(() => {
        if (props.apiSymbol && props.apiSymbol.includes('USDT')) {
            setInputValue(props.userBalanceDataUsdt)
            setVolume(percentVolumeUsdt)
        } else {
            setInputValue(props.userBalanceDataUsd)
            setVolume(percentVolume)
        }
        setLeverageVal(props.leverage_limit_max)
    }, [props.userBalanceDataUsd, props.apiSymbol, props.userBalanceDataUsdt]);

    const handleOnChange = (e, value) => {

        setVolume(value);
        setInputValue(convertPercentToBalance(value))
    }

    const handleOnChangeLeverage = (e, value) => {
        setLeverageNum(value)

    }

    const inputchangeHandler = (e, fromInput = false) => {
        let maxAmt = props.userBalanceDataUsdt
        if (props.isFuture) {
            maxAmt = props.userBalanceDataUsd
        }


        if (Number(e.target.value) > Number(maxAmt)) {
            toast.error("Check amount entered (Amount is too high)")
            return
        }


        setInputValue(e.target.value)
        if (fromInput) {
            if (props.isFuture) {
                setVolume(((Number(e.target.value) / Number(props.userBalanceDataUsd)) * 100).toFixed(2))
            }
            else {
                // working8
                setVolume(((Number(e.target.value) / Number(props.userBalanceDataUsdt)) * 100).toFixed(2))
            }

        }

    }

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    const [activeTab1, setActiveTab1] = useState('4');
    const toggless = tab => {
        if (activeTab1 !== tab) setActiveTab1(tab);
    }

    const convertPercentToBalance = (value) => {

        if (props.apiSymbol && props.apiSymbol.includes('USDT')) {
            return ((value / 100) * props.userBalanceDataUsdt).toFixed(2);
        } else
            return ((value / 100) * props.userBalanceDataUsd).toFixed(2);
    }

    const [inputdata, setInputData] = useState('')

    useEffect(() => {
        if (Number(activeTab) === 2) {
            setInputData('')
            setIsInputDataTouch(false)
            return;
        }
        if (props.apiSymbol && props.apiSymbol.includes('USDT')) {
            let isSet = false;
            for (let ele of props.spot) {
                if (props.apiSymbol === ele.symbol_pair) {
                    isSet = true;
                    setInputData(ele.price)
                    break;
                }
            }
            if (!isSet) {
                setInputData('')
                setIsInputDataTouch(false)
            }
        } else {
            let isSet = false;
            for (let ele of props.future) {
                if (props.apiSymbol === ele.symbol_pair) {
                    isSet = true;
                    setInputData(ele.price)
                    break;
                }
            }
            if (!isSet) {
                setInputData('')
                setIsInputDataTouch(false)
            }
        }
    }, [props.future, props.spot, props.F, props.userBalanceDataUsd, activeTab])

    const chnageHandler = (e) => {
        setIsInputDataTouch(true);
        setInputData(e.target.value)
    }



    const BuyNow = () => {


        if (!props.apiSymbol) {
            toast.error("Select coin")
            return
        }

        let type = "market";

        if (Number(activeTab) === 1) {
            type = "limit";
        } else if (Number(activeTab) === 3) {
            type = "stop-limit";
        }


        const authId = JSON.parse(localStorage.getItem("authUser"))
        const token = localStorage.getItem("accessToken")
        const obj = {
            id: authId.uid,
            volume: inputdata ? inputdata : inputValue,
            price: inputValue,
            pair: props.apiSymbol,
            type: type,
            future: props.isFuture ? true : false


        }

        if (!props.initialState && props.isFuture) {
            if (leverageNum === 0) {
                obj.leverage_value = leverageNum + 1
            }
            else if (leverageNum === 4) {
                obj.leverage_value = leverageNum - 2
            }
            else if (leverageNum === 8) {
                obj.leverage_value = leverageNum - 5
            }
            else if (leverageNum === 12) {
                obj.leverage_value = leverageNum - 7
            }
            else if (leverageNum === 16) {
                obj.leverage_value = leverageNum - 6
            }
            else if (leverageNum === 20) {
                obj.leverage_value = leverageNum
            }


        }


        var requestOptions = {
            method: 'POST',

            body: JSON.stringify(obj),
            headers: {
                'Authorization': token,
                'Content-type': 'application/json',
            }
        };

        fetch(`${APIURL}/buy-order`, requestOptions)
            .then(response => response.json())
            .then(result => {

                if (result.error === true) {
                    toast.error(result.msg)


                    return
                }
                toast.success(result.msg)
                setIsInputDataTouch(false)
                setInputData('')
                props.setRefreshDataNow(prev => !prev)



            })
            .catch(error => console.log('error', error));

    }

    const sliderObj = {
        symbolPairValue: props.symbolPairValue,
        initialState: props.initialState,
        volume: volume,
        handleOnChange: handleOnChange,
        handleOnChangeLeverage: handleOnChangeLeverage,
        leverageNum: leverageNum,
        leverageVal: leverageVal,
        symbolPairCoin: props.symbolPairCoin,
        BuyNow: BuyNow,
        isFuture: props.isFuture
    }

    const markitObj = {
        activeTab: activeTab,
        toggle: toggle
    }
    const borrowobj = {
        classnames: classnames,
        activeTab1: activeTab1,
        toggless: toggless

    }

    return (
        <React.Fragment>
            <Col xl={7}>
                <Card className=' mt-4'>
                    <MarkitNav {...markitObj} />
                    <div className='impo'>
                        <CardBody>
                            <TabContent activeTab={activeTab}>
                                <TabPane tabId="1">
                                    <div>
                                        <div>
                                            <Row>
                                                <Col >
                                                    <div>
                                                        <BorrowNavbar {...borrowobj} />

                                                        <TabContent activeTab={activeTab1} className="mt-5">
                                                            <TabPane tabId="4">
                                                                <Row>
                                                                    <Col className='border bg-light mt-3'>

                                                                        <div className="d-flex">
                                                                            <div className="p-2 bd-highlight">
                                                                                <input type="number" id="29" value={inputdata} disabled={Number(activeTab) === 2} className='bg-light form-control' style={Number(activeTab) === 2 ? { border: 'none' } : isInputDataTouch && !inputdata ? { border: "2px solid red" } : null} onChange={chnageHandler} required />
                                                                                {isInputDataTouch && !inputdata && <p style={{ color: 'red ' }}>Please Fill the Field</p>}
                                                                            </div>
                                                                            <div className="ms-auto p-2 bd-highlight font-weight-bold">

                                                                                <p className='usdtcolour'>  Limit {!props.initialState ? props.symbolPairCoin : ""}</p>
                                                                            </div>
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col className='border bg-light mt-3'>
                                                                        <div className="d-flex align-items-center">
                                                                            <div className="p-2 ">Total</div>
                                                                            <div className="ms-auto p-2  font-weight-bold">
                                                                                {!props.initialState && props.symbolPairValue === "USDT" ?
                                                                                    <div className="p-2 bd-highlight">

                                                                                        <input type="number" id="7" className='bg-light' style={{ border: "none", width: "52px" }} value={inputValue} onChange={(e) => inputchangeHandler(e, true)} min="0" max={props.userBalanceDataUsdt} />
                                                                                        {props.symbolPairValue}
                                                                                    </div> : !props.initialState ?
                                                                                        <div className="p-2 bd-highlight">
                                                                                            <input type="number" id="32" className='bg-light' onChange={(e) => inputchangeHandler(e, true)} style={null} value={inputValue} min="0" max={props.userBalanceDataUsd} />
                                                                                            {props.isFuture ? 'USD' : props.symbolPairValue}
                                                                                        </div> : null
                                                                                }
                                                                                {props.initialState && <div className="p-2 bd-highlight">0.00</div>}
                                                                            </div>
                                                                        </div>

                                                                    </Col>


                                                                </Row>
                                                                <SliderComp {...sliderObj} />
                                                            </TabPane>

                                                            <TabPane tabId="5">
                                                                <Row>
                                                                    <Col className='border bg-light mt-3'>

                                                                        <div className="d-flex">
                                                                            <div className="p-2 bd-highlight">

                                                                                <input type="number" id="33" className='bg-light form-control' style={Number(activeTab) === 2 ? { border: 'none' } : isInputDataTouch && !inputdata ? { border: "2px solid red" } : null} onChange={chnageHandler} value={inputdata} disabled={Number(activeTab) === 2} required />
                                                                                {isInputDataTouch && !inputdata && <p style={{ color: 'red ' }}>Please Fill the Field</p>}
                                                                            </div>
                                                                            <div className="ms-auto p-2 bd-highlight font-weight-bold">

                                                                                <p className='usdtcolour'>  Limit {!props.initialState ? props.symbolPairCoin : ""}</p>
                                                                            </div>
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col className='border bg-light mt-3'>

                                                                        <div className="d-flex align-items-center">
                                                                            <div className="p-2 ">Total</div>

                                                                            <div className="ms-auto p-2  font-weight-bold">
                                                                                {!props.initialState && props.symbolPairValue === "USDT" ?
                                                                                    <div className="p-2 bd-highlight">

                                                                                        <input type="number" id="7" className='bg-light' style={{ border: "none", width: "52px" }} value={inputValue} onChange={(e) => inputchangeHandler(e, true)} min="0" max={props.userBalanceDataUsdt} />
                                                                                        {props.symbolPairValue}
                                                                                    </div> : !props.initialState ?
                                                                                        <div className="p-2 bd-highlight">
                                                                                            <input type="number" id="35" className='bg-light' style={null} value={inputValue} onChange={(e) => inputchangeHandler(e, true)} min="0" max={props.userBalanceDataUsd} />
                                                                                            {props.isFuture ? 'USD' : props.symbolPairValue}
                                                                                        </div> : null
                                                                                }
                                                                                {props.initialState && <div className="p-2 bd-highlight">0.00</div>}
                                                                            </div>


                                                                        </div>

                                                                    </Col>


                                                                </Row>

                                                                <SliderComp {...sliderObj} />
                                                            </TabPane>
                                                            <TabPane tabId="6">
                                                                <Row>
                                                                    <Col className='border bg-light mt-3'>

                                                                        <div className="d-flex">
                                                                            <div className="p-2 bd-highlight">
                                                                                {/* <input type="number" className='bg-light' style={null} value={inputValue} onChange={inputchangeHandler} min="0" max={props.userBalanceDataUsd} /> */}
                                                                                <input type="number" id="1" className='bg-light form-control' style={Number(activeTab) === 2 ? { border: 'none' } : isInputDataTouch && !inputdata ? { border: "2px solid red" } : null} onChange={chnageHandler} value={inputdata} disabled={Number(activeTab) === 2} required />
                                                                                {isInputDataTouch && !inputdata && <p style={{ color: 'red ' }}>Please Fill the Field</p>}
                                                                            </div>
                                                                            <div className="ms-auto p-2 bd-highlight font-weight-bold">

                                                                                <p className='usdtcolour'>  Limit {!props.initialState ? props.symbolPairCoin : ""}</p>
                                                                            </div>
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col className='border bg-light mt-3'>

                                                                        <div className="d-flex align-items-center">
                                                                            <div className="p-2 ">Total</div>

                                                                            <div className="ms-auto p-2  font-weight-bold">
                                                                                {!props.initialState && props.symbolPairValue === "USDT" ?
                                                                                    <div className="p-2 bd-highlight">
                                                                                        <input type="number" id="7" className='bg-light' style={{ border: "none", width: "52px" }} value={inputValue} onChange={(e) => inputchangeHandler(e, true)} min="0" max={props.userBalanceDataUsdt} />
                                                                                        {props.symbolPairValue}
                                                                                    </div> : !props.initialState ?
                                                                                        <div className="p-2 bd-highlight">
                                                                                            <input type="number" id="3" className='bg-light' style={null} value={inputValue} onChange={(e) => inputchangeHandler(e, true)} min="0" max={props.userBalanceDataUsd} />
                                                                                            {props.isFuture ? 'USD' : props.symbolPairValue}
                                                                                        </div> : null
                                                                                }
                                                                                {props.initialState && <div className="p-2 bd-highlight">0.00</div>}
                                                                            </div>


                                                                        </div>

                                                                    </Col>


                                                                </Row>

                                                                <SliderComp {...sliderObj} />

                                                            </TabPane>
                                                        </TabContent>
                                                    </div>

                                                </Col>
                                            </Row>



                                        </div>

                                    </div>



                                </TabPane>
                                <TabPane tabId="2">
                                    <div>
                                        <div>
                                            <Row>
                                                <Col >
                                                    <div>
                                                        <BorrowNavbar {...borrowobj} />
                                                        <TabContent activeTab={activeTab1} className="mt-5">
                                                            <TabPane tabId="4">

                                                                <Row>
                                                                    <Col className='border bg-light mt-3'>

                                                                        <div className="d-flex">
                                                                            <div className="p-2 bd-highlight">
                                                                                {/* <input type="number" className='bg-light' style={null} value={inputValue} onChange={inputchangeHandler} min="0" max={props.userBalanceDataUsd} /> */}
                                                                                <input type="number" id="5" className='bg-light form-control' style={Number(activeTab) === 2 ? { border: 'none' } : isInputDataTouch && !inputdata ? { border: "2px solid red" } : null} onChange={chnageHandler} value={inputdata} disabled={Number(activeTab) === 2} required />
                                                                                {/* {isInputDataTouch && !inputdata && <p style={{ color: 'red ' }}>Please Fill the Field</p>} */}
                                                                            </div>
                                                                            <div className="ms-auto p-2 bd-highlight font-weight-bold">

                                                                                <p className='usdtcolour'> Market {!props.initialState ? props.symbolPairCoin.includes('PERP') ? props.symbolPairCoin.replace('-PERP', '') : props.symbolPairCoin : ""}</p>
                                                                            </div>
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col className='border bg-light mt-3'>

                                                                        <div className="d-flex align-items-center">
                                                                            <div className="p-2 ">Total</div>
                                                                            <div className="ms-auto p-2  font-weight-bold">

                                                                                {!props.initialState && props.symbolPairValue === "USDT" ?
                                                                                    <div className="p-2 bd-highlight">
                                                                                        <input type="number" id="7" className='bg-light' style={{ border: "none", width: "52px" }} value={inputValue} onChange={(e) => inputchangeHandler(e, true)} min="0" max={props.userBalanceDataUsdt} />

                                                                                        {props.symbolPairValue}
                                                                                    </div> : !props.initialState ?
                                                                                        <div className="p-2 bd-highlight">
                                                                                            {/* hear */}
                                                                                            <input type="number" id="8" className='bg-light' style={null} value={inputValue} onChange={(e) => inputchangeHandler(e, true)} min="0" max={props.userBalanceDataUsd} />
                                                                                            {props.isFuture ? 'USD' : props.symbolPairValue}
                                                                                        </div> : null
                                                                                }
                                                                                {props.initialState && <div className="p-2 bd-highlight">0.00</div>}
                                                                            </div>


                                                                        </div>

                                                                    </Col>

                                                                </Row>

                                                                <SliderComp {...sliderObj} />

                                                            </TabPane>

                                                            <TabPane tabId="5">
                                                                <Row>
                                                                    <Col className='border bg-light mt-3'>

                                                                        <div className="d-flex">
                                                                            <div className="p-2 bd-highlight">
                                                                                {/* <input type="number" className='bg-light' style={null} value={inputValue} onChange={inputchangeHandler} min="0" max={props.userBalanceDataUsd} /> */}
                                                                                <input type="number" id="9" className='bg-light form-control' style={Number(activeTab) === 2 ? { border: 'none' } : isInputDataTouch && !inputdata ? { border: "2px solid red" } : null} onChange={chnageHandler} value={inputdata} disabled={Number(activeTab) === 2} required />
                                                                                {isInputDataTouch && !inputdata && <p style={{ color: 'red ' }}>Please Fill the Field</p>}
                                                                            </div>
                                                                            <div className="ms-auto p-2 bd-highlight font-weight-bold">

                                                                                <p className='usdtcolour'>  Market {!props.initialState ? props.symbolPairCoin : ""}</p>
                                                                            </div>
                                                                        </div>
                                                                    </Col>
                                                                </Row>

                                                                <Row>
                                                                    <Col className='border bg-light mt-3'>

                                                                        <div className="d-flex align-items-center">
                                                                            <div className="p-2 ">Total</div>

                                                                            <div className="ms-auto p-2 font-weight-bold">
                                                                                {!props.initialState && props.symbolPairValue === "USDT" ?
                                                                                    <div className="p-2 bd-highlight">
                                                                                        <input type="number" id="7" className='bg-light' style={{ border: "none", width: "52px" }} value={inputValue} onChange={(e) => inputchangeHandler(e, true)} min="0" max={props.userBalanceDataUsdt} />
                                                                                        {props.symbolPairValue}
                                                                                    </div> : !props.initialState ?
                                                                                        <div className="p-2 bd-highlight">
                                                                                            <input type="number" id="11" className='bg-light' style={null} value={inputValue} onChange={(e) => inputchangeHandler(e, true)} min="0" max={props.userBalanceDataUsd} />
                                                                                            {props.isFuture ? 'USD' : props.symbolPairValue}


                                                                                        </div> : null
                                                                                }
                                                                                {props.initialState && <div className="p-2 bd-highlight">0.00</div>}
                                                                            </div>


                                                                        </div>
                                                                    </Col>


                                                                </Row>
                                                                <SliderComp {...sliderObj} />
                                                            </TabPane>
                                                            <TabPane tabId="6">
                                                                <Row>
                                                                    <Col className='border bg-light mt-3'>

                                                                        <div className="d-flex">
                                                                            <div className="p-2 bd-highlight">
                                                                                {/* <input type="number" className='bg-light' style={null} value={inputValue} onChange={inputchangeHandler} min="0" max={props.userBalanceDataUsd} /> */}
                                                                                <input type="number" id="14" className='bg-light form-control' style={Number(activeTab) === 2 ? { border: 'none' } : isInputDataTouch && !inputdata ? { border: "2px solid red" } : null} onChange={chnageHandler} value={inputdata} disabled={Number(activeTab) === 2} required />
                                                                                {isInputDataTouch && !inputdata && <p style={{ color: 'red ' }}>Please Fill the Field</p>}
                                                                            </div>
                                                                            <div className="ms-auto p-2 bd-highlight font-weight-bold">

                                                                                <p className='usdtcolour'>  Market {!props.initialState ? props.symbolPairCoin : ""}</p>
                                                                            </div>
                                                                        </div>
                                                                    </Col>
                                                                </Row>

                                                                <Row>
                                                                    <Col className='border bg-light mt-3'>

                                                                        <div className="d-flex align-items-center">
                                                                            <div className="p-2 ">Total</div>

                                                                            <div className="ms-auto p-2  font-weight-bold">
                                                                                {!props.initialState && props.symbolPairValue === "USDT" ?
                                                                                    <div className="p-2 bd-highlight">
                                                                                        <input type="number" id="7" className='bg-light' style={{ border: "none", width: "52px" }} value={inputValue} onChange={(e) => inputchangeHandler(e, true)} min="0" max={props.userBalanceDataUsdt} />
                                                                                        {props.symbolPairValue}
                                                                                    </div> : !props.initialState ?
                                                                                        <div className="p-2 bd-highlight">
                                                                                            <input type="number" id="16" className='bg-light' style={null} value={inputValue} onChange={(e) => inputchangeHandler(e, true)} min="0" max={props.userBalanceDataUsd} />
                                                                                            {props.isFuture ? 'USD' : props.symbolPairValue}
                                                                                        </div> : null
                                                                                }
                                                                                {props.initialState && <div className="p-2 bd-highlight">0.00</div>}
                                                                            </div>

                                                                        </div>


                                                                    </Col>


                                                                </Row>
                                                                <SliderComp {...sliderObj} />
                                                            </TabPane>
                                                        </TabContent>
                                                    </div>

                                                </Col>
                                            </Row>


                                        </div>

                                    </div>
                                </TabPane>
                                <TabPane tabId="3">
                                    <div>
                                        <div>
                                            <Row>
                                                <Col >
                                                    <div>
                                                        <BorrowNavbar {...borrowobj} />
                                                        <TabContent activeTab={activeTab1} className="mt-5">
                                                            <TabPane tabId="4">
                                                                <Row>
                                                                    <Col className='border bg-light mt-3'>

                                                                        <div className="d-flex">
                                                                            <div className="p-2 bd-highlight">

                                                                                <input type="number" id="17" className='bg- form-control' style={Number(activeTab) === 2 ? { border: 'none' } : isInputDataTouch && !inputdata ? { border: "2px solid red" } : null} onChange={chnageHandler} value={inputdata} disabled={Number(activeTab) === 2} required />
                                                                                {isInputDataTouch && !inputdata && <p style={{ color: 'red ' }}>Please Fill the Field</p>}
                                                                            </div>
                                                                            <div className="ms-auto p-2 bd-highlight font-weight-bold">

                                                                                <p className='usdtcolour'>  Spot-limit {!props.initialState ? props.symbolPairCoin : ""}</p>
                                                                            </div>
                                                                        </div>
                                                                    </Col>
                                                                </Row>

                                                                <Row>
                                                                    <Col className='border bg-light mt-3'>

                                                                        <div className="d-flex align-items-center">
                                                                            <div className="p-2 ">Total</div>

                                                                            <div className="ms-auto p-2  font-weight-bold">
                                                                                {!props.initialState && props.symbolPairValue === "USDT" ?
                                                                                    <div className="p-2 bd-highlight">
                                                                                        <input type="number" id="7" className='bg-light' style={{ border: "none", width: "52px" }} value={inputValue} onChange={(e) => inputchangeHandler(e, true)} min="0" max={props.userBalanceDataUsdt} />
                                                                                        {props.symbolPairValue}
                                                                                    </div> : !props.initialState ?
                                                                                        <div className="p-2 bd-highlight">
                                                                                            <input type="number" id="19" className='bg-light' style={null} value={inputValue} onChange={(e) => inputchangeHandler(e, true)} min="0" max={props.userBalanceDataUsd} />
                                                                                            {props.isFuture ? 'USD' : props.symbolPairValue}
                                                                                        </div> : null
                                                                                }
                                                                                {props.initialState && <div className="p-2 bd-highlight">0.00</div>}
                                                                            </div>


                                                                        </div>

                                                                    </Col>


                                                                </Row>
                                                                <SliderComp {...sliderObj} />

                                                            </TabPane>

                                                            <TabPane tabId="5">

                                                                <Row>
                                                                    <Col className='border bg-light mt-3'>

                                                                        <div className="d-flex">
                                                                            <div className="p-2 bd-highlight">

                                                                                <input type="number" id="20" className='bg-light form-control' style={Number(activeTab) === 2 ? { border: 'none' } : isInputDataTouch && !inputdata ? { border: "2px solid red" } : null} onChange={chnageHandler} value={inputdata} disabled={Number(activeTab) === 2} required />
                                                                                {isInputDataTouch && !inputdata && <p style={{ color: 'red ' }}>Please Fill the Field</p>}
                                                                            </div>
                                                                            <div className="ms-auto p-2 bd-highlight font-weight-bold">

                                                                                <p className='usdtcolour'> Spot-limit {!props.initialState ? props.symbolPairCoin : ""}</p>
                                                                            </div>
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col className='border bg-light mt-3'>

                                                                        <div className="d-flex align-items-center">
                                                                            <div className="p-2 ">Total</div>

                                                                            <div className="ms-auto p-2  font-weight-bold">
                                                                                {!props.initialState && props.symbolPairValue === "USDT" ?
                                                                                    <div className="p-2 bd-highlight">
                                                                                        <input type="number" id="7" className='bg-light' style={{ border: "none", width: "52px" }} value={inputValue} onChange={(e) => inputchangeHandler(e, true)} min="0" max={props.userBalanceDataUsdt} />

                                                                                        {props.symbolPairValue}
                                                                                    </div> : !props.initialState ?
                                                                                        <div className="p-2 bd-highlight">
                                                                                            <input type="number" id="23" className='bg-light' style={null} value={inputValue} onChange={(e) => inputchangeHandler(e, true)} min="0" max={props.userBalanceDataUsd} />
                                                                                            {props.isFuture ? 'USD' : props.symbolPairValue}
                                                                                        </div> : null
                                                                                }
                                                                                {props.initialState && <div className="p-2 bd-highlight">0.00</div>}
                                                                            </div>


                                                                        </div>

                                                                    </Col>


                                                                </Row>
                                                                <SliderComp {...sliderObj} />
                                                            </TabPane>
                                                            <TabPane tabId="6">

                                                                <Row>
                                                                    <Col className='border bg-light mt-3'>

                                                                        <div className="d-flex">
                                                                            <div className="p-2 bd-highlight">
                                                                                {/* <input type="number" className='bg-light' style={null} value={inputValue} onChange={inputchangeHandler} min="0" max={props.userBalanceDataUsd} /> */}
                                                                                <input type="number" id="24" className='bg-light form-control' style={Number(activeTab) === 2 ? { border: 'none' } : isInputDataTouch && !inputdata ? { border: "2px solid red" } : null} onChange={chnageHandler} value={inputdata} disabled={Number(activeTab) === 2} required />
                                                                                {isInputDataTouch && !inputdata && <p style={{ color: 'red ' }}>Please Fill the Field</p>}
                                                                            </div>
                                                                            <div className="ms-auto p-2 bd-highlight font-weight-bold">

                                                                                <p className='usdtcolour'>  Spot-limit {!props.initialState ? props.symbolPairCoin : ""}</p>
                                                                            </div>
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col className='border bg-light mt-3'>

                                                                        <div className="d-flex align-items-center">
                                                                            <div className="p-2 ">Total</div>

                                                                            <div className="ms-auto p-2  font-weight-bold">
                                                                                {!props.initialState && props.symbolPairValue === "USDT" ?
                                                                                    <div className="p-2 bd-highlight">
                                                                                        <input type="number" id="7" className='bg-light' style={{ border: "none", width: "52px" }} value={inputValue} onChange={(e) => inputchangeHandler(e, true)} min="0" max={props.userBalanceDataUsdt} />
                                                                                        {props.symbolPairValue}
                                                                                    </div> : !props.initialState ?
                                                                                        <div className="p-2 bd-highlight">
                                                                                            <input type="number" id="28" className='bg-light' style={null} value={inputValue} onChange={(e) => inputchangeHandler(e, true)} min="0" max={props.userBalanceDataUsd} />
                                                                                            {props.isFuture ? 'USD' : props.symbolPairValue}
                                                                                        </div> : null
                                                                                }
                                                                                {props.initialState && <div className="p-2 bd-highlight">0.00</div>}
                                                                            </div>
                                                                        </div>
                                                                    </Col>
                                                                </Row>

                                                                <SliderComp {...sliderObj} />
                                                            </TabPane>
                                                        </TabContent>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                </TabPane>
                            </TabContent>
                        </CardBody>
                    </div>

                </Card>
            </Col>
            <ToastContainer />
        </React.Fragment>
    );
}

export default Trading;