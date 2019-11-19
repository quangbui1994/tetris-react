$(window).scroll(function() {
  if ($(window).scrollTop() > 60) {
    $(".nav-bar").addClass("black");
  } else {
    $(".nav-bar").removeClass("black");
  }
});