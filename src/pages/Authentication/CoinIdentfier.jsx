import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardTitle, Col, CardHeader, Row } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
//Import Breadcrumb
// import Breadcrumbs from "../../components/Common/Breadcrumb"
import "../../pages/Dashboard/index.css"
import CoinIdentfierModel from '../CustomModels/CoinIdentfierModel';
import { APIURL } from '../../Utilitiess/Const';
// D:\gaurav\office work\twitter-binance-react-app\src\pages\Dashboard\index.css
const CoinIdentfier = () => {
    const [coinApiData, setCoinApiData] = useState({
        symbol: "",
        search_terms: ""

    })
    const [coinIdentifers, setCoinIdentifers] = useState([])
    const [formErrors, setFormErrors] = useState({});
    const [editCoinIdentifers, setEditCoinIdentifers] = useState({
        symbol: "",
        search_terms: ""
    });
    const [storeDeleteid, setStoreDeleteid] = useState(null);
    const [storeEditId, setStoreEditId] = useState(null);
    const [ChangeToEdit, setChangeToEdit] = useState(true);


    // Modal open state
    const [modal, setModal] = useState(false);
    const toggles = (id) => {
        // console.log("idssss", id)
        setStoreDeleteid(id)
        setModal(!modal)
    };
    const getCoinHandler = () => {
        const authId = JSON.parse(localStorage.getItem("authUser"))
        const token = localStorage.getItem("accessToken")
        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: {
                'Authorization': token
            }
        };
        // fetch(`http://18.169.95.14:3000/${authId.uid}/identifers`, requestOptions)
        fetch(`${APIURL}/user/${authId.uid}/identifers`, requestOptions)
            .then(response => response.json())
            .then(result => {
                // console.log("result", result);
                setCoinIdentifers(result.body)
                // setRestorebalanceData(result.body.USDT.total)
            })
        // .catch(error => console.log('error', error));
    }
    useEffect(() => {
        getCoinHandler();
    }, [])


    // console.log("coinIdentifers", coinIdentifers)
    const ApiChangeHandler = (e) => {
        const name = e.target.name
        const value = e.target.value
        setCoinApiData({ ...coinApiData, [name]: value })

    }
    // console.log("coinApiData", coinApiData)


    const updateApi = (e) => {
        e.preventDefault()
        // console.log("validate(apiUpdate)", validate(coinApiData))
        if (Object.keys(validate(coinApiData)).length > 0) {
            setFormErrors(validate(coinApiData))
            return
        }
        setFormErrors({})
        // console.log("innnnnnnnnnnnnnn")
        const authId = JSON.parse(localStorage.getItem("authUser"))
        const token = localStorage.getItem("accessToken")
        const formData = new FormData()
        formData.append("symbol", coinApiData.symbol)
        formData.append("search_terms", coinApiData.search_terms)
        formData.append("id", authId.uid)
        // console.log("formDatass", formData)

        var requestOptions = {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': token
            }
        }

        // fetch("http://18.169.95.14:3000/user/coinindentifier", requestOptions)
        fetch(`${APIURL}/user/coinindentifier`, requestOptions)
            .then(response => response.json())
            .then(result => {
                // console.log('put', result)
                if (result.error) {
                    toast.error(result.msg)
                    return
                }
                toast.success(result.msg)
                setCoinApiData({
                    symbol: "",
                    search_terms: ""
                })
                getCoinHandler();
            })
            .catch(error => console.log('error', error));


    }



    const validate = (values) => {
        const errors = {}
        if (!values.symbol.trim()) {
            errors.symbol = "Symbol is required";
        }
        if (!values.search_terms.trim()) {
            errors.search_terms = "Search Terms is required";
        }
        return errors
    }
    const editEventClick = (id) => {
        // console.log("idddddddd", id)
        setChangeToEdit(false)
        setStoreEditId(id)
        const authId = JSON.parse(localStorage.getItem("authUser"))
        const token = localStorage.getItem("accessToken")
        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: {
                'Authorization': token
            }
        };
        fetch(`${APIURL}/user/${authId.uid}/identifier/${id}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                 console.log("resultresult", result);
                setEditCoinIdentifers(result.body)
                // setRestorebalanceData(result.body.USDT.total)
            })
            .catch(error => console.log('error', error));

    }

    


    const editCoin = (e) => {
        e.preventDefault()
        // console.log("validate(apiUpdate)", validate(editCoinIdentifers))
        if (Object.keys(validate(editCoinIdentifers)).length > 0) {
            setFormErrors(validate(editCoinIdentifers))
            return
        }
        setFormErrors({})
        // console.log("innnnnnnnnnnnnnn")
        const authId = JSON.parse(localStorage.getItem("authUser"))
        const token = localStorage.getItem("accessToken")
        const formData = new FormData()
        formData.append("symbol", editCoinIdentifers.symbol)
        formData.append("search_terms", editCoinIdentifers.search_terms)
        formData.append("id", authId.uid)
        // console.log("formDatass", formData)

        var requestOptions = {
            method: 'PUT',
            body: formData,
            headers: {
                'Authorization': token
            }
        }


        fetch(` ${APIURL}/user/${authId.uid}/identifier/${storeEditId}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                // console.log('put', result)
                if (result.error) {
                    toast.error(result.msg)
                    return
                }
                toast.success(result.msg)
                setEditCoinIdentifers({
                    symbol: "",
                    search_terms: ""
                })
                setStoreEditId(null)
                setChangeToEdit(true)
                getCoinHandler();
            })
            .catch(error => console.log('error', error));



    }

    const CIdentfierChangeHandler = (e) => {
        // console.log("innn", e.target.name, e.target.value)
        setEditCoinIdentifers(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }













    return (
        <React.Fragment>
            <Row>
                {ChangeToEdit ?
                    <Col xl={12} lg={12} >

                        <Card style={{ marginTop: "70px" }}>
                            <CardBody>
                                <h3> Coin Identifer (Add)</h3>
                                <form >

                                    <div className="form-row ">
                                        <div className="form-group ">
                                            <label htmlFor="inputEmail4">Symbol</label>
                                            <input type="text" name='symbol' className="form-control" onChange={ApiChangeHandler} value={coinApiData.symbol} />
                                            <p className='text-danger'>{formErrors.symbol}</p>
                                        </div>
                                        <div className="form-group ">
                                            <label htmlFor="inputEmail4">Search Terms</label>
                                            <input type="text" name='search_terms' className="form-control" onChange={ApiChangeHandler} value={coinApiData.search_terms} />
                                        </div>
                                        <p className='text-danger'>{formErrors.search_terms}</p>
                                    </div>
                                    <button type="submit" className="btn btn-primary mt-2" onClick={updateApi}>Submit</button>
                                </form>


                            </CardBody>
                        </Card>
                    </Col>
                    :
                    <Col xl={12} lg={12} >

                        <Card style={{ marginTop: "70px" }}>

                            <CardBody>
                                <h3> Coin Identifer (Edit)</h3>
                                <form >

                                    <div className="form-row ">
                                        <div className="form-group ">
                                            <label htmlFor="inputEmail4">Symbol</label>
                                            <input type="text" name='symbol' className="form-control" onChange={CIdentfierChangeHandler} value={editCoinIdentifers.symbol} />
                                            <p className='text-danger'>{formErrors.symbol}</p>
                                        </div>
                                        <div className="form-group ">
                                            <label htmlFor="inputEmail4">Search Terms</label>
                                            <input type="text" name='search_terms' className="form-control" onChange={CIdentfierChangeHandler} value={editCoinIdentifers.search_terms} />
                                        </div>
                                        <p className='text-danger'>{formErrors.search_terms}</p>
                                    </div>
                                    <button type="submit" className="btn btn-primary mt-2" onClick={editCoin}>{!ChangeToEdit ? 'Update' : 'Submit'}</button>
                                    {!ChangeToEdit && <button type="button" className='btn btn-danger mx-2 mt-2' onClick={() => { setChangeToEdit(true) }}> Back</button>}
                                </form>


                            </CardBody>
                        </Card>
                    </Col>}
                <Col>
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                <h3>Coin Identifer Listing</h3>
                            </CardTitle>
                        </CardHeader>
                        <CardBody>
                            <div className="table-rep-plugin">
                                <div
                                    className="table-responsive mb-0"
                                    data-pattern="priority-columns"
                                >
                                    <Table
                                        id="tech-companies-1"
                                        className="table table-striped table-bordered"

                                    >
                                        <Thead>
                                            <Tr>
                                                <Th data-priority="1">Id</Th>
                                                <Th data-priority="1">Symbol</Th>
                                                <Th data-priority="3">Search Terms</Th>
                                                <Th data-priority="3" className="">Actions</Th>


                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {!coinIdentifers ? <h1 className='text-center m-5'>  No Data available</h1> : coinIdentifers.map((element, index) => {
                                                return (
                                                    <Tr key={index} >
                                                        <Td>{element.id}</Td>
                                                        <Td>{element.symbol}</Td>
                                                        <Td>{element.search_terms}</Td>
                                                        <Td>
                                                            <div className='d-flex '>

                                                                <i className='bx bx-edit h3 text-primary edite_delete' onClick={(id) => editEventClick(element.id)}></i>
                                                                <i className='bx bxs-trash h3 text-danger edite_delete_delete' onClick={(id) => toggles(element.id)}></i>
                                                            </div>
                                                        </Td>
                                                    </Tr>
                                                )
                                            })}

                                        </Tbody>
                                    </Table>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                {modal && <CoinIdentfierModel
                    setModal={setModal}
                    storeDeleteid={storeDeleteid}
                    getCoinHandler={getCoinHandler}
                />}

            </Row>

            <ToastContainer />
        </React.Fragment>
    )
}

export default CoinIdentfier