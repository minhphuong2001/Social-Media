import React from 'react'
import {FastField, Form, Formik} from 'formik'
import {Button, FormGroup} from 'reactstrap'
import {Link} from 'react-router-dom'
import InputField from '../../../../custom-field/InputField'
import PropTypes from 'prop-types'
import * as Yup from 'yup'
import './login.scss'
import Loading from '../../../../components/Loading/Loading'

LoginForm.propTypes = {
    onSubmit: PropTypes.func
}

LoginForm.defaultProps = {
    onSubmit: null
}

export default function LoginForm(props) {

    const { onSubmit } = props;
    const initialValues = {
        username: '',
        password: '',
    }

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required("")
            .min(8, 'Minimum of 8 characters')
            .max(20, 'Maximun of 20 characters')
            .matches(
                /^[a-zA-Z]{1}[a-zA-Z0-9_]{7,19}$/,
                "Username is not allowed to contain special characters."
        ),
        password: Yup.string()
            .required("")
            .min(6, 'Minimum of 8 characters')
            .max(20, 'Maximum of 20 characters')
            // .matches(
            //     /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
            //     "Password must contain at least 1 special character"
            // )
    })

    return (
        <div className="login-form">
            <h2>Login</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {formikProps => {
                    const { isSubmitting } = formikProps;
                    // console.log({ values, isSubmitting });
                    
                    return (
                        <Form>
                            <FastField
                                name="username"
                                component={InputField}
                                className="fast-field"

                                lable="Username"
                                placeholder="Enter username..."
                            />

                            <FastField
                                name="password"
                                component={InputField}
                                className="fast-field"

                                lable="Password"
                                type="password"
                                placeholder="Enter password..."
                            />

                            <FormGroup>
                                <Button type="submit" color="primary" className="login-btn">
                                    {isSubmitting ? <Loading/> : 'Login'}
                                </Button>
                            </FormGroup>
                        </Form>
                    )
                }}
            </Formik>
            
            <div className="form-register" color="success">
                Don't have an account?
                <Link to="/register">
                    <Button className="register-btn">
                        Create a New Account
                    </Button>
                </Link>
            </div>
        </div>
    )
}
