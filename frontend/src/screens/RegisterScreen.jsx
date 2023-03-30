import React, { useEffect, useState } from "react"
import "./registerScreen.css"

import { useSelector, useDispatch } from "react-redux"
import Loader from "../components/Loader"
import { Error } from "../components/Message"
import { useNavigate, useLocation } from "react-router-dom"
import { register } from "../features/users/userRegisterSlice"

const RegisterScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const redirect = location.search ? location.search.split("=")[1] : "/"

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confPassword, setConfPassword] = useState("")
  const [text, setText] = useState(null)

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, userInfo, error } = userRegister

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [userInfo, navigate, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confPassword) {
      setText("passwords do not match")
    } else {
      dispatch(register({ name, email, password }))
    }
  }

  return (
    <div className="limiter">
      <div className="container-register100">
        <div className="wrap-register100">
          <div className="register100-pic js-tilt">
            <img
              src="https://smsoft.in/demo/schoolfile/images/img-01.png"
              alt="IMG"
            />
          </div>

          <form className="register100-form ">
            <h1 className="register100-form-title">Register</h1>
            {loading && <Loader />}
            {error && <Error text={error} />}
            {text && <Error text={text} />}

            <div className="wrap-input100 ">
              <input
                className="input100"
                type="text"
                name="name"
                onChange={(e) => {
                  setName(e.target.value)
                }}
                value={name}
                autoComplete="on"
                placeholder="Name"
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa-solid fa-user" aria-hidden="true"></i>
              </span>
            </div>

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

            <div className="wrap-input100 validate-input">
              <input
                className="input100"
                type="password"
                name="confPassword"
                placeholder="Confirm Password"
                onChange={(e) => {
                  setConfPassword(e.target.value)
                }}
                value={confPassword}
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-lock" aria-hidden="true"></i>
              </span>
            </div>

            <div className="container-register100-form-btn">
              <button onClick={submitHandler} className="register100-form-btn">
                Register
              </button>
            </div>

            <div className="text-center p-t-136 anchor">
              <a className="txt2" href="/login">
                Sign In if you already have an account
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

export default RegisterScreen
