/**
 * This function returns the pathname based on the index you provide which is relative to '/'
 * for example: in  /space/test, index 0 returns space, index 1 returns test

 * @param {number} index
 * @returns {string} pathname.
 */

export const usePathName = (index) => {
  let currPath = window.location.pathname.split("/").filter((str) => str !== "")
  const selectedSegment = currPath[index] || ""

  return selectedSegment
}
