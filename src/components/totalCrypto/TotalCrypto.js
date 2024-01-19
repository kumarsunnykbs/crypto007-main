import React from 'react'
import { Col } from 'reactstrap'

const TotalCrypto = (props) => {


  return (
    <>
    <Col className='border bg-light mt-3'>
    <div className="d-flex align-items-center">
        <div className="p-2 ">Total</div>
        <div className="ms-auto p-2  font-weight-bold">
            {!props.initialState && props.symbolPairValue === "USDT" ?
                <div className="p-2 bd-highlight">
                 <div className='ml-3'>   <input type="number" id="30" className='bg-light' style={{ border: "none", width: "52%" }} value={props.inputValue} />
                    {props.symbolPairValue} </div>
                </div> : !props.initialState ?
                    <div className="p-2 bd-highlight">
                        <input type="number" id="32" className='bg-light' onChange={props.inputchangeHandler} style={null} value={props.inputValue} min="0" max={props.userBalanceDataUsd} />
                        {props.symbolPairValue}
                    </div> : null
            }
            {props.initialState && <div className="p-2 bd-highlight">0.00</div>}
        </div>
    </div>

</Col>
    </>
  )
}

export default TotalCrypto