import { call, put } from 'redux-saga/effects'
import { delay } from 'redux-saga';
import {startSubmit, stopSubmit, reset} from 'redux-form';
import * as actions from '../actions/actionsCreators';
import { Redirect } from "react-router-dom";

const API_URL = 'http://localhost:8000/api/v1';

export const postData = (url, data) => {
  console.log(data);
  
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': "*",
    },
    body: JSON.stringify({
      ...data
    })
  })
    .then( response => response.json() )
    .catch( error => error );
  
  
}


//crear un nuevo usuario
export function* postUser(action){
    yield put(startSubmit('createUserForm'));
    let errors = {};
    const {first_name, last_name, username, password, email } = action.payload;
    const newUser = yield call(postData, `${API_URL}/CreateUser/`, {first_name, last_name, username, password, email});
    if(Object.keys(newUser).length === 1){
     yield put({type: 'REQUEST_FAILED', errors: newUser.username});
      errors = newUser.username;
      alert(newUser.username)
    }else{ 
      alert("¡creación exitosa!")
      yield put(reset('createUserForm'));
    }
    yield put(stopSubmit('createUserForm', errors));
}

export function* login(action){
  yield put(startSubmit('loginUserForm'));
    let errors = {};
    const {username, password } = action.payload;
    const result = yield call(postData, `${API_URL}/auth/token/obtain/`, {username, password});
    console.log(result);
    if(Object.keys(result).length === 1){
     yield put({type: 'LOGIN_FAILED',username: result.username});
      errors = result.username;
      alert(result.username)
    }else{ 
      yield put(actions.loginSuccess(result.token, result.userid, result.username));
      const token = result.token;
      const userId = result.userid;
      localStorage.setItem('jwtToken', token);
      localStorage.setItem('userId',userId);
      console.log("inicio sesion"); 
      window.location.href = "http://localhost:3000/start";
    }
    yield put(stopSubmit('loginUserForm', errors));
  
}


//crear recetas
export function* crearReceta(action){
    yield put(startSubmit('createRecipeForm'));
    let errors = {};
    const {titulo, ingredientes, descripcion, categoria } = action.payload;
    const nombre = titulo;
    const ingrediente = ingredientes;
    const preparacion = descripcion;
    const created_by = localStorage.getItem('userId');
    const result = yield call(postData, `${API_URL}/recetas/`, {nombre, ingrediente, preparacion, created_by});
    if(Object.keys(result).length === 1){
     yield put({type: 'REQUEST_FAILED', errors: result.username});
      errors = result.username;
      alert(result.username)
    }else{ 
      alert("¡creación exitosa!")
      yield put(reset('createRecipeForm'));
    }
    yield put(stopSubmit('createRecipeForm', errors));
}
