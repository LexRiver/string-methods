export module StringMethods{
    /**
     * Checks if string contains only digits: 0123456790
     * @param x 
     */
    export function isDigits(x:string):boolean{
        return /^\d+$/.test(x)
    }

    /**
     * Simple check if string contains some text before @ and at least one dot and text after dot after @
     * @param x 
     */
    export function isValidEmail(x:any){
        return typeof x === 'string' && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(x)
    }

    /**
     * get simple fast hash of a string
     * https://stackoverflow.com/questions/6122571/simple-non-secure-hash-function-for-javascript
     * @param value 
     */
    export function getSimpleHash(value:string):number{
        var hash = 0;
        if (value.length == 0) {
            return hash;
        }
        for (var i = 0; i < value.length; i++) {
            var char = value.charCodeAt(i);
            hash = ((hash<<5)-hash)+char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    }


    export type LocaleSettings = {
        locale?:string, 
        ifZero:(x:number)=>any, 
        ifOne:(x:number)=>any,
        ifFew:(x:number)=>any,
        ifMany:(x:number)=>any
    }


    export function formatPluralNumber(p:{
        number:number,
        settings:LocaleSettings
    }){
        if(p.number == 0) {
            return p.settings.ifZero(p.number)
        }
        const sentenceType = new Intl.PluralRules(p.settings.locale).select(p.number)
        switch(sentenceType){
            case 'one': return p.settings.ifOne(p.number)
            case 'few': return p.settings.ifFew(p.number)
            case 'many': return p.settings.ifMany(p.number)
            default: throw new Error()
        }

    }



}