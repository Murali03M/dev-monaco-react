
import RegisterComponent from '../components/Auth/RegisterComponent'
import Quote1 from '../components/Quotes/Quote1'

const Register = () => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2'>
        <div className='hidden lg:block'>
         <Quote1/>
          </div>
          <div>
            <RegisterComponent/>
          </div>
        
           
    </div>
  )
}

export default Register