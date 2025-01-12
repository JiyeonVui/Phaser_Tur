/**
 * 
 * @param {never} value 
 */

export function exhausiveGuard(value){
    throw new Error(`Error! Reach forbidden guard function with unexpected value: ${JSON.stringify(value)}`);
}