import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import registerLottie from '../../assets/lottie/registerLottie.json';
import Lottie from 'lottie-react';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import SocialLogin from '../../components/SocialLogin/SocialLogin';

const SignUp = () => {
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, reset, formState: {errors} } = useForm();
    const {createUser, updateUserProfile} = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = data =>{ 
        console.log(data);
        createUser(data.email, data.password)
        .then (result =>{
            const loggedUser = result.user;
            console.log(loggedUser);
            updateUserProfile(data.name, data.photoURL)
            .then(()=>{
                console.log('User profile info updated')
                // create user entry in the database
                const userInfo = {
                  name: data.name,
                  email: data.email
                }
                axiosPublic.post('/users', userInfo)
                .then(res =>{
                  if(res.data.insertedId){
                    console.log('User added to the database')
                    reset();
                    Swal.fire({
                        position: "top",
                        icon: "success",
                        title: "User Registered Successfully",
                        showConfirmButton: false,
                        timer: 1500
                      });
                      navigate('/login');
                  }
                })
               
            })
            .catch(error=> console.log(error))
        })
    }

    return (
   <>
   <Helmet>
    <title>Bistro boss | Register</title>
   </Helmet>
        <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center md:w-1/2 lg:text-left">
      <h1 className="text-5xl font-bold text-center">Register now!</h1>
      
        <Lottie animationData={registerLottie}></Lottie>

    </div>
    <div className="card bg-base-100 md:w-1/2 max-w-sm shrink-0 shadow-2xl">
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" {...register("name", {required: true })} name="name" placeholder="Your name" className="input input-bordered" />
          {errors.name && <span className='text-red-600'>Name is required</span>}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Photo URL</span>
          </label>
          <input type="text" {...register("photoURL", {required: true })} name="photoURL" placeholder="Your PhotoURL" className="input input-bordered" />
          {errors.photoURL && <span className='text-red-600'>PhotoURL is required</span>}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" {...register("email")} name="email" placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name="password" {...register("password", {required: true, minLength: 6, maxLength: 20, pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/ } )} placeholder="password" className="input input-bordered" />
          {errors.password?.type === 'required' && <p className='text-red-600'>Password is required</p> }
          {errors.password?.type === 'minLength' && <p className='text-red-600'>Minimum 6 character password needed</p> }
          {errors.password?.type === 'maxLength' && <p className='text-red-600'>Maximum 20 character password needed</p> }
          {errors.password?.type === 'pattern' && <p className='text-red-600'>Password must have one uppercase one lowercase one number and one special character </p> }
          
        </div>
        <div className="form-control mt-6">
            <input type="submit" className="btn btn-primary" value="Register" />
        </div>
      </form>

      <div className='flex justify-center'>
        <SocialLogin></SocialLogin>
      </div>

      <p className='text-center mb-4'><small>Already got an account? <Link to="/login">Login</Link> </small></p>
    </div>
  </div>
</div>
   
   </>
    );
};

export default SignUp;