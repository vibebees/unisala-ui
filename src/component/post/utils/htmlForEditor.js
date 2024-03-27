export const htmlForEditor = (postText, type, value) => {
  const typeRegex = new RegExp(`<h3>\\s*${type}\\s*:.*?<\\/h3>`, "g")
  const newText = `<h3> ${type} : <span> ${value} </span></h3>`
  let universityLink
  const checkIfUni = type.split(" ")[0].toLowerCase() === "university"
  if (checkIfUni) {
    value = value.toUpperCase()
    universityLink = `<a> ${type} : <a href="/university/${value}"> ${value} </a></a>`
  }
  if (value.trim() === "") {
    return postText.replace(typeRegex, "")
  }

  if (postText?.includes(type)) {
    if (checkIfUni) {
      return postText.replace(typeRegex, universityLink)
    }
    return postText.replace(typeRegex, newText)
  } else {
    if (checkIfUni) {
      return postText ? postText + universityLink : universityLink
    }
    return postText ? postText + newText : newText
  }
}
