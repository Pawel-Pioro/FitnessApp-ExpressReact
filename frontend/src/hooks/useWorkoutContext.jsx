import { WorkoutsContext } from "../context/WorkoutContext";
import { useContext } from "react";

export function useWorkoutContext() {
    const context = useContext(WorkoutsContext)

    if (!context) {
        throw Error('useWorkoutsContext must be used within a WorkoutsContextProvider')
    }

    return context
}