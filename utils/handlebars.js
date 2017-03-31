Handlebars.registerHelper("ternary", function(value, yes, no){
    return value ? yes: no;
});

Handlebars.registerHelper("ternaryEquals", function(value, equals,  yes, no){
    return (value == equals) ? yes: no;
});

Handlebars.registerHelper('cutString', function(string) {
    if(string.length > 100){
        string = string.substring(0,50) + "...";
    }
    return new Handlebars.SafeString(string);
});