const useIsEmpty = (data, string) => {
  return !Object.values(data).some((x) =>
    x && typeof x === "object" && x.constructor === Object
      ? !useIsEmpty(x, string)
      : true && Array.isArray(x)
      ? x.some((item) => !useIsEmpty(item, string))
      : true && x !== null && x !== "" && x !== -1 && x !== string
  )
}
export default useIsEmpty
