import React, { useEffect } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import './auth.scss'
import {useSelector, useDispatch} from 'react-redux'
import authApi from '../../api/authApi'
import {LOCAL_STORAGE_TOKEN_NAME} from '../../constants/global'
import {getUser} from './authSlice'
import ProtectedRoute from '../../components/routing/ProtectedRoute'
// import Loading from '../../components/Loading/Loading'

function Auth() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { authLoading, isAuthenticated } = useSelector(state => state.auth);
    console.log({ authLoading, isAuthenticated });

    useEffect(() => {
        if (isAuthenticated)
            history.push('/home');
    }, [history, isAuthenticated]);
    
    const handleLoginSubmit = async (values, actions) => {
        try {
            const formSubmit = { ...values };

            const dataLogin = await authApi.login(formSubmit);
            console.log(dataLogin);

            if (dataLogin.success) {
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, dataLogin.accessToken);

                await dispatch(getUser());

                history.push('/home');
            } else {
                console.log(dataLogin.message);
                actions.resetForm({
                    values: {
                        username: values.username,
                        password: ''
                    },
                    errors: {
                        username: dataLogin.message
                    },
                    touched: {
                        username: true
                    }
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleRegisterSubmit = async (values, actions) => {
        try {
            const registerData = await authApi.register(values);

            if (registerData.success) {
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, registerData.accessToken)
                await dispatch(getUser());
                history.push('/login');
            }
            else {
                console.log(registerData.message);
                actions.resetForm({
                    values: {
                        username: values.username,
                        email: values.email,
                        password: '',
                        confirmPassword: ''
                    },
                    errors: {
                        username: registerData.message
                    },
                    touched: {
                        username: true
                    }
                })
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const body = authLoading ? (
        <div>Loading</div>
    ) : (
        <Container fluid={true}>
            <div className="auth">
                <Row>
                    <Col md="6" lg="6" className="auth-bgc">
                        <h1>Min Social</h1>
                        <img src="https://giaiphapseo.com/wp-content/uploads/2019/05/image3-11.png" alt="" className="bgc-login"/>
                    </Col>
                    <Col md="6" lg="6">
                        <div className="auth-form">
                            <Switch>
                                <Route path="/login" render={props => <LoginForm {...props} onSubmit={handleLoginSubmit} />}></Route>
                            <Route path="/register" render={props => <RegisterForm {...props} onSubmit={handleRegisterSubmit} />}></Route>
                            </Switch>
                        </div>
                    </Col>
                </Row>
            </div>
        </Container>
    )

    return body;
        
}

export default Auth;
