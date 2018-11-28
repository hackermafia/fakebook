//
//Small functions
//

//Collapses if false
export const collapse = (x, y) => x ? x : y;

//Removes timestamp
export const splitOnUnderscore = (string) => string.split('_');

//Flatten arrays
export const flattenArray = (arr) => arr.reduce((a, b) => a.concat(b));

//Creates a random ID that is always unique
export const generateID = () => '_' + Math.random().toString(36).substr(2, 9);

//Converts Normal Strings to kebab-case
export const stringToKebab = (string) => string.split(" ").join("-").toLowerCase();

//Converts Kebab-case strings to Normal strings
export const kebabToString = (string) => string.split("-").join(" ");

//Returns a random element from an array
export const returnRandomArrayElement = (array) => array[Math.floor(Math.random() * array.length)];

//Pascal to Kebab Case
export const pascalToKebab = (str) => str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase();

//Kebab Case to Came Case
export const kebabToCamel = (s) => s.replace(/-\w/g, (m) => m[1].toUpperCase());

//Kebab to Pascal
export const kebabToPascal = (s) => capitalizeFirstChar(kebabToCamel(s))

//Converts an object into an array
export const objectToArray = (object) => Object.keys(object).map(key => object[key]);

//converts object to array while keeping the attributes names
export const objectToArrayWithKeys = (object, k = 'key', v = 'value') => Object.keys(object).map(key => {
    let obj = {}; obj[k] = key; obj[v] = object[key]; return obj;
});

//Finds the position of a letter or word in a given string
export const findPositionInString = (string, param) => string.search(param);

//Switches the positiion of the words in a two-word string
export const switchWords = (string) => { const regExp = /^(\S+)\s+(\S+)$/; return string.replace(regExp, '$2 $1') };

//Converts Normal Strings to cameCase
export const stringToCamel = (s) => s.toLowerCase().trim().split(/[.\-_\s]/g).reduce((s, wrd) => s + wrd[0].toUpperCase() + wrd.slice(1));

//converts snake_case to camelCase
export const snakeToCamel = (s) => s.replace(/(_\w)/g, function (m) { return m[1].toUpperCase(); });

//converts snake_case to Normal String
export const snakeToString = (s) => camelToString(snakeToCamel(s))

//Campitalize first leter in String
export const capitalizeFirstChar = (s) => s[0].toUpperCase() + s.substr(1);

//Converts Normal String to PascalCase
export const stringToPascal = (s) => capitalizeFirstChar(stringToCamel(s));

//Converts camelCase to PascalCase
export const camelToPascal = (s) => capitalizeFirstChar(s);

//Gets URL path at index
export const getUrlPathAtPosition = (i) => window.location.href.split('/').splice(2 + i)[0]

//Converts camelCase to Normal String
export const camelToString = (s) => s.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) { return str.toUpperCase(); })

export const uniqueArrayOfObjects = (myArr, prop) => myArr.filter((obj, pos, arr) => arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos)

//Validates that the name has no reseved keywords
export const isValidName = (string) => !Boolean(string.match(/group|this|version|name|_/gi))