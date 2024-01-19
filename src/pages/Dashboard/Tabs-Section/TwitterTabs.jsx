import React, { useState } from 'react'
// import { Tab, Tabs } from 'react-bootstrap';
import TwiterAll from './Tabes-Three-Section/TwiterAll';
import TwitterFilter from './Tabes-Three-Section/TwitterFilter';
import TwitterSearch from './Tabes-Three-Section/TwitterSearch';
import classnames from "classnames"
import "../../../pages/Dashboard/index.css"
import {
    Card,
    CardBody,

    Col,
    Nav,
    NavItem,
    NavLink,
    Row,
    TabContent,
    TabPane
} from "reactstrap"


const TwitterTabs = (props) => {

    const [customActiveTab, setcustomActiveTab] = useState("1")
    const toggleCustom = tab => {
        if (customActiveTab !== tab) {
            setcustomActiveTab(tab)
        }
    }
    return (
        <Card>
            <CardBody className='NewCard'>
                <Nav tabs className="nav-tabs-custom nav-justified ">
                    <NavItem className='mb-1'>
                        <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                                active: customActiveTab === "1",
                            })}
                            onClick={() => {
                                toggleCustom("1")
                            }}
                        >
                            <span className="d-block d-sm-none">
                                <i className="fas fa-home"></i>
                            </span>
                            <span className="d-none d-sm-block">All</span>
                        </NavLink>
                    </NavItem>
                    <NavItem className='mb-1'>
                        <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                                active: customActiveTab === "2",
                            })}
                            onClick={() => {
                                toggleCustom("2")
                            }}
                        >
                            <span className="d-block d-sm-none">
                                <i className="far fa-user"></i>
                            </span>
                            <span className="d-none d-sm-block">Filter</span>
                        </NavLink>
                    </NavItem>
                    <NavItem className='mb-1'>
                        <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                                active: customActiveTab === "3",
                            })}
                            onClick={() => {
                                toggleCustom("3")
                            }}
                        >
                            <span className="d-block d-sm-none">
                                <i className="far fa-envelope"></i>
                            </span>
                            <span className="d-none d-sm-block">Search</span>
                        </NavLink>
                    </NavItem>
                </Nav>

                <TabContent
                    activeTab={customActiveTab}
                    className="p-3 text-muted"
                >
                    <TabPane tabId="1">
                        <Row>
                            <Col >
                                <CardBody className="mb-0 card-extra-padding">
                                    {props.errorfounder === true ?
                                        <div className="alert   text-center mb-4  pt-2" role="alert">
                                            <h3 className='text-danger'>No Tweets Found !</h3>
                                        </div> :
                                        <TwiterAll
                                            tweetData={props.tweetData}
                                            findcoin={props.findcoin}
                                            iframeAction={props.iframeAction}
                                            setTwitterColor={props.setTwitterColor}
                                            twitterColor={props.twitterColor}
                                          
                                            newData={props.newData}
                                        />}
                                </CardBody>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row>
                            <Col >
                                <CardBody className="mb-0">
                                    {props.errorfounder === true ?
                                        <div className="alert   text-center mb-4  pt-2" role="alert">
                                            <h3 className='text-danger'>No Tweets Found !</h3>
                                        </div> :
                                        <TwitterFilter
                                            tweetData={props.tweetData}
                                            findcoin={props.findcoin}
                                            iframeAction={props.iframeAction}
                                            setTwitterColor={props.setTwitterColor}
                                            twitterColor={props.twitterColor}
                                            setRefreshData={props.setRefreshData}
                                            newData={props.newData}
                                        />}
                                </CardBody>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="3">
                        <Row>
                            <Col >
                                <CardBody className="mb-0">
                                    {props.errorfounder === true ?
                                        <div className="alert   text-center mb-4  pt-2" role="alert">
                                            <h3 className='text-danger'>No Tweets Found !</h3>
                                        </div> :
                                        <TwitterSearch
                                            tweetData={props.tweetData}
                                            findcoin={props.findcoin}
                                            iframeAction={props.iframeAction}
                                            setTwitterColor={props.setTwitterColor}
                                            twitterColor={props.twitterColor}
                                            setRefreshData={props.setRefreshData}
                                            newData={props.newData}
                                        />}
                                </CardBody>
                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>
            </CardBody>
        </Card>





    )
}

export default TwitterTabs


