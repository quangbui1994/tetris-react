var db = firebase.firestore();



/* ----------- FUNCTIONS ------------ */

/**

 * Fetches data of specific country.

 *

 * @param country

 * @returns {*}

 */

function fetchData(country) {

  return db.collection(country).get();

}



/**

 * Renders data into the DOM.

 *

 * @param data

 */

function renderData(data) {


}



/**

 * Renders articles into the DOM.

 *

 * @param articles

 * @param searchVal

 */

function renderArticles(articles, searchVal) {

  var $articleContainer = $("#article-container");

  $articleContainer.empty();

  for (var i = 0; i < articles.length; i++) {

    var article = articles[i];

    if (containsSearchVal(article, searchVal)) {

      var $article = $("<div class=\"gb-card-50\">\n" +

        "        <div class=\"gb-card-50-bg\" style='background-image: url(" + article.image + ")'></div>\n" +

        "        <div class=\"gb-card-50-overlay\"></div>\n" +

        "        <h2 class=\"gb-card-50-title\">" + article.title + "</h2>\n" +

        "        <div class=\"gb-black-popup\">\n" +

        "            <div class=\"gb-details gb-fade-in-bottom\">\n" +

        "                <p>" + article.description + "</p>\n" +

        "                <a class=\"red-btn btn-medium\" target=\"_blank\" href=\"" + article.link + "\">View article</a>\n" +

        "            </div>\n" +

        "        </div>\n" +

        "    </div>");

      $articleContainer.append($article);

    }

  }

}



/**

 * Renders teams into the DOM.

 *

 * @param teams

 * @param filters

 * @param searchVal

 */

function renderTeam(teams, filters, searchVal) {

  var $teamContainer = $("#team-container");

  $teamContainer.empty();

  for (var i = 0; i < teams.length; i++) {

    var team = teams[i];

    if (containsFilterCriteria(team, filters) && containsSearchVal(team, searchVal)) {

      var $team = $('<li class="card">\n' +

        '                        <img src="' + team.image + '" alt="job">\n' +

        '                        <div class="card-info">\n' +

        '                            <div class="card-title-bar">\n' +

        '                                <h2>' + team.title + '</h2>\n' +

        '                                <p class="small-grey">' + team.position + '</p>' +

        '                                <p class="small-grey">' + team.city + '</p>\n' +

        '                            </div>\n' +

        '                            <p>\n' + team.description +

        '                            </p>\n' +

        '                        <div class="btn-container">\n' +

        '                            <button onclick="showApplyModal(\'' + team.title + '\')" class="red-btn btn-medium">Work with us</button>\n' +

        '                        </div>\n' +

        '                        </div>\n' +

        '                    </li>');

      $teamContainer.append($team);

    }

  }

}



function renderFeeds(feeds) {

  console.log(feeds);

  var $feedsContainer = $("#feed-container");

  $feedsContainer.empty();

  for (var i = 0; i < feeds.length; i++) {

    var feed = feeds[i];

    var $feed = $('' +

      '<div class="event-card">\n' +

      '    <img class="event-image" src="images/articleImge.png" alt="event-image">\n' +

      '    <div class="event-description centered">\n' +

      '        <h2 class="event-title yellow">' + feed.title + '</h2>\n' +

      '        <p>' + feed.content + '</p>\n' +

      '        <a href="#" class="yellow-btn">Read more</a>\n' +

      '    </div>\n' +

      '</div>'

    );

    $feedsContainer.append($feed);

  }

}



/**

 * Renders the events into the DOM.

 *

 * @param events

 * @param searchVal

 * @param filters

 */

function renderEvents(events, searchVal, filters) {

  var $eventsContainer = $("#event-container");

  $eventsContainer.empty();

  for (var i = 0; i < events.length; i++) {

    var event = events[i];

    if (containsFilterCriteria(event, filters) && containsSearchVal(event, searchVal)) {

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

        '                        <a target="_blank" href="' + event.link + '" class="red-btn">View more</a>\n' +

        '                    </div>\n' +

        '                </div>');

      $eventsContainer.append($event);

    }

  }

}



/**

 * Checks if element contains filter criteria of jobs.

 *

 * @param element

 * @param filters

 * @returns {boolean}

 */

function containsFilterCriteria(element, filters) {

  //TODO: make this method more dynamic

  // return true, if there are no filters

  if (!filters) return true;

  var positionFilter = filters["positionFilter"] || [];

  var categoryFilter = filters["categoryFilter"] || [];

  var locationFilter = filters["locationFilter"] || [];

  var cityFilter = filters["cityFilter"] || [];

  var monthFilter = filters["monthFilter"] || [];



  var containsPosition = containsElement(positionFilter, element, 'position'); //positionFilter.length < 1;

  var containsCategory = containsElement(categoryFilter, element, 'category');//categoryFilter.length < 1;

  var containsCity = containsElement(cityFilter, element, 'city'); //cityFilter.length < 1;

  var containsLocation = containsElement(locationFilter, element, 'location'); // locationFilter.length < 1;

  var containsMonth = monthFilter.length < 1;



  for (var i = 0; i < monthFilter.length; i++) {

    if (element.date && new Date(element.date).getMonth() === Number(monthFilter[i])) {

      containsMonth = true;

      break;

    }

  }

  return containsPosition && containsCategory &&

    containsCity && containsLocation && containsMonth;

}



/**

 * Checks if filter matches the element.

 *

 * @param filter

 * @param element

 * @param attr

 * @returns {boolean}

 */

function containsElement(filter, element, attr) {

  var contains = filter.length < 1;

  for (var i = 0; i < filter.length; i++) {

    if (element[attr] && element[attr].toLowerCase().trim() === filter[i].trim()) {

      contains = true;

    }

  }

  return contains;

}



/**

 * Checks if element contains search value

 * in the title or in the company.

 *

 * @param element

 * @param searchVal

 * @returns {boolean}

 */

function jobContainsSearchVal(element, searchVal) {

  if (!searchVal || searchVal === "") return true;

  var company = element.company.toLowerCase();

  var search = searchVal.toLowerCase();

  return company.indexOf(search) !== -1 ||

    containsSearchVal(element, searchVal);

}



/**

 * Checks if element contains search value

 * in the title.

 *

 * @param element

 * @param searchVal

 * @returns {boolean}

 */

function containsSearchVal(element, searchVal) {

  if (!searchVal || searchVal === "") return true;

  var title = element.title.toLowerCase();

  var search = searchVal.toLowerCase();

  return title.indexOf(search) !== -1;

}