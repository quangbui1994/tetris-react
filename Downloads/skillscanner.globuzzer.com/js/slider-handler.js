$("body").ihavecookies({
  title:"",
  moreInfoLabel: "cookie policy",
  message: "This website uses cookies to ensure you get the best experience on our website. By continuing, you accept our ",
  delay: 0,
  expires: 30,
  link: './privacy.html',

  onAccept: function(){
    console.log(true)
  }
})

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

// automateSlide(2);



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

var gbExpandableBoxWidth = $("#gb-exapndable-box").width()
var currentScrollLeft = $("#partner-1").position().left


if(window.innerWidth <= 1023 && window.innerWidth >= 768){
  var positionLeft_partner_1 = $("#partner-1").position().left,
      positionLeft_partner_4 = $("#partner-4").position().left,
      positionLeft_partner_7 = $("#partner-7").position().left,
      positionLeft_partner_10 = $("#partner-10").position().left

  function ScrollPartnersToLeft(){
    if(currentScrollLeft > 0 && currentScrollLeft <= (gbExpandableBoxWidth * 2)){
      currentScrollLeft = positionLeft_partner_1
      $("#gb-exapndable-box").animate({
        scrollLeft: currentScrollLeft
      }, 'slow')
    }
    
    else if(currentScrollLeft > (gbExpandableBoxWidth * 2) && currentScrollLeft <= (gbExpandableBoxWidth * 3)){
      currentScrollLeft = positionLeft_partner_4
      $("#gb-exapndable-box").animate({
        scrollLeft: currentScrollLeft
      }, 'slow')
    }

    else if(currentScrollLeft > (gbExpandableBoxWidth * 3)){
      currentScrollLeft = positionLeft_partner_7
      $("#gb-exapndable-box").animate({
        scrollLeft: currentScrollLeft
      }, 'slow')
    }
  }
  
  function ScrollPartnersToRight(){
    if(currentScrollLeft <= gbExpandableBoxWidth){
      currentScrollLeft = positionLeft_partner_4
      $("#gb-exapndable-box").animate({
        scrollLeft: currentScrollLeft
      }, 'slow')
    }
  
    else if(currentScrollLeft <= (gbExpandableBoxWidth * 2) && currentScrollLeft >= gbExpandableBoxWidth){
      currentScrollLeft = positionLeft_partner_7
      
      $("#gb-exapndable-box").animate({
        scrollLeft: currentScrollLeft
      }, 'slow')
    }

    else if(currentScrollLeft <= (gbExpandableBoxWidth * 3) && currentScrollLeft >= (gbExpandableBoxWidth * 2)){
      currentScrollLeft = positionLeft_partner_10
      
      $("#gb-exapndable-box").animate({
        scrollLeft: currentScrollLeft
      }, 'slow')
    }
  }
}

else if(window.innerWidth >= 1024){
  var positionLeft_partner_1 = $("#partner-1").position().left,
      positionLeft_partner_4 = $("#partner-4").position().left,
      positionLeft_partner_5 = $("#partner-5").position().left,
      positionLeft_partner_10 = $("#partner-10").position().left

  function ScrollPartnersToLeft(){
    if(currentScrollLeft > 0 && currentScrollLeft <= (gbExpandableBoxWidth * 2)){
      currentScrollLeft = positionLeft_partner_1
      $("#gb-exapndable-box").animate({
        scrollLeft: currentScrollLeft
      }, 'slow')
    }
  
    else if(currentScrollLeft > (gbExpandableBoxWidth * 2)){
      currentScrollLeft = positionLeft_partner_5
      $("#gb-exapndable-box").animate({
        scrollLeft: currentScrollLeft
      }, 'slow')
    }
  }
  
  function ScrollPartnersToRight(){
    if(currentScrollLeft <= gbExpandableBoxWidth){
      currentScrollLeft = positionLeft_partner_5
      $("#gb-exapndable-box").animate({
        scrollLeft: currentScrollLeft
      }, 'slow')
    }
  
    else if(currentScrollLeft <= (gbExpandableBoxWidth * 2) && currentScrollLeft >= gbExpandableBoxWidth){
      currentScrollLeft = positionLeft_partner_10
      
      $("#gb-exapndable-box").animate({
        scrollLeft: currentScrollLeft
      }, 'slow')
    }
  }
}