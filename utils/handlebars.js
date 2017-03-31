Handlebars.registerHelper("ternary", function(value, yes, no){
    return value ? yes: no;
});

Handlebars.registerHelper("ternaryEquals", function(value, equals,  yes, no){
    return (value == equals) ? yes: no;
});