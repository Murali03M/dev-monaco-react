
import LoginComponent from '../components/Auth/LoginComponent'

import Quote1 from '../components/Quotes/Quote1'

const Login = () => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2  '>
    <div>
     <LoginComponent/>
    </div>
    <div className='hidden lg:block'>
    <Quote1/>
    </div>
     
</div>
  )
}

export default Login