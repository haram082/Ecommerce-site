import "./footer.css"
import { Link } from "react-router-dom"
import { Row, Col, Container, ListGroup, ListGroupItem} from "reactstrap"
import logo from "../../assets/images/eco-logo.png"

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="4">
          <div className="logo d-flex gap-2">
          <img src={logo} alt="" />
            <h3 className="text-white">Haram's Shop</h3>
        </div>
        <p className="footer__text">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus est odio soluta odit! Odio architecto reprehenderit iure, voluptate accusamus aut.
          </p>
          </Col>

          <Col lg="3">
          <div className="footer-quick-links">
            <h4 className="quick_link"> Top Categories</h4>
            <ListGroup className="mb-3">
              <ListGroupItem className="ps-0 border-0">
                <Link to="shop/bathroom">Bathroom</Link>
              </ListGroupItem>
              <ListGroupItem className="ps-0 border-0">
                <Link to="shop/furniture">Furniture</Link>
              </ListGroupItem>
              <ListGroupItem className="ps-0 border-0">
                <Link to="shop/kitchen">Kitchen</Link>
              </ListGroupItem>
              <ListGroupItem className="ps-0 border-0">
                <Link to="shop/mobile">Mobile Phone</Link>
              </ListGroupItem>
              <ListGroupItem className="ps-0 border-0">
                <Link to="shop/laptop">Laptop</Link>
              </ListGroupItem>
            </ListGroup>
          </div>
          </Col>

          <Col lg="2">
          <div className="footer-quick-links">
            <h4 className="quick_link"> Useful Links</h4>
            <ListGroup className="mb-3">
              <ListGroupItem className="ps-0 border-0">
                <Link to="shop">Shop</Link>
              </ListGroupItem>
              <ListGroupItem className="ps-0 border-0">
                <Link to="cart">Cart</Link>
              </ListGroupItem>
              <ListGroupItem className="ps-0 border-0">
                <Link to="privacy-policy">Privacy Policy</Link>
              </ListGroupItem>
              <ListGroupItem className="ps-0 border-0">
                <Link to="terms-conditions">Terms & Conditions</Link>
              </ListGroupItem>
            </ListGroup>
          </div>

          </Col>
          <Col lg="3">
          <div className="footer-quick-links">
            <h4 className="quick_link"> Contact</h4>
            <ListGroup className="mb-3">
              <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-3">
                <span><i className="fa fa-map-marker" aria-hidden="true"></i></span>
                <p> 123 1st Avenue <br/>Los Angeles, CA 91393</p>
              </ListGroupItem>
              <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-3">
                <span><i className="fa fa-phone-square" aria-hidden="true"></i></span>
              <p> +1 (213) 234 456</p>

              </ListGroupItem>
              <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-3">
                <span><i className="fa fa-envelope" aria-hidden="true"></i></span>
                <p> example123@gmail.com</p>
              </ListGroupItem>
             
            </ListGroup>
          </div>
          </Col>

        <Col lg="12">
          <p className="footer__copyright">Copyright <i className="fa fa-copyright" aria-hidden="true"></i> {year} developed by Haram Yoon. All rights reserved.</p>
         </Col>
        
         
        </Row>
      </Container>
    </footer>
  )
}


export default Footer
