/**
 * Call javascript functions to check registration user
 */

// Global check var
var loginOK = true;
var passwordOK = true;
var emailOK = true;
 
$(document).ready(function() {
    $('#register_name').blur(function() {
        if ($('#register_name').val() !== '') {
            $('#td_register_name_message').addClass('valid');
            $('#td_register_name_message').removeClass('error');
            $('#td_register_name_message').text('');
        } 
    });
    $('#register_login').blur(function() {
        registerLoginCheck($('#register_login').val());
    });
    $('#register_email').blur(function() {
        registerEmailCheck();
    });
    $('#register_password').blur(function() {
        registerPasswordCheck();
    });
    $('#register_password').keyup(function() {
        registerPasswordSecurity();
    });
    $('#formregister').submit(function() {
        return (loginOK && passwordOK && emailOK);
    });
});

/**
 * Check if the password is OK
 */
function registerPasswordCheck() {
    if ($('#register_password').val() !== '') {
        if ($('#register_password').val().length > 5) {
            $('#td_register_password').removeClass('error');
            $('#td_register_password').addClass('valid');
            var intScore = testPassword($('#register_password').val());
            if (intScore < 16) {
                $('#td_register_password').html(locale.password.too_simple_password);
            } else if (intScore > 15 && intScore < 25) {
                $('#td_register_password').html(locale.password.simple_password);
            } else if (intScore > 24 && intScore < 34) {
                $('#td_register_password').html(locale.password.medium_password);
            } else if (intScore > 33 && intScore < 45) {
                $('#td_register_password').html(locale.password.good_password);
            } else {
                $('#td_register_password').html(locale.password.very_good_password);
            }
            passwordOK = true;
        } else {
            $('#td_register_password').addClass('error');
            $('#td_register_password').removeClass('valid');
            $('#td_register_password').html(locale.error.password_too_short);
            passwordOK = false;
        }
    } else {
        $('#td_register_password').removeClass('error');
        $('#td_register_password').removeClass('valid');
        $('#td_register_password').html('');
    }
}

/**
 * Check the security level of the password (just a user information)
 */
function registerPasswordSecurity() {
    if ($('#register_password').val().length < 2) {
        $('#div_register_password_border').removeClass('passwordstrenght');
        $('#div_register_password').removeClass('passwordweak');
        $('#div_register_password').removeClass('passwordmediumweak');
        $('#div_register_password').removeClass('passwordmedium');
        $('#div_register_password').removeClass('passwordstrongmedium');
        $('#div_register_password').removeClass('passwordstrong');
        return;
    }
    $('#div_register_password_border').addClass('passwordstrenght');
    $('#div_register_password').text(" ");
    var intScore = testPassword($('#register_password').val());
    if (intScore < 16) {
        $('#div_register_password').addClass('passwordweak');
        $('#div_register_password').removeClass('passwordmediumweak');
        $('#div_register_password').removeClass('passwordmedium');
        $('#div_register_password').removeClass('passwordstrongmedium');
        $('#div_register_password').removeClass('passwordstrong');
    } else if (intScore > 15 && intScore < 25) {
        $('#div_register_password').removeClass('passwordweak');
        $('#div_register_password').addClass('passwordmediumweak');
        $('#div_register_password').removeClass('passwordmedium');
        $('#div_register_password').removeClass('passwordstrongmedium');
        $('#div_register_password').removeClass('passwordstrong');
    } else if (intScore > 24 && intScore < 34) {
        $('#div_register_password').removeClass('passwordweak');
        $('#div_register_password').removeClass('passwordmediumweak');
        $('#div_register_password').addClass('passwordmedium');
        $('#div_register_password').removeClass('passwordstrongmedium');
        $('#div_register_password').removeClass('passwordstrong');
    } else if (intScore > 33 && intScore < 45) {
        $('#div_register_password').removeClass('passwordweak');
        $('#div_register_password').removeClass('passwordmediumweak');
        $('#div_register_password').removeClass('passwordmedium');
        $('#div_register_password').addClass('passwordstrongmedium');
        $('#div_register_password').removeClass('passwordstrong');
    } else {
        $('#div_register_password').removeClass('passwordweak');
        $('#div_register_password').removeClass('passwordmediumweak');
        $('#div_register_password').removeClass('passwordmedium');
        $('#div_register_password').removeClass('passwordstrongmedium');
        $('#div_register_password').addClass('passwordstrong');
    }
}

/**
 * Check if the email is OK
 */
function registerEmailCheck() {
    if ($('#register_email').val() !== '') {
        if ($('#register_email').val().match(/^([a-z0-9_\.\-]+)@([\da-z0-9\.\-]+)\.([a-z\.]{2,6})$/)) {
            $('#td_register_email').addClass('valid');
            $('#td_register_email').removeClass('error');
            $('#td_register_email').html('');
            emailOK = true;
            checkAjaxEmail($('#register_email').val());
        } else {
            $('#td_register_email').addClass('error');
            $('#td_register_email').removeClass('valid');
            $('#td_register_email').html(locale.error.invalid_email);
            emailOK = false;
        }
    } else {
        $('#td_register_email').removeClass('valid');
        $('#td_register_email').removeClass('error');
        $('#td_register_email').html('');
    }
}

/**
 * Check if the login is OK
 */
function registerLoginCheck() {
    if ($('#register_login').val() !== '') {
        if ($('#register_login').val().match(/^[A-Za-z0-9_\.\-]{6,50}$/)) {
            $('#td_register_login_message').addClass('valid');
            $('#td_register_login_message').removeClass('error');
            $('#td_register_login_message').text('');
            loginOK = true;
            checkAjaxLogin($('#register_login').val());
        } else {
            $('#td_register_login_message').addClass('error');
            $('#td_register_login_message').removeClass('valid');
            $('#td_register_login_message').text(locale.error.bad_login);
            loginOK = false;
        }
    }
}

/**
 * Test the password level and return an int
 */
function testPassword(passwd) {
	var intScore   = 0;
	
	// PASSWORD LENGTH
	if (passwd.length<5) {
		intScore = (intScore+3); // length 4 or less
	} else if (passwd.length>4 && passwd.length<8) {
		intScore = (intScore+6); // length between 5 and 7
	} else if (passwd.length>7 && passwd.length<13) {
		intScore = (intScore+12); // length between 8 and 15
	} else if (passwd.length>12) {
		intScore = (intScore+18); // length 16 or more
	}
		
	// LETTERS (Not exactly implemented as dictacted above because of my limited understanding of Regex)
	if (passwd.match(/[a-z]/)) {
		intScore = (intScore+1); // [verified] at least one lower case letter
	}
	if (passwd.match(/[A-Z]/)) {
		intScore = (intScore+5); // [verified] at least one upper case letter
	}
	if (passwd.match(/(.*[A-Z].*[A-Z].*[A-Z])/)) {
		intScore = (intScore+5); // [verified] at least one upper case letter
	}
		
	// NUMBERS
	if (passwd.match(/\d+/)) {
		intScore = (intScore+5); // [verified] at least one number
	}
	if (passwd.match(/(.*[0-9].*[0-9].*[0-9])/)) {
		intScore = (intScore+5);// [verified] at least three numbers
	}
			
	// SPECIAL CHAR
	if (passwd.match(/.[!,@,#,$,%,\^,&,*,?,_,~]/)) {
		intScore = (intScore+5); // [verified] at least one special character
	}
	if (passwd.match(/(.*[!,@,#,$,%,\^,&,*,?,_,~].*[!,@,#,$,%,\^,&,*,?,_,~])/)) {
		intScore = (intScore+5); // [verified] at least two special characters
	}								
    if (passwd.match(/(.*[!,@,#,$,%,\^,&,*,?,_,~].*[!,@,#,$,%,\^,&,*,?,_,~].*[!,@,#,$,%,\^,&,*,?,_,~])/)) {
		intScore = (intScore+8); // [verified] at least three special characters
	}
		
	// COMBOS
	if (passwd.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
		intScore = (intScore+2); // [verified] both upper and lower case
	}
	if (passwd.match(/([a-zA-Z])/) && passwd.match(/([0-9])/)) {
		intScore = (intScore+2); // [verified] both letters and numbers
	}
	if (passwd.match(/([a-zA-Z0-9].*[!,@,#,$,%,\^,&,*,?,_,~])|([!,@,#,$,%,\^,&,*,?,_,~].*[a-zA-Z0-9])/)) {
		intScore = (intScore+2); // [verified] letters, numbers, and special characters
	}
    return intScore;
}