import Lottie from 'lottie-react';
import loginLottie from '../../assets/lottie/loginLottie.json';
import React, { useContext, useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate,  validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Swal from 'sweetalert2';
import SocialLogin from '../../components/SocialLogin/SocialLogin';

const Login = () => {

    const [disabled, setDisabled] = useState(true);
    const {signIn} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";
    console.log('State in the location login page', location.state)

    useEffect(()=>{
        loadCaptchaEnginge(6);
    },[])

    const handleLogin = event =>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email,password);
        signIn(email, password)
        .then(result => {
            const user = result.user;
            console.log(user);
        
            Swal.fire({
                position: "top",
                icon: "success",
                title: "User logged in successfully",
                showConfirmButton: false,
                timer: 1500
              });
            navigate(from, {replace: true});
        })
    }

    const handleValidateCaptcha = (e) =>{
        const user_captcha_value = e.target.value;
        if (validateCaptcha(user_captcha_value)){
            setDisabled(false);
        }
        else{
            setDisabled(true)
        }
    }

    return (
    <>
    <Helmet>
        <title>Bistro Boss | Login</title>
    </Helmet>
    
    <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col md:flex-row-reverse">
    <div className="text-center md:w-1/2 lg:text-left">
      <h1 className="text-5xl font-bold text-center">Login now!</h1>
      
        <Lottie animationData={loginLottie}></Lottie>

    </div>
    <div className="card bg-base-100 md:w-1/2 max-w-sm shadow-2xl">
      <form onSubmit={handleLogin} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name="email" placeholder="type here" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name="password" placeholder="Enter your password" className="input input-bordered" required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control">
          <label className="label">
            <LoadCanvasTemplate></LoadCanvasTemplate>
          </label>
          <input onBlur={handleValidateCaptcha} type="text"  name="captcha" placeholder="type the captcha above" className="input input-bordered" required />
          
          
        </div>
        <div className="form-control mt-6">
          <input disabled={disabled} className="btn btn-primary" type="submit" value="Login" />
        </div>
      </form>
      <div className='flex justify-center mb-2'>
      <SocialLogin></SocialLogin>
      </div>
      <p className='text-center mb-4'><small>New Here? <Link to="/signup">Create an account</Link> </small></p>
      
      
    </div>
  </div>
  
</div>
    
    </>
    );
};

export default Login;