import React, { useEffect } from 'react'
import NavBar from "./components/Navbar"
import ShoppingList from "./components/ShoppingList"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { Provider } from "react-redux"
import store from "./store"
import ItemModal from "./components/ItemModel"
import { Container } from "reactstrap"
import { loadUser } from "./actions/authActions"

const App = () =>{
  useEffect(() => {
    store.dispatch(loadUser());
  }, [])

  return (
    <Provider store={store}>
      <div className="app">
        <NavBar/>
        <Container>
          <ItemModal/>
          <ShoppingList/>
        </Container>
      </div>
    </Provider>
  )
}

export default App
