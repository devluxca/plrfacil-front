import { wrap } from "svelte-spa-router/wrap"

import { Login, Register } from '@pages/auth'

export const routes = {
    '/login': wrap({
        component: Login
    }),
    '/register': wrap({
        component: Register
    })
}