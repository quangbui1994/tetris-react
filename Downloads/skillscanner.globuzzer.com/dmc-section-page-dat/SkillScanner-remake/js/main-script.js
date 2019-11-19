var data = [];
// job filters
var jobCities = [];
var jobTypes = [];
var jobCategories = [];
var appliedFilters = [];
var searchVal = '';

// team filters
var teamCities = [];
var teamTypes = [];
var teamCategories = [];

// event filters
var eventLocations = [];

// links for 'join'
var links = {
  SE: 'http://www.globuzzer.com/skill-scanner-se.php',
  DK: 'http://www.globuzzer.com/skill-scanner-de.php',
  NO: 'http://globuzzer.com/skills-scanner-no.php',
  FI: 'http://globuzzer.com/skills-scanner.php'
};
// links for further jobs
var jobLinks = {
  SE: 'https://globuzzer.mn.co/groups/264952/topics/749996',
  DK: 'https://globuzzer.mn.co/groups/365370/topics/750000/?filters=articles',
  NO: 'https://globuzzer.mn.co/groups/398343/topics/750001/?filters=articles',
  FI: 'https://globuzzer.mn.co/groups/230359/topics/749993'
};
// links for further articles
var articleLinks = {
  SE: 'https://globuzzer.mn.co/groups/264952/topics',
  DK: 'https://globuzzer.mn.co/groups/365370/topics',
  NO: 'https://globuzzer.mn.co/groups/398343/topics',
  FI: 'https://globuzzer.mn.co/groups/230359/topics'
};
// links for further events
var eventLinks = {
  SE: 'https://globuzzer.mn.co/groups/264952/events',
  DK: 'https://globuzzer.mn.co/groups/365370/events',
  NO: 'https://globuzzer.mn.co/groups/398343/events',
  FI: 'https://globuzzer.mn.co/groups/230359/events'
};

var currCountry = getQueryParams(location.search).country || "SE";

// default country
adjustData(currCountry);
handleCountrySelect($("#" + currCountry));

// ----------- EVENT HANDLERS -----------
// mobile nav
$(".open-side-bar").click(showSideNav);
$("#nav-modal, .nav-aside-close-icon, .mobile-view .list li").click(closeSideNav);
$(".scroll-to-section").click(scrollSmoothlyTo);
// adjust section
$(".category-box").click(showRightSection);
// toggles custom select
$(".selectCountry").click(toggleCountryList);
$(".select-box").click(toggleOptionList);
$(".small-country-select").click(toggleCountryList);
// adjusts content to right country
$(".country-option-li").click(setCountry);
// adjusts filters
$(".filter-checkbox input").change(handleFilterArray);
// handles search input
$(".search-input-field").on('keyup', handleSearchBar);
// clears all the filters
$(".clear-filters").click(resetFilters);
// responsive filters
$(".checkbox-heading").click(showResponsiveFilters);
$("#filter-modal").click(hideResponsiveFilters);
// apply modal
$(".close-modal").click(closeApplyModal);
$("#apply-modal").click(closeApplyModal);
$("#find-jobs").click(closeSuccessAndShowJobs);


// ----------- FUNCTIONS -----------
/**
 * Sets data and select to right country.
 */
function setCountry() {
  var id = $(this).attr("id").substring(0,2);
  $("#join-link").attr("href", links[id]);
  adjustData(id);
  handleCountrySelect($(this));
}

/**
 * Adjusts data from database.
 *
 * @param id
 */
function adjustData(id) {
  var promiseData = fetchData(id).then(function(snapshot) {
    var data = {};
    snapshot.forEach(function(doc) {
      // doc.data() is never undefined for query doc snapshots
      data[doc.id] = doc.data();
    });
    return data;
  });

  Promise.all([promiseData]).then(function(values) {
    data = values[0];
    // console.log(data);
    // job filters
    var jobData = Object.values(data['jobs'] || {});
    jobCities = getFilterData(jobData, 'city');
    jobTypes = getFilterData(jobData, 'position');
    jobCategories = getFilterData(jobData, 'category');
    adjustFilters($("#city-filters"), jobCities, 'cityFilter');
    adjustFilters($("#type-filters"), jobTypes, 'positionFilter');
    adjustFilters($("#category-filters"), jobCategories, 'categoryFilter');
    // team filters
    var teamData = Object.values(data['team'] || {});
    teamCities = getFilterData(teamData, 'city');
    teamTypes = getFilterData(teamData, 'position');
    teamCategories = getFilterData(teamData, 'category');
    adjustFilters($("#city-filters-team"), teamCities, 'cityFilter');
    adjustFilters($("#type-filters-team"), teamTypes, 'positionFilter');
    adjustFilters($("#category-filters-team"), teamCategories, 'categoryFilter');
    // event filters
    var eventData = Object.values(data['events'] || {});
    eventLocations = getFilterData(eventData, 'location');
    adjustFilters($("#location-filter"), eventLocations, 'locationFilter');
    // render data
    renderData(data);
  });

  $("#job-link").attr("href", jobLinks[id]);
  $("#article-link").attr("href", articleLinks[id]);
  $("#event-link").attr("href", eventLinks[id]);
}

/**
 * Unchecks checkboxes and resets filter array.
 */
function resetFilters() {
  appliedFilters = [];
  renderJobs(Object.values(data["jobs"] || {}));
  $(".filter-checkbox input").prop('checked', false);
}

/**
 * Adds or removes filter depending on
 * the checkboxes.
 */
function handleFilterArray() {
  var filter = $(this).val();
  console.log(filter);
  var filterCategory = $(this).attr("class");
  var includesFilter = appliedFilters[filterCategory] ?
    appliedFilters[filterCategory].includes(filter.trim()) : false;
  if ($(this).is(':checked') && !includesFilter) {
    if (!appliedFilters[filterCategory]) {
      appliedFilters[filterCategory] = [];
    }
    appliedFilters[filterCategory].push(filter.trim());
  } else {
    if (includesFilter) {
      var index = appliedFilters[filterCategory].findIndex(function(element) {
        return element === filter;
      });
      appliedFilters[filterCategory].splice(index, 1);
    }
  }
  console.log(appliedFilters);
  renderJobs(Object.values(data["jobs"]), appliedFilters, searchVal);
  renderTeam(Object.values(data["team"]), appliedFilters, searchVal);
  renderEvents(Object.values(data["events"]), searchVal, appliedFilters);
}

/**
 * Renders jobs according to searchbar value
 */
function handleSearchBar() {
  var searchVal = $(this).val();
  var section = $(this).attr("id");

  switch(section) {
    case "search-jobs":
      renderJobs(Object.values(data["jobs"] || {}), appliedFilters, searchVal);
      break;
    case "search-articles":
      renderArticles(Object.values(data["articles"] || {}), searchVal);
      break;
    case "search-events":
      renderEvents(Object.values(data["events"] || {}), searchVal);
      break;
    case "search-team":
      renderTeam(Object.values(data["team"] || {}), appliedFilters, searchVal);
      break;
    default:
      console.log("no section found!");
      break;
  }

}

/**
 * Gets all the information of the job for the filters.
 *
 * @param jobs
 * @param type
 * @returns {Array}
 */
function getFilterData(jobs, type) {
  var filterData = [];
  for (var i = 0; i < jobs.length; i++) {
    if (!filterData.includes(jobs[i][type].trim())) {
      filterData.push(jobs[i][type].trim());
    }
  }
  return filterData;
}

/**
 * Adjust filters to job data.
 *
 * @param $container
 * @param filterArray
 * @param className
 */
function adjustFilters($container, filterArray, className) {
  $container.empty();
  var $showMoreContainer = $('<div class="show-more-container"></div>');
  var $showMoreArrow = $('<div class="show-more">\n' +
    '                            <i class="fas fa-angle-down"></i>\n' +
    '                        </div>');
  $showMoreArrow.on("click", showAllFilters);
  for(var i = 0; i < filterArray.length; i++) {
    var $input = $('<input type="checkbox" value="' + filterArray[i].toLowerCase() + '" class="' + className + '">');
    var $filter = $('<label class="filter-checkbox checkbox-container">' +
      '<span class="checkmark"></span>' +
      ' ' + filterArray[i] +
      '</label>');
    $input.on("change", handleFilterArray);
    $filter.prepend($input);
    if (i < 3) $container.append($filter);
    else {
      $showMoreContainer.append($filter);
    }
  }
  $container.append($showMoreContainer);
  if (filterArray.length > 3) $container.append($showMoreArrow);
}

/**
 * Shows more filters.
 */
function showAllFilters() {
  $(this).parent().find('.show-more-container').slideToggle();
  if ($(this).hasClass("turned")) $(this).removeClass("turned");
  else $(this).addClass("turned");
}

/**
 * Handles custom country select.
 */
function handleCountrySelect($this) {
  $(".country-option-li").show();
  $this.hide();
  $("#country").remove();
  $(".country-container div").remove();
  $(".select img").attr("src", $this.children("img").attr("src"));
  $this.clone().removeClass("country-option-li").appendTo(".country-container").show();
}

/**
 * Toggles country list.
 */
function toggleCountryList() {
  $(".countryList").slideToggle();
}

/**
 * Scrolls to section and shows right content.
 */
function showRightSection() {
  scrollToSection();
  showRightContent(this);
  searchVal = '';
}

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
 * Scrolls smoothly to the section.
 */
function scrollToSection() {
  var pos = $("#section").offset().top - 50;
  $("body, html").animate({
    scrollTop: pos
  }, 500);
}

/**
 * Hides other content and shows specific one.
 */
function showRightContent(element) {
  // takes substring to show the element with the right id
  var id = $(element).attr("id").substring(5);
  // hides other section content
  $(".section-content").hide();
  // show specific content
  $("#"+id).show();
  $(".category-box").removeClass("active");
  $(element).addClass("active");
  resetFilters();
}

/**
 * Shows responsive filters.
 */
function showResponsiveFilters() {
  var $checkboxContainer = $(this).next(".checkboxes");
  var autoHeight = $checkboxContainer.get(0).scrollHeight + 50;
  $checkboxContainer.animate({
    height: autoHeight,
    padding: '10px'
  });
  if($(document).width() < 845) $(this).next().find(".responsive-filter-heading").show();
  $("#filter-modal").fadeIn();
}

/**
 * Hides responsive filters.
 */
function hideResponsiveFilters() {
  $(this).fadeOut();
  var $checkboxes = $('.checkboxes');
  $checkboxes.css({padding: '0', height: '0'});
}

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
  console.log($(window).width());
  if ($(window).width() < 720) {
    $(".mobile-view").animate({
      width: "0"
    });
    $("#nav-modal").fadeOut();
  }
}


/**
 * Extracts query params of URL.
 *
 * @param qs
 * @returns {{}}
 */
function getQueryParams(qs) {
  qs = qs.split('+').join(' ');

  var params = {},
    tokens,
    re = /[?&]?([^=]+)=([^&]*)/g;

  while (tokens = re.exec(qs)) {
    params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
  }

  return params;
}

/**
 * Shows apply form.
 *
 * @param jobTitle
 * @param companyMail
 * @param jobId
 */
function showApplyModal(jobTitle, companyMail, jobId) {
  $("#applied_job").val(jobTitle);
  if (companyMail) {
    $("#company_mail").val(companyMail);
    $("#job_id").val(jobId);
  }
  if ($(window).width() < 400) {
    $("#apply-modal-box").css({top: $(window).scrollTop() + 'px'});
  } else {
    $("#apply-modal-box").css({top: '50%'});
  }
  $("#apply-modal").fadeIn();
}

/**
 * Closes apply box.
 */
function closeApplyModal() {
  $(".modal-box").css({top: '-1000px'});
  $("#apply-modal").fadeOut();
}

/**
 * Shows a success message.
 */
function showSuccessBox() {
  $("#apply-modal-box").css({top: '-1000px'});
  console.log($(window).scrollTop());
  if ($(window).width() < 400) {
    $("#success-box").css({top: 'calc(' + $(window).scrollTop() + 'px + 30%)'});
  } else {
    $("#success-box").css({top: '50%'});
  }
}

/**
 * Closes success message and shows other jobs.
 */
function closeSuccessAndShowJobs() {
  showRightContent($("#show-jobs"));
  $("#success-box").css({top: '-1000px'});
  $("#apply-modal").fadeOut();
}

/**
 * Toggles option list of custom select.
 */
function toggleOptionList() {
  $(this).next(".option-list").slideToggle();
}

