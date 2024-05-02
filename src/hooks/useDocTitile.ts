import { useEffect } from "react"

const useDocTitle = (title ="Unisala") => {
    useEffect(() => {
        document.title = title
    }, [title])
}

export default useDocTitle
