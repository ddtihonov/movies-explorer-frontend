import { useCallback, useState } from 'react';


export const FormValidation = () =>{

    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

    const handleChange = useCallback((evt) => {
        const name = evt.target.name
        const value = evt.target.value
        const form = evt.target.closest("form")
        setValues({ ...values, [name]: value })
        setErrors({ ...errors, [name]: evt.target.validationMessage })
        // если колич. элементов формы минус 1 (т.е. button) === длине массива инпутов
        if ((form.elements.length - 1) === Object.keys(values).length) {
          // checkValidity возвр. true-false
            setIsValid(form.checkValidity())
        }
    },
        [errors, values]
    )

    const resetForm = useCallback((newErrors = {}, newIsValid = false) => {
        setErrors(newErrors);
        setIsValid(newIsValid);
    },
        // useCallback вернёт мемоиз-ю версию колбэка при изме одной из зависимостей
        [setErrors, setIsValid]
    )

    return { values, handleChange, resetForm, errors, isValid };
}