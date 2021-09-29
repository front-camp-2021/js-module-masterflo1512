export function cutStrings (arr = []) {
    
    function getStringLength(str) {
        return str.length;
    }

    function cutOneString(str) {
        return str.slice(0, shortestLength);
    }

    const stringLengths = arr.map(getStringLength)
    const shortestLength = Math.min(...stringLengths)

    return arr.map(cutOneString)
}
