function get(obj, property, defaultValue){
  let arr = property.split('.')
  if (property === '' || !obj) {
     return defaultValue
  }
  let result = obj
  for (let i = 0, len = arr.length; i<len; i++){
     try {
         if (result[arr[i]]){
            result = result[arr[i]]
         } else {
            return defaultValue
         }
     } catch(e) {
         console.log(e)
         return defaultValue
     }
  }
  return result
}
const obj = { a: { b: {c: {d:1}}}}
console.log(get(obj, 'a.b.c.d', 32))