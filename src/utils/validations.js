import * as yup from 'yup'
import { client } from '@utils/api'
import { easyPasswords } from './helpers'

export const hasString = (string, errorMsg = 'Campo obrigatório') => yup.object().shape({
    string: yup.string().required(errorMsg),
}).validateSync({ string })

export const isFullName = (name) => yup.string().matches(
    /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/g,
    'Digite um nome válido sem números e/ou símbolos'
).matches(
    /^(?:([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)) (?:([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*))$/g,
    'Seu nome precisa ter pelo menos um sobrenome'
).required('Digite seu nome completo').validateSync(name)

export const hasEmail = (email, errorMsg = 'Campo obrigatório', invalidMsg = 'Insira um e-mail válido') => yup.object().shape({
    email: yup.string().email(invalidMsg).required(errorMsg),
}).validateSync({ email })

export const hasUniqueEmail = async (email, errorMsg = 'Campo obrigatório', invalidMsg = 'Insira um e-mail válido', conflictMsg = 'E-mail já esta em uso') => {
    hasEmail(email, errorMsg, invalidMsg)
    try {
        await client(`/register?email=${email}`)
    } catch (err) {
        throw new Error(conflictMsg)
    }
}

export const isValidPassword = (password) =>
    yup.string().required('Digite uma senha')
        .test('len', 'Sua senha deve ter no mínimo 6 caracteres', val => val.length >= 6)
        .test('easy', 'Use uma senha mais forte', val => !easyPasswords.includes(val)).validateSync(password)

export const hasNumber = (number, errorMsg = 'Campo obrigatório') => yup.object().shape({
    number: yup.number().positive(errorMsg).required(errorMsg),
}).validateSync({ number: Number(number) })

export const optionalNumber = (number, errorMsg = 'Campo precisa ser um número') => number ? yup.object().shape({
    number: yup.number(errorMsg),
}).validateSync({ number }) : true

export const optionalString = (string, errorMsg = 'Campo precisa ser uma string') => string ? yup.object().shape({
    string: yup.string(errorMsg),
}).validateSync({ string }) : true