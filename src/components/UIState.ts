import { writable } from "svelte/store";

interface UIStateType {
    useRelativeTime: boolean
}

export const UIState = writable<UIStateType>(<any>{})
export type UIStateStore = typeof UIState

export default UIState