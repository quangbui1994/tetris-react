$(window).scroll(function() {

  if ($(window).scrollTop() > 60) {

    $(".nav-bar").addClass("black");

    $("#navbar-sign-in-button").removeClass("change-to-button-when-scroll")

    $("#navbar-sign-in-button").addClass("change-to-button-when-scroll")

  } else {

    $(".nav-bar").removeClass("black");

    $("#navbar-sign-in-button").removeClass("change-to-button-when-scroll")

  }
});