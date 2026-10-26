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


    export type PluralNumberFormatter = (x:number)=>any

    type PluralCategorySettings = {
        locale?:string,
        ifZero?:PluralNumberFormatter,
        ifOne?:PluralNumberFormatter,
        ifTwo?:PluralNumberFormatter,
        ifFew?:PluralNumberFormatter,
        ifMany?:PluralNumberFormatter,
        ifOther?:PluralNumberFormatter
    }

    export type LocaleSettings = PluralCategorySettings & (
        { ifOther:PluralNumberFormatter } |
        {
            ifZero:PluralNumberFormatter,
            ifOne:PluralNumberFormatter,
            ifFew:PluralNumberFormatter,
            ifMany:PluralNumberFormatter
        }
    )


    export function formatPluralNumber(p:{
        number:number,
        settings:LocaleSettings
    }){
        if(p.number == 0 && p.settings.ifZero) {
            return p.settings.ifZero(p.number)
        }

        const pluralCategory = new Intl.PluralRules(p.settings.locale).select(p.number)
        const categoryHandlers:Partial<Record<Intl.LDMLPluralRule, PluralNumberFormatter>> = {
            zero:p.settings.ifZero,
            one:p.settings.ifOne,
            two:p.settings.ifTwo,
            few:p.settings.ifFew,
            many:p.settings.ifMany,
            other:p.settings.ifOther
        }
        const handler = categoryHandlers[pluralCategory]
            ?? p.settings.ifOther
            ?? p.settings.ifMany
            ?? p.settings.ifFew
            ?? p.settings.ifTwo
            ?? p.settings.ifOne
            ?? p.settings.ifZero

        if(!handler) {
            throw new Error(`No plural formatter available for category "${pluralCategory}"`)
        }
        return handler(p.number)

    }



}