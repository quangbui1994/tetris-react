var $aboutPoints = $(".arrow-container.about .nav-point");
var $pricePoints = $(".arrow-container.pricing .nav-point");
var $pricingBox = $(".pricing-box");

// EVENT LISTENERS
$aboutPoints.click(function () {
  navigateTo($(this), $aboutPoints, $(".row"), 6, -100);
});
$pricePoints.click(function () {
  navigateTo($(this), $pricePoints, $(".pricing-container"), 8, -88);
});
$pricingBox.on('swiperight', function (e) {
  e.preventDefault();
  moveSlide('right', 2);
});
$pricingBox.on('swipeleft', function (e) {
  e.preventDefault();
  moveSlide('left', 2);
});

var currPoint = 0;
var swipePoint = 1;
automateSlide(2);

/**
 * Navigate with points through slider.
 *
 * @param $this
 * @param $pointElem
 * @param $containerElem
 * @param substring
 * @param numToMove
 */
function navigateTo($this, $pointElem, $containerElem, substring, numToMove) {
  $pointElem.removeClass("active");
  $this.addClass("active");
  currPoint = Number($this.attr("id").substring(substring));
  var leftPos = currPoint * numToMove;
  $containerElem.css("left", leftPos + "vw");
}

/**
 * Change about slider every 5 seconds.
 *
 * @param numPoints
 */
function automateSlide(numPoints) {
  setInterval(function () {
    var leftPos = currPoint * -100;
    $(".row").css("left", leftPos + "vw");
    $aboutPoints.removeClass("active");
    $("#point-" + currPoint).addClass("active");
    if (currPoint === numPoints) currPoint = 0;
    else currPoint++;
  }, 5000);
}

/**
 * Move slide left or right.
 *
 * @param direction
 * @param numSlides
 */
function moveSlide(direction, numSlides) {
  if (direction === 'left' && swipePoint < numSlides) swipePoint++;
  if (direction === 'right' && swipePoint > 0) swipePoint--;
  $pricePoints.removeClass("active");
  $("#p-point-" + swipePoint).addClass("active");
  var leftPos = swipePoint * -88;
  $(".pricing-container").css("left", leftPos + "vw");
}