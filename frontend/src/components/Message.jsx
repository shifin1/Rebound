import React from "react"
import "./message.css"

const Plain = ({ text }) => {
  return (
    <div className="bar">
      <i className="ico">&#9728;</i> {text}
    </div>
  )
}

const Info = ({ text }) => {
  return (
    <div style={{ color: "blue" }} className="bar info">
      <i className="ico">&#8505;</i> {text}
    </div>
  )
}

const Success = ({ text }) => {
  return (
    <div style={{ color: "green" }} className="bar success">
      <i className="ico">&#10004;</i> {text}
    </div>
  )
}

const Warning = ({ text }) => {
  return (
    <div style={{ color: "yellow" }} className="bar warn">
      <i className="ico">&#9888;</i> {text}
    </div>
  )
}

const Error = ({ text }) => {
  return (
    <div style={{ color: "red" }} className="bar error">
      <i className="ico">&#9747;</i> {text}
    </div>
  )
}

export { Plain, Info, Success, Warning, Error }
