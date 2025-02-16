import {createContext, useReducer} from 'react'

export const GoalsContext = createContext()

export const goalsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_GOALS' :
        return {
            goals: action.payload
        }
    case 'CREATE_GOAL' :
        return {
            goals: [action.payload, ...state.goals]
        }
    case 'DELETE_GOAL' :
            return{
                goals: state.goals.filter((g) => g._id !== action.payload._id)
            }

    case 'EDIT_GOAL': 
        console.log('Edit action payload:', action.payload); 
            return {
              goals: state.goals.map((goal) =>
                goal._id === action.payload._id ? action.payload : goal
              ),
            };

    default:
        return state
  }
}

export const GoalsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(goalsReducer, {
        goals: null,
    });

    return (
        <GoalsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </GoalsContext.Provider>
    );
};