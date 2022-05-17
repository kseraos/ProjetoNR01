import React from 'react'
import App from '../../Layout/App'
import { Link } from 'react-router-dom'
import './Home.css'


var Home = () =>(


    <App>
         <div className='home-div'>

<div className='div-one'>
    ola
</div>
<div className='div-two'>
    ola
</div>
<div className='div-three'>
ola
</div>

<Link className='div-for' to="/usuario">
 <span>Usuários</span>
</Link>

</div>
    </App>


)

export default Home