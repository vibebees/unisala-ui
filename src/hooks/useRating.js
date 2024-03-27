import useCountConverter from "./useCountConverter"

const useRating = (data) => {
    const votes =
        Array.isArray(data) &&
        data &&
        data?.reduce((total, num) => total + num.votes, 0)

    const ratings = (Array.isArray(data) && (data?.reduce((total, num) => total + num.rating * num.votes, 0)) / votes).toFixed(2)
    return `${Number(ratings) || 0} . ${useCountConverter(votes)}`
}
export default useRating
