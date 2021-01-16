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
import { register } from "../../actions/authActions"
import { clearErrors } from "../../actions/errorActions"
function RegisterModel(props) {

    const [modal, setModal] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
      });
      const [msg, setMsg] = useState(null)
      const { name, email, password } = formData;
    

    const toggle = () => {
        props.clearErrors()
        setModal(!modal)
    }

    useEffect((prevProps) => {
        console.log(props)
        // const { error } = props.error
        // if(error !== prevProps.error) {
        //     // check for register error
        //     if(error.id === "REGISTER_FAIL"){
        //         setMsg({ msg: error.msg.msg})
        //     }else {
        //         setMsg({ msg: null})
        //     }
        // }
    }, [])
    const onChange = e => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
      };

      const onSubmit = async e => {
        e.preventDefault();
    
        const newUser = {
            name, email, password
        }
          props.register({ name, email, password});

        toggle()
      };

    return (
        <div>
            <NavLink onClick={toggle} href="#">Register</NavLink>
            <Modal
                isOpen={modal}
                toggle={toggle}>
                    <ModalHeader
                        toggle={toggle}
                        >
                            Register
                    </ModalHeader>
                    <ModalBody>
                        { msg ? <Alert color="danger"> {msg}</Alert> : null} 
                        <Form
                            onSubmit={onSubmit}>
                                <FormGroup>
                                    <Label for="name">Name</Label>
                                    <Input
                                        name="name"
                                        type="text"
                                        id="name"
                                        value={name}
                                        placeholder="name"
                                        className="mb-3"
                                        onChange={(e)=> onChange(e)}/>
                                    <Label for="email">Email</Label>
                                    <Input
                                        type="email"
                                        placeholder="Email Address"
                                        className="mb-3"
                                        name="email"
                                        value={email}
                                        onChange={e => onChange(e)}
                                        required
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
                                        block>Register</Button>
                                </FormGroup>
                            </Form>
                    </ModalBody>
            </Modal>            
        </div>
    )
}
RegisterModel.prototypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
}

const mapSatetToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
})
export default connect(mapSatetToProps, { register, clearErrors }) (RegisterModel)
