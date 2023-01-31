import * as Yup from 'yup';
import i18next from "i18next";

const validationSchema = Yup.object().shape({
    username: Yup.string()
        .required(i18next.t('validation.required', {
            field: i18next.t('username')
        })),
    password: Yup.string()
        .required(i18next.t('validation.required', {
            field: i18next.t('password')
        })),

});

export default validationSchema