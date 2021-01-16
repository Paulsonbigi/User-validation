import React, { useState, useEffect } from 'react'
import {
    Form,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from "reactstrap"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { login } from "../../actions/authActions"
import {  clearErrors } from "../../actions/errorActions"

const LoginModal = (props) => {

    const [modal, setModal] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        password: ""
      });
      const [msg, setMsg] = useState(null)
      const { name, email, password } = formData;
    

    // useEffect((prevProps) => {
    //     const { error, isAuthenticated } = props
    //     // console.log(error)
    //     if(error ) {
    //         // check for register error
    //         if(error.id === "LOGIN_FAIL"){
    //             setMsg({msg: error.msg.msg})
    //             console.log(error.msg.msg)
    //         }
    //         else{
    //             setMsg({ msg: null})
    //         }
    //     }

    //     // if authenticated close modal
    //     if(modal) {
    //         if(isAuthenticated) {
    //             toggle()
    //         }
    //     }
    // })
    const toggle = () => {
        props.clearErrors()
        setModal(!modal)
    }

    const onChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
          });
      };

    // attempt to login
    const onSubmit = e => {
        e.preventDefault();

        props.login({ email, password })
    }


    return(
        <div>
            <NavLink onClick={toggle} href="#">Login</NavLink>
            <Modal
                isOpen={modal}
                toggle={toggle}>
                    <ModalHeader
                        toggle={toggle}
                        >
                            Login
                    </ModalHeader>
                    <ModalBody>
                        { msg ? <Alert color="danger"> {msg}</Alert> : null} 
                        <Form
                            onSubmit={onSubmit}>
                                <FormGroup>

                                    <Label for="email">Email</Label>
                                    <Input
                                        type="email"
                                        placeholder="Email Address"
                                        className="mb-3"
                                        name="email"
                                        value={email}
                                        onChange={e => onChange(e)}
                                    />

                                    <Label for="password">Password</Label>
                                    <Input
                                        name="password"
                                        type="password"
                                        id="password"
                                        value={password}
                                        className="mb-3"
                                        placeholder="Password"
                                        onChange={e => onChange(e)}/>

                                    <Button
                                        color="dark"
                                        style={{marginTop:"2rem"}}
                                        block>Login</Button>
                                </FormGroup>
                            </Form>
                    </ModalBody>
            </Modal>            
        </div>
    )
}

LoginModal.prototype = {
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
})
export default connect(mapStateToProps, {login, clearErrors})(LoginModal)