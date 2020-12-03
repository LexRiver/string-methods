"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringMethods = void 0;
var StringMethods;
(function (StringMethods) {
    /**
     * Checks if string contains only digits: 0123456790
     * @param x
     */
    function isDigits(x) {
        return /^\d+$/.test(x);
    }
    StringMethods.isDigits = isDigits;
    /**
     * Simple check if string contains some text before @ and at least one dot and text after dot after @
     * @param x
     */
    function isValidEmail(x) {
        return typeof x === 'string' && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(x);
    }
    StringMethods.isValidEmail = isValidEmail;
    /**
     * get simple fast hash of a string
     * https://stackoverflow.com/questions/6122571/simple-non-secure-hash-function-for-javascript
     * @param value
     */
    function getSimpleHash(value) {
        var hash = 0;
        if (value.length == 0) {
            return hash;
        }
        for (var i = 0; i < value.length; i++) {
            var char = value.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    }
    StringMethods.getSimpleHash = getSimpleHash;
    function formatPluralNumber(p) {
        if (p.number == 0) {
            return p.settings.ifZero(p.number);
        }
        var sentenceType = new Intl.PluralRules(p.settings.locale).select(p.number);
        switch (sentenceType) {
            case 'one': return p.settings.ifOne(p.number);
            case 'few': return p.settings.ifFew(p.number);
            case 'many': return p.settings.ifMany(p.number);
            default: throw new Error();
        }
    }
    StringMethods.formatPluralNumber = formatPluralNumber;
})(StringMethods = exports.StringMethods || (exports.StringMethods = {}));
