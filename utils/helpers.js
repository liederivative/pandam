 // * @name Object.prototype.inArray
 // * @description Extend Object prototype within inArray function
 // *
 // * @param {mix}    needle       - Search-able needle
 // * @param {bool}   searchInKey  - Search needle in keys?
 // *
 // */
Object.defineProperty(Object.prototype, 'searchString',{

    value: function(needle, searchInKey, giveObjBack){

        var object = this;

        if( Object.prototype.toString.call(needle) === '[object Object]' || 
            Object.prototype.toString.call(needle) === '[object Array]'){
            needle = JSON.stringify(needle);
        }
        var method = (giveObjBack)?'filter':'some';
        return Object.keys(object)[method](function(key, index){

            var value = object[key];
            var objToReturn = {} 

            if( Object.prototype.toString.call(value) === '[object Object]' || 
                Object.prototype.toString.call(value) === '[object Array]'){
                value = JSON.stringify(value);
            }

            objToReturn[key] = value;
            var returnVal = (giveObjBack)?objToReturn:true;
            if(searchInKey){
                if(value === needle || key === needle || key.indexOf(needle) > -1 ){
                    // console.log(returnVal)
                return returnVal
                }
            }else {
                if(value === needle){
                    return returnVal
                }
            }
        });
    },
    writable: true,
    configurable: true,
    enumerable: false
});


 // * @name Object.prototype.Object
 // * @description Filter Object with predicate
 // *
 // * @param {Obj}    obj       - Object to be searched
 // * @param {predicate}   predicate  - function to evaluate key
 // *
 // */

Object.filter = (obj, predicate) => {
    let tmp = Object.assign(Object.keys(obj)
                    .filter( key => predicate(key) )
                    .map( key => ({ [key]: obj[key] }) ) );
    return (tmp.length)?Object.assign(...tmp):{};
}
