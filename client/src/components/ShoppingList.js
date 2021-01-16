import React,{ useState, useEffect } from 'react'

import { Container, ListGroup, ListGroupItem, Button} from "reactstrap"
import { CSSTransition, TransitionGroup} from "react-transition-group"
import { connect } from "react-redux"
import { getItems, deleteItem } from "../actions/itemActions"
import PropTypes from "prop-types"
const ShoppingList =(props) => {

    const [items, setItems] = useState(props.item.items)

    useEffect(() =>{
        props.getItems()
    }, [])

    const onDelete = id  => {
        props.deleteItem(id)
    }

    return (
        <Container>
            <ListGroup>
                <TransitionGroup className="shopping-list">
                    {items.map(({_id, name}) =>{
                        return <CSSTransition key={_id} timeout={500} classNames="fade">
                            <ListGroupItem>
                                <Button
                                    className="remove-btn"
                                    color="danger"
                                    size="sm"
                                    onClick={() => onDelete(_id)}>&times;</Button>
                                {name}
                            </ListGroupItem>
                        </CSSTransition>
                    })}
                </TransitionGroup>
            </ListGroup>
        </Container>
    )
}

ShoppingList.propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    deleteItem: PropTypes.func.isRequired
}

const mapStateToProps = (state) =>({
    item: state.item
})

export default 
connect(mapStateToProps, { getItems, deleteItem })
(ShoppingList)
