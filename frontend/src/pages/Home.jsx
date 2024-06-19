import { useEffect } from "react"
import { useWorkoutContext } from "../hooks/useWorkoutContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"

function Home() {
    const { workouts, dispatch } = useWorkoutContext()
    const { user } = useAuthContext()

    useEffect(() => {
        async function fetchWorkouts() {
            const response = await fetch('http://localhost:4000/api/workouts', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: 'SET_WORKOUTS', payload: json })
            }
        }
        if (user) {
            fetchWorkouts()
        }
    }, [dispatch, user])

    return (
        <div className='home'>
            <div className='workouts'>
                {workouts && workouts.map(workout => (
                    <WorkoutDetails key={workout._id} workout={workout} />
                ))}
            </div>

            <WorkoutForm />
        </div>
    )
}

export default Home