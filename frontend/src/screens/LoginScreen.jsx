import React, { useEffect, useState } from "react"
import "./loginScreen.css"
import { login } from "../features/users/userSlice"
import { useSelector, useDispatch } from "react-redux"
import Loader from "../components/Loader"
import { Error } from "../components/Message"
import { useNavigate, useLocation } from "react-router-dom"

const LoginScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const redirect = location.search ? location.search.split("=")[1] : "/"

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, userInfo, error } = userLogin

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [userInfo, navigate, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login({ email, password }))
  }

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <div className="login100-pic js-tilt">
            <img
              src="https://smsoft.in/demo/schoolfile/images/img-01.png"
              alt="IMG"
            />
          </div>

          <form className="login100-form ">
            <h1 className="login100-form-title">Login</h1>
            {loading && <Loader />}
            {error && <Error text={error} />}

            <div className="wrap-input100 ">
              <input
                className="input100"
                type="email"
                name="email"
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
                value={email}
                autoComplete="on"
                placeholder="Email"
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-envelope" aria-hidden="true"></i>
              </span>
            </div>

            <div className="wrap-input100 validate-input">
              <input
                className="input100"
                type="password"
                name="password"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
                value={password}
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-lock" aria-hidden="true"></i>
              </span>
            </div>

            <div className="container-login100-form-btn">
              <button onClick={submitHandler} className="login100-form-btn">
                Login
              </button>
            </div>

            <div className="text-center p-t-136 anchor">
              <a className="txt2" href="/register">
                Create your Account
                <i
                  className="fa fa-long-arrow-right m-l-5"
                  aria-hidden="true"
                ></i>
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginScreen
