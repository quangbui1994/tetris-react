// if(window.location.protocol === "http:" || window.location.href.indexOf("//www.") === -1){
//   window.location="https://www.skillscanner.globuzzer.com/"

//   document.body.innerHTML = ""
// }

// if(window.location.protocol === "http:"){
//   window.location="https://www.skillscanner.globuzzer.com/"
// }

$(document).ready(function() {
  document.getElementsByClassName('jp-fb-location-holder').style.WebkitOverflowScrolling = 'touch';
})

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


var autocompleteCityId = $("#comlocation")

autocompleteCityId.focus(function(){
  $(this).attr('autocomplete', 'new-password')
})

var firestore = firebase.firestore()

var data = [];

// job filters

var jobCities = [];

var jobTypes = [];

var jobCategories = [];

var jobCountries = []

var country_city_filter_arr = [[], [], [], []] //0-Sweden, 1-Finland, 2-Norway, 3-Denmark

var appliedFilters = {
  categoryFilter: [],
  cityFilter: [],
  positionFilter: [],
  locationFilter: [],
  monthFilter: [],
  countryFilter: []
};

var lastJobFromCurrentSearch = {
  jobId: ''
}

var filteredJobs = [],
    filteredEvents = []

var searchVal = $(".search-input-field").val();



// team filters

var teamCities = [];

var teamTypes = [];

var teamCategories = [];



// event filters

var eventLocations = [];


var jobData = [],
    articleData,
    eventData,
    teamData


// links for 'join'

var links = {

  SE: 'https://www.globuzzer.com/skill-scanner-se.php',

  DK: 'https://www.globuzzer.com/skill-scanner-de.php',

  NO: 'https://globuzzer.com/skills-scanner-no.php',

  FI: 'https://globuzzer.com/skills-scanner.php'

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


function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

if(getParameterByName("jobId")){
  firestore.collection("job_offers").doc(getParameterByName("jobId").replace("And", "&")).get().then(function(doc){
    var job = {
      id: doc.id,
      data: doc.data()
    }

    $('meta[property="og:url"]').remove()
    $('meta[property="og:type"]').remove()
    $('meta[property="og:title"]').remove()
    $('meta[property="og:description"]').remove()
    $('meta[property="fb:app_id"]').remove()
    $('meta[property="og:image"]').remove()

    $('head').append('<meta property="og:url" content="' + window.location.href +'">')
    $('head').append('<meta property="og:type" content="website">')
    $('head').append('<meta property="og:title" content="A platform for talents">')
    $('head').append('<meta property="og:description" content="We are hiring a talent for the position of ' + doc.data().title + ' at ' + doc.data().companyName +'">')
    $('head').append('<meta property="fb:app_id" content="2352379188372286">')
    $('head').append('<meta property="og:image" content="' + doc.data().image + '">')
  
    var position_tag, salary_tag

    if(job.data.position.toLowerCase().indexOf("intern".toLowerCase()) > -1)
        position_tag = 'Intern'

      else if(job.data.position.toLowerCase().indexOf("trainee".toLowerCase()) > -1)
        position_tag = 'Trainee'

      else if(job.data.position.toLowerCase().indexOf("full".toLowerCase()) > -1)
        position_tag = 'Full-time'

      else if(job.data.position.toLowerCase().indexOf("part".toLowerCase()) > -1)
        position_tag = 'Part-time'

      else if(job.data.position.toLowerCase().indexOf("contract".toLowerCase()) > -1)
        position_tag = 'Contract'
      

      if(job.data.salary){
        if(job.data.salary.toLowerCase() == "unpaid".toLowerCase()){
          salary_tag = 'Unpaid'
        }

        else {
          salary_tag = 'Paid'
        }
      }

      else{
        salary_tag = 'Unpaid'
      }

    if(job.data.companyId === "admin@skillscanner.com"){
      showApplyModalOfSSJob(job.data.title, job.data.companyId, 
        job.id, position_tag, salary_tag, job.data.description, 
        job.data.city, job.data.companyName, job.data.country, job.data.category, 
        job.data.requirement, job.data.link, job.data.deadline, job.data.image)
    }

    else{
      showApplyModal(job.data.title, job.data.companyId, 
        job.id, position_tag, salary_tag, job.data.description, 
        job.data.city, job.data.companyName, job.data.country, job.data.category, 
        job.data.requirement, job.data.deadline, job.data.image)
    }

  })
  .catch(function(err){
    console.log(err)
  })
}


var currCountry = getQueryParams(location.search).country || "SE";

var totalJobPostCards = 0

// handleCountrySelect($("#" + currCountry));



// ----------- EVENT HANDLERS -----------

// mobile nav

$(".open-side-bar").click(showSideNav);

$("#nav-modal, .nav-aside-close-icon, .mobile-view .list li").click(closeSideNav);

// $(".scroll-to-section").click(ScrollToViewJobs);

$("#to-job-section").click(ScrollToViewJobs)

$("#to-article-section").click(ScrollToViewArticles)

$("#to-contact-us").click(function(){
  $('html, body').animate({
    scrollTop: $("#footer").offset().top -50
}, 500)
})

// adjust section

$(".category-box").click(showRightSection);

// toggles custom select

// $(".selectCountry").click(toggleCountryList);

// $(".select-box").click(toggleOptionList);

$(".small-country-select").click(toggleCountryList);

// adjusts content to right country

// adjusts filters

$(".filter-checkbox input").change(handleFilterArray);

// handles search input

// $(".search-input-field").on('keyup', handleSearchBar);

//note important

let searchJob = () => {
  let value = $(".search-input-field").val();
  handleSearchBar(value);
}

// $(".search-input-field").on('keyup', function(e) {
//   let value = $(this).val();
//   if (e.keyCode === 13) {
//     handleSearchBar(value);
//   }
// });

// clears all the filters

$(".clear-filters").click(resetFilters);

// responsive filters

$(".checkbox-heading").click(showResponsiveFilters);

$("#filter-modal").click(hideResponsiveFilters);

// apply modal

$(".close-modal").click(closeApplyModal);

// $("#apply-modal").click(closeApplyModal);

// $("#find-jobs").click(closeApplyModal);


// ----------- FUNCTIONS -----------

// function SetPartnerLogosHorizontally(){
//   $("#gb-exapndable-box").children("a").each(function(index, element){
    
//     this.style.left = index*200 + "px"
//   })
// }

// SetPartnerLogosHorizontally()


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





/**

* Sets data and select to right country.

*/

function setCountry() {

  var id = $(this).attr("id").substring(0,2);

  $("#join-link").attr("href", links[id]);

  adjustData(id); 

  handleCountrySelect($(this));

}

function JoinTheCommunity(){
  window.open("https://globuzzer.mn.co/search?term=Skillscanner%20&filters=circles")
}

fetchJobs()

fetchArticles()

function moveAndFetchAccordingJobs(numberOfJobs, currentDateTime){
  if(numberOfJobs === 0 || keepTrackOfLastSearchedJobId(lastJobFromCurrentSearch.jobId)){
    lastJobFromCurrentSearch = jobData[jobData.length - 1]

    jobData.sort(function(a, b){
      return b.data.createdMili - a.data.createdMili
    })

    jobCities = getJobFilterData(jobData, 'city');


    jobTypes = getJobFilterData(jobData, 'position');

    jobCategories = getJobFilterData(jobData, 'category');

    // jobCountries = getJobFilterData(jobData, 'country')

    jobCountries = ["Sweden", "Finland", "Norway", "Denmark"]

    // adjustFilters($("#jp-fb-location-holder"), jobCities, 'cityFilter');

    adjustFilters($("#type-filters"), jobTypes, 'positionFilter');

    adjustFilters($("#jp-fb-category-holder"), jobCategories, 'categoryFilter');

    adjustFilters($("#jp-fb-country-holder"), jobCountries, 'countryFilter');

    if(window.sessionStorage.getItem("appliedFilters"))
      renderJobs(jobData, JSON.parse(window.sessionStorage.getItem("appliedFilters")), searchVal, $("#jobs-container"));

    else
      renderJobs(jobData,appliedFilters, searchVal, $("#jobs-container"));

    return
  }

  firestore.collection("job_offers").limit(numberOfJobs)
  .where(firebase.firestore.FieldPath.documentId(), ">", lastJobFromCurrentSearch.jobId)
  .get().then(function(querySnapshot){
    var numberOfJobsToLoadMore = 0

    querySnapshot.forEach(function(doc){
      if((doc.data().expiredMili < currentDateTime) || (new Date(doc.data().deadline).getTime() < currentDateTime)){
        numberOfJobsToLoadMore += 1
      }

      else
        jobData.push({jobId: doc.id, data: doc.data()})
    })

    lastJobFromCurrentSearch = jobData[jobData.length - 1]

    moveAndFetchAccordingJobs(numberOfJobsToLoadMore, currentDateTime)
  })
  .catch(function(err){
    console.log(err)
  })
}

function fetchJobs(){
  console.log('hi');
  //Get the first 47 jobs
  var currentDateTime = new Date().getTime()
  firestore.collection("job_offers").get().then(function(querySnapshot){
    var numberOfJobsToLoadMore = 0
    
    querySnapshot.forEach(function(doc){
      if((doc.data().expiredMili < currentDateTime) || (new Date(doc.data().deadline).getTime() < currentDateTime)){
        numberOfJobsToLoadMore += 1
      }

      else
        jobData.push({jobId: doc.id, data: doc.data()})
    })

    lastJobFromCurrentSearch = jobData[jobData.length - 1]

    moveAndFetchAccordingJobs(numberOfJobsToLoadMore, currentDateTime)
  })
  .catch(function(err){
    console.log(err)
  })
}

// Filtering by Search bar

// $('.jb-fb-post-job-offer-button').on('keyup', function(e) {
//   if (e.keyCode === 13) {
//     let jobSearchQuery = $(this).val();
//     jobSearchQuery = jobSearchQuery.charAt(0).toUpperCase() + jobSearchQuery.slice(1);
//     let jobDataSearch = jobData.filter(el => {
//       let jobId = el.jobId;
//       if (jobId.includes(jobSearchQuery)) {
//         console.log(jobSearchQuery);
//       }
//     })
//     renderJobs(jobDataSearch, arrayFilters, search, container)
//   }
// })



function hideChooseLocationJobFilter(){
  $("#jp-fb-location-holder").hide()
}

hideChooseLocationJobFilter()

function hideChooseCategoryJobFilter(){
  $("#jp-fb-category-holder").hide()
}

hideChooseCategoryJobFilter()

function hideChooseCountryJobFilter(){
  $("#jp-fb-country-holder").hide()
}

hideChooseCountryJobFilter()

function hideChooseCountryCompanyRegist(){
  $("#company-regist-select-country-dropdown").hide()

}

hideChooseCountryCompanyRegist()

function ChooseCountryCompanyRegist(country){
  $("#company-regist-select-country>p").text(country)
  $('#company-country-validation').removeClass('show-warning-incorrect-input')

  if(country === 'Sweden'){
    autocompleteCompanyCityAPI.setComponentRestrictions({
      'country': 'se'
    })
  }

  else if (country === 'Finland'){
    autocompleteCompanyCityAPI.setComponentRestrictions({
      'country': 'fi'
    })
  }

  else if (country === 'Norway'){
    autocompleteCompanyCityAPI.setComponentRestrictions({
      'country': 'no'
    })
  }

  else if (country === 'Denmark'){
    autocompleteCompanyCityAPI.setComponentRestrictions({
      'country': 'dk'
    })
  }
}

function ChooseFirstJobCategory(category){
  $("#pfj-category-button>p").text(category)
  $('#first-job-category-validation').removeClass('show-warning-incorrect-input')
}

function ChooseFirstJobCountry(country){
  $("#pfj-country-button>p").text(country)
  $('#first-job-country-validation').removeClass('show-warning-incorrect-input')

  if(country === 'Sweden'){
    autocompleteJobCityAPI.setComponentRestrictions({
      'country': 'se'
    })
  }

  else if (country === 'Finland'){
    autocompleteJobCityAPI.setComponentRestrictions({
      'country': 'fi'
    })
  }

  else if (country === 'Norway'){
    autocompleteJobCityAPI.setComponentRestrictions({
      'country': 'no'
    })
  }

  else if (country === 'Denmark'){
    autocompleteJobCityAPI.setComponentRestrictions({
      'country': 'dk'
    })
  }
}

function ChooseFirstJobSalary(salary){
  $("#pfj-salary-button>p").text(salary)
  $('#first-job-salary-validation').removeClass('show-warning-incorrect-input')
}

function ChooseFirstJobPosition(position){
  $("#pfj-type-button>p").text(position)
  $('#first-job-type-validation').removeClass('show-warning-incorrect-input')
}


$("#pfj-category-holder").hide()
$("#pfj-type-holder").hide()
$("#pfj-salary-holder").hide()
$("#pfj-country-holder").hide()


document.addEventListener("click", function(e){
  HandlerForChoosingFilters(e)
})


function HandlerForChoosingFilters(e){
  if(isDescendant(document.getElementById("jp-fb-location-button"), e.target) || e.target.id === "jp-fb-location-button"){
    $("#jp-fb-location-holder").slideToggle(250, function() {
      $(this).css({'overflow-y': 'scroll'});
    })
    
    ReadChosenFiltersFromLocalStorage() //To apply prop check, input needs to be displayed or visible.
    $("#jp-fb-category-holder").slideUp(250)
    // $("#filter-country-list").slideUp(250)
    $("#jp-fb-country-holder").slideUp(250)
  }
  
  else if(isDescendant(document.getElementById("jp-fb-category-button"), e.target) || (e.target.id === "jp-fb-category-button")){
    $("#jp-fb-category-holder").slideToggle(250)
    ReadChosenFiltersFromLocalStorage()
    $("#jp-fb-location-holder").slideUp(250)
    // $("#filter-country-list").slideUp(250)
    $("#jp-fb-country-holder").slideUp(250)

  }

  else if(isDescendant(document.getElementById("jp-fb-category-button"), e.target) || (e.target.id === "jp-fb-country-button")){
    $("#jp-fb-country-holder").slideToggle(250)
    ReadChosenFiltersFromLocalStorage()
    $("#jp-fb-location-holder").slideUp(250)
    $("#jp-fb-category-holder").slideUp(250)
  }

  // else if(isDescendant(document.getElementById("company-regist-select-country"), e.target) || (e.target.id === "company-regist-select-country")){
  //   $("#company-regist-select-country-dropdown").slideToggle(250)
  //   $("#jp-fb-location-holder").slideUp(250)
  //   $("#jp-fb-category-holder").slideUp(250)
  //   $("#jp-fb-country-holder").slideUp(250)

  // }

  // else if(isDescendant(document.getElementById("pfj-category-button"), e.target) || (e.target.id === "pfj-category-button")){
    
  // }

  // else if(isDescendant(document.getElementById("pfj-country-button"), e.target) || (e.target.id === "pfj-country-button")){
  //   $("#pfj-country-holder").slideToggle(250)
  //   $("#pfj-category-holder").slideUp(250)
  //   $("#pfj-type-holder").slideUp(250)
  //   $("#pfj-salary-holder").slideUp(250)
  // }

  // else if(isDescendant(document.getElementById("pfj-type-button"), e.target) || (e.target.id === "pfj-type-button")){
  //   $("#pfj-type-holder").slideToggle(250)
  //   $("#pfj-category-holder").slideUp(250)
  //   $("#pfj-country-holder").slideUp(250)
  //   $("#pfj-salary-holder").slideUp(250)
  // }

  // else if(isDescendant(document.getElementById("pfj-salary-button"), e.target) || (e.target.id === "pfj-salary-button")){
  //   $("#pfj-salary-holder").slideToggle(250)
  //   $("#pfj-category-holder").slideUp(250)
  //   $("#pfj-type-holder").slideUp(250)
  //   $("#pfj-country-holder").slideUp(250)
  // }

  

  else if(isDescendant(document.getElementById("jp-fb-location-holder"), e.target)){
    $("#jp-fb-location-holder").show()
  }

  else if(isDescendant(document.getElementById("jp-fb-category-holder"), e.target)){
    $("#jp-fb-category-holder").show()
  }

  else if(isDescendant(document.getElementById("jp-fb-country-holder"), e.target)){
    $("#jp-fb-country-holder").show()
  }

  else if(e.target.id === "event-location-filter-button"){
    $("#event-location-filter-button").next(".option-list").slideToggle(250)
    $("#event-month-filter-button").next(".option-list").slideUp(250)


    ReadChosenFiltersFromLocalStorageForEvents()
  }

  else if(e.target.id === "event-month-filter-button"){
    $("#event-month-filter-button").next(".option-list").slideToggle(250)
    $("#event-location-filter-button").next(".option-list").slideUp(250)
    ReadChosenFiltersFromLocalStorageForEvents()
  }

  else if (isDescendant(document.getElementById("location-filter"), e.target)){
    $("#event-location-filter-button").next(".option-list").show()
  }

  else if (isDescendant(document.getElementById("month-filter"), e.target)){
    $("#event-month-filter-button").next(".option-list").show()
  }

  else{
    $("#jp-fb-category-holder").slideUp(250)
    $("#jp-fb-location-holder").slideUp(250)
    $("#jp-fb-country-holder").slideUp(250)
    // $("#filter-country-list").slideUp(250)
    $("#event-location-filter-button").next(".option-list").slideUp(250)
    $("#event-month-filter-button").next(".option-list").slideUp(250)

    // $("#pfj-country-holder").slideUp(250)
    // $("#pfj-type-holder").slideUp(250)
    // $("#pfj-salary-holder").slideUp(250)
    // $("#pfj-category-holder").slideUp(250)
  }


  if(!isDescendant(document.getElementById("header-fixed"), e.target) && !e.target.classList.contains("dz-hidden-input")){
    leftBanner.classList.remove("banner-hidden")
    leftOverlay.classList.remove("left-overlay-shrink")
    leftOverlay.classList.remove("left-overlay-translateX")
    // leftInfoHolder.classList.remove("info-cover-increase-opacity")
    // leftInfo.classList.remove("info-visible")

    rightBanner.classList.remove("banner-hidden")
    rightOverlay.classList.remove("right-overlay-translateX")
    rightOverlay.classList.remove("right-overlay-shrink")
    rightOverlayMainContext.classList.remove("show-right-main-context")
    rightDarkenLayer.classList.remove("right-darken-layer-turn-blue")

    $("#company-post-first-job-holder").remove("show-company-post-first-job-holder")
    // rightInfoHolder.classList.remove("info-cover-increase-opacity")
    // rightInfo.classList.remove("info-visible")
  }

  if(e.target.id === "event-location-filter-button"){
    ReadChosenFiltersFromLocalStorageForEvents()
  }

  else if (e.target.id === "event-month-filter-button"){
    ReadChosenFiltersFromLocalStorageForEvents()
  }
}

function isDescendant(parent, child){
  var node = child.parentNode

  while(node !== null){
    if(node === parent){
      return true
    }
    node = node.parentNode
  }

  return false
}

//For jobs
function ReadChosenFiltersFromLocalStorage(){
  var appliedFilters = JSON.parse(window.sessionStorage.getItem("appliedFilters"))

  if(appliedFilters){
    if(appliedFilters.cityFilter){
      $("#jp-fb-location-holder").children("label").children("input").each(function(index, obj){
        appliedFilters.cityFilter.forEach(function(filter){
          if(filter === obj.value){
            obj.checked = true
          }
        })
      })
    }

    if(appliedFilters.categoryFilter){
      $("#jp-fb-category-holder").children("label").children("input").each(function(index, obj){
        appliedFilters.categoryFilter.forEach(function(filter){
          if(filter === obj.value){
            obj.checked = true
          }
        })
      })
    }

    if(appliedFilters.countryFilter){
      $("#jp-fb-country-holder").children("label").children("input").each(function(index, obj){
        appliedFilters.countryFilter.forEach(function(filter){
          if(filter.toLowerCase() === obj.value.toLowerCase()){
            obj.checked = true
          }
        })
      })

      var final_country_city_filter_arr = []

      appliedFilters.countryFilter.forEach(function(country){
        switch(country){
          case "sweden":
            final_country_city_filter_arr = [... final_country_city_filter_arr, ... country_city_filter_arr[0]]
            break
    
          case "finland":
            final_country_city_filter_arr = [... final_country_city_filter_arr, ... country_city_filter_arr[1]]
            break
    
          case "norway":
            final_country_city_filter_arr = [... final_country_city_filter_arr, ... country_city_filter_arr[2]]
            break
    
          case "denmark":
            final_country_city_filter_arr = [... final_country_city_filter_arr, ... country_city_filter_arr[3]]
            break
    
          default:
            break
        }
      })

      if(final_country_city_filter_arr.length === 0){
        adjustFilters($("#jp-fb-location-holder"), jobCities, 'cityFilter')
        $("#jp-fb-location-holder").children("label").children("input").each(function(index, obj){
          appliedFilters.cityFilter.forEach(function(filter){
            if(filter === obj.value){
              obj.checked = true
            }
          })
        })
      }

      else{
        adjustFilters($("#jp-fb-location-holder"), final_country_city_filter_arr, 'cityFilter')
        $("#jp-fb-location-holder").children("label").children("input").each(function(index, obj){
          appliedFilters.cityFilter.forEach(function(filter){
            if(filter === obj.value){
              obj.checked = true
            }
          })
        })
      }
    }
  }

}

ReadChosenFiltersFromLocalStorage()

function ReadChosenFiltersFromLocalStorageForEvents(){
  var appliedFilters = JSON.parse(window.sessionStorage.getItem("appliedFilters"))

  if(appliedFilters){
    if(appliedFilters.locationFilter){
      $("#location-filter").children("label").children("input").each(function(index, obj){
        appliedFilters.locationFilter.forEach(function(filter){
          if(filter === obj.value){
            obj.checked = true
          }
        })
      })
    }

    if(appliedFilters.monthFilter){
      $("#month-filter").children("label").children("input").each(function(index, obj){
        appliedFilters.monthFilter.forEach(function(filter){
          if(filter === obj.value){
            obj.checked = true
          }
        })
      })
    }
  }
}

ReadChosenFiltersFromLocalStorageForEvents()

function keepTrackOfLastSearchedJobId(lastSearchedJobId){
  var found = true
  jobData.every(function(data){
    if(data.jobId === lastSearchedJobId){
      found = true
      return false
    }

    found = false
    return true
  })

  return found
}

function moveAndFetchAccordingJobsForShowMoreJobs(numberOfJobs, currentDateTime){
  
  if(numberOfJobs === 0 || keepTrackOfLastSearchedJobId(lastJobFromCurrentSearch.jobId)){
    lastJobFromCurrentSearch = jobData[jobData.length - 1]

    jobCities = getJobFilterData(jobData, 'city');

    jobTypes = getJobFilterData(jobData, 'position');

    jobCategories = getJobFilterData(jobData, 'category');

    jobCountries = ["Sweden", "Finland", "Norway", "Denmark"]

    adjustFilters($("#jp-fb-location-holder"), jobCities, 'cityFilter');

    adjustFilters($("#type-filters"), jobTypes, 'positionFilter');

    adjustFilters($("#jp-fb-category-holder"), jobCategories, 'categoryFilter');

    adjustFilters($("#jp-fb-country-holder"), jobCountries, 'countryFilter');

    if(window.sessionStorage.getItem("appliedFilters"))
      renderJobs(jobData, JSON.parse(window.sessionStorage.getItem("appliedFilters")), searchVal, $("#jobs-container"));

    else
      renderJobs(jobData,appliedFilters, searchVal, $("#jobs-container"));

    return
  }

  firestore.collection("job_offers")
  .where(firebase.firestore.FieldPath.documentId(), ">", lastJobFromCurrentSearch.jobId)
  .limit(numberOfJobs).get().then(function(querySnapshot){
    var numberOfJobsToLoadMore = 0

    querySnapshot.forEach(function(doc){
      if((doc.data().expiredMili < currentDateTime) || (new Date(doc.data().deadline).getTime() < currentDateTime)){
        numberOfJobsToLoadMore += 1
      }

      else
        jobData.push({jobId: doc.id, data: doc.data()})
    })

    lastJobFromCurrentSearch = jobData[jobData.length - 1]

    moveAndFetchAccordingJobsForShowMoreJobs(numberOfJobsToLoadMore, currentDateTime)
  })
  .catch(function(err){
    console.log(err)
  })
}

function ShowMoreJobs(){
  //Get more 48 jobs starting after the lastJobFromCurrentSearch
  var currentDateTime = new Date().getTime()
  firestore.collection("job_offers")
  .where(firebase.firestore.FieldPath.documentId(), ">", lastJobFromCurrentSearch.jobId)
  .limit(48).get().then(function(querySnapshot){
    var numberOfJobsToLoadMore = 0

    querySnapshot.forEach(function(doc){
      if((doc.data().expiredMili < currentDateTime) || (new Date(doc.data().deadline).getTime() < currentDateTime))
        numberOfJobsToLoadMore += 1

      else
        jobData.push({jobId: doc.id, data: doc.data()})
    })

    lastJobFromCurrentSearch = jobData[jobData.length - 1]

    moveAndFetchAccordingJobsForShowMoreJobs(numberOfJobsToLoadMore, currentDateTime)

  })
  .catch(function(err){
    console.log(err)
  })

}

//for rendering only job section (dmc's work)
function renderJobs(jobData, arrayFilters, search, container){
  var $jobContainer = container

  $jobContainer.empty()

  //intially search for the job titles that fit the search value and then save them to an array called searchedJobs
  var searchedJobs = []

  //save the jobs which meet searchval
  for(var i = 0; i < jobData.length; i++){
    var job = jobData[i].data,
      jobId = jobData[i].jobId
    
    if(!job.dummy && job.companyName.toLowerCase().indexOf(search.toLowerCase()) > -1 || job.title.toLowerCase().indexOf(search.toLowerCase()) > -1){
      var cate_tag = '',
          position_tag = '',
          salary_tag = '',

          cate_tag_dom_id = "cate_tag " + jobData[i].jobId.trim()

      if(job.category.toLowerCase().indexOf("developer".toLowerCase()) > -1){
        cate_tag = 'IT'
      }

      else if(job.category.toLowerCase().indexOf("business".toLowerCase()) > -1){
        cate_tag = 'Business'
      }

      else if(job.category.toLowerCase().indexOf("service".toLowerCase()) > -1){
        cate_tag = 'Service'
      }

      else if(job.category.toLowerCase().indexOf("market".toLowerCase()) > -1){
        cate_tag = 'Business'
      }

      else if(job.category.toLowerCase().indexOf("manage".toLowerCase()) > -1){
        cate_tag = 'Management'
      }
      
      else if(job.category.toLowerCase().indexOf("sale".toLowerCase()) > -1){
        cate_tag = 'Sales'
      }

      else{
        cate_tag = 'Others'
      }


      if(job.position.toLowerCase().indexOf("intern".toLowerCase()) > -1)
        position_tag = 'Intern'

      else if(job.position.toLowerCase().indexOf("trainee".toLowerCase()) > -1)
        position_tag = 'Trainee'

      else if(job.position.toLowerCase().indexOf("full".toLowerCase()) > -1)
        position_tag = 'Full-time'

      else if(job.position.toLowerCase().indexOf("part".toLowerCase()) > -1)
        position_tag = 'Part-time'

      else if(job.position.toLowerCase().indexOf("contract".toLowerCase()) > -1)
        position_tag = 'Contract'
      

      if(job.salary){
        if(job.salary.toLowerCase() == "unpaid".toLowerCase()){
          salary_tag = 'Unpaid'
        }

        else {
          salary_tag = 'Paid'
        }
      }

      else{
        salary_tag = 'Unpaid'
      }

      var jobNode = document.createElement('div')

      jobNode.classList.add("jp-mc-job-post-card")
      
      var jobNodeImage = document.createElement('div')
      jobNodeImage.classList.add("jp-mc-jpc-image-holder")
      var jobImage = document.createElement('img')
      jobImage.src = job.image
      jobImage.alt = ""
      
      jobNodeImage.appendChild(jobImage)
      

      var jobButtonNode = document.createElement('button')

      jobButtonNode.classList.add('jp-mc-jpc-image-view-button')
      if(job.companyId !== "admin@skillscanner.com"){
        jobButtonNode.id = "jp-mc-jpc-apply-now-" + i
      }
      
      else{
        jobButtonNode.id = "jp-mc-jpc-view-" + i
      }
      
      jobButtonNode.textContent= "APPLY NOW"
      jobNodeImage.appendChild(jobButtonNode)

      jobNode.appendChild(jobNodeImage)

      var jobAreaTagNode = document.createElement('div')
      jobAreaTagNode.classList.add('jp-mc-jpc-image-area-tags')
      
      var jobAreaTag = document.createElement('div')

      if(cate_tag === "IT" || cate_tag === "Service"){
        jobAreaTag.classList.add('jp-mc-jpc-image-cate-tag')
        jobAreaTag.id= cate_tag_dom_id
        jobAreaTag.style= 'background-color: rgba(75, 196, 190, 0.9);'
        jobAreaTag.textContent = cate_tag
      }
        
      else if (cate_tag === "Business" || cate_tag === "Management"){
        jobAreaTag.classList.add('jp-mc-jpc-image-cate-tag')
        jobAreaTag.id= cate_tag_dom_id
        jobAreaTag.style= 'background-color: rgba(0, 114, 176, 0.9);'
        jobAreaTag.textContent = cate_tag
      }

      else if (cate_tag === "Others" || cate_tag === "Sales"){
        jobAreaTag.classList.add('jp-mc-jpc-image-cate-tag')
        jobAreaTag.id= cate_tag_dom_id
        jobAreaTag.style= 'background-color: rgba(237, 179, 76, 0.9);'
        jobAreaTag.textContent = cate_tag
      }
      
      jobAreaTagNode.appendChild(jobAreaTag)
      
      jobNode.appendChild(jobAreaTagNode)

      var jobHeaderNode = document.createElement('div')
      jobHeaderNode.classList.add('jp-mc-jpc-header-holder')

      var jobCompanyNameHolderNode = document.createElement('div')
      jobCompanyNameHolderNode.style.display = "flex"

      var jobCompanyNameIcon = document.createElement('i')
      jobCompanyNameIcon.classList.add("fas")
      jobCompanyNameIcon.classList.add("fa-suitcase")
      jobCompanyNameHolderNode.appendChild(jobCompanyNameIcon)

      var jobCompanyNameNode = document.createElement('p')
      jobCompanyNameNode.textContent = job.companyName

      jobCompanyNameHolderNode.appendChild(jobCompanyNameNode)
      jobHeaderNode.appendChild(jobCompanyNameHolderNode)

      var jobCompanyCityHolderNode = document.createElement('div')
      jobCompanyCityHolderNode.style.display = "flex"

      var jobCompanyCityIcon = document.createElement('i')
      jobCompanyCityIcon.classList.add("fas")
      jobCompanyCityIcon.classList.add("fa-map-marker-alt")
      jobCompanyCityHolderNode.appendChild(jobCompanyCityIcon)

      var jobCompanyCityNode = document.createElement('p')

      

      if(job.city.indexOf(",") > -1){
        jobCompanyCityNode.textContent = job.city.substring(0, job.city.indexOf(","))
      }

      else{
        jobCompanyCityNode.textContent = job.city
      }

      jobCompanyCityHolderNode.appendChild(jobCompanyCityNode)
      jobHeaderNode.appendChild(jobCompanyCityHolderNode)

      jobNode.appendChild(jobHeaderNode)

      var jobTitleHolder = document.createElement('div')
      jobTitleHolder.classList.add('jp-mc-jpc-title-holder')

      var jobTitleHolderNode = document.createElement('div')
      jobTitleHolderNode.style.display = "flex"

      var jobTitleIcon = document.createElement('i')
      jobTitleIcon.classList.add("fas")
      jobTitleIcon.classList.add("fa-user")
      jobTitleHolderNode.appendChild(jobTitleIcon)

      var jobTitleP = document.createElement('p')
      jobTitleP.textContent = job.title

      jobTitleHolderNode.appendChild(jobTitleP)
      jobTitleHolder.appendChild(jobTitleHolderNode)

      jobNode.appendChild(jobTitleHolder)

      var jobMobileHeaderHolder = document.createElement('div')
      jobMobileHeaderHolder.classList.add('jp-mc-jpc-header-holder-mb')

      var jobMobileCompanyName = document.createElement('div')
      jobMobileCompanyName.classList.add('jp-mc-jpc-company-holder-mb')

      var jobMobileNameIcon = document.createElement('i')
      jobMobileNameIcon.classList.add("fas")
      jobMobileNameIcon.classList.add("fa-suitcase")
      jobMobileNameIcon.style.color = "white"
      jobMobileCompanyName.appendChild(jobMobileNameIcon)
      
      var jobMobileCompanyNameP = document.createElement('p')
      jobMobileCompanyNameP.textContent = job.companyName

      jobMobileCompanyName.appendChild(jobMobileCompanyNameP)
      jobMobileHeaderHolder.appendChild(jobMobileCompanyName)

      var jobMobileCompanyCity = document.createElement('div')
      jobMobileCompanyCity.classList.add('jp-mc-jpc-company-holder-mb')

      var jobMobileCityIcon = document.createElement('i')
      jobMobileCityIcon.classList.add("fas")
      jobMobileCityIcon.classList.add("fa-map-marker-alt")
      jobMobileCityIcon.style.color = "white"
      jobMobileCompanyCity.appendChild(jobMobileCityIcon)

      var jobMobileCompanyCityP = document.createElement('p')

      if(job.city.indexOf(",") > -1){
        jobMobileCompanyCityP.textContent = job.city.substring(0, job.city.indexOf(","))

      }

      else{
        jobMobileCompanyCityP.textContent = job.city
      }

      jobMobileCompanyCity.appendChild(jobMobileCompanyCityP)
      jobMobileHeaderHolder.appendChild(jobMobileCompanyCity)

      var jobMobilePositionTag = document.createElement('div')
      jobMobilePositionTag.classList.add('jp-mc-jpc-company-holder-mb')

      var jobMobilePositionIcon = document.createElement('i')
      jobMobilePositionIcon.classList.add("far")
      jobMobilePositionIcon.classList.add("fa-clock")
      jobMobilePositionIcon.style.color = "white"
      jobMobilePositionTag.appendChild(jobMobilePositionIcon)

      var jobMobilePositionTagP = document.createElement('p')
      jobMobilePositionTagP.textContent = position_tag

      jobMobilePositionTag.appendChild(jobMobilePositionTagP)
      jobMobileHeaderHolder.appendChild(jobMobilePositionTag)


      var jobMobileSalary = document.createElement('div')
      jobMobileSalary.classList.add('jp-mc-jpc-company-holder-mb')

      var jobMobileSalaryIcon = document.createElement('i')
      jobMobileSalaryIcon.classList.add("fas")
      jobMobileSalaryIcon.classList.add("fa-hand-holding-usd")
      jobMobileSalaryIcon.style.color = "white"
      jobMobileSalary.appendChild(jobMobileSalaryIcon)

      var jobMobileSalaryP = document.createElement('p')
      jobMobileSalaryP.textContent = salary_tag

      jobMobileSalary.appendChild(jobMobileSalaryP)
      jobMobileHeaderHolder.appendChild(jobMobileSalary)

      jobNode.appendChild(jobMobileHeaderHolder)

      var searched = {
        $job : $(jobNode),
        data : job,
        buttonId: jobButtonNode.id,
        link: job.link,
        id: jobData[i].jobId,
        position_tag: position_tag,
        salary_tag: salary_tag
      }
      
      searchedJobs.push(searched)
    }
  }

  
  //Following by filtering jobs by creterias and save them to the array filteredJobs
  var cateFilteredJobs = [],
      cityFilteredJobs = [],
      countryFilteredJobs = []
  
  for(var key in arrayFilters){
    if(arrayFilters.hasOwnProperty(key)){
      if(key === "categoryFilter"){
        if(arrayFilters[key].length === 0)
          cateFilteredJobs = searchedJobs

        else{
          cateFilteredJobs = []
          for(var i = 0; i < arrayFilters[key].length; i++){
            var cate = arrayFilters[key][i]

            searchedJobs.forEach((job) => {
              if(job.data.category.toLowerCase().indexOf(cate.toLowerCase()) > -1){
                cateFilteredJobs.push(job)
              }
            })
          }
        }
      }

      else if(key === "cityFilter"){
        if(arrayFilters[key].length === 0){
          cityFilteredJobs = cateFilteredJobs
        }

        else{
          cityFilteredJobs = []
          for(var i = 0; i < arrayFilters[key].length; i++){
            var city = arrayFilters[key][i]

            cateFilteredJobs.forEach((job) => {
              if(job.data.city.toLowerCase().indexOf(city.toLowerCase()) > -1){
                cityFilteredJobs.push(job)
              }
            })
          }
        }
      }

      else if(key === "countryFilter"){
        if(arrayFilters[key].length === 0){
          countryFilteredJobs = cityFilteredJobs
        }

        else{
          countryFilteredJobs = []
          for(var i = 0; i < arrayFilters[key].length; i++){
            var country = arrayFilters[key][i]

            cityFilteredJobs.forEach((job) => {
              if(job.data.country.toLowerCase().indexOf(country.toLowerCase()) > -1){
                countryFilteredJobs.push(job)
              }
            })
          }
        }
      }
    }
  }  

  filteredJobs = countryFilteredJobs

  //Only display Show More Jobs button when there are jobs left to view.
  if(searchedJobs.length === 100){
    $("#jp-show-more-job-button").css({'display': 'block'})
  }

  filteredJobs.forEach(function(job) {
    $jobContainer.append(job.$job)
    totalJobPostCards += 1
  })


  //Assign onclick function to each apply now button

  filteredJobs.forEach(function(job){
    $("#" + job.buttonId).unbind("click")

    if(job.buttonId.toLowerCase().indexOf('apply') > -1){
      $("#" + job.buttonId).bind("click", function(){
        showApplyModal(job.data.title, job.data.companyId, job.id, 
          job.position_tag, job.salary_tag, job.data.description, job.data.city, 
          job.data.companyName, job.data.country, job.data.category, job.data.requirement, job.data.deadline, job.data.image)
      })
    }

    else{
      $("#" + job.buttonId).bind("click", function(){
        showApplyModalOfSSJob(job.data.title, job.data.companyId, 
          job.id, job.position_tag, job.salary_tag, job.data.description, 
          job.data.city, job.data.companyName, job.data.country, job.data.category, 
          job.data.requirement, job.link, job.data.deadline, job.data.image)
      })
    }
  })


  //Append the View More Jobs card
  $jobContainer.append($(
    '<div class="jp-mc-view-more-job-card">\n' +
    '  <div class="jp-mc-view-more-job-text-holder" onclick=\"ShowMoreJobs()\">\n' +
    '   <p>View more</p>\n' +
    '  </div>\n' +
    '</div>'))

  window.sessionStorage.setItem("appliedFilters", JSON.stringify(arrayFilters))

  $(".jp-main-content-container").css({"-webkit-overflow-scrolling": "touch"})
}

function fetchArticles(){
  firestore.collection("articles").orderBy("miliCreateAt", "desc").limit(4).onSnapshot(function(querySnapshot){
    articleData = []

    querySnapshot.forEach(function(doc){
      articleData.push(doc.data())
    })

    renderArticles(articleData, searchVal)
  })
}


function ChooseArticleSection(element){
  element.classList.remove("aes-section-selected-background-color")
  $("#event-selector-bar-holder").removeClass("aes-section-selected-background-color")

  element.classList.add("aes-section-selected-background-color")

  $("#aes-highlight").removeClass("aes-highlight-move-right")

  $("#event-container").removeClass("event-content-holder-visible")

  $("#article-container").removeClass("article-content-holder-invisible")
}

function ChooseEventSection(element){
  element.classList.remove("aes-section-selected-background-color")
  $("#article-selector-bar-holder").removeClass("aes-section-selected-background-color")

  element.classList.add("aes-section-selected-background-color")

  $("#aes-highlight").removeClass("aes-highlight-move-right")
  $("#aes-highlight").addClass("aes-highlight-move-right")

  $("#event-container").removeClass("event-content-holder-visible")
  $("#event-container").addClass("event-content-holder-visible")

  $("#article-container").removeClass("article-content-holder-invisible")
  $("#article-container").addClass("article-content-holder-invisible")
}

function renderArticles(articleData, searchVal){
  var $articleContainer = $("#new-article-content-holder");

  $articleContainer.empty();

  for (var i = 0; i < articleData.length; i++) {

    var article = articleData[i];

    if (!article.dummy && article.title.toLowerCase().indexOf(searchVal.toLowerCase()) > -1) {

      var $article = $(
        "    <div class=\"article-card\">\n" +

        "        <div class=\"article-img-holder\" style='background-image: url(" + article.image + ")'></div>\n" +

        "        <div class=\"article-content-holder\">\n" +

        "        <h2 class=\"article-title-holder\">" + article.title + "</h2>\n" +

        "        <div class=\"article-description-holder\"><p>"+ article.description.substring(0, 250) + " ..." +  "</p></div>\n" +

        "        <a class=\"article-read-more-holder\" target=\"_blank\" href=\"" + article.link + "\">Read more</a>\n" +


        "    </div></div>\n" + 
        
        "    <div class=\"article-card-mb\" id=\"article-card-mb-"+ (i+1) +"\">\n" + 
        "        <div class=\"article-img-holder-mb\" style='background-image: url(" + article.image + ")'></div>\n" +
        "        <div class=\"article-content-holder-mb\">\n" +
        "        <h2 class=\"article-title-holder-mb\">" + article.title + "</h2>\n" +
        "        <div class=\"article-description-holder-mb\"><p>"+ article.description.substring(0, 130) + " ..." +  "</p></div>\n" +
        "        <a class=\"article-read-more-holder-mb\" target=\"_blank\" href=\"" + article.link + "\">Read more</a>\n" +
        "    </div>"
        );

      $articleContainer.append($article);

    }

  }

  var $viewMore = $(
    "    <div class=\"article-card-view-more-mb\" id=\"article-card-mb-5\" onclick=\"window.open('https://globuzzer.mn.co/feed')\">\n" + 
    "      <p>VIEW ALL ARTICLES</p>\n" +
    "    </div>"
  )

  $articleContainer.append($viewMore)
}



function fetchEvents(){
  firestore.collection("events").orderBy("miliCreateAt", "desc").limit(5).get().then(function(querySnapshot){
    eventData = []
    
    querySnapshot.forEach(function(doc){
      eventData.push(doc.data())
    })

    var eventLocations = getEventFilterData(eventData, 'location');

    adjustFilters($("#location-filter"), eventLocations, 'locationFilter');

    if(JSON.parse(window.sessionStorage.getItem("appliedFilters")))
      renderEvents(eventData, JSON.parse(window.sessionStorage.getItem("appliedFilters")), searchVal)
    
    else
      renderEvents(eventData, appliedFilters, searchVal)
  })
  .catch(function(err){
    console.log(err)
  })
}

function renderEvents(eventData, arrayFilters, searchVal){
  var $eventsContainer = $("#new-event-content-holder");

  $eventsContainer.empty();
  
  var searchedEvents = []

  for (var i = 0; i < eventData.length; i++) {

    var event = eventData[i];

    
    //Searched events from searchBar will be included first
    if (!event.dummy && event.title.toLowerCase().indexOf(searchVal.toLowerCase()) > -1) {

      var formattedDate = new Date(event.date);

      var month = formattedDate.toLocaleDateString('en-us', {month: 'short'});

      var $event = $('<div class="event-card">\n' +

        '                    <div class="event-image" style="background-image:url(' + event.image + ')">\n' +

        '                        <div class="black-overlay">\n' +

        '                            <h2 class="event-title">' + event.title + '</h2>\n' +

        '                            <p>' + event.location + '</p>\n' +

        '                        </div>\n' +

        '                    </div>\n' +

        '                    <div class="event-date"><p class="day">' + formattedDate.getDate() + '</p>\n' +

        '                        <p>' + month + '</p></div>\n' +

        '                    <div class="event-description">\n' +

        '                        <p>' + event.description + '</p>\n' +

        '                        <a target="_blank" href="' + event.link + '" class="event-card-button">View Event</a>\n' +

        '                    </div>\n' +

        '                </div>');

        // var $article = $("<div class=\"article-card\">\n" +

        // "        <div class=\"article-img-holder\" style='background-image: url(" + article.image + ")'></div>\n" +

        // "        <div class=\"article-content-holder\">\n" +

        // "        <h2 class=\"article-title-holder\">" + article.title + "</h2>\n" +

        // "        <div class=\"article-description-holder\"><p>"+ article.description +  "</p></div>\n" +

        // "        <a class=\"article-read-more-holder\" target=\"_blank\" href=\"" + article.link + "\">Read more</a>\n" +


        // "    </div>");

      searchedEvents.push({
        $event: $event,
        date: event.date,
        data: event
      })
    }

    
  }

  //Following by filtering jobs by creterias and save them to the array filteredJobs
  var locationFilteredEvents = [],
      monthFilteredEvents = []

  for(var key in arrayFilters){
    if(arrayFilters.hasOwnProperty(key)){
      if(key === "locationFilter"){
        if(arrayFilters[key].length === 0){
          locationFilteredEvents = searchedEvents
        }
          

        else{
          locationFilteredEvents = []
          for(var i = 0; i < arrayFilters[key].length; i++){
            var location = arrayFilters[key][i]

            searchedEvents.forEach((event) => {
              if(event.data.location.toLowerCase().indexOf(location.toLowerCase()) > -1){
                locationFilteredEvents.push(event)
              }
            })
          }
        }
      }

      else if(key === "monthFilter"){
        if(arrayFilters[key].length === 0){
          monthFilteredEvents = locationFilteredEvents
        }

        else{
          monthFilteredEvents = []
          for(var i = 0; i < arrayFilters[key].length; i++){
            var month = appliedFilters[key][i]

            locationFilteredEvents.forEach((event) => {
              if(Number(month) === new Date(event.date).getMonth()){
                monthFilteredEvents.push(event)
              }
            })
          }
        }
      }
    }
  }  

  filteredEvents = monthFilteredEvents

  filteredEvents.forEach(function(event) {
    $eventsContainer.append(event.$event)
  })

  window.sessionStorage.setItem("appliedFilters", JSON.stringify(arrayFilters))
}

function fetchTeam(){
  firestore.collection("team").get().then(function(querySnapshot){
    teamData = []

    querySnapshot.forEach(function(doc){
      teamData.push({jobId: doc.id, data: doc.data()})
    })

    jobCities = getJobFilterData(teamData, 'city');

    jobTypes = getJobFilterData(teamData, 'position');

    jobCategories = getJobFilterData(teamData, 'category');

    adjustFilters($("#city-filters-team"), jobCities, 'cityFilter');

    adjustFilters($("#type-filters-team"), jobTypes, 'positionFilter');

    adjustFilters($("#category-filters-team"), jobCategories, 'categoryFilter');

    // renderJobs(teamData, {}, searchVal, $("#team-container"));

  })
  .catch(function(err){
    console.log(err)
  })
}

//We get all 3 different options of 3 filtering categories (category, city and position) from all the jobs posted.
function getJobFilterData(jobData, type){
  var filterData = []
  for(var i = 0; i < jobData.length; i++){
    var job = jobData[i].data

    if(job.dummy)
      continue
    // else if(!filterData.includes(job[type].trim())){
      if(type === 'city'){
        if(job[type].indexOf(',') > -1 && !filterData.includes(job[type].substring(0, job[type].indexOf(",")).trim())){
          filterData.push(job[type].substring(0, job[type].indexOf(",")).trim())
        }

        else if (job[type].indexOf(',') === -1 && !filterData.includes(job[type].trim())){
          filterData.push(job[type].trim())
        }

        if(job[type].substring(job[type].indexOf(",")).trim().toLowerCase().indexOf("sweden") > -1){
          if(!country_city_filter_arr[0].includes(job[type].substring(0, job[type].indexOf(",")).trim()))
            country_city_filter_arr[0].push(job[type].substring(0, job[type].indexOf(",")).trim())
        }

        else if(job[type].substring(job[type].indexOf(",")).trim().toLowerCase().indexOf("finland") > -1){
          if(!country_city_filter_arr[1].includes(job[type].substring(0, job[type].indexOf(",")).trim())) {
            if (job[type].substring(0, job[type].indexOf(",")).trim() !== '') {
              country_city_filter_arr[1].push(job[type].substring(0, job[type].indexOf(",")).trim())
            }
          }
        }

        else if(job[type].substring(job[type].indexOf(",")).trim().toLowerCase().indexOf("norway") > -1){
          if(!country_city_filter_arr[2].includes(job[type].substring(0, job[type].indexOf(",")).trim()))
            country_city_filter_arr[2].push(job[type].substring(0, job[type].indexOf(",")).trim())
        }

        else if(job[type].substring(job[type].indexOf(",")).trim().toLowerCase().indexOf("denmark") > -1){
          if(!country_city_filter_arr[3].includes(job[type].substring(0, job[type].indexOf(",")).trim()))
            country_city_filter_arr[3].push(job[type].substring(0, job[type].indexOf(",")).trim())
        }

      }

      // else{
      //   filterData.push(job[type].trim())
      // }

      if(type === 'category'){
        if(!filterData.includes(job[type].trim())){
          filterData.push(job[type].trim())
        }

        else{
          
      }
      // }
    }
  }

  return filterData
}

//We get all the available locations of the total events and serve them as location filter
function getEventFilterData(eventData, type){
  var filterData = []
  for(var i = 0; i < eventData.length; i++){
    var event = eventData[i]

    if(event.dummy)
      continue
    else if(!event.dummy && !filterData.includes(event[type].trim()))
      filterData.push(event[type].trim())
  }

  return filterData
}


/**

* Adjusts data from database.

*

* @param id

*/

function adjustData(id) {

  fetchJobs()

  fetchArticles()

  // fetchEvents()

  // fetchTeam()

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
    // render data

    renderData(data);

  });



  $("#job-link").attr("href", jobLinks[id]);

  // $("#article-link").attr("href", articleLinks[id]);

  // $("#event-link").attr("href", eventLinks[id]);

}



/**

* Unchecks checkboxes and resets filter array.

*/

function resetFilters() {

  appliedFilters = {
    categoryFilter: [],
    cityFilter: [],
    positionFilter: [],
    locationFilter: [],
    monthFilter: []
  };

  // renderJobs(jobData, appliedFilters, searchVal, $("#jobs-container"));

  // renderJobs(teamData, {}, searchVal, $("#team-container"))
  
  $(".filter-checkbox input").prop('checked', false);

}



/**

* Adds or removes filter depending on

* the checkboxes.

*/

function handleFilterArray() {
  var filter = $(this).val();

  var filterCategory = $(this).attr("class");

  appliedFilters = JSON.parse(window.sessionStorage.getItem("appliedFilters"))

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

      if(filterCategory === "countryFilter"){
        switch(filter){
          case "sweden":
            country_city_filter_arr[0].forEach(function(city){
              if(appliedFilters["cityFilter"].includes(city.toLowerCase())){
                
                appliedFilters["cityFilter"].splice(appliedFilters["cityFilter"].findIndex(function(data){return data === city}), 1)
              }
            })
            break

          case "finland":
            country_city_filter_arr[1].forEach(function(city){
              if(appliedFilters["cityFilter"].includes(city.toLowerCase()))
                appliedFilters["cityFilter"].splice(appliedFilters["cityFilter"].findIndex(function(data){return data === city}), 1)
            })
            break

          case "norway":
            country_city_filter_arr[2].forEach(function(city){
              if(appliedFilters["cityFilter"].includes(city.toLowerCase()))
                appliedFilters["cityFilter"].splice(appliedFilters["cityFilter"].findIndex(function(data){return data === city}), 1)
            })
            break

          case "denmark":
            country_city_filter_arr[3].forEach(function(city){
              if(appliedFilters["cityFilter"].includes(city.toLowerCase()))
                appliedFilters["cityFilter"].splice(appliedFilters["cityFilter"].findIndex(function(data){return data === city}), 1)
            })
            break

          default:
            break
        }
      }      
    }

  }

  renderJobs(jobData, appliedFilters, searchVal, $("#jobs-container"))

  // renderEvents(eventData, appliedFilters, searchVal)

  // renderJobs(teamData, appliedFilters, searchVal, $("#team-container"))
}




/**

* Renders jobs according to searchbar value

*/

function handleSearchBar(value) {
  var searchVal = value;

  renderJobs(jobData, appliedFilters, searchVal, $("#jobs-container"));

  var section = $(this).attr("id");

  switch(section) {

    case "search-jobs":

      renderJobs(jobData, appliedFilters, searchVal, $("#jobs-container"));

      break;

    case "search-articles":

      renderArticles(articleData, searchVal);

      break;

    case "search-events":

      // renderEvents(eventData, appliedFilters, searchVal);

      break;

    // case "search-team":

    //   renderJobs(teamData, appliedFilters, searchVal, $("#team-container"));

    //   break;

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

  for(var i = 0; i < filterArray.length; i++){
    var $input = $('<input type="checkbox" value="' + filterArray[i].toLowerCase() + '" class="' + className + '">');

    var string = '<label class="filter-checkbox checkbox-container">' +

      '<span class="checkmark"></span>' 

    if(filterArray[i].toLowerCase().indexOf("full") > -1 && filterArray[i].toLowerCase().indexOf("stack") > -1){
      string += "<p>Full Stack Developer</p>"

    }

    else if (filterArray[i].toLowerCase().indexOf("back") > -1 && filterArray[i].toLowerCase().indexOf("end") > -1)
    string += " <p>Back End Developer</p>"

    else if (filterArray[i].toLowerCase().indexOf("front") > -1 && filterArray[i].toLowerCase().indexOf("end") > -1)
    string += " <p>Front End Developer</p>"

    else if (filterArray[i].toLowerCase().indexOf("marketing") > -1)
    string += " <p>Marketing</p>"

    else if (filterArray[i].toLowerCase().indexOf("photo") > -1)
    string += " <p>Photography</p>"

    else if (filterArray[i].toLowerCase().indexOf("content") > -1)
    string += " <p>Content Writing</p>"

    else if (filterArray[i].toLowerCase().indexOf("sale") > -1)
    string += " <p>Sales</p>"

    else if (filterArray[i].toLowerCase().indexOf("other") > -1)
    string += " <p>Others</p>" 

    else if (filterArray[i].toLowerCase().indexOf("it") > -1)
    string += " <p>IT</p>" 

    else{
      string += "<p>" + filterArray[i] + "</p>"
    }

    string += '</label>';

    var $filter = $(string)

    $input.on("click", handleFilterArray);

    $filter.prepend($input);

    $container.append($filter);
  }
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

  // resetFilters();

}

function showArticlesContentDefault(){
  var id = $("#show-articles").attr("id").substring(5)

  $(".section-content").hide();

  // show specific content

  $("#"+id).show();

  $(".category-box").removeClass("active");

  $("#show-articles").addClass("active");

  // resetFilters();
  
}


// showArticlesContentDefault()

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

  if ($(window).width() < 768) {

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

function showApplyModal(jobTitle, companyMail, jobId, position_tag, salary_tag, jobDescription, jobCity, companyName, jobCountry, jobCategory, jobRequirement, jobDeadline, jobImageUrl) {
  $("html, body").removeClass("prevent-scroll-body-html")

  $("html, body").addClass("prevent-scroll-body-html")

  if(window.history.pushState){
    var newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + "?jobId=" + jobId.replace(/ /gi, "+").replace(/&/, "And")
    var jobId = jobId.replace(/ /gi, "+").replace(/&/, "And")
    window.history.pushState({path:newUrl},'',newUrl);

    // $("#dmb-job-current-link").val(window.location.href)
    $("#dmb-job-current-link").val(`https://prerender-quang.herokuapp.com/click.html?jobId=${jobId}`)
  }
  var firstName = $("#amb-first-name"),
      lastName = $("#amb-last-name"),
      email = $("#amb-email"),
      phone = $("#amb-phone"),
      location = $("#amb-location"),
      link = $("#amb-link"),
      about = $("#amb-about")

  if(window.localStorage.getItem("applicantInfo")){
    var applicantInfo = JSON.parse(window.localStorage.getItem("applicantInfo"))
    firstName.val(applicantInfo.firstName)
    lastName.val(applicantInfo.lastName)
    email.val(applicantInfo.email)
    phone.val(applicantInfo.phone)
    location.val(applicantInfo.location)
    about.val(applicantInfo.about)
    link.val(applicantInfo.link)
  }

  $("#dmb-company-mail").empty()
  $("#dmb-company-mail").text(companyMail)

  $("#dmb-job-category").empty()
  $("#dmb-job-category").text(jobCategory)

  $("#dmb-job-country").empty()
  $("#dmb-job-country").text(jobCountry)

  $("#dmb-job-city").empty()
  $("#dmb-job-city").text(jobCity)

  $("#dmb-job-salary").empty()
  $("#dmb-job-salary").text(salary_tag)

  $("#dmb-job-position").empty()
  $("#dmb-job-position").text(position_tag)

  $("#dmb-job-title-hidden").empty()
  $("#dmb-job-title-hidden").text(jobTitle)

  $("#dmb-job-image-url").text(jobImageUrl)

  $("#dmb-job-deadline").empty()
  $("#dmb-job-deadline").text(salary_tag)

  $("#dmb-job-id").empty()
  $("#dmb-job-id").text(jobId)

  $("#dmb-job-title").empty()
  $("#dmb-job-title").append($("<p>"+jobTitle+"</p>"))
  $("#dmb-job-title-mb").empty()
  $("#dmb-job-title-mb").append($("<p>"+jobTitle+"</p>"))

  $("#dmb-company-name").empty()
  $("#dmb-company-name").append($("<p>"+companyName+"</p>"))
  $("#dmb-company-name-mb").empty()
  $("#dmb-company-name-mb").append($("<p>"+companyName+"</p>"))

  $("#td-location").empty()
  $("#td-location").append($("<p>" + jobCity + "</p>"))
  $("#td-location-mb").empty()
  $("#td-location-mb").append($("<p>" + jobCity + "</p>"))

  $("#td-job-type").empty()
  $("#td-job-type").append($("<p>" + position_tag + "</p>"))
  $("#td-job-type-mb").empty()
  $("#td-job-type-mb").append($("<p>" + position_tag + "</p>"))

  $("#td-salary").empty()
  $("#td-salary").append($("<p>" + salary_tag + "</p>"))
  $("#td-salary-mb").empty()
  $("#td-salary-mb").append($("<p>" + salary_tag + "</p>"))


  $("#td-apply-latest-by").empty()
  $("#td-apply-latest-by-mb").empty()
  if(new Date(jobDeadline).getTime() <= new Date().getTime())
    $("#td-apply-latest-by").append($("<p>Expired</p>"))

  else
    $("#td-apply-latest-by").append($("<p>" + jobDeadline + "</p>"))
    $("#td-apply-latest-by-mb").append($("<p>" + jobDeadline + "</p>"))

  $("#dmb-text-holder-for-job-description").empty()
  $("#dmb-text-holder-for-job-description").append(jobDescription)

  $("#dmb-text-holder-for-job-requirement").empty()
  $("#dmb-text-holder-for-job-requirement").append(jobRequirement)

  if ($(window).height() < 600) {
    $("#apply-modal-box").css({top: '50%'});
  } else {

    $("#apply-modal-box").css({top: '50%'});

  }

  $("#apply-modal").fadeIn();
  $("#skillscanner-apply-form").hide()
  $("#apply-modal-box-for-none-skillscanner").css("display", "flex")
}


function showApplyModalOfSSJob(jobTitle, companyMail, jobId, position_tag, salary_tag, jobDescription, jobCity, companyName, jobCountry, jobCategory, jobRequirement, jobLink, jobDeadline, jobImageUrl){
  showApplyModal(jobTitle, companyMail, jobId, position_tag, salary_tag, jobDescription, jobCity, companyName, jobCountry, jobCategory, jobRequirement, jobDeadline, jobImageUrl)

  $("#apply-modal-box-for-none-skillscanner").hide()
  $("#skillscanner-apply-form").css("display", "flex")

  // $("#skillscanner-link").attr("href", jobLink)

  $("#skillscanner-apply-button").unbind("click")
  $("#skillscanner-apply-button").bind("click", function(){
    window.open(jobLink)
  })
}


/**

* Closes apply box.

*/

function closeApplyModal() {
  $("html, body").removeClass("prevent-scroll-body-html")

  if(window.history.pushState){
    var newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname
    window.history.pushState({path:newUrl},'',newUrl);

    $("#dmb-job-current-link").empty()
  }


  $(".apply-description-modal-box-holder").css({top: '-1000px'});

  $("#apply-modal").fadeOut();



  $('#apply-first-name').removeClass('show-warning-incorrect-input')
  $('#apply-last-name').removeClass('show-warning-incorrect-input')
  $('#apply-email').removeClass('show-warning-incorrect-input')
  $('#apply-phone').removeClass('show-warning-incorrect-input')
  $('#apply-location').removeClass('show-warning-incorrect-input')
  $('#apply-cv').removeClass('show-warning-incorrect-input')
  $('#apply-cover-letter').removeClass('show-warning-incorrect-input')
  $('#apply-about').removeClass('show-warning-incorrect-input')
  $('#apply-approve').removeClass('show-warning-incorrect-input')

  $("#link-copied").removeClass("show-link-copied")

  $("#success-box").css({top: '-1000px'});

  hideErrorBox()
  hideLoadingBox()
}



/**

* Shows a success message.

*/

function showSuccessBox() {

  $("#apply-modal-box").css({top: '-1000px'});

  // if ($(window).width() < 400) {

  //   $("#success-box").css({top: 'calc(' + $(window).scrollTop() + 'px + 30%)'});

  // } else {

  $("#success-box").css({top: '50%'});

  // }

}

function showLoadingBox() {
  $("#loading-box").removeClass("show-loading-box")
  $("#loading-box").addClass("show-loading-box")
}

function hideLoadingBox() {
  $("#loading-box").removeClass("show-loading-box")
}

function showErrorBox() {
  $("#error-box").removeClass("show-error-box")
  $("#error-box").addClass("show-error-box")
}

function hideErrorBox() {
  $("#error-box").removeClass("show-error-box")
}


/**

* Closes success message and shows other jobs.

*/

function closeSuccessAndShowJobs() {

  // showRightContent($("#show-jobs"));

  $("html, body").removeClass("prevent-scroll-body-html")

  $("#success-box").css({top: '-1000px'});

  $("#apply-modal").fadeOut();

  $("#link-copied").removeClass("show-link-copied")
}



/**

* Toggles option list of custom select.

*/

function toggleOptionList() {
  if($(this).attr("id") === "event-location-filter-button"){
    $("#event-month-filter-button").next(".option-list").slideUp(250)
    $(this).next(".option-list").slideToggle(250);
  }

  else{
    $("#event-location-filter-button").next(".option-list").slideUp(250)
    $(this).next(".option-list").slideToggle(250);
  }
}


/*

  Function to hanlde applicant's submission

*/

function SubmitApplication(){
  var cvFileURL, coverFileURL

  var firstName = $("#amb-first-name"),
      lastName = $("#amb-last-name"),
      email = $("#amb-email"),
      phone = $("#amb-phone"),
      location = $("#amb-location"),
      link = $("#amb-link"),
      about = $("#amb-about")

  var allFilled = true

  if(firstName.val() === ""){
    $("#apply-first-name").removeClass("show-warning-incorrect-input")
    $("#apply-first-name").addClass("show-warning-incorrect-input")
    allFilled = false
  }

  if(lastName.val() === ""){
    $("#apply-last-name").removeClass("show-warning-incorrect-input")
    $("#apply-last-name").addClass("show-warning-incorrect-input")
    allFilled = false
  }

  if(email.val() === "" || !ValidationEmail(email.val())){
    $("#apply-email").removeClass("show-warning-incorrect-input")
    $("#apply-email").addClass("show-warning-incorrect-input")
    allFilled = false
  }

  if(phone.val() === "" || !ValidatePhoneNumber(phone.val())){
    $("#apply-phone").removeClass("show-warning-incorrect-input")
    $("#apply-phone").addClass("show-warning-incorrect-input")
    allFilled = false
  }

  if(location.val() === ""){
    $("#apply-location").removeClass("show-warning-incorrect-input")
    $("#apply-location").addClass("show-warning-incorrect-input")
    allFilled = false
  }

  if(about.val() === ""){
    $("#apply-about").removeClass("show-warning-incorrect-input")
    $("#apply-about").addClass("show-warning-incorrect-input")
    allFilled = false
  }

  if(!cvFile){
    $("#apply-cv").removeClass("show-warning-incorrect-input")
    $("#apply-cv").addClass("show-warning-incorrect-input")
    allFilled = false
  }

  if(!coverFile){
    $("#apply-cover-letter").removeClass("show-warning-incorrect-input")
    $("#apply-cover-letter").addClass("show-warning-incorrect-input")
    allFilled = false
  }

  if($("#accept-all-terms-conditions").prop("checked") === false){
    $("#apply-approve").removeClass("show-warning-incorrect-input")
    $("#apply-approve").addClass("show-warning-incorrect-input")
    allFilled = false
  }

  if(allFilled){
    $("#apply-modal-box").css({top: '-1000px'});

    hideErrorBox()
    showLoadingBox()

    var cachedApplicantInfo = JSON.stringify({
      firstName: firstName.val(),
      lastName: lastName.val(),
      email: email.val(),
      phone: phone.val(),
      location: location.val(),
      about: about.val(),
      link: link.val()
    })
    
    window.localStorage.setItem("applicantInfo", cachedApplicantInfo)



    var fullPathCv, uniqueNameCv

    uniqueNameCv = $("#amb-email").val() + "-cv-" + new Date().getTime()

    fullPathCv = $("#dmb-job-id").text() + '/' + uniqueNameCv


    AddApplicantFileToStorage(fullPathCv, cvFile, "cv")
    .then(function(url){
      
      var fullPathCover, uniqueNameCover

      uniqueNameCover = $("#amb-email").val() + "-cover-" + new Date().getTime()

      fullPathCover = $("#dmb-job-id").text() + '/' + uniqueNameCover

      cvFileURL = url
      AddApplicantFileToStorage(fullPathCover, coverFile, "cover")
      .then(function(url){
        coverFileURL = url

        var applicant = {
          companyMail: $("#dmb-company-mail").text(),
          jobId: $("#dmb-job-id").text(),
          firstName: $("#amb-first-name").val(),
          lastName: $("#amb-last-name").val(),
          email: $("#amb-email").val(),
          phone: $("#amb-phone").val(),
          location: $("#amb-location").val(),
          link: $("#amb-link").val(), 
          cv: cvFileURL,
          coverLetter: coverFileURL,
          about: $("#amb-about").val(),
          jobInfo: {
            title: $("#dmb-job-title-hidden").text(),
            category: $("#dmb-job-category").text(),
            country: $("#dmb-job-country").text(),
            city: $("#dmb-job-city").text(),
            salary: $("#dmb-job-salary").text(),
            position: $("#dmb-job-position").text(),
            deadline: $("#dmb-job-deadline").text()
          },
          fullPathCv: fullPathCv,
          fullPathCover: fullPathCover
        }
    
        firestore.collection("job_applicants").doc().set(applicant)
        .then(function(){
          hideLoadingBox()
          
          showSuccessBox()
        })
      })
    })
    
    .catch(function(err){
      hideLoadingBox()
      showErrorBox()

      console.log(err)
    })
  }
  
}

function AddApplicantFileToStorage(fullPath, file, type){
  var storage = firebase.storage();
  var storageRef = storage.ref(fullPath);

  return storageRef.put(file).then(function(snapshot){
    return snapshot.ref.getDownloadURL()
  })
}


function OpenFBShareDialog(){

  FB.ui({
    method: 'share',
    href: window.location.href,
    redirect_uri: window.location.href
  }, function(response){
    console.log(response)
  });
}


function ChooseArticleNumber(number){
  $(".article-nav-point").removeClass("active-chosen-article-nav-point")

  $("#article-nav-point-"+number).addClass("active-chosen-article-nav-point")

  $(".article-card-mb").removeClass("active-display-article-card-mb")
  $(".article-card-view-more-mb").removeClass("active-display-article-card-mb")
  $("#article-card-mb-"+number).addClass("active-display-article-card-mb")
}


function ApplicationDeadLineOnChange(){
  $('#first-job-deadline-validation').removeClass('show-warning-incorrect-input'); 
  $('#application-deadline-holder').css({'display': 'none'})
  
  if($("#pfj-choose-deadline").val() === ""){
    $('#application-deadline-holder').css({'display': 'flex'})
  }
}

function ValidatePhoneNumber(value){
  var phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/

  return phoneRegex.test(value)
}

function DontAllowWord(e){
  document.getElementById("amb-phone").value = document.getElementById("amb-phone").value.replace(/[a-zA-Z]/g, "")
}

var currentArticleNumber = 1

var hammerTime = new Hammer(document.getElementById("new-article-content-holder"))

hammerTime.on("swipe", function(e){

    if(window.innerWidth <= 767){
      if(e.deltaX < 0){
        currentArticleNumber += 1

        if(currentArticleNumber > 5){
          currentArticleNumber = 5
          
        }

        ChooseArticleNumber(currentArticleNumber)

      }

      else if (e.deltaX > 0){
        currentArticleNumber -= 1

        if(currentArticleNumber < 1){
          currentArticleNumber = 1
        }

        ChooseArticleNumber(currentArticleNumber)
      }
    }
})

function CopyCurrentUrl(){
  var jobCurrentLink = document.getElementById("dmb-job-current-link")

  jobCurrentLink.select()

  document.execCommand("copy")

  $("#link-copied").addClass("show-link-copied")

  var timer = setInterval(function(){
    $("#link-copied").removeClass("show-link-copied")
  
    clearInterval(timer)
  }, 1000)

}

function ShowMaxFileSizeCover(){
  if($("#cover-max-file-size").hasClass("cover-file-instruct-shown")){
    $("#cover-max-file-size").hide()
    $("#cover-max-file-size").removeClass("cover-file-instruct-shown")
  }
  
  else{
    $("#cover-max-file-size").show()
    $("#cover-max-file-size").addClass("cover-file-instruct-shown")
  }
}

function ShowMaxFileSizeCV(){
  if($("#cv-max-file-size").hasClass("cv-file-instruct-shown")){
    $("#cv-max-file-size").hide()
    $("#cv-max-file-size").removeClass("cv-file-instruct-shown")
  }
  
  else{
    $("#cv-max-file-size").show()
    $("#cv-max-file-size").addClass("cv-file-instruct-shown")
  }
}

function ShowPhoneInstruction(){
  if($("#phone-instruction-content").hasClass("phone-instruct-shown")){
    $("#phone-instruction-content").hide()
    $("#phone-instruction-content").removeClass("phone-instruct-shown")
  }

  else{
    $("#phone-instruction-content").show()
    $("#phone-instruction-content").addClass("phone-instruct-shown")
  }
}


