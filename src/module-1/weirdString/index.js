export const weirdString = (str = "") => {
    return str
    .split(' ')
    .map(element => element.slice(0,-1).toUpperCase() + element.slice(-1).toLowerCase())
    .join(' '); 

};

