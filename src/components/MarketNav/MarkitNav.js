import React from 'react'
import {  Nav, NavItem, NavLink,  CardHeader} from 'reactstrap';
import classnames from 'classnames';

const MarkitNav = (obj) => {



  return (
    <>
    <CardHeader className="align-items-center d-flex">
                        <div className="flex-shrink-0">
                            <Nav className="nav-tabs-custom card-header-tabs" role="tablist">
                                <NavItem >
                                    <NavLink
                                        to="#"
                                        style={{ cursor: "pointer" }}
                                        className={classnames({ active: obj.activeTab === '1' })}
                                        onClick={() => { obj.toggle('1'); }}

                                    > Limit</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        to="#"
                                        style={{ cursor: "pointer" }}
                                        className={classnames({ active: obj.activeTab === '2' })}
                                        onClick={() => { obj.toggle('2'); }}
                                    > Market</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        to="#"
                                        style={{ cursor: "pointer" }}
                                        className={classnames({ active: obj.activeTab === '3' })}
                                        onClick={() => { obj.toggle('3'); }}
                                    > Spot-Limit</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        to="#"
                                        style={{ cursor: "pointer" }}
                                    >  <i className='bx bxs-info-circle'></i></NavLink>
                                </NavItem>
                            </Nav>
                        </div>
                    </CardHeader>
    </>
  )
}

export default MarkitNav