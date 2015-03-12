var replaceKeyPhoneLettersWithNumbers = function(phone){

    if(phone.match(/[^0-9+]/) && phone.length >= 10){
        if(phone.substr(0, 1) == "1"){
            phone = phone.substring(1);
        }


    var keypad = ['abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'];
    for(var i = 0; i < keypad.length; i++){
        for(var j = 0; j < keypad[i].length; j++){
            phone = phone.replace(new RegExp(keypad[i].charAt(j), 'gi'), i+2);
        }
    }
        phone = phone.replace(/[^\d\+]/gi, '');
        phone = phone.substr(0,10);
}

    return phone;
    //return phone.substring(0,10);
}

var formatPhoneNumber = function (input) {
    var isDiv;

    var phone;

    try {
        phone = input.val();
    } catch (ex) {
        try {
            if (phone == undefined) {
                isDiv = true;
                phone = input.innerHTML;
            }
        } catch (exc) {


        }
    }

    if (!phone) {
        return phone;
    }

    if(phone == "Example (800) 555-5555" || phone == "Enter your phone number"){
        return;
    }
    // copied from PhoneFormat.js

    /*

     Remove any non numeric characters from the phone number but leave any plus sign at the beginning
     phone (String) phone number to clean

     */
    phone = replaceKeyPhoneLettersWithNumbers(phone);
    phone = phone.replace(/[^\d\+]/g, '');
    if (phone.substr(0, 1) == "+") {
        phone = phone.substr(1);
        phone = phone.replace(/[^\d]/g, '');
    } else {
        phone = phone.replace(/[^\d]/g, '');
    }


    if (phone.substr(0, 1) == "1" && phone.length >= 11 ) {
        phone = phone.substr(1,11);
        phone = phone.replace(/(\d)(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($2) $3-$4");
    }else if (phone.length == 10) {
        phone = phone.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3");
    } else {
        return;
    }

    if (isDiv) {
        input.innerHTML = phone;
    } else {
        input.val(phone);
    }
}


var getFormattedPhoneNumber = function (phone) {

    if (!phone) {
        return;
    }
    // copied from PhoneFormat.js

    /*

     Remove any non numeric characters from the phone number but leave any plus sign at the beginning
     phone (String) phone number to clean

     */
    var phone = replaceKeyPhoneLettersWithNumbers(phone);
    phone = phone.replace(/[^\d\+]/g, '');
    if (phone.substr(0, 1) == "+") {
        phone = phone.substr(1);
        phone = phone.replace(/[^\d]/g, '');
    } else {
        phone = phone.replace(/[^\d]/g, '');
    }


    if (phone.substr(0, 1) == "1" && phone.length >= 11 ) {
        phone = phone.substr(1,11);
        phone = phone.replace(/(\d)(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($2) $3-$4");
    }else if (phone.length == 10) {
        phone = phone.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3");
    } else {
        return;
    }

   return phone;
}


$(document).ready(function () {

    $('.phone-number').each(function (key, value) {

        /*$(this).keyup(function () {
                formatPhoneNumber($(this))
        });
*/
        $(this).blur(function () {
            formatPhoneNumber($(this))
        });

            formatPhoneNumber($(this))
    });


});






















Zw.util.PhoneNumberUtil = function(config){
        this._formatMobileNumberCache = {};
        this._getRawPhoneNumberCache = {};
    };

Zw.util.PhoneNumberUtil.prototype = {

    getExamplePhoneNumber : function() {

        if (Zw.locale == 'US') {
            return "(555) 555-5555";
        }

        var exampleNumber = i18n.phonenumbers.PhoneNumberUtil.getInstance().getExampleNumber(Zw.locale).getNationalNumber();
        return exampleNumber.toString();
    },

    getCountryNameFromInternationalPhoneNumber : function(phoneNumber){
        var regionCode = Zw.util.PhoneNumberUtil.getInstance().getRegionCodeForPhoneNumber(phoneNumber);
        var country = i18n.phonenumbers.PhoneNumberUtil.arrCountry[regionCode];

        if(country){
            return regionCode;
        }

        var countryCode = i18n.phonenumbers.PhoneNumberUtil.getInstance().getCountryCodeForRegion(regionCode);
        var regionArray = i18n.phonenumbers.metadata.countryCodeToRegionCodeMap[countryCode];

        if(regionArray && regionCode){
            return regionCode;
        }else if(!regionArray){
            return null;
        }

        for(var i = 0; i < regionArray.length; i++){

            if(i18n.phonenumbers.PhoneNumberUtil.arrCountry.indexOf(regionArray[i])){

                return regionArray[i];

            }

        }
    },


    getRegionCodeFromLocalPhoneNumber : function(phoneNumber){

        var selectedCountryCode = i18n.phonenumbers.PhoneNumberUtil.getInstance().getCountryCodeForRegion(Zw.locale);
        var regionArray = i18n.phonenumbers.metadata.countryCodeToRegionCodeMap[selectedCountryCode];
        if(!regionArray && selectedCountryCode){
            return selectedCountryCode;
        }else if(!regionArray){
            return null;
        }
        for(var i = 0; i < regionArray.length; i++){
            var phoneNumberObject = i18n.phonenumbers.PhoneNumberUtil.getInstance().parse(phoneNumber, regionArray[i]);
            if(phoneNumberObject && i18n.phonenumbers.PhoneNumberUtil.getInstance().isValidNumberForRegion(phoneNumberObject, regionArray[i])){

                return regionArray[i];

            }
        }
    },

    getRegionCodeForPhoneNumber : function (e164PhoneNumber) {

        try {
            var phoneNumber = i18n.phonenumbers.PhoneNumberUtil.getInstance().parse(e164PhoneNumber);
            if (phoneNumber.hasCountryCode()) {
                return i18n.phonenumbers.PhoneNumberUtil.getInstance().getRegionCodeForNumber(phoneNumber);
            }
        } catch (e) {
            return '';
        }

        return '';
    },

    phoneNumberValidator : function(value) {
        var result = Zw.util.PhoneNumberUtil.getInstance().isPhoneNumberValid(value);

        //return result ? true : 'Please enter your valid mobile number.';
        return result ? true : Zw.localize('generic.alert.validMbileNumberRequired');
    },


    isPhoneNumberValid : function(value) {

        // moved validation code into the validatePhoneNumber function
        /// for easier overriding.
        return Zw.util.PhoneNumberUtil.getInstance().validatePhoneNumber(value);
    },

    validatePhoneNumber : function(value) {

        if (!value) {
            return false;
        }

        var s = this.getRawPhoneNumber(value);
        if (!Zw.util.isInteger(s)) {
            return false;
        }

        if (typeof i18n != 'undefined') {

            var isShortCode = Zw.capabilities.ALLOW_SHORT_CODE && value.length < 9;
            if (isShortCode) {
                return true;
            }

            try {
                var phoneNumber = i18n.phonenumbers.PhoneNumberUtil.getInstance().parse(value, Zw.locale);
                if (i18n.phonenumbers.PhoneNumberUtil.getInstance().isPossibleNumber(phoneNumber)) {
                    return true;
                }
            }
            catch(e) {
                return false;
            }
            return false;
        }


        /**
         * DHTML phone number validation script. Courtesy of SmartWebby.com (http://www.smartwebby.com/dhtml/)
         */

        return this.checkInternationalPhone(value);
    },

    checkInternationalPhone : function(strPhone) {

        var s = this.stripFormattingCharacters(strPhone);

        if (strPhone)
        strPhone = strPhone.replace(/^1*/, '');

        return Zw.util.isInteger(s) && s.length == Zw.util.MobileNumberFormatterPlugin.getInstance().getFormatNumberLength(strPhone);
    },


    countryForE164Number : function(phone) {
        return countryForE164Number(phone);
    },



    formatE164 : function(country, phone) {

        return formatE164(country, phone);
    },


    formatLocal : function(country, phone) {

        this.addPlusOneToNanpaPhoneNumber(phone);

        return formatLocal(country, phone);
    },

    addPlusOneToNanpaPhoneNumber : function(phone){
        var originalPhone = phone;
        phone = this.getRawPhoneNumber(phone);
        var phoneNumber;

        //international number entered in local format is not a nanpa number
        if (phone[0] == '0') {
            return originalPhone;
        }

        if (phone[0] == '+') {
            phone = phone.substring(1, phone.length);
        }

         if (phone[0] == '1') {
            phone = phone.substring(1, phone.length);
        }

        phoneNumber = i18n.phonenumbers.PhoneNumberUtil.getInstance().parse(phone, 'US');
        var nanpaCountriesArray = i18n.phonenumbers.metadata.countryCodeToRegionCodeMap[1];
        for(var i = 0; i < nanpaCountriesArray.length; i++){
            if(i18n.phonenumbers.PhoneNumberUtil.getInstance().isValidNumberForRegion(phoneNumber, nanpaCountriesArray[i])){
                return '+1' + phone;
            }
        }

        return originalPhone;
    },
    isNanpaPhoneNumber : function(phone){

        var originalPhone = phone;
        phone = this.getRawPhoneNumber(phone);
        var phoneNumber;

        //international number entered in local format is not a nanpa number
        if (phone[0] == '0') {
            return originalPhone;
        }

        if (phone[0] == '+') {
            phone = phone.substring(1, phone.length);
        }

         if (phone[0] == '1') {
            phone = phone.substring(1, phone.length);
        }

        phoneNumber = i18n.phonenumbers.PhoneNumberUtil.getInstance().parse(phone, 'US');
        var nanpaCountriesArray = i18n.phonenumbers.metadata.countryCodeToRegionCodeMap[1];
        for(var i = 0; i < nanpaCountriesArray.length; i++){
            if(i18n.phonenumbers.PhoneNumberUtil.getInstance().isValidNumberForRegion(phoneNumber, nanpaCountriesArray[i])){
                return true;
            }
        }

        return false;


    },
    /**
     * Format a mobile number correctly in the format of its national code
     * @param {String} Raw mobile number in any format
     * @return {String} Formatted mobile number of the form of its national code
     */
    formatMobileNumber : function(rawMobileNum) {

        if (!rawMobileNum) { return null; }

        var formatted = this._formatMobileNumberCache[rawMobileNum];
        if (formatted) { return formatted; }

        if (Zw.util.StringUtil.getInstance().isValidEmailAddress(rawMobileNum)) {
            this._formatMobileNumberCache[rawMobileNum] = rawMobileNum;
            return rawMobileNum;
        }

        if (typeof i18n != 'undefined') {
            try {
                formatted = this.formatLocal(Zw.locale, rawMobileNum);
            }
            catch(e) {
                // failed formatting number
            }
        }
        else {
            formatted = Zw.util.MobileNumberFormatterPlugin.getInstance().display(rawMobileNum);
        }

        this._formatMobileNumberCache[rawMobileNum] = formatted;

        return formatted;
    },

    /*
     * Returns a version of the mobile number while maintaining the '+' are added for international countries
     */
    getRawPhoneNumber : function(phone) {

        if (!phone) {
            return phone;
        }

        // copied from PhoneFormat.js

        /*

         Remove any non numeric characters from the phone number but leave any plus sign at the beginning
         phone (String) phone number to clean

         */

        var stripped = this._getRawPhoneNumberCache[phone];
        if (stripped) {
            return stripped;
        }

        stripped = phone.replace(/[^\d\+]/g, '');
        if (stripped.substr(0, 1) == "+") {
            stripped = "+" + stripped.replace(/[^\d]/g, '');
        } else {
            stripped = stripped.replace(/[^\d]/g, '');
        }

        this._getRawPhoneNumberCache[phone] = stripped;
        return stripped;
    },

    stripFormattingCharacters : function(s) {
        // non-digit characters which are allowed in phone numbers
        var phoneNumberDelimiters = '()-. ';
        // characters which are allowed in international phone numbers
        // (a leading + is OK)
        var validWorldPhoneChars = phoneNumberDelimiters + '+';
        return Zw.util.stripCharsInBag(s, validWorldPhoneChars);
    },

    parsePhoneNumber : function(test) {

        if (typeof i18n != 'undefined') {

            var number = '';
            var list = test.split(' ');

            while(list.length > 0) {

                number += this.getRawPhoneNumber(list.shift());

                var next = '';
                if (list[0]) {
                    next = list[0];
                }
                var s = this.stripFormattingCharacters(next);

                if(this.isPhoneNumberValid(number) && !Zw.util.isInteger(s)) {
                    return [test, number, list.join(' ')]
                }

            }

            return;
        }

        var matches;

        //TODO need better stronger switch/regex for further international support
        if (test.indexOf('+62') != -1 //Indonesia
            || test.indexOf('+86') != -1) //China
        {
            /**
             * match any non digits characters except '+' to begin with : [\+]*
             * start group                                              : (
             * match 13 digits, (with any characters in between)        : \d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d
             * end group                                                : )
             * separate name parameter by whitespace (matches[2])       : (\s*.*)
             */
            matches = /^[^\+]*(\+\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d)(\s*.*)$/.exec(test);
        } else if (test.indexOf('+84 1') != -1 || test.indexOf('+841') != -1 //Vietnam "1xx"
            || test.indexOf('+60 14') != -1 || test.indexOf('+6014') != -1 //Malaysian "14x"
            || test.indexOf('+60 15') != -1 || test.indexOf('+6015') != -1 //Malaysian "15x"
            || test.indexOf('+91') != -1 //India
            || test.indexOf('+63') != -1) //Philippines
        {
            /**
             * match any non digits characters except '+' to begin with : [\+]*
             * start group                                              : (
             * match 12 digits, (with any characters in between)        : \d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d
             * end group                                                : )
             * separate name parameter by whitespace (matches[2])       : (\s*.*)
             */
            matches = /^[^\+]*(\+\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d)(\s*.*)$/.exec(test);
        } else if (test.indexOf('+61') != -1 //Australia
            || test.indexOf('+84 9') != -1 || test.indexOf('+849') != -1 //Vietnam "9x"
            || test.indexOf('+60 1') != -1 || test.indexOf('+601') != -1 //Malaysian "1x"
            || test.indexOf('+66') != -1) //Thailand
        {
            /**
             * match any non digits characters except '+' to begin with : [\+]*
             * start group                                              : (
             * match 11 digits, (with any characters in between)        : \d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d
             * end group                                                : )
             * separate name parameter by whitespace (matches[2])       : (\s*.*)
             */
            matches = /^[^\+]*(\+\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d)(\s*.*)$/.exec(test);
        } else if (test.indexOf('+65') != -1) //Singapore
        {
            /**
             * match any non digits characters except '+' to begin with : [\+]*
             * start group                                              : (
             * match 10 digits, (with any characters in between)        : \d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d
             * end group                                                : )
             * separate name parameter by whitespace (matches[2])       : (\s*.*)
             */
            matches = /^[^\+]*(\+\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d)(\s*.*)$/.exec(test);
        } else if (test.length < 9 && Zw.capabilities.ALLOW_SHORT_CODE) //Shortcode
        {
            /**
             * Shortcode:
             * match any non digits characters to begin with        : ^\D*
             * match digits having between 0 and 8 in number        : ^\d{0,8}$
             */
            matches = /^\D*(\d{0,8})$/.exec(test);
        }
        else {
            /**
             * Defaults to United States:
             * match any non digits characters to begin with        : ^\D*
             * match any number of plus signs (zero or more)        : +*
             * match any number of 1's (zero or more)               : 1*
             * match any number of non digit chars                  : \D*
             * start group                                          : (
             * match 10 digits, (with any characters in between)    : \d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d
             * separate name parameter by whitespace (matches[2])   : (\s*.*)
             */
            matches = /^\D*\+*1*\D*(\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d)(\s*.*)$/.exec(test);
        }

        return matches;
    },

    parseAnyInternalPhoneNumber : function(test) {

        var matches;

        // '+' xxxxxxxxx or '+' xxxxxxxxxxxxxxx

        /**
         * match any non digits characters except '+' to begin with : [\+]*
         * start group                                              : (
         * match 9-15 digits, (with any characters in between)      : \d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d?\D*\d?\D*\d?\D*\d?\D*\d?\D*\d?
         * end group                                                : )
         * separate name parameter by whitespace (matches[2])       : (\s*.*)
         */
        matches = /^[^\+]*(\+\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d\D*\d?\D*\d?\D*\d?\D*\d?\D*\d?\D*\d?)(\s*.*)$/.exec(test);
        return matches;
    },

    tokenizePhoneNumbers : function(value) {

        //    value = '1 (91 -39.8 ) 02972 Michael Smyers;9132264264 Mike Smyers';
        var items = value.split(/[\;\,]/);
        var L = items.length;
        var results = [];

        for (var i = 0; i < L; i++) {
            var test = items[i];
            if (!test)
                continue;

            var matches = Zw.util.PhoneNumberUtil.getInstance().parsePhoneNumber(test);
            if (!matches) {
                results.push({
                    original: test
                })
            } else {
                var number = Zw.util.PhoneNumberUtil.getInstance().getRawPhoneNumber(matches[1]);
                var name = matches[2];

                results.push({
                    original: test,
                    name: name,
                    number: number
                });
            }
        }

        return results;
    }

};

Zw.util.PhoneNumberUtil.getInstance = function() {
    if (!Zw.util.PhoneNumberUtil.instance) {
        Zw.util.PhoneNumberUtil.instance = new Zw.util.PhoneNumberUtil({});
    }
    return Zw.util.PhoneNumberUtil.instance;
};

