import ky from 'ky'

export const BASE_URL_API = 'http://localhost:3001/api/v1'

export const client = (path, options = {}) =>
    ky(`${BASE_URL_API}${path}`, {
        ...options,
    })