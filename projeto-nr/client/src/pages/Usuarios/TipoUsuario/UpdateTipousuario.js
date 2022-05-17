import React, { useState, useEffect } from 'react';
import App from '../../../Layout/App'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Button } from 'semantic-ui-react'
import * as yup from 'yup'
import './../Usuario/CadastroView/CadastroUsuarioView.css'
import Axios from 'axios'
import axios from 'axios';
import qs from 'qs'



export default function UpdateTipousuario() {


    const [id, setID] = useState(null);
    const [nome, setNome] = useState('');



    useEffect(() => {
        setID(localStorage.getItem('ID'))
        setNome(localStorage.getItem('Nome'));

    }, []);


    const updateAPIData = () => {

      var data = qs.stringify({
        'nome': nome,
      });



      var config = {
        method: 'put',
        url: 'http://192.168.1.33:3030/api/cadastro/tipo/'+id,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : data
      };
      Axios(config)
      .then(function (response) {
        alert("Tipo de acesso Atualizado")
        window.location.href = ('/cadastrotipousuarioview');
        console.log(JSON.stringify(response.data));

      })
      .catch(function (error) {
        console.log(error);
      });
    }

    return (
        <App>


        <div className='container-tipo'>
            <h1 className='container-title'>Cadastro de Tipo de acesso</h1>
            <Formik initialValues={{}}
            //  validationSchema={validationsCadastro}
             onSubmit={updateAPIData}

             >
            <Form className='cadastro-form-group'>
                <div className='cadastro-form-group'>
                    <Field name="nome" className="form-field" placeholder="Tipo de Usuário" value={nome} onChange={(e)=>setNome(e.target.value)}/>
                    <ErrorMessage component= "span" name="nome" className="form-erro"/>
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
