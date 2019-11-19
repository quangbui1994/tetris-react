// Slide Show
var slideIndex = 0;
var unSelect = true;

// data
var data = [];
var jobCities = [];

// filters
var appliedFilters = [];

// search val
var searchVal = '';

//TODO: rewrite everything in jQuery!
var slides = document.getElementsByClassName("mySlides");
var dots = document.getElementsByClassName("dot");

// Select Country when page load
$(window).on('load', function () {
  var $modal = $("#myModal");
  $modal.show();
  $(".country-option").click(function () {
    var id = $(this).attr("id").substring(0,2);
    setCountry($(this), id);
    adjustFields(id);
    $("#"+id).hide();
    $modal.hide();
  });
});

$(document).ready(function () {
  var $header = $(".header");
  var $content = $header.next();
  var $selectedOption = $(".country-option-li");

  // adjusts content, when country is selected
  // in select on top
  $selectedOption.click(function () {
    var id = $(this).attr("id").substring(0,2);
    setCountry($(this), id);
    $selectedOption.show();
    $(this).hide();
    adjustFields(id);
    $content.slideToggle(300);
  });

  // shows country dropdown on click
  $header.click(function () {
    $content.slideToggle(300);
  });

  // shows country dropdown on click
  $(".input-icon").click(function() {
    $(this).next(".country-dropdown").slideToggle(300);
  });

  // change country from section
  $(".input-icon-li").click(function() {
    var id = $(this).attr("id").substring(0,2);
    var $id = $("#"+id);
    var $dropdown = $(".country-dropdown");
    $(".input-icon").attr("src", $(this).attr("src"));
    $(".country-option-li").show();
    $id.hide();
    adjustFields(id);
    $dropdown.slideToggle(300);
    $dropdown.hide();
    setCountry($id, id);
  });

  // shows the right section
  $(".show-section").click(function() {
    // takes substring to show the element with the right id
    var id = $(this).attr("id").substring(5);
    // hides other section content
    $(".section-content").hide();
    // show specific content
    $("#"+id).show();
    // adjusts section title
    $("#section-title").text(id.toUpperCase());
    var $section = $("#section");
    $section.removeClass();
    // adds class for background picture
    $section.addClass("section " +id);
  });

  // shows responsive filters
  $(".filter-checkbox-container").click(function() {
    $(this).find(".checkboxes").fadeIn();
    if($(document).width() < 845) $(this).find(".responsive-filter-heading").show();
    $("#filter-modal").fadeIn();
  });

  // hides responsive filters
  $("#filter-modal").click(function() {
    $(this).fadeOut();
    $('.checkboxes').fadeOut();
  });

  // handles filter array
  $(".filter-checkbox input").change(handleFilterArray);

  // clears all filters
  $(".clear-filters").click(function() {
    appliedFilters = [];
    renderJobs(Object.values(data["jobs"]));
    $(".filter-checkbox input").prop('checked', false);
  });

  //handles search bar
  $(".search-input-field").on('keyup', handleSearchBar);

  //TODO: review this code
  if ($(window).width() <= 800) {
    // do your stuff
    $("#list").click(function () {
      $(this).next().slideToggle(300, function () {
      });
    });
    $(".list a").click(function () {
      $(this).parent().slideToggle(300, function () {
      });
    });
  }

  showSlides();

//create top scroll for sponsers
  $(function () {
    $(".sponserC").scroll(function () {
      $(".sponser")
        .scrollLeft($(".sponserC").scrollLeft());
    });
    $(".sponser").scroll(function () {
      $(".sponserC")
        .scrollLeft($(".sponser").scrollLeft());
    });
  });

//scroll to the bottom of the page
  $(function () {
    $(".roll").on('click', function (event) {
      // Make sure this.hash has a value before overriding default behavior
      if (this.hash !== "") {
        // Prevent default anchor click behavior
        event.preventDefault();

        // Store hash
        var hash = this.hash;

        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 800, function () {

          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        });
      } // End if
    });
  });

  $("#view-more").click(function() {
    viewSection();
    $(this).hide();
  });

  /******View More Sections*******/
  function viewSection() {
    $(".hide-first").show();
  }
});

/* ------------- FUNCTIONS ------------- */

/**
 * Adjusts content to current country.
 *
 * @param $this
 * @param id
 */
function setCountry($this, id) {
  //fetchData(id);
  var promiseData = fetchData(id).then(function(snapshot) {
    return snapshot.val();
  });

  Promise.all([promiseData]).then(function(values) {
    data = values[0];
    jobCities = getCities(Object.values(data['jobs']));
    console.log(data);
    console.log(jobCities);
    renderData(data);
  });
  $("#country").remove();
  $(".header a").remove();
  $this.clone().appendTo(".header").show();
  var url = '';
  switch (id) {
    case 'FI':
      url = "./icons/finland.png";
      break;
    case 'SE':
      url = "./icons/sweden.png";
      break;
    case 'NO':
      url = "./icons/norway.png";
      break;
    case 'DK':
      url = "./icons/denmark.png";
      break;
    default:
      console.log("invalid country");
      break;
  }
  $(".input-icon").attr("src", url);
}

/**
 * Adjusts dropdowns, as soon as country
 * has been changed.
 *
 * @param id
 */
function adjustFields(id) {
  $(".input-icon-li").show();
  $("#"+id+"jobs").hide();
  $("#"+id+"events").hide();
  $("#"+id+"feeds").hide();
  $("#"+id+"join").hide();
}

/**
 * Adds or removes filter depending on
 * the checkboxes.
 */
function handleFilterArray() {
  var filter = $(this).val();
  var filterCategory = $(this).attr("class");
  var includesFilter = appliedFilters[filterCategory] ?
    appliedFilters[filterCategory].includes(filter) : false;
  if ($(this).is(':checked') && !includesFilter) {
    if (!appliedFilters[filterCategory]) {
      appliedFilters[filterCategory] = [];
    }
    appliedFilters[filterCategory].push(filter);
  } else {
    if (includesFilter) {
      var index = appliedFilters[filterCategory].findIndex(function(element) {
        return element === filter;
      });
      appliedFilters[filterCategory].splice(index, 1);
    }
  }
  renderJobs(Object.values(data["jobs"]), appliedFilters, searchVal);
}

/**
 * Renders jobs according to searchbar value
 */
function handleSearchBar() {
  var searchVal = $(this).val();
  renderJobs(Object.values(data["jobs"]), appliedFilters, searchVal);
}

/**
 * Gets all cities of jobs.
 *
 * @param jobs
 * @returns {Array}
 */
function getCities(jobs) {
  var cities = [];
  for (var i = 0; i < jobs.length; i++) {
    if (!cities.includes(jobs[i].city)) {
      cities.push(jobs[i].city);
    }
  }
  return cities;
}

/**
 * Shows div on position x.
 *
 * @param x
 */
function currentDiv(x) {
  unSelect = false;
  slideIndex = x;
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[x].style.display = "block";
  dots[x].className += " active";
}

/**
 * Runs through all slides.
 */
function showSlides() {
  if (unSelect) {
    var i;
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
      slideIndex = 1
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    setTimeout(showSlides, 4000)
  } else {
    setTimeout(showSlides, 4000, unSelect = true)
  }
}
