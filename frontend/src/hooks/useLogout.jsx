import { useAuthContext } from "./useAuthContext"
import { useWorkoutContext } from "./useWorkoutContext"

export function useLogout() {
    const { dispatch } = useAuthContext()
    const { dispatch: workoutDispatch } = useWorkoutContext()

    const logout = () => {
        // remove user from local storage
        localStorage.removeItem('user')

        // dispatch logout action
        dispatch({ type: 'LOGOUT' })
        workoutDispatch({ type: 'SET_WORKOUTS', payload: null })
    }

    return { logout }
}