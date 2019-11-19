$(".open-side-bar").click(showSideNav);

$("#nav-modal, .nav-aside-close-icon, .mobile-view .list li").click(closeSideNav);



/**

 * Shows side-bar.

 */

function showSideNav() {

  $(".nav-bar").removeClass("black");

  $("#navbar-hamburger-button").css({'display': 'none'})

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

    }, function(){
      $("#navbar-hamburger-button").css({'display': 'block'})
      if ($(window).scrollTop() > 60) {
        $(".nav-bar").addClass("black");
      }
      else{
        $(".nav-bar").removeClass("black");
      }
    });

    $("#nav-modal").fadeOut();

  }

}

firebase.auth().onAuthStateChanged(function(user){
  if(user){
    $("#pricing-select-button-for-plus").unbind("click")
    $("#pricing-select-button-for-premium").unbind("click")

    $("#pricing-select-button-for-plus").bind("click", function(){
      window.location = "/company-dashboard/plan-payment.html?purchaseType=upgradeToPlus"
    })

    $("#pricing-select-button-for-premium").bind("click", function(){
      window.location = "/company-dashboard/plan-payment.html?purchaseType=upgradeToPremium"
    })
  }

  else{
    $("#pricing-select-button-for-plus").unbind("click")
    $("#pricing-select-button-for-premium").unbind("click")

    $("#pricing-select-button-for-plus").bind("click", function(){
      window.location = "/company-login/c-sign-in-up.html"
    })

    $("#pricing-select-button-for-premium").bind("click", function(){
      window.location = "/company-login/c-sign-in-up.html"
    })
  }
})


function ChooseNextRightPackage(){
  if(document.getElementById("pricing-nav-point-1").classList.contains("active-pricing-nav-point")){
    $("#pricing-package-holder-1").removeClass("show-pricing-package-holder")
    $("#pricing-package-holder-2").removeClass("show-pricing-package-holder")
    $("#pricing-package-holder-3").removeClass("show-pricing-package-holder")

    $("#pricing-package-holder-2").addClass("show-pricing-package-holder")

    $("#pricing-nav-point-1").removeClass("active-pricing-nav-point")
    $("#pricing-nav-point-2").removeClass("active-pricing-nav-point")
    $("#pricing-nav-point-3").removeClass("active-pricing-nav-point")

    $("#pricing-nav-point-2").addClass("active-pricing-nav-point")
  }

  else if(document.getElementById("pricing-nav-point-2").classList.contains("active-pricing-nav-point")){
    $("#pricing-package-holder-1").removeClass("show-pricing-package-holder")
    $("#pricing-package-holder-2").removeClass("show-pricing-package-holder")
    $("#pricing-package-holder-3").removeClass("show-pricing-package-holder")

    $("#pricing-package-holder-3").addClass("show-pricing-package-holder")

    $("#pricing-nav-point-1").removeClass("active-pricing-nav-point")
    $("#pricing-nav-point-2").removeClass("active-pricing-nav-point")
    $("#pricing-nav-point-3").removeClass("active-pricing-nav-point")

    $("#pricing-nav-point-3").addClass("active-pricing-nav-point")
  }
}

function ChooseNextLeftPackage(){
  if(document.getElementById("pricing-nav-point-2").classList.contains("active-pricing-nav-point")){
    $("#pricing-package-holder-1").removeClass("show-pricing-package-holder")
    $("#pricing-package-holder-2").removeClass("show-pricing-package-holder")
    $("#pricing-package-holder-3").removeClass("show-pricing-package-holder")

    $("#pricing-package-holder-1").addClass("show-pricing-package-holder")

    $("#pricing-nav-point-1").removeClass("active-pricing-nav-point")
    $("#pricing-nav-point-2").removeClass("active-pricing-nav-point")
    $("#pricing-nav-point-3").removeClass("active-pricing-nav-point")

    $("#pricing-nav-point-1").addClass("active-pricing-nav-point")
  }

  else if(document.getElementById("pricing-nav-point-3").classList.contains("active-pricing-nav-point")){
    $("#pricing-package-holder-1").removeClass("show-pricing-package-holder")
    $("#pricing-package-holder-2").removeClass("show-pricing-package-holder")
    $("#pricing-package-holder-3").removeClass("show-pricing-package-holder")

    $("#pricing-package-holder-2").addClass("show-pricing-package-holder")

    $("#pricing-nav-point-1").removeClass("active-pricing-nav-point")
    $("#pricing-nav-point-2").removeClass("active-pricing-nav-point")
    $("#pricing-nav-point-3").removeClass("active-pricing-nav-point")

    $("#pricing-nav-point-2").addClass("active-pricing-nav-point")
  }
}

function ChooseFreePackage(){
  $("#pricing-package-holder-1").removeClass("show-pricing-package-holder")
  $("#pricing-package-holder-2").removeClass("show-pricing-package-holder")
  $("#pricing-package-holder-3").removeClass("show-pricing-package-holder")

  $("#pricing-nav-point-1").removeClass("active-pricing-nav-point")
  $("#pricing-nav-point-2").removeClass("active-pricing-nav-point")
  $("#pricing-nav-point-3").removeClass("active-pricing-nav-point")

  $("#pricing-nav-point-1").addClass("active-pricing-nav-point")
}

function ChoosePlusPackage(){
  $("#pricing-package-holder-1").removeClass("show-pricing-package-holder")
  $("#pricing-package-holder-2").removeClass("show-pricing-package-holder")
  $("#pricing-package-holder-3").removeClass("show-pricing-package-holder")

  $("#pricing-package-holder-2").addClass("show-pricing-package-holder")

  $("#pricing-nav-point-1").removeClass("active-pricing-nav-point")
  $("#pricing-nav-point-2").removeClass("active-pricing-nav-point")
  $("#pricing-nav-point-3").removeClass("active-pricing-nav-point")

  $("#pricing-nav-point-2").addClass("active-pricing-nav-point")
}

function ChoosePremiumPackage(){
  $("#pricing-package-holder-1").removeClass("show-pricing-package-holder")
  $("#pricing-package-holder-2").removeClass("show-pricing-package-holder")
  $("#pricing-package-holder-3").removeClass("show-pricing-package-holder")

  $("#pricing-package-holder-3").addClass("show-pricing-package-holder")

  $("#pricing-nav-point-1").removeClass("active-pricing-nav-point")
  $("#pricing-nav-point-2").removeClass("active-pricing-nav-point")
  $("#pricing-nav-point-3").removeClass("active-pricing-nav-point")

  $("#pricing-nav-point-3").addClass("active-pricing-nav-point")
}


function ChooseBusinessCard1(){
  $("#pricing-nav-point-business-1").removeClass("active-pricing-nav-point")
  $("#pricing-nav-point-business-2").removeClass("active-pricing-nav-point")

  $("#pricing-nav-point-business-1").addClass("active-pricing-nav-point")

  $("#pricing-business-card-1").removeClass("active-pricing-business-card")
  $("#pricing-business-card-2").removeClass("active-pricing-business-card")

  $("#pricing-business-card-1").addClass("active-pricing-business-card")
}

function ChooseBusinessCard2(){
  $("#pricing-nav-point-business-1").removeClass("active-pricing-nav-point")
  $("#pricing-nav-point-business-2").removeClass("active-pricing-nav-point")

  $("#pricing-nav-point-business-2").addClass("active-pricing-nav-point")

  $("#pricing-business-card-1").removeClass("active-pricing-business-card")
  $("#pricing-business-card-2").removeClass("active-pricing-business-card")

  $("#pricing-business-card-2").addClass("active-pricing-business-card")
}

var hammerTime = new Hammer(document.getElementById("pricing-business-contact-holder"))

hammerTime.on("swipe", function(e){

    if(window.innerWidth <= 767){
      if(e.deltaX < 0){
        ChooseBusinessCard2()

      }

      else if (e.deltaX > 0){

        ChooseBusinessCard1()
      }
    }
})