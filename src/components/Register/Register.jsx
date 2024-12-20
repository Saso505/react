/* eslint-disable */
import React, { useEffect, useState } from "react";
import style from "./Register.module.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import axios from 'axios';
import logo from '../../assets/logo.jpg'
import * as yup from 'yup'

export default function Register() {

  
  let Navigate=useNavigate();

  const [Loading, setLoding] = useState(false);

  //validation
  let validation =yup.object().shape({
    first_name: yup.string().required('First name is required').matches(/^[A-Za-z]{3,}$/, ' should contain 3 character at least'),
    last_name: yup.string().required('Last name is required').matches(/^[A-Za-z]{3,}$/, ' should contain 3 character at least'),
    email: yup.string().required('Email is required')  .email('Invalid email address'),
   
        Ppassword: yup.string().matches( /^(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/,  ' must be at least 6 characters, include one uppercase letter and one special character ' ).required('Password is required'),   
  

    ConfirmPassword: yup.string().required('Confirm password is required') .oneOf([yup.ref('Ppassword'), null], 'Passwords must match'),
  });

  async function handleRegister(formvalue) {
  try {
    setLoding(true);
    let {data}= await axios.post(``, formvalue)
    if(data.message === "success")
    {
  
localStorage.setItem('userToken', data.token);
     formik.resetForm();
     Navigate('/');
      }
     console.log(formvalue);  
  } catch(err){
    setLoding(false);

  }  
  
  }



    let formik = useFormik({
    initialValues: { first_name: '',  last_name: '',  email: '', Ppassword: '', ConfirmPassword: ''},
    validationSchema:validation,    
    onSubmit: handleRegister
 
  });

  useEffect(() => {
    // Example logic (if needed)
    console.log("Component mounted");
  }, []);

  return ( <>
      <div className="register  bg body items-center w-full justify-center flex h-screen ">
        <div className="container  items-center  justify-center flex  mx-auto">
          <div className="row xsm:hidden lg:block " >
          <img className={`${style.imge}   lg::max-w-[34.758rem]  xl:max-w-[38.758rem] h-[40.758rem] `} src={logo} alt="" /> 
            </div>
          <div className="row z-1">
              <form onSubmit={formik.handleSubmit} >
              <div className="glass-container sm:w-[34.758rem]  xl:w-[38.758rem] h-[40.758rem] xsm:w-[350px]    ">

              <h1  className={`${style.highlight} sm:text-[3rem] xsm:text-3xl  sm:py-5   h3 xsm:py-0 `}   >    Create account{" "}  </h1> 
              
            
              <div className="grid sm:grid-cols-2 w-3/4 sm:gap-8  xsm:gap-0 xsm:w-3/4  ">
                <div className="relative mt-3 sm:mt-1 z-0 w-full sm:py-5 xsm:py-3 group ">
                  <input type="text" name="first_name"    id="first_name"  onChange={formik.handleChange}  onBlur={formik.handleBlur}   value={formik.values.first_name}className="block sm:py-1 xsm:py-3 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:b dark:focusborder-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300  peer" placeholder=" " />
                  <label  htmlFor="first_name"  className="peer-focus:font-medium  font-lato absolute text-lg text-gray-500 dark:text-white duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-gray-300  peer-focus:dark:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-4" >First name</label>
                    {formik.errors.first_name && formik.touched.first_name? <div className=" text-red-500  text-xs " role="alert">
                      <span className="font-medium pt-2 text-red-500  absolute text-xs ">{formik.errors.first_name}</span>
                    </div>:null}
                </div>


                <div className="relative sm:mt-1 z-0 w-full  sm:py-5 xsm:py-4 group ">
                  <input  type="text"  name="last_name" id="last_name" onChange={formik.handleChange}  onBlur={formik.handleBlur}  value={formik.values.last_name}  className="block sm:py-1 xsm:py-3 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:b dark:focusborder-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300  peer" placeholder=" "/>   
                  <label htmlFor=" last_name"className="peer-focus:font-medium absolute  font-lato text-lg text-gray-500 dark:text-white duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-gray-300  peer-focus:dark:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-4" >Last name </label>
                  {formik.errors.last_name && formik.touched.last_name? 
                      <span className="font-medium pt-2 text-red-500  absolute text-xs ">{formik.errors.last_name}</span>
                    :null}
                </div>
              </div>


              <div className="relative pt-5 sm:mt-1 z-0 w-3/4 sm:py-4 xsm:py-3 group">
                  <input type="email" name="email" id="email" onChange={formik.handleChange}onBlur={formik.handleBlur} value={formik.values.email} className="block px-0 w-full py-2 text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white  dark:border-white dark:focus:border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300   peer" placeholder=" " />
                  <label htmlFor="email"className="peer-focus:font-medium absolute  font-lato text-lg text-gray-500 dark:text-white duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-gray-300  peer-focus:dark:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-4" >Email </label>
                    {formik.errors.email && formik.touched.email? 
                      <span className="font-medium pt-2 text-red-500  absolute text-xs ">{formik.errors.email}</span>
                    :null}
                </div>


              <div className="relative mt-3 sm:mt-1 z-0 w-3/4 sm:py-3 xsm:py-4  group">
                <input   type="password"    name="Ppassword"    id="Ppassword" onChange={formik.handleChange}   onBlur={formik.handleBlur}   value={formik.values.Ppassword}   className="block py-2 px-0 w-full text-lg  text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-white dark:focus:border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300  peer" placeholder=" " />
                <label   htmlFor="Ppassword"        className="peer-focus:font-medium absolute text-lg text-gray-500  font-lato dark:text-white duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-gray-300  peer-focus:dark:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-4">Password</label>
                {formik.errors.Ppassword && formik.touched.Ppassword?
                    <span className="font-medium pt-2 text-red-500  absolute text-xs ">{formik.errors.Ppassword}</span>
                    :null}
              </div>


              <div className="relative  sm:mt-1 z-0 w-3/4 sm:py-5  xsm:py-2 group ">
                <input type="password"  name="ConfirmPassword"  id="ConfirmPassword"  onChange={formik.handleChange}  onBlur={formik.handleBlur}    value={formik.values.ConfirmPassword}       className="block py-2 px-0 w-full text-lg  text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-white dark:focus:border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300  peer"placeholder=" "  />
                <label htmlFor="ConfirmPassword"  className="peer-focus:font-medium absolute text-lg text-gray-500  font-lato dark:text-white duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-gray-300  peer-focus:dark:text-gray-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-3">Re-Password{" "}   </label>
                 {formik.errors.ConfirmPassword && formik.touched.ConfirmPassword? 
                      <span className="font-medium pt-2 text-red-500  absolute text-xs ">{formik.errors.ConfirmPassword}</span>:null} 
                   {console.log(formik.errors.Ppassword)} 
              </div>



              <div className="btn-login w-full flex   items-center  justify-center xsm:py-5 sm:py-4 ">
              
                {Loading?<button  type="button"   className="text-white w-1/2 bg-gradient-to-r bg-[#191E3F] hover:bg-gradient-to-br   focus:ring-2 focus:outline-none dark:focus:ring-white/50 font-medium rounded-[50px]  py-1 text-center "   >    <span class={`${style. loader  } `}></span>   </button> :
                <button  type="submit"   className="text-white w-2/3 bg-gradient-to-r bg-[#191E3F] hover:bg-gradient-to-br   font-lato focus:ring-2 focus:outline-none dark:focus:ring-white/50 font-medium rounded-[20px] text-xl  py-3 text-center me-2 mb-2"   >     Create account    </button>}
                 </div>
                 <div className="all-icon flex  w-3/4 justify-around  items-center ">
                <div className="facebook">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/50  shadow-md cursor-pointer hover:bg-gray-300  ">
                    <svg  xmlns="http://www.w3.org/2000/svg"     viewBox="0 0 320 512"    className="w-6 h-6 text-[rgb(25,30,63)]"   ><path    fill="#4267B2"    d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z"   />   </svg>
                  </div>
                  </div>
                  <div className="Google">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full  bg-white/50    shadow-md cursor-pointer hover:bg-gray-300  ">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 " viewBox="0 0 48 48" >
                      <path  fill="#EA4335" d="M24 9.5c3.15 0 5.93 1.22 8.07 3.21l6.04-6.04C34.15 3.15 29.31 1 24 1 14.65 1 6.84 6.63 3.27 14.24l7.1 5.49C12.22 14.47 17.69 9.5 24 9.5z" />
                      <path fill="#4285F4" d="M46.27 24.5c0-1.67-.15-3.27-.43-4.81H24v9.11h12.69c-.55 2.93-2.21 5.41-4.72 7.11l7.31 5.66C43.72 37.67 46.27 31.49 46.27 24.5z"/>
                      <path fill="#FBBC04"d="M9.37 28.38A14.5 14.5 0 0 1 9.5 24c0-1.49.24-2.92.66-4.28l-7.1-5.49A23.99 23.99 0 0 0 1 24c0 3.94.94 7.66 2.61 10.95l7.08-5.47z" />
                      <path fill="#34A853" d="M24 46c5.94 0 10.95-2 14.62-5.42l-7.31-5.66c-2.05 1.37-4.69 2.15-7.31 2.15-6.31 0-11.78-4.97-13.13-11.5l-7.09 5.47C6.84 41.37 14.65 46 24 46z"/>
                      <path fill="none" d="M0 0h48v48H0z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="realtive py-4  ">
                <p className="text-white text-sm  absolute sm:left-[60%] xsm:top-[92.5%] sm:top-[89%]  xsm:py-1 xsm:mt-1 xsm:left-32">  Already have an account<Link to="/login" className={`font-bold ${style.login} ms-2`}>Login</Link></p>
                <div className="underline relative  ">
                  <div className="line w-10 bg-white h-[0.125rem] absolute  sm:top-[2.5rem] sm:left-[13.5rem] xsm:top-8 xsm:left-28 lg:left-[13.5rem] md:left-[13.4rem] xl:left-[13.9rem]  "></div>
                </div>

              </div>

            </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
