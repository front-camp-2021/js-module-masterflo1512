export function splitAndMerge(str = "", separator = "") {
    return str.split(' ').map(element => {
      return element.split('').join(separator + '') 
    }).join(' ');
  };