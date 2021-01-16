import axios from "axios"
import { returnErrors } from "./errorActions"
import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGOUT_SUCCESS,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS
} from "./Types"

// check token and load user
export const loadUser = () => (dispatch, getState) =>{
    // user loading
    dispatch({ type: USER_LOADING});


    
    axios.get("/api/auth/user", tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
            dispatch({
                type: AUTH_ERROR
            })
        })
}

// Register user
export const register = ({ name, email, password}) => async dispatch =>{

    const config = {
        headers: {
            "Content-type": "application/json"
        }
    };

    const body = JSON.stringify({ name, email, password})

    try{
        const res = await axios.post("/api/users", body, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
    }
    catch(err){
            console.log("could not register")
                dispatch(returnErrors(err.response.data, err.response.status, "REGISTER_FAIL"));
                dispatch({
                type: REGISTER_FAIL
        })
    }
}

// Login action
export const login = ({ email, password}) => async dispatch =>{
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    };

    const body = JSON.stringify({ email, password})

    try{
        const res = await axios.post("/api/auth", body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser())
    }
    catch(err){
            console.log("could not register")
                dispatch(returnErrors(err.response.data, err.response.status, "LOGIN_FAIL"));
                dispatch({
                type: LOGIN_FAIL
        })
    }
}

// logout
export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}
// setup config/headers and token
export const tokenConfig = getState => {

    // get token from local staorage
    const token = getState().auth.token;

    // headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    if(token) {
        config.headers["x-auth-token"] = token
    }

    return config;
}
