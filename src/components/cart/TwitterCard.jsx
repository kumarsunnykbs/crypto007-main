// import { findIndex } from 'lodash';
import React, { useEffect } from 'react';
import {
    Card, CardBody,
    CardTitle
} from 'reactstrap';
import Twitter_Logo_Blue from '../../assets/images/Twitter_Logo_Blue.png'
// src\pages\Dashboard\index.css
import '../../pages/Dashboard/index.css'
const TwitterCard = (props) => {
    useEffect(() => {
        let data = props.obj.text

        let firstIndex = data.indexOf('http')

        let firstUrl = data.slice(firstIndex)
        props.obj.urlData = []
        let newArr = []
        if (firstIndex) {

            if (firstUrl.split('\n').length > 0) {

                firstUrl.split('\n').forEach(ele => {
                    if (ele.includes(' ')) {
                        ele.split(' ').forEach(ele1 => {
                            if (ele1.startsWith('http')) {
                                newArr.push(ele1)
                            }
                        })
                    } else {
                        if (ele.startsWith('http')) {
                            newArr.push(ele)
                        }
                    }
                })
            } else {

                firstUrl.split(' ').forEach(ele => {
                    if (ele.startsWith('http')) {
                        newArr.push(ele)
                    }
                })
            }
        }
        props.obj.urlData = [...newArr]

    }, [props.obj])
    const monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', "Aug", 'Sept', 'Oct', 'Nov', 'Dec']
    const { obj } = props
    const appendZero = (val) => {
        return val < 10 ? `0${val}` : val
    }
    const formatDate = (date, fromSocket) => {
        if (fromSocket) {

            const newDate = new Date(date)
            return `${appendZero(newDate.getHours())}:${appendZero(newDate.getMinutes())} . ${monthArr[newDate.getMonth()]} ${newDate.getDate()}, ${newDate.getFullYear()}`
        }
        const newDate = new Date(date).toUTCString();
        let newDateArr = newDate.split(' ')
        return `${newDateArr[4].slice(0, -3)} ${newDateArr[2]} ${newDateArr[1]} ${newDateArr[3]}`
        // return `${appendZero(newDate.getHours())}:${appendZero(newDate.getMinutes())} . ${monthArr[newDate.getMonth()]} ${newDate.getDate()}, ${newDate.getFullYear()}`
    }

    const viewData = (data) => {
        let findIndex = data.indexOf(('http'))
        if (findIndex > 0) {
            return data.slice(0, findIndex)
        }
        return data;
    }
    // console.log("obj.text",viewData(obj.text))

    return (
        <div>
            <Card style={props.twitterColor === obj.id ? { backgroundColor: '#e9e9ef' } : {}} className={`${obj.className ? 'new_data' : ''}`}>
                <CardBody>

                    <div className='d-flex align-items-center' onClick={() => props.findcoin(obj)} >
                        <img src={obj.profile_img} alt="fdfd" height={60} width={60} className="rounded-circle" />
                        <div className='m-2' >
                            <a href={`https://twitter.com/${obj.username}`} rel="noreferrer" target="_blank"><h5 >@{obj.username}</h5></a>
                            <h6 className='mt-1 text-center' >{obj.name}</h6>
                        </div>
                        <a href={`https://twitter.com/${obj.username}/status/${obj.tweet_id}`} rel="noreferrer" target="_blank" className=" ui image ms-auto">
                            <img
                                src={Twitter_Logo_Blue}
                                alt="Twitter Logo"
                                height={30}
                                width={30}
                            /></a>
                    </div>

                    <CardTitle style={{ cursor: "pointer" }} onClick={() => {

                        props.findcoin(obj)
                        
                        props.setTwitterColor(obj.id)
                        window.scroll(0, 0)
                    }
                    }>{viewData(obj.text)} </CardTitle>
                    {obj.urlData && obj.urlData.map((ele, index) => {
                        return <CardTitle key={index} onClick={() => props.iframeAction(ele)} >
                            <span className='text-primary border-bottom' style={{ color: '#5156be !important', cursor: 'pointer' }} > <a href>{ele}</a></span>
                        </CardTitle>
                    })}

                    <span>{formatDate(obj.created_at, obj.fromSocket)}</span>


                </CardBody>
            </Card>
        </div >
    );
};

export default TwitterCard;