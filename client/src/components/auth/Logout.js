import React, { Fragment} from 'react'
import PropTypes from 'prop-types'
import { logout } from "../../actions/authActions"
import { connect } from "react-redux"
import { NavLink } from "reactstrap"

const Logout = props => {
    return (
        <Fragment>
            <NavLink onClick={props.logout} href="#">
                Logout
            </NavLink>
        </Fragment>
    )
}

Logout.propTypes = {
    logout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({

})
export default connect(mapStateToProps, {logout})(Logout)
