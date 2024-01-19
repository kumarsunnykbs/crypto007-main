import React from 'react';
import { Nav, NavItem, NavLink} from 'reactstrap';


const BorrowNavbar = (prop) => {
  return (
    <div>
        <Nav pills className="navtab-bg nav-justified">
                                                            <NavItem>
                                                                <NavLink
                                                                    style={{ cursor: "pointer" }}
                                                                    className={prop.classnames({
                                                                        active: prop.activeTab1 === "4",
                                                                    })}
                                                                    onClick={() => {
                                                                        prop.toggless("4")
                                                                    }}
                                                                >
                                                                    Normal
                                                                </NavLink>
                                                            </NavItem>
                                                            <NavItem>
                                                                <NavLink
                                                                    style={{ cursor: "pointer" }}
                                                                    className={prop.classnames({
                                                                        active: prop.activeTab1 === "5",
                                                                    })}
                                                                    onClick={() => {
                                                                        prop.toggless("5")
                                                                    }}
                                                                >
                                                                    Borrow
                                                                </NavLink>
                                                            </NavItem>
                                                            <NavItem>
                                                                <NavLink
                                                                    style={{ cursor: "pointer" }}
                                                                    className={prop.classnames({
                                                                        active: prop.activeTab1 === "6",
                                                                    })}
                                                                    onClick={() => {
                                                                        prop.toggless("6")
                                                                    }}
                                                                >
                                                                    Repay
                                                                </NavLink>
                                                            </NavItem>
                                                            <NavItem>
                                                                <NavLink
                                                                    style={{ cursor: "pointer" }}
                                                                    className="data"

                                                                >
                                                                    <i className='bx bxs-info-circle'></i>
                                                                </NavLink>
                                                            </NavItem>
                                                        </Nav>
    </div>
  )
}

export default BorrowNavbar