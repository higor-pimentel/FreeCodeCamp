/*
 * action types
 */

export const ADD_TODO = 'ADD_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
}

/*
 * action creators
 */

export const function addTodo(text) {
    return { type: ADD_TODO, text}
} 

export const function toggleTodo(index) {
    return { type: TOGGLE_TODO. index }
}

export const function setVisibilityFilter(filter){
    return { type: SET_VISIBILITY_FILTER, filter }
}