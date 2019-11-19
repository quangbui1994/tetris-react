var db = firebase.database();

/* ----------- FUNCTIONS ------------ */
function fetchData(country) {
  return db.ref(country).once('value');
}

function renderData(data) {
  renderJobs(Object.values(data['jobs']));
  renderArticles(Object.values(data['articles']));
  renderFeeds(Object.values(data['feeds']));
  renderEvents(Object.values(data['events']));
}

function renderJobs(jobs, filters, searchVal) {
  var $jobContainer = $("#jobs-container");
  $jobContainer.empty();
  for (var i = 0; i < jobs.length; i++) {
    var job = jobs[i];
    if (containsFilterCriteria(job, filters) && containsSearchVal(job, searchVal)) {
      var $job = $('' +
        '<li class="list-card-image">'+
        '    <img class="card-image" src="images/articleImge.png" alt="article-image"/>\n' +
        '    <div>\n' +
        '        <h2 class="list-card-heading">\n' +
        '            '+ job.title +
        '            <span class="small-header">' + job.company + '</span>\n' +
        '            <span class="small-header">' + job.city + '</span>\n' +
        '        </h2>\n' +
        '        <p class="list-card-desc">\n' +
        '            ' + job.content +
        '        </p>\n' +
        '        <a href="' + job.link + '" class="white-btn">Learn more</a>\n' +
        '    </div>\n' +
        '</li>');
      $jobContainer.append($job);
    }
  }
}

function renderArticles(articles) {
  console.log(articles);
  var $articleContainer = $("#article-container");
  $articleContainer.empty();
  for (var i = 0; i < articles.length; i++) {
    var article = articles[i];
    var $article = $('' +
      '<li class="list-card-image">'+
      '    <img class="card-image" src="images/articleImge.png" alt="article-image"/>\n' +
      '    <div>\n' +
      '        <h2 class="list-card-heading">\n' +
      '            '+ article.title +
      '        </h2>\n' +
      '        <p class="list-card-desc">\n' +
      '            ' + article.content +
      '        </p>\n' +
      '    </div>\n' +
      '</li>');
    $articleContainer.append($article);
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
      '        <h2 class="event-title yellow">'+ feed.title + '</h2>\n' +
      '        <p>' + feed.content + '</p>\n' +
      '        <a href="#" class="yellow-btn">Read more</a>\n' +
      '    </div>\n' +
      '</div>'
    );
    $feedsContainer.append($feed);
  }
}

function renderEvents(events) {
  console.log(events);
  var $eventsContainer =$("#event-container");
  $eventsContainer.empty();
  for (var i = 0; i < events.length; i++) {
    var event = events[i];
    var $event = $('' +
      '<div class="event-card">\n' +
      '    <img class="event-image" src="images/articleImge.png" alt="event-image">\n' +
      '    <div class="event-date"><p>2</p>\n' +
      '        <p>Jan</p></div>\n' +
      '    <div class="event-type">' + event.category + '</div>\n' +
      '    <div class="event-description">\n' +
      '        <h2 class="event-title">' + event.title + '</h2>\n' +
      '        <p>' + event.content + '|' + event.location + '</p>\n' +
      '        <p>' + event.tag.join(' ') + '</p>\n' +
      '    </div>\n' +
      '</div>'
    );
    $eventsContainer.append($event);
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
  if (!filters) return true;
  var positionFilter = filters["positionFilter"] || [];
  var categoryFilter = filters["categoryFilter"] || [];
  var cityFilter = filters["cityFilter"] || [];
  var containsPosition = positionFilter.length < 1;
  var containsCategory = categoryFilter.length < 1;
  var containsCity = cityFilter.length < 1;
  for (var i = 0; i < positionFilter.length; i++) {
    if (element.position.toLowerCase() === positionFilter[i]) {
      containsPosition = true;
      break;
    }
  }
  for (var j = 0; j < categoryFilter.length; j++) {
    if (element.category.toLowerCase() === categoryFilter[j]) {
      containsCategory = true;
      break;
    }
  }
  for (var k = 0; k < cityFilter.length; k++) {
    if (element.city.toLowerCase() === cityFilter[k]) {
      containsCity = true;
      break;
    }
  }
  return containsPosition && containsCategory && containsCity;
}

function containsSearchVal(element, searchVal) {
  if (!searchVal || searchVal === "") return true;
  return element.company.indexOf(searchVal) !== -1 ||
    element.title.indexOf(searchVal) !== -1;
}