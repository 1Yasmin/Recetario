import uuid from 'uuid-v4';
import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import * as actions from '../../actions/actionsCreators';

const renderInput = ({ input, meta, ...props }) => (
  <div className="my-input">
    {
      meta.error && meta.touched && (
        <div className="error">
          { meta.error }
        </div>
      )
    }
    <input {...input} {...props} />
  </div>
);

const RecipeForm = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <Field
      type="text"
      name="titulo"
      placeholder="Titulo:"
      component={renderInput}
    />
    <Field
      type="text"
      name="descripcion"
      placeholder="Descripcion:"
      component={renderInput}
    />
    
    <button type="submit">
      Agregar!
    </button>
  </form>
);


export default reduxForm({
  form: 'createRecipeForm',
  onSubmit(values, dispatch) {
    console.log(uuid())
    dispatch(actions.addRecipe(
      uuid(),
      values.titulo,
      values.descripcion,
      
    ));
  },
  
})(RecipeForm);

