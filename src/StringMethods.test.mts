import { expect, test } from 'vitest'
import { StringMethods } from "./StringMethods.mjs"

test('plural', () => {
    let settings:StringMethods.LocaleSettings = {
        locale:'ru',
        ifZero:(x) => `товары не найдены`,
        ifOne:(x) => `${x} товар`,
        ifFew:(x) => `${x} товара`,
        ifMany:(x) => `${x} товаров`
   }
    
    expect(StringMethods.formatPluralNumber({ number: 0, settings })).toEqual(`товары не найдены`)
    expect(StringMethods.formatPluralNumber({ number: 1, settings })).toEqual(`1 товар`)
    expect(StringMethods.formatPluralNumber({ number: 2, settings })).toEqual(`2 товара`)
    expect(StringMethods.formatPluralNumber({ number: 4, settings })).toEqual(`4 товара`)
    expect(StringMethods.formatPluralNumber({ number: 5, settings })).toEqual(`5 товаров`)
    expect(StringMethods.formatPluralNumber({ number: 9, settings })).toEqual(`9 товаров`)
    expect(StringMethods.formatPluralNumber({ number: 10, settings })).toEqual(`10 товаров`)
    expect(StringMethods.formatPluralNumber({ number: 21, settings })).toEqual(`21 товар`)
    expect(StringMethods.formatPluralNumber({ number: 33, settings })).toEqual(`33 товара`)
    expect(StringMethods.formatPluralNumber({ number: 101, settings })).toEqual(`101 товар`)

})

test('supports every Intl plural category', () => {
    const settings:StringMethods.LocaleSettings = {
        locale:'ar',
        ifZero:() => 'zero',
        ifOne:() => 'one',
        ifTwo:() => 'two',
        ifFew:() => 'few',
        ifMany:() => 'many',
        ifOther:() => 'other'
    }

    expect(StringMethods.formatPluralNumber({ number: 0, settings })).toBe('zero')
    expect(StringMethods.formatPluralNumber({ number: 1, settings })).toBe('one')
    expect(StringMethods.formatPluralNumber({ number: 2, settings })).toBe('two')
    expect(StringMethods.formatPluralNumber({ number: 3, settings })).toBe('few')
    expect(StringMethods.formatPluralNumber({ number: 11, settings })).toBe('many')
    expect(StringMethods.formatPluralNumber({ number: 100, settings })).toBe('other')
})

test('uses other for English zero, plurals, and decimals', () => {
    const settings:StringMethods.LocaleSettings = {
        locale:'en',
        ifOne:(x) => `${x} item`,
        ifOther:(x) => `${x} items`
    }

    expect(StringMethods.formatPluralNumber({ number: 0, settings })).toBe('0 items')
    expect(StringMethods.formatPluralNumber({ number: 1, settings })).toBe('1 item')
    expect(StringMethods.formatPluralNumber({ number: 2, settings })).toBe('2 items')
    expect(StringMethods.formatPluralNumber({ number: 1.5, settings })).toBe('1.5 items')
})

test('falls back safely for legacy settings without other', () => {
    const settings:StringMethods.LocaleSettings = {
        locale:'en',
        ifZero:() => 'none',
        ifOne:(x) => `${x} item`,
        ifFew:(x) => `${x} items`,
        ifMany:(x) => `${x} items`
    }

    expect(StringMethods.formatPluralNumber({ number: 1.5, settings })).toBe('1.5 items')
})

test('simpleHash', () => {
    console.log('a=', StringMethods.getSimpleHash('a'))
    console.log('b=', StringMethods.getSimpleHash('b'))
    console.log('some string hoho=', StringMethods.getSimpleHash('some tsring hoho'))
    let anotherString = 'Well, here is some long simple text !@)#(_)@(#$%*_)$#(^+STDHIESNTDHICXMVBX<MCKBVREISNTH:WYFUPLNDTHW_)($_@#)(*%RENTHRSBVRLT'
    let anotherString2 = 'Well, here is some long simple text !@)#(_)@(#$%*_)$#(^+STDHIESNTDHICXMVBX<MCKBVREISNTH:WYFUPLNDTHW_)($_@#)(*%RENTHRSBVRLS'
    console.log(anotherString, StringMethods.getSimpleHash(anotherString))
    console.log(anotherString2, StringMethods.getSimpleHash(anotherString2))
    expect(StringMethods.getSimpleHash('qwfarszxc123')).toEqual(StringMethods.getSimpleHash('qwfarszxc123'))
    expect(StringMethods.getSimpleHash('qwfarszxc123!')).not.toEqual(StringMethods.getSimpleHash('qwfarszxc123'))
})

test('isDigits', () => {
    expect(StringMethods.isDigits('23423423524523478864')).toBeTruthy()
    expect(StringMethods.isDigits('234some34')).toBeFalsy()
    expect(StringMethods.isDigits('')).toBeFalsy()
})

test('isValidEmail', () => {
    expect(StringMethods.isValidEmail('arst@asrt.arst')).toBeTruthy()
    expect(StringMethods.isValidEmail('ast@st.d.rst.rs.std')).toBeTruthy()
    expect(StringMethods.isValidEmail('astst.d.rst.rs.std')).toBeFalsy()
    //expect(Data.isValidEmail('astst@.d.rst.rs.123')).toBeFalsy() // not working, ha ha
    expect(StringMethods.isValidEmail(123)).toBeFalsy()
    expect(StringMethods.isValidEmail(undefined)).toBeFalsy()
    expect(StringMethods.isValidEmail(null)).toBeFalsy()
    expect(StringMethods.isValidEmail(new Date())).toBeFalsy()
})
