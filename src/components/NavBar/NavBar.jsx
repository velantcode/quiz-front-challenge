import React from 'react';
import { Container, Nav, Navbar as NavBarRB } from 'react-bootstrap';
import { FiCheckSquare } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import { removeSession } from '../../redux/actions/session.actions';
import { quizAddUserList } from '../../redux/actions/quiz.actions';

export default function NavBar () {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { session, quiz } = useSelector(state => state);

  const logout = () => {
    if (!quiz?.quizDetails) {
      dispatch(removeSession());
      dispatch(quizAddUserList([]));
      navigate('/');
    }
  }
  return (

    <header className="mb-4">
      <NavBarRB  bg="primary" variant="dark" sticky="top" expand="md" collapseOnSelect={true}>
        <Container>
          <ItemLink to="/">
            <NavBarRB.Brand className={quiz?.quizDetails ? 'disabled-click' : undefined}>
              <FiCheckSquare/>{' '}Quiz
            </NavBarRB.Brand>
          </ItemLink>
          <NavBarRB.Toggle aria-controls="basic-navbar-nav" />
          <NavBarRB.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <ItemLink to="/">
                <Nav.Link className={quiz?.quizDetails ? 'disabled-click' : undefined}>Inicio</Nav.Link>
              </ItemLink>
              {
                session &&
                <>
                  <ItemLink to="/mis-quiz">
                    <Nav.Link className={quiz?.quizDetails ? 'disabled-click' : undefined}>Mis Quiz</Nav.Link>
                  </ItemLink>
                  <li className="nav-item">
                    <span aria-hidden="true" className="nav-link pointer-event" onClick={logout}>Salir</span>
                  </li>
                </>
              }
              {
                !session &&
                <>
                  <ItemLink to="/acceder">
                    <Nav.Link>Acceder</Nav.Link>
                  </ItemLink>
                  <ItemLink to="/registro">
                    <Nav.Link>Registrarse</Nav.Link>
                  </ItemLink>
                </>
              }
            </Nav>
          </NavBarRB.Collapse>
        </Container>
      </NavBarRB>
    </header>
  )
}

const ItemLink = ({ to, children }) => (
  <LinkContainer to={to}>
    {children}
  </LinkContainer>
)
