import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import "./footer.css"

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col>Copyright &copy; REBOUND</Col>
          <Col className="contact-links" md={12}>
            <p className="copyright-text">Contact Us </p>
            <span>
              <a href="www.instagram.com">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="www.facebook.com">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="www.twitter.com">
                <i className="fa-brands fa-twitter"></i>
              </a>
              <a href="www.gmail.com">
                <i className="fa-regular fa-envelope"></i>
              </a>
            </span>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
