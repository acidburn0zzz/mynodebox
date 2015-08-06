/**
 * Call the ajax for checking the login
 */
function checkAjaxLogin (login) {
    $('#td_register_login_message').html(locale.message.search);
    $('#td_register_login_message').removeClass('valid');
    $('#td_register_login_message').removeClass('error');
    $.ajax({
        url: '/ajax/isloginexists',
        data: { login: login },
        type: 'POST',
        success: function(ret) {
            if (ret.exists) {
                $('#td_register_login_message').html(locale.error.login_exists);
                $('#td_register_login_message').addClass('error');
                $('#td_register_login_message').removeClass('valid');
                loginOK = false;
            } else {
                if (ret.exists === null) {
                    $('#td_register_login_message').html();
                    $('#td_register_login_message').addClass('error');
                    $('#td_register_login_message').removeClass('valid');
                    loginOK = false;
                } else {
                    $('#td_register_login_message').html('');
                    $('#td_register_login_message').addClass('valid');
                    $('#td_register_login_message').removeClass('error');
                    loginOK = true;
                }
            }
        },
        error: function() {
            $('#td_register_login_message').html();
            $('#td_register_login_message').addClass('error');
            $('#td_register_login_message').removeClass('valid');
            loginOK = false;
        }
  });
}

/**
 * Call the ajax for checking the email
 */
function checkAjaxEmail (email) {
    $('#td_register_email').html(locale.message.search);
    $('#td_register_email').removeClass('valid');
    $('#td_register_email').removeClass('error');
    $.ajax({
        url: '/ajax/isemailexists',
        data: { email: email },
        type: 'POST',
        success: function(ret) {
            if (ret.exists) {
                $('#td_register_email').html(locale.error.email_exists);
                $('#td_register_email').addClass('error');
                $('#td_register_email').removeClass('valid');
                emailOK = false;
            } else {
                if (ret.exists === null) {
                    $('#td_register_email').html('');
                    $('#td_register_email').addClass('error');
                    $('#td_register_email').removeClass('valid');
                    emailOK = false;
                } else {
                    $('#td_register_email').html('');
                    $('#td_register_email').addClass('valid');
                    $('#td_register_email').removeClass('error');
                    emailOK = true;
                }
            }
        },
        error: function() {
            $('#td_register_email').html('');
            $('#td_register_email').addClass('error');
            $('#td_register_email').removeClass('valid');
            emailOK = false;
        }
    });
}