import React, { useEffect } from "react"
import PropTypes from 'prop-types'
import { Link, useHistory } from "react-router-dom"
import { Row, Col, BreadcrumbItem } from "reactstrap"

const Breadcrumb = props => {
  const { title, breadcrumbItems } = props
  const itemLength = breadcrumbItems.length
  const history = useHistory()
  useEffect(() => {
    localStorage.removeItem('errorMsg')
    if (localStorage.getItem('accessToken')) {
      
      history.push('/login')
      localStorage.removeItem('authUser')
    }
  }, [])
  return (
    <Row>
      <Col xs="12">
        <div className="page-title-box d-flex align-items-center justify-content-between">
          <h4 className="mb-0 font-size-18">{title}</h4>
          <div className="page-title-right">
            <ol className="breadcrumb m-0">
              {breadcrumbItems.map((item, key) => (
                <BreadcrumbItem key={key} active={key + 1 === itemLength}>
                  <Link to="#">{item.title}</Link>
                </BreadcrumbItem>
              ))}
            </ol>
          </div>
        </div>
      </Col>
    </Row>
  )
}

Breadcrumb.propTypes = {
  breadcrumbItems: PropTypes.array,
  title: PropTypes.string
}

export default Breadcrumb
