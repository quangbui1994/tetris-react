var firestore = firebase.firestore();

var allApplicants = [];
var currJobIndex = 0;
var currJob = {};
var allJobs = [];

var backBtn = document.getElementById('back-to-jobs');
backBtn.addEventListener('click', function () {
  showContainer('job-container');
  hideContainer('applicant-container');
});
// search bar
var searchVal = '';
var searchBar = document.getElementById('search-applicants');
searchBar.addEventListener('keyup', function (e) {
  searchVal = e.target.value;
  renderApplicants(Object.values(allApplicants[currJobIndex] || {}), currJobIndex, e.target.value, filters);
});
// filter checkboxes
var filters = [];
var filterCheckBoxes = document.getElementsByClassName('filter-check');
for (var i = 0; i < filterCheckBoxes.length; i++) {
  filterCheckBoxes[i].addEventListener("click", handleFilters)
}
// custom select
var customSelect = document.getElementsByClassName('select-box')[0];
customSelect.addEventListener('click', function () {
  var box = this.parentNode.childNodes[3];
  box.style.display = box.style.display === "block" ? "none" : "block";
});
// modal
var modal = document.getElementsByClassName('modal')[0];
modal.addEventListener('click', hideModal);

// FUNCTIONS ----------
/**
 * Fetches all the jobs of a company.
 *
 * @param country
 */
function fetchCompanyJobs(country) {
  firestore.collection(country).doc('jobs').get().then(function (snapshot) {
    var jobs = Object.keys(snapshot.data()).map(function (key) {
      var object = snapshot.data()[key];
      object['id'] = key;
      return object;
    });
      //Object.values(snapshot.data());
    jobs = jobs.filter(job => job.companyId && job.companyId === currentUser.uid);
    allJobs = jobs;
    var promiseData = [];
    for (var i = 0; i < jobs.length; i++) {
      promiseData[i] = fetchApplicants(jobs[i].id).then(function (snapshot) {
        var data = {};
        snapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          data[doc.id] = doc.data();
        });
        return data;
      });
    }
    Promise.all(promiseData).then(function (values) {
      allApplicants = values;
      renderJobs(jobs, values);
      renderApplicants(Object.values(allApplicants[currJobIndex] || {}), currJobIndex);
    });
  });
}

/**
 * Fetches applicants.
 *
 * @param job
 */
function fetchApplicants(job) {
  return firestore.collection('applicants').where("jobId", "==", job).get();
}

/**
 * Displays all applicants of a job.
 *
 * @param job
 * @param i
 */
function showApplicants(job, i) {
  currJobIndex = i;
  currJob = job;
  renderApplicants(Object.values(allApplicants[Number(i)]), i);
  showContainer("applicant-container");
  hideContainer("job-container");
  var jobTitle = document.getElementById("job-title");
  jobTitle.innerHTML = job;
}

/**
 * Renders the jobs into the DOM.
 *
 * @param jobs
 * @param applicants
 */
function renderJobs(jobs, applicants) {
  var jobsTable = document.getElementById('jobs');
  jobsTable.innerHTML = '';
  var jobsArray = [];
  for (var i = 0; i < jobs.length; i++) {
    var job = jobs[i];
    var numApplicants = Object.values(applicants[i]).length;
    var jobRow = '<tr onclick="showApplicants(\'' + job.title + '\', \'' + i + '\')">' +
      '<td>' + job.title + '</td>' +
      '<td>' + job.position + '</td>' +
      '<td>' + numApplicants + '</td>' +
      '<td>' + job.createdAt + '</td>' +
      '</tr>';
    jobsArray.push(jobRow);
  }
  jobsTable.innerHTML = jobsArray.join(" ");
}

/**
 * Renders all applicants into the DOM.
 *
 * @param applicants
 * @param index
 * @param searchString
 * @param filters
 */
function renderApplicants(applicants, index, searchString, filters) {
  var applTable = document.getElementById('applicants');
  applTable.innerHTML = '';
  var applArray = [];
  for (var i = 0; i < applicants.length; i++) {
    var appl = applicants[i];
    var applName = appl['first-name'] + ' ' + appl['last-name'];
    if (containsSearchVal(searchString, applName) && containsFilter(appl['status'], filters)) {
      var applRow = renderApplicant(appl, index, i);
      applArray.push(applRow);
    }
  }
  applTable.innerHTML = applArray.join(" ");
}

/**
 * Checks if applicant fulfils filter criteria.
 *
 * @param status
 * @param filters
 * @returns {boolean}
 */
function containsFilter(status, filters) {
  if (!filters || filters.length < 1) return true;
  for (var i = 0; i < filters.length; i++) {
    if (filters[i] === status) return true;
  }
  return false;
}

/**
 * Checks if a string contains the search value.
 *
 * @param searchVal
 * @param stringToSearch
 * @returns {boolean}
 */
function containsSearchVal(searchVal, stringToSearch) {
  if (!searchVal || searchVal === '') return true;
  return stringToSearch.toLowerCase().indexOf(searchVal.toLowerCase()) !== -1;
}

/**
 * Renders one applicant.
 *
 * @param appl
 * @param indexJob
 * @param indexAppl
 * @returns {string}
 */
function renderApplicant(appl, indexJob, indexAppl) {
  var dateOption = {year: 'numeric', month: 'long', day: 'numeric'};
  var selectOptions = ['new', 'contacted', 'interviewed', 'hired', 'to be rejected', 'rejected', 'closed'];
  var applRow = '<tr>' +
    '<td>' + appl['first-name'] + ' ' + appl['last-name'] + '</td>' +
    '<td>' + appl['email'] + '</td>' +
    '<td>' + appl['phone'] + '</td>' +
    '<td><a target="_blank" href="' + appl['linkedin'] + '">CV/LinkedIn</a>' +
    '<i onclick="showModal(\'' + appl['cover-letter'].replace("'", "\\'") + '\')" class="fas fa-file-alt"></i></td>' +
    '<td>' + appl['appliedOn'].toDate().toLocaleString("en-US", dateOption) + '</td>' +
    '<td><select onchange="changeStatusInDB(event,' + indexJob + ',' + indexAppl + ')">';
  for (var j = 0; j < selectOptions.length; j++) {
    applRow += '<option value="' + selectOptions[j] + '"';
    if (selectOptions[j] === appl['status']) applRow += ' selected';
    applRow += '>' + selectOptions[j] + '</option>';
  }
  applRow += '</select></td><td>' +
    '<p class="green-text" onclick="rejectApplicant(' + indexAppl + ')">Reject candidate</p>' +
    '<p class="red-text" onclick="deleteApplicant(' + indexJob + ',' + indexAppl + ')">Delete</p></td>' +
    '</tr>';
  return applRow;
}

/**
 * Shows a container.
 *
 * @param id
 */
function showContainer(id) {
  var applicantContainer = document.getElementById(id);
  applicantContainer.style.display = 'block';
}

/**
 * Hides a container.
 *
 * @param id
 */
function hideContainer(id) {
  var jobContainer = document.getElementById(id);
  jobContainer.style.display = 'none';
}


/**
 * Filters applicants according to status.
 */
function handleFilters() {
  console.log(this.value);
  var index = filters.indexOf(this.value);
  if (index === -1) filters.push(this.value);
  else filters.splice(index, 1);
  console.log(filters);
  renderApplicants(Object.values(allApplicants[currJobIndex] || {}), currJobIndex, searchVal, filters);
}
/**
 * Sends a rejection email to the applicant.
 *
 * @param index
 */
function rejectApplicant(index) {
  if (confirm('Are you sure, that you want to reject this applicant?')) {
    var applicant = Object.values(allApplicants[currJobIndex])[index];
    var applId = Object.keys(allApplicants[currJobIndex])[index];
    console.log(applId);
    var xhttp = new XMLHttpRequest();
    var rejectJob = allJobs.filter(job => job.title === currJob)[0];
    console.log(rejectJob);
    var fileString = "reject-mail.php?first-name=" + applicant['first-name'] + "&last-name=" +
      applicant['last-name'] + "&email=" + applicant['email'] + "&job=" + currJob.replace(' ', '%20') +
    "&company=" + rejectJob.company;
    console.log(fileString);
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        console.log(this.responseText);
        firestore.collection('applicants').doc(applId).update({
          status: 'rejected'
        })
          .then(function () {
            console.log('Updated successfully!');
            fetchCompanyJobs(currentUser.country);
          })
          .catch(function (err) {
            console.log(err)
          });
      }
    };
    xhttp.open("POST", fileString, true);
    xhttp.send();
  }
}

/**
 * Removes applicant from db.
 *
 * @param indexJob
 * @param indexAppl
 */
function deleteApplicant(indexJob, indexAppl) {
  var key = Object.keys(allApplicants[indexJob])[indexAppl];
  console.log(key);
  if (confirm("Do you really want to delete this applicant?")) {
    firestore.collection('applicants').doc(key).delete()
      .then(function () {
        console.log('Deleted successfully!');
        fetchCompanyJobs(currentUser.country);
      })
      .catch(function (err) {
        console.log(err)
      });
  }
}

/**
 * Shows modal with cover letter.
 *
 * @param text
 */
function showModal(text) {
  document.getElementsByClassName('modal')[0].style.display = "flex";
  document.getElementById('cover-letter').innerHTML = text;
}

/**
 * Hides modal with cover letter.
 */
function hideModal() {
  this.style.display = "none";
}
