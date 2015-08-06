$(document).ready(function() {
  $("body").click(function() {
    if (!$("#menuparams").data('isHover') 
    	&& $("#menuparams").hasClass("open")) {
      $("#menuparams").removeClass("open");
      $("#menuparams").find('.showico').html("v");
    }
    if (!$("#selectlanguage").data('isHover')
    	 && $("#selectlanguage").hasClass("open")) {
      $("#selectlanguage").removeClass("open");
      $("#selectlanguage").find('.showico').html("v");
    }
    if (!$("#menunotifications").data('isHover')
    	 && $("#menunotifications").hasClass("open")) {
      $("#menunotifications").removeClass("open");
    }
  });
  $("#selectlanguage").click(function() {
    if ($(this).hasClass("open")) {
      $(this).removeClass("open");
      $(this).find('.showico').html("v");
    } else {
      $(this).addClass("open");
      $(this).find('.showico').html("&#136;");
    }
  }).mouseenter(function(){
    $("#selectlanguage").data('isHover', true);
  }).mouseleave(function(){
    $("#selectlanguage").data('isHover', false);
  });
  $("#menuparams").click(function() {
    if ($(this).hasClass("open")) {
      $(this).removeClass("open");
      $(this).find('.showico').html("v");
    } else {
      $(this).addClass("open");
      $(this).find('.showico').html("&#136;");
    }
  }).mouseenter(function(){
    $("#menuparams").data('isHover', true);
  }).mouseleave(function(){
    $("#menuparams").data('isHover', false);
  });
  $("#menunotifications").click(function() {
    if ($(this).hasClass("open")) {
      $(this).removeClass("open");
    } else {
      $(this).addClass("open");
    }
  }).mouseenter(function(){
    $("#menunotifications").data('isHover', true);
  }).mouseleave(function(){
    $("#menunotifications").data('isHover', false);
  });
});