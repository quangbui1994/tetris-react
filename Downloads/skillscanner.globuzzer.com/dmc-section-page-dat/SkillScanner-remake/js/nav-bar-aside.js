$(".open-side-bar").click(showSideNav);
$("#nav-modal, .nav-aside-close-icon, .mobile-view .list li").click(closeSideNav);

/**
 * Shows side-bar.
 */
function showSideNav() {
  $(".mobile-view").animate({
    width: '55%'
  });
  $("#nav-modal").fadeIn();
}

/**
 * Closes nav-bar
 */
function closeSideNav() {
  if ($(window).width() < 750) {
    $(".mobile-view").animate({
      width: "0"
    });
    $("#nav-modal").fadeOut();
  }
}