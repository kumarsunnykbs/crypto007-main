import React, { useEffect, useState } from 'react'
import { Slider } from "@material-ui/core";

const SliderComp = (obj) => {
    const [val, setVal] = useState([0, 20]);
       
    // console.log("obj.volume",obj.volume)
    const gfg = [
        {
        value: 0,
        label: "1x",
        },//marks={{ 0: '1x', 4: '2x', 8: '3x', 12: '5x', 16: '10x', 20: '20x' }}
        {
        value: 4,
        label: "2x",
        },
        {
        value: 8,
        label: "3x",
        },
        {
        value: 12,
        label: "5x",
        },
        {
            value: 16,
            label: "10x",
            },
            {
                value: 20,
                label: "20x",
                },
    ];
    return (
        <>
            <div id='07' className='slidecontainer mt-5'>
                {!obj.initialState && obj.symbolPairValue === "USDT" ?
                    <Slider
                        value={obj.volume}
                        orientation="horizontal"
                        onChange={obj.handleOnChange}
                        tooltip={false}
                        valueLabelDisplay="on"
                        defaultValue={0}
                    />
                    : !obj.initialState ? <Slider
                        value={obj.volume}
                        valueLabelDisplay="on"
                        orientation="horizontal"
                        onChange={obj.handleOnChange}
                        tooltip={false}
                        defaultValue={0}
                    /> : null}
                {obj.initialState && <Slider
                    value={obj.volume}
                    orientation="horizontal"
                    onChange={obj.handleOnChange}
                    tooltip={false}
                    valueLabelDisplay="on"
                    defaultValue={0}
                />}

            </div>

            <br />

            {!obj.initialState && obj.isFuture && <div>
                <div style={{ borderTop: "1px solid #9f9393", marginTop: '10px', fontSize: '20px' }}>
                    Max account leverage
                </div>
               
                <Slider
                   
                    value={obj.leverageNum}
                    step={4}
                    min={0}
                    max={20}
                    onChange={obj.handleOnChangeLeverage}
                    // marks={{ 0: '1x', 4: '2x', 8: '3x', 12: '5x', 16: '10x', 20: '20x' }}
                    marks={gfg}
                />
            </div>}


            <button type='button' className='btn btn-primary btn-lg waves-effect waves-light mt-3' onClick={obj.BuyNow}>
                Buy {!obj.initialState ? obj.symbolPairCoin : ""}
            </button>


        </>
    )
}

export default SliderComp