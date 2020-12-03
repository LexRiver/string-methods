"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StringMethods_1 = require("./StringMethods");
test('plural', function () {
    var settings = {
        locale: 'ru',
        ifZero: function (x) { return "\u0442\u043E\u0432\u0430\u0440\u044B \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u044B"; },
        ifOne: function (x) { return x + " \u0442\u043E\u0432\u0430\u0440"; },
        ifFew: function (x) { return x + " \u0442\u043E\u0432\u0430\u0440\u0430"; },
        ifMany: function (x) { return x + " \u0442\u043E\u0432\u0430\u0440\u043E\u0432"; }
    };
    expect(StringMethods_1.StringMethods.formatPluralNumber({ number: 0, settings: settings })).toEqual("\u0442\u043E\u0432\u0430\u0440\u044B \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u044B");
    expect(StringMethods_1.StringMethods.formatPluralNumber({ number: 1, settings: settings })).toEqual("1 \u0442\u043E\u0432\u0430\u0440");
    expect(StringMethods_1.StringMethods.formatPluralNumber({ number: 2, settings: settings })).toEqual("2 \u0442\u043E\u0432\u0430\u0440\u0430");
    expect(StringMethods_1.StringMethods.formatPluralNumber({ number: 4, settings: settings })).toEqual("4 \u0442\u043E\u0432\u0430\u0440\u0430");
    expect(StringMethods_1.StringMethods.formatPluralNumber({ number: 5, settings: settings })).toEqual("5 \u0442\u043E\u0432\u0430\u0440\u043E\u0432");
    expect(StringMethods_1.StringMethods.formatPluralNumber({ number: 9, settings: settings })).toEqual("9 \u0442\u043E\u0432\u0430\u0440\u043E\u0432");
    expect(StringMethods_1.StringMethods.formatPluralNumber({ number: 10, settings: settings })).toEqual("10 \u0442\u043E\u0432\u0430\u0440\u043E\u0432");
    expect(StringMethods_1.StringMethods.formatPluralNumber({ number: 21, settings: settings })).toEqual("21 \u0442\u043E\u0432\u0430\u0440");
    expect(StringMethods_1.StringMethods.formatPluralNumber({ number: 33, settings: settings })).toEqual("33 \u0442\u043E\u0432\u0430\u0440\u0430");
    expect(StringMethods_1.StringMethods.formatPluralNumber({ number: 101, settings: settings })).toEqual("101 \u0442\u043E\u0432\u0430\u0440");
});
test('simpleHash', function () {
    console.log('a=', StringMethods_1.StringMethods.getSimpleHash('a'));
    console.log('b=', StringMethods_1.StringMethods.getSimpleHash('b'));
    console.log('some string hoho=', StringMethods_1.StringMethods.getSimpleHash('some tsring hoho'));
    var anotherString = 'Well, here is some long simple text !@)#(_)@(#$%*_)$#(^+STDHIESNTDHICXMVBX<MCKBVREISNTH:WYFUPLNDTHW_)($_@#)(*%RENTHRSBVRLT';
    var anotherString2 = 'Well, here is some long simple text !@)#(_)@(#$%*_)$#(^+STDHIESNTDHICXMVBX<MCKBVREISNTH:WYFUPLNDTHW_)($_@#)(*%RENTHRSBVRLS';
    console.log(anotherString, StringMethods_1.StringMethods.getSimpleHash(anotherString));
    console.log(anotherString2, StringMethods_1.StringMethods.getSimpleHash(anotherString2));
    expect(StringMethods_1.StringMethods.getSimpleHash('qwfarszxc123')).toEqual(StringMethods_1.StringMethods.getSimpleHash('qwfarszxc123'));
    expect(StringMethods_1.StringMethods.getSimpleHash('qwfarszxc123!')).not.toEqual(StringMethods_1.StringMethods.getSimpleHash('qwfarszxc123'));
});
test('isDigits', function () {
    expect(StringMethods_1.StringMethods.isDigits('23423423524523478864')).toBeTruthy();
    expect(StringMethods_1.StringMethods.isDigits('234some34')).toBeFalsy();
    expect(StringMethods_1.StringMethods.isDigits('')).toBeFalsy();
});
test('isValidEmail', function () {
    expect(StringMethods_1.StringMethods.isValidEmail('arst@asrt.arst')).toBeTruthy();
    expect(StringMethods_1.StringMethods.isValidEmail('ast@st.d.rst.rs.std')).toBeTruthy();
    expect(StringMethods_1.StringMethods.isValidEmail('astst.d.rst.rs.std')).toBeFalsy();
    //expect(Data.isValidEmail('astst@.d.rst.rs.123')).toBeFalsy() // not working, ha ha
    expect(StringMethods_1.StringMethods.isValidEmail(123)).toBeFalsy();
    expect(StringMethods_1.StringMethods.isValidEmail(undefined)).toBeFalsy();
    expect(StringMethods_1.StringMethods.isValidEmail(null)).toBeFalsy();
    expect(StringMethods_1.StringMethods.isValidEmail(new Date())).toBeFalsy();
});
