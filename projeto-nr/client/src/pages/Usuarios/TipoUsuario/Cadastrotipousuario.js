import React, { useState, useEffect }from 'react'
import App from '../../../Layout/App'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import './Cadastrotipousuario.css'
import Axios from 'axios'
import qs from 'qs'


function Cadastrotipousuario(){

    const [inputs, setInputs] = useState({});


const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
}

const handleClickButton = () =>{
    var data = qs.stringify({
      'nome': inputs.nome
    });
    var config = {
      method: 'post',
      url: 'http://192.168.1.33:3030/api/cadastro/tipo',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data : data
    };
    Axios(config)
    .then(function (response) {

      alert("Tipo de acesso Cadastrado")
      window.location.href = ('/cadastrotipousuarioview');
      console.log(JSON.stringify(response.data));


    })
    .catch(function (error) {
      console.log(error);
    });



}
const validationsCadastro  = yup.object().shape({
  nome: yup.string().min(8, 'campo inválido').required('O nome é obrigatório'),
  email: yup.string().email('Email inválido').required('O email é obrigatório'),
  senha: yup.string().required("A senha é obrigatória").matches(/[a-zA-Z]/, 'Use apenas letras.'),
  confirm_password: yup.string().oneOf([yup.ref("senha"), null], "As senhas não sao iguais"),
  tipo_id: yup.string().min(8, 'campo inválido').required('O tipo é obrigatório'),
});

    return (


    <App>

<div className='container-register-view'>

<h1 className='container-title-regiter-tipo'>Cadastro de Tipos de acesso</h1>

            <Formik initialValues={{}}
            validationSchema={validationsCadastro}
             onSubmit={handleClickButton}

             >
            <Form className='cadastro-form-group-tipo'>
              <div className='conteudo-tipo'>
                <div className='cadastro-form-group-tipo'>
                    <Field name="nome" className="form-field-tipo" placeholder="Tipo de Usuário" onChange={handleChange}/>
                    <ErrorMessage component= "span" name="nome" className="form-erro"/>
                </div>
                <div className='cadastro-form-group-tipo '>
                    <div name="nome" className="form-field-tipo permissao" onChange={handleChange}>
                      <div><span>Cadastrar</span></div>
                      <div><span>Editar</span></div>
                      <div><span>Deletar</span></div>
                     <div><span>Acesso aos relatórios</span></div>
                     <div><span>Somente visualizar</span></div>

                    </div>

                </div>


                </div>
                <button className='button' type="submit">
              Cadastrar
          </button>

            </Form>
            </Formik>

            </div>
    </App>


)
    }
export default Cadastrotipousuario;