import { push } from 'svelte-spa-router'

export const toRegister = () => push('/register')
export const toLogin = () => push('/login')

export const toFirstAccess = () => push('/first-access')