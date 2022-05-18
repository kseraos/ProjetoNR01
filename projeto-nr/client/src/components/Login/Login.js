import React from 'react'
import './Login.css'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import Axios from 'axios'
import qs from 'qs'
import Logo from '../../components/imgs/logo.png'
import Users from '../../components/imgs/users.svg'
import Passwords from '../../components/imgs/passwords.svg'


const handleClickLogin = (values) =>{
  const data = qs.stringify({
    'nome': values.nome,
    'senha': values.senha
  });


  console.log(data);
  var config = {
    method: 'post',
    url: 'http://192.168.1.33:3030/api/login',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data : data
  };

  Axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
    if(response.data.error == false){
      window.location.href = ('/');
    }else{
      alert('Usuário ou senha invalido');
    }

  })
  .catch(function (error) {
    console.log(error);
  });

};

const validationsLogin  = yup.object().shape({
  nome: yup.string().min(3, 'Usuario inválido').required('O usuário é obrigatório'),
  senha: yup.string().min(6,"A senha deve ter pelo menos 8 caracteres").required("A senha é obrigatória"),
});






const Login = () => (

    <div className='container-login'>
    <div className='container-login-login'>
    < img className='logo' src ={Logo} alt="React Logo"/>
      <Formik initialValues={{}}
              onSubmit={handleClickLogin}
              validationSchema={validationsLogin}>
        <Form className='login-form-group'>
          <div className='login-form-group-div'>
          <label className='label-user'>
          <img className='users' src={Users} alt="Usuário"/>
          <Field name="nome" className="form-field" placeholder="Usuário"/>
          </label>
          <ErrorMessage component="span" name="nome" className="form-erro"/>

          </div>
          <div className='login-form-group-div'>
          <label className='label-user'>
          <img className='users' src={Passwords} alt="Senha"/>
          <Field name="senha" type="password" className="form-field" placeholder="Senha"/>
          </label>
          <ErrorMessage component="span" name="senha" className="form-erro"/>

          </div>

          <button className='button-login' type="submit">
            Entrar
          </button>

        </Form>
      </Formik>
      </div>
    </div>

)

export default Login