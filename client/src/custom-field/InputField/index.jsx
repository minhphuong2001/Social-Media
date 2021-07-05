import React from 'react'
import PropTypes from 'prop-types'
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap'

function InputField(props) {

    const { field, form, type, lable, placeholder, disabled } = props;
    const { name } = field;
    const { errors, touched } = form;
    const showError = errors[name] && touched[name];

    const style = {
        margin: "10px 0"
    }

    return (
        <FormGroup>
            {lable && <Label for={name}>{lable}</Label>}
            <Input
                style={style}
                id={name}
                name={name}
                {...field}

                type={type}
                placeholder={placeholder}
                disabled={disabled}
                invalid={!!showError}
            />
            {showError && <FormFeedback>{errors[name]}</FormFeedback>}
        </FormGroup>
    )
}

InputField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    type: PropTypes.string,
    lable: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool
}

InputField.defaultProps = {
    type: 'text',
    label: '',
    placeholder: '',
    disabled: false
}

export default InputField;

