/* eslint-disable immutable/no-let */
import { readable } from 'svelte/store'

export const useState = (initialState = null) => {
    let set
    const store = readable(initialState, se => { set = se })

    store.subscribe(() => { })
    return [store, set]
}