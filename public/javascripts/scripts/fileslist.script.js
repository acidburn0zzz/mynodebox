$(document).ready(function() {
  $(".root_folder_div").click(function() {
    var self = $(this);
    if (self.hasClass("hide")) {
      self.addClass("show");
      self.removeClass("hide");
    } else {
      self.removeClass("show");
      self.addClass("hide");
    }
    $(this).parent().find(".sub_folder").toggle(300, function() {
    });
  });
  $(".sub_folder_div").click(function() {
    var self = $(this);
    if (self.hasClass("hide")) {
      self.addClass("show");
      self.removeClass("hide");
    } else {
      self.removeClass("show");
      self.addClass("hide");
    }
    $(this).parent().find(".sub_folder").toggle(300, function() {
    });
  });
  $(".filesheader").click(function() {
    var self = $(this);
    self.parent().children().removeClass('filesheaderselected');
    self.addClass('filesheaderselected');
  });
});