import React from 'react'
import Slider from 'react-rangeslider'

const SliderComp = (obj) => {

    
    // console.log("obj.volume",obj.volume)

    return (
        <>
            <div id='07' className='slidecontainer'>
                {!obj.initialState && obj.symbolPairValue === "USDT" ?
                    <Slider
                        value={obj.volume}
                        orientation="horizontal"
                        onChange={obj.handleOnChange}
                        tooltip={false}
                        labels={{ [obj.volume]: `${obj.volume}%` }}
                    />
                    : !obj.initialState ? <Slider
                        value={obj.volume}
                        orientation="horizontal"
                        onChange={obj.handleOnChange}
                        tooltip={false}
                        labels={{ [obj.volume]: `${obj.volume}%` }}
                    /> : null}
                {obj.initialState && <Slider
                    value={obj.volume}
                    orientation="horizontal"
                    onChange={obj.handleOnChange}
                    tooltip={false}
                    labels={{ 0: '0%' }}
                />}

            </div>

            <br />

            {!obj.initialState && obj.isFuture && <div>
                <div style={{ borderTop: "1px solid #9f9393", marginTop: '10px', fontSize: '20px' }}>
                    Max account leverage
                </div>
            
                <Slider
                    min={0}
                    max={20}
                    step={4}
                    value={obj.leverageNum}
                    orientation="horizontal"
                    onChange={obj.handleOnChangeLeverage}
                    tooltip={false}
                    labels={{ 0: '1x', 4: '2x', 8: '3x', 12: '5x', 16: '10x', 20: '20x' }}
                />
            </div>}

            <button type='button' className='btn btn-primary btn-lg waves-effect waves-light mt-3' onClick={obj.BuyNow}>
                Buy {!obj.initialState ? obj.symbolPairCoin : ""}
            </button>

        </>
    )
}

export default SliderComp