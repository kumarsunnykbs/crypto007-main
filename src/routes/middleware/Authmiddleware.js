import React, { useState } from "react"
import PropTypes from "prop-types"
import { Route, Redirect } from "react-router-dom"
import { APIURL } from "../../Utilitiess/Const"
// import { toast } from "react-toastify"

const Authmiddleware = ({
  component: Component,
  layout: Layout,
  path,
  isAuthProtected,
  ...rest
}) => {
  const [searchResponse,setSearchResponse]=useState(null)
  const [tweetData, setTweetData] = useState([]);
  const searchCoinhandler = async (searchCoin) => {
      const authId = JSON.parse(localStorage.getItem("authUser"))
     
          const token = localStorage.getItem("accessToken")
        
      const formData = new FormData()
      if (searchCoin) {
        
        formData.append("coin", searchCoin)
        var requestOptions = {
          method: 'POST',
          body:formData,
          redirect: 'follow',
          headers: {
              'Authorization': token
          }
      };
    
        try {
          // setTweetData=([])
          const response = await fetch(`${APIURL}/${authId.uid}/searchMarketCoin`,
            requestOptions )
          const data = await response.json()
          if (data.error) {
            console.log(data.error);
          } else {
            setTweetData(data.body.tweets_data)
            setSearchResponse(data.body.coins_data)
        
          }
         
        } catch (err) {
          console.log("err", err)
        }


      }
    
  }
  return (
  <Route
    {...rest}
    render={props => {
      if (isAuthProtected && !localStorage.getItem("authUser")) {
        return (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }

      return (
        <Layout searchCoinhandler={searchCoinhandler}>
          <Component {...props} searchResponse={searchResponse} tweetData={tweetData} setTweetData={setTweetData}/>
        </Layout>
      )
    }}
  />
)
}

Authmiddleware.propTypes = {
  isAuthProtected: PropTypes.bool,
  component: PropTypes.any,
  location: PropTypes.object,
  layout: PropTypes.any,
}

export default Authmiddleware;
