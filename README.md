# StringMethods

Few methods for working with strings

## Install

```
npm install @lexriver/string-methods
```

## Import

``` typescript
import {StringMethods} from '@lexriver/string-methods'
import {StringMethods, LocaleSettings} from '@lexriver/string-methods'
```

## Methods

### `StringMethods.isDigits(x:string):boolean`

Checks if string contains only digits: 0123456790

``` typescript
StringMethods.isDigits('345') // true
```

<br/>

### `StringMethods.isValidEmail(x:any):boolean`

Simple check if string contains some text before @ and at least one dot and text after dot after @

``` typescript
StringMethods.isValidEmail('test@me.pls') // true
```

<br/>

### `StringMethods.getSimpleHash(value:string):number`

Get simple fast hash of a string
https://stackoverflow.com/questions/6122571/simple-non-secure-hash-function-for-javascript

``` typescript
StringMethods.getSimpleHash('test') === StringMethods.getSimpleHash('test') // true
StringMethods.getSimpleHash('test') === StringMethods.getSimpleHash('tset') // false
```

<br/>

### `StringMethods.formatPluralNumber(p)`

Get a nice string for plural number.

Arguments

```typescript
    StringMethods.formatPluralNumber(p:{
        number: number,
         settings: { // StringMethods.LocaleSettings type
            locale?:string, 
            ifZero:(x:number)=>any, 
            ifOne:(x:number)=>any,
            ifFew:(x:number)=>any,
            ifMany:(x:number)=>any
        }
    }
```

Example

```typescript
    let settings:StringMethods.LocaleSettings = {
        locale:'ru',
        ifZero:(x) => `товары не найдены`,
        ifOne:(x) => `${x} товар`,
        ifFew:(x) => `${x} товара`,
        ifMany:(x) => `${x} товаров`
   }

   StringMethods.formatPluralNumber({ number: 33, settings })) // 33 товара

```






