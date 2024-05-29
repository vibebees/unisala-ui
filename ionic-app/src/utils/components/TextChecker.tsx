import BannedText from "./BannedText"

const TextChecker = (text) => {
    for (var x = 0; x < BannedText.length; x++) {
        var regExp = new RegExp(BannedText[x])
        text = text.replace(regExp, "*".repeat(BannedText[x].length))
    }
    return text
}
export default TextChecker
