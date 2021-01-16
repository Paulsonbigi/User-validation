import React, { useState } from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from "reactstrap"
import { connect } from "react-redux"
import { v4 as uuidv4 } from "uuid"
import { addItem } from "../actions/itemActions"
import PropTypes from "prop-types"


function ItemModel(props) {

    const [modal, setModal] = useState(false)
    const [name, setName] = useState("")

    const toggle = () => setModal(!modal)

    const onSubmit = e => {
        e.preventDefault()
        const newItem = {
            name
        } 
        props.addItem(newItem);

        //close modal
        console.log(name)
        toggle();
    }

    return (
        <div>
            <Button
                color="dark" dark
                style={{marginBottom: "2rem"}}
                onClick={toggle}>Add Item</Button>
            <Modal
                isOpen={modal}
                toggle={toggle}>
                    <ModalHeader
                        toggle={toggle}
                        >
                            Add To Shopping List
                    </ModalHeader>
                    <ModalBody>
                        <Form
                            onSubmit={onSubmit}>
                                <FormGroup>
                                    <Label for="item">Item</Label>
                                    <Input
                                        name="name"
                                        type="text"
                                        id="item"
                                        placeholder="Add shopping item"
                                        onChange={(e)=> setName(e.target.value)}/>
                                    <Button
                                        color="dark"
                                        style={{marginTop:"2rem"}}
                                        block>Add Item</Button>
                                </FormGroup>
                            </Form>
                    </ModalBody>
            </Modal>            
        </div>
    )
}
ItemModel.propTypes = {
    addItem: PropTypes.func.isRequired
}

const mapSatetToProps = state => ({
    item: state.item
})
export default connect(mapSatetToProps, {addItem}) (ItemModel)
