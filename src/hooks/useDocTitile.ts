import { useEffect } from "react"

const useDocTitle = (title) => {
    useEffect(() => {
        document.title = title
    }, [title])
}

export default useDocTitle
