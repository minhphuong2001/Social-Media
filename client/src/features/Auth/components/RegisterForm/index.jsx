import React from 'react'
import PropTypes from 'prop-types'
import { FastField, Form, Formik } from 'formik';
import InputField from '../../../../custom-field/InputField';
import { Button, FormGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import * as Yup from 'yup'
import "./register.scss"
import Loading from '../../../../components/Loading/Loading'

RegisterForm.propTypes = {
    onSubmit: PropTypes.func
}

RegisterForm.defaultProps = {
    onSubmit: null
}

function RegisterForm(props) {
    const { onSubmit } = props;

    const initialValues = {
        username: "",
        email: "",
        password: "",
        confirmPassword: ""

    }

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('')
            .min(8, 'Minimum of 8 characters')
            .max(20, 'Maximun of 20 characters')
            .matches(
                /^[a-zA-Z]{1}[a-zA-Z0-9_]{7,19}$/,
                "Username is not allowed to contain special characters."
            ),
        email: Yup.string()
            .required('')
            .email('This is not an email')
            .matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/),
        password: Yup.string()
            .required('')
            .min(6, 'Minimum of 8 characters')
            .max(20, 'Maximum of 20 characters')
            .matches(
                /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
                "Password must contain at least 1 special character"
            ),
        confirmPassword: Yup.string()
            .required('')
            .oneOf([Yup.ref('password'), null], 'Password incorrect.')
        
    });

    return (
        <div className="register">
            <h2>Register</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {
                    formikProps => {
                        const { values, isSubmitting } = formikProps;
                        console.log({values, isSubmitting});
                        return (
                            <Form>
                                <FastField
                                    name="username"
                                    component={InputField}

                                    placeholder="Enter username..."
                                    lable="Username"
                                />
                                <FastField
                                    name="email"
                                    component={InputField}

                                    placeholder="Enter email..."
                                    type="email"
                                    lable="Email"
                                />
                                <FastField
                                    name="password"
                                    component={InputField}

                                    placeholder="Enter password..."
                                    type="password"
                                    lable="Password"
                                />
                                <FastField
                                    name="confirmPassword"
                                    component={InputField}

                                    placeholder="Enter password again..."
                                    type="password"
                                    lable="Password"
                                />
                                
                                <FormGroup>
                                    <Button type="submit" color="primary" className="register-btn"> 
                                        {isSubmitting ? <Loading/> : 'Register'}
                                    </Button>
                                </FormGroup>
                            </Form>
                        )
                    }
                }
            </Formik>

            <div className="form-redirect">
                Already have an account?
                <Link to="/login">
                    <Button className="login-btn">
                        Login
                    </Button>
                </Link>
            </div>
        </div>
    )
}



export default RegisterForm

