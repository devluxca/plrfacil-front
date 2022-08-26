import { wrap } from "svelte-spa-router/wrap"

export const routes = {
    '/login': wrap({
        asyncComponent: () => import('../pages/auth/login/Login.svelte')
    }),
    '/register': wrap({
        asyncComponent: () => import('../pages/auth/register/Register.svelte')
    }),
    '/first-access': wrap({
        asyncComponent: () => import('../pages/first-access/FirstAccess.svelte')
    })
}