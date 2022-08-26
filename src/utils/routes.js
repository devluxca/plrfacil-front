import { push } from 'svelte-spa-router'

export const toRegister = () => push('/register')
export const toLogin = () => push('/login')