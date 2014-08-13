/*:
    @module-license:
        The MIT License (MIT)

        Copyright (c) 2014 Richeve Siodina Bebedor

        Permission is hereby granted, free of charge, to any person obtaining a copy
        of this software and associated documentation files (the "Software"), to deal
        in the Software without restriction, including without limitation the rights
        to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
        copies of the Software, and to permit persons to whom the Software is
        furnished to do so, subject to the following conditions:

        The above copyright notice and this permission notice shall be included in all
        copies or substantial portions of the Software.

        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
        IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
        FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
        AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
        LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
        OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
        SOFTWARE.
    @end-module-license

    @module-configuration:
        {
            "packageName": "parse-command-argument-list",
            "fileName": "parse-command-argument-list.js",
            "moduleName": "parseCommandArgumentList",
            "authorName": "Richeve S. Bebedor",
            "authorEMail": "richeve.bebedor@gmail.com",
            "repository": "git@github.com/volkovasystems/parse-command-argument-list.git",
            "isGlobal": "true"
        }
    @end-module-configuration

    @module-documentation:

    @end-module-documentation

    @include:
        {
            "camelize-namespace.js@github.com/volkovasystems": "camelizeNamespace"
        }
    @end-include
*/
var parseCommandArgumentList = function parseCommandArgumentList( ){
    var commandArgumentList = process.argv.slice( 2 );

    var argumentValue = "";
    var argumentSet = { };

    var commandArgumentListLength = commandArgumentList.length;
    for( var index = 0; index < commandArgumentListLength; index++ ){
        argumentValue = commandArgumentList[ index ];

        var argumentValueList = argumentValue.split( "=" );
        if( argumentValueList.length == 2 ){
            var key = argumentValueList[ 0 ];
            var value = argumentValueList[ 1 ];

            key = key.replace( DASHED_COMMAND_PATTERN, "" );
            key = camelizeNamespace( key );

            argumentSet[ key ] = value;

        }else if( DASHED_COMMAND_PATTERN.test( argumentValue ) ){
            var key = argumentValue;

            key = key.replace( DASHED_COMMAND_PATTERN, "" );
            key = camelizeNamespace( key );

            argumentSet[ key ] = true;

        }else{
            argumentSet[ index ] = argumentValue;
        }
    }

    return argumentSet;
};

const DASHED_COMMAND_PATTERN = /^\-+/;

var camelizeNamespace = require( "./camelize-namespace/camelize-namespace.js" );

module.exports = parseCommandArgumentList;