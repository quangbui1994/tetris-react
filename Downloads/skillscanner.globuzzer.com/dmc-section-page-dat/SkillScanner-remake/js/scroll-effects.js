$(".scroll-to-section").click(scrollSmoothlyTo);

if (window.pageYOffset > 155) $(".nav-bar").addClass("black");

/**
 * Scrolls smoothly to given position.
 *
 * @param e
 */
function scrollSmoothlyTo(e) {
  e.preventDefault();
  var id = $(this).attr("id").substring(3);
  var pos = $("#"+id).offset().top - 50;
  $("body, html").animate({
    scrollTop: pos
  }, 500);
}

/**
 * Parallax effect.
 */
$(window).scroll(function() {
  var scrolled = $(window).scrollTop();
  $('.header.parallax').each(function(index, element) {
    var initY = $(this).offset().top;
    var height = $(this).height();
    var endY  = initY + $(this).height();

    // Check if the element is in the viewport.
    var visible = isInViewport(this);
    if(visible) {
      var diff = scrolled - initY;
      var ratio = Math.round((diff / height) * 100);
      $(this).css('background-position','center ' + parseInt(-(ratio * 1.5)) + 'px');
      var opacity = 1/ratio < 0.33 ? 0.33 : 1/ratio;
      if (ratio < 3) opacity = 1;
      $('.header-content').css({
        opacity: opacity,
        marginTop: ratio * 1.5 + 'px'
      });
      if (ratio > 36) {
        $(".nav-bar").addClass("black");
      } else {
        $(".nav-bar").removeClass("black");
      }
      var overlayOpacity = 0.6784 + ratio/120;
      $('.header-overlay').css({
        background: 'rgba(0, 0, 0, ' + overlayOpacity + ')'
      });
    }
  });

});

function isInViewport(node) {
  var rect = node.getBoundingClientRect();
  return (
    (rect.height > 0 || rect.width > 0) &&
    rect.bottom >= 0 &&
    rect.right >= 0 &&
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.left <= (window.innerWidth || document.documentElement.clientWidth)
  )
}