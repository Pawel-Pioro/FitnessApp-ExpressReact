import { useWorkoutContext } from "../hooks/useWorkoutContext"
import { useAuthContext } from "../hooks/useAuthContext"
import { useState } from "react"

import formatDistanceToNow from 'date-fns/formatDistanceToNow'

function WorkoutDetails({ workout }) {
    const { dispatch } = useWorkoutContext()
    const { user } = useAuthContext()

    const [isUpdating, setIsUpdating] = useState(null)
    const [updatingFields, setUpdatingFields] = useState({
        "title": "",
        "load": "",
        "reps": ""
    })
    console.log
    async function handleClick() {
        if (!user) {
            return
        }

        const response = await fetch('http://localhost:4000/api/workouts/' + workout._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'DELETE_WORKOUT', payload: json })
        }
    }

    function handleEditClick(workoutInput) {
        setIsUpdating(workoutInput._id)
        setUpdatingFields({
            "title": workoutInput.title,
            "reps": workoutInput.reps,
            "load": workoutInput.load
        })
    }
    
    async function handleSaveEdit(){
        const response = await fetch(`http://localhost:4000/api/workouts/${isUpdating}`, {
            method: 'PATCH',
            body: JSON.stringify(updatingFields),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()
        
        if (response.ok){
            setIsUpdating(null)
            setUpdatingFields({
                "title": "",
                "load": "",
                "reps": ""
            })
            dispatch({ type: 'UPDATE_WORKOUT', payload: json })
        }
    }

    return (
        <div className="workout-details">
            { isUpdating === null ?
            <div>
                <h4>{workout.title}</h4>
                <p><strong>Load (kg): </strong>{workout.load}</p>
                <p><strong>Reps: </strong>{workout.reps}</p>
                <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
                <span className="material-symbols-outlined" style={{marginRight: 50}} onClick={() => {handleEditClick(workout)}}>edit</span>
                <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
            </div>
            :
            <div>
                <p><strong>Title: </strong></p>
                <input type="text" onChange={(e) => setUpdatingFields({...updatingFields, title: e.target.value})} value={updatingFields.title}></input>
                <p><strong>Load (kg): </strong></p>
                <input type="number" onChange={(e) => setUpdatingFields({...updatingFields, load: e.target.value})} value={updatingFields.load}></input>
                <p><strong>Reps: </strong></p>
                <input type="number" onChange={(e) => setUpdatingFields({...updatingFields, reps: e.target.value})}  value={updatingFields.reps}></input>
                <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
                <span className="material-symbols-outlined" onClick={handleSaveEdit}>save</span>
            </div>
            }
        </div>
    )
}

export default WorkoutDetails