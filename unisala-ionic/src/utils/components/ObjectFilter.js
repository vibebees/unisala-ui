const ObjectFilter = (object, targetValue) => {
  for (const key in object) {
    if (object[key] === targetValue) {
      delete object[key]
    }
  }
  return object
}

export default ObjectFilter
