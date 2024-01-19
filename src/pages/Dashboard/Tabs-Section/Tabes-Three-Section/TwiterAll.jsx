import React from 'react'
// import user from '../../../../assets/images/users/user.png'
import Scrollbars from 'react-custom-scrollbars'
import TwitterCard from '../../../../components/cart/TwitterCard'

const TwiterAll = (props) => {



    return (
        <div >

            {props.tweetData?.length === 0 ? "" : <div className=' mb-3'>

                <h4 >All Tweets</h4>

            </div>}

            <div>
                <Scrollbars style={{ height: 1220 }}>

                    {props.tweetData?.length > 0 && props.tweetData.map((elem, i) => {
                        return <div key={i}  >
                            <TwitterCard
                                obj={elem}
                                findcoin={props.findcoin}
                                iframeAction={props.iframeAction}
                                setTwitterColor={props.setTwitterColor}
                                twitterColor={props.twitterColor}
                                newData={props.newData}
                            />
                        </div>
                    })}
                    {props.tweetData?.length === 0 && <div className="alert   text-center mb-4  pt-2" role="alert">
                        <h3 className='text-danger'>No Tweets Found !</h3>
                    </div>}
                </Scrollbars>
            </div>
        </div>
    )
}

export default TwiterAll


// import React from 'react'
// // import user from '../../../../assets/images/users/user.png'
// import Scrollbars from 'react-custom-scrollbars'
// import TwitterCard from '../../../../components/cart/TwitterCard'
// import 'react-perfect-scrollbar/dist/css/styles.css';
// import PerfectScrollbar from 'react-perfect-scrollbar'

// const TwiterAll = (props) => {
//     return (
//         <div >

//             {props.tweetData?.length === 0 ? "" : <div className=' mb-3'>

//                 <h4 >All Tweets</h4>

//             </div>}

//             <div>
//                 <PerfectScrollbar style={{ height: 1220 }}>
//                     {props.tweetData?.length > 0 && props.tweetData.map((elem, i) => {
//                         return <div key={i}  >
//                             <TwitterCard
//                                 obj={elem}
//                                 findcoin={props.findcoin}
//                                 iframeAction={props.iframeAction}
//                                 setTwitterColor={props.setTwitterColor}
//                                 twitterColor={props.twitterColor}
//                                 setRefreshData={props.setRefreshData}
//                                 newData={props.newData}
//                             />
//                         </div>
//                     })}
//                     {props.tweetData?.length === 0 && <div className="alert   text-center mb-4  pt-2" role="alert">
//                         <h3 className='text-danger'>No Tweets Found !</h3>
//                     </div>}
//                 </PerfectScrollbar>
//             </div>


//         </div>
//     )
// }

// export default TwiterAll