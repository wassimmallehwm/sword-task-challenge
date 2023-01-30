import * as Yup from 'yup';
import i18next from "i18next";

const validationSchema = Yup.object().shape({
    title: Yup.string()
        .required(i18next.t('validation.required', {
            field: i18next.t('title')
        })),
    summary: Yup.string()
        .required(i18next.t('validation.required', {
            field: i18next.t('summary')
        }))
        .max(2500, i18next.t('validation.maxLength', {
            field: i18next.t('summary'),
            max: '2500'
        })),
    isPerformed: Yup.boolean(),
    performedAt: Yup.string()
        .when("isPerformed", {
            is: true,
            then: Yup.string().required(i18next.t('validation.required', {
                field: i18next.t('performedAt')
            }))
        })

});

export default validationSchema