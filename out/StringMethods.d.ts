export declare module StringMethods {
    /**
     * Checks if string contains only digits: 0123456790
     * @param x
     */
    function isDigits(x: string): boolean;
    /**
     * Simple check if string contains some text before @ and at least one dot and text after dot after @
     * @param x
     */
    function isValidEmail(x: any): boolean;
    /**
     * get simple fast hash of a string
     * https://stackoverflow.com/questions/6122571/simple-non-secure-hash-function-for-javascript
     * @param value
     */
    function getSimpleHash(value: string): number;
    type LocaleSettings = {
        locale?: string;
        ifZero: (x: number) => any;
        ifOne: (x: number) => any;
        ifFew: (x: number) => any;
        ifMany: (x: number) => any;
    };
    function formatPluralNumber(p: {
        number: number;
        settings: LocaleSettings;
    }): any;
}
