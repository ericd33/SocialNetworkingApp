import { useState } from "react"
import { useDispatch } from "react-redux"
import { getMyUser } from "../../../../Redux/actions"

export function useLocalStorage(key, initialValue) {
    const dispatch = useDispatch()
    const [storedValue, setStoredValue] = useState(()=>{
        try{
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item) : initialValue
        }catch(e){
            return initialValue
        }
    })

    const setValue = value => {
        try{
            setStoredValue(value)
            window.localStorage.setItem(key, JSON.stringify(value))
            let user =dispatch(getMyUser(value))
            setTimeout(()=>{localStorage.setItem(
                'user',JSON.stringify(user)
                )},'500')
        }catch(e){
          }
    }

    return [storedValue, setValue]
}