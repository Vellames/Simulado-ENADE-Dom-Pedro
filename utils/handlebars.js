/**
 * Helper to do ternary logic operations
 */
Handlebars.registerHelper("ternary", function(value, yes, no){
    return value ? yes: no;
});

/**
 * Helper to do ternary comparations
 */
Handlebars.registerHelper("ternaryEquals", function(value, equals,  yes, no){
    return (value == equals) ? yes: no;
});

/**
 * Helper to cut a long string
 */
Handlebars.registerHelper('cutString', function(string) {
    if(string.length > 100){
        string = string.substring(0,50) + "...";
    }
    return new Handlebars.SafeString(string);
});