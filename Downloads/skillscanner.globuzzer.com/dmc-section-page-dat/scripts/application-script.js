var firestore = firebase.firestore();

var settings = {/* your settings... */ timestampsInSnapshots: true};

firestore.settings(settings);



var allApplicants = [];

var currJobIndex = 0;

var currJob = {};

//Function applied to onclick event of country-section-dropdown-content options (source file is navbar.php)
function DropdownSelectCountry(countryIndex){
  var countryFlag = document.getElementById("country-flag"),
      countryName = document.getElementById("country-name")
  

  switch (countryIndex){
    case 0:
      countryName.innerText = "Sweden"
      countryFlag.src = "images/SE.png"
      document.getElementById("redirect").href= "http://staging1.globuzzer.com/SkillScanner-remake/index.html?country=SE"
      fetchJobs("SE")
      break

    case 1:
      countryName.innerText = "Finland"
      countryFlag.src = "images/FI.png"
      document.getElementById("redirect").href= "http://staging1.globuzzer.com/SkillScanner-remake/index.html?country=FI"
      fetchJobs("FI")
      break

    case 2:
      countryName.innerText = "Norway"
      countryFlag.src = "images/NO.png"
      document.getElementById("redirect").href= "http://staging1.globuzzer.com/SkillScanner-remake/index.html?country=NO"
      fetchJobs("NO")
      break

    case 3:
      countryName.innerText = "Denmark"
      countryFlag.src = "images/DK.png"
      document.getElementById("redirect").href= "http://staging1.globuzzer.com/SkillScanner-remake/index.html?country=DK"
      fetchJobs("DK")
      break
  }

}
//end of DropdownSelectCountry


var countrySelect = document.getElementById('country-name')

var rightCountry

if(countrySelect.innerHTML === "Sweden"){
  rightCountry = "SE"
}

else if(countrySelect.innerHTML === "Finland"){
  rightCountry = "FI"
}

else if(countrySelect.innerHTML === "Norway"){
  rightCountry = "NO"
}

else if(countrySelect.innerHTML === "Denmark"){
  rightCountry = "DK"
}

// back button (to jobs)

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

// excel button

var excelBtn = document.getElementById('download-as-excel');

excelBtn.addEventListener('click', fnExcelReport);

// custom select

var customSelect = document.getElementsByClassName('select-box')[0];

customSelect.addEventListener('click', function () {

  var box = this.parentNode.childNodes[3];

  box.style.display = box.style.display === "block" ? "none" : "block";

});

// filter checkboxes

var filters = [];

var filterCheckBoxes = document.getElementsByClassName('filter-check');

for (var i = 0; i < filterCheckBoxes.length; i++) {

  filterCheckBoxes[i].addEventListener("click", handleFilters)

}

// modal

var modal = document.getElementsByClassName('modal')[0];

modal.addEventListener('click', hideModal);



// date sort

var dateSort = document.getElementById('sort-date');

dateSort.addEventListener('change', handleSort);



fetchJobs(rightCountry);



// FUNCTIONS

/**

 * Sorts applicants either ascending or descending.

 */

function handleSort() {

  var type = this.value;

  var applicants = Object.values(allApplicants[currJobIndex] || {});

  applicants = applicants.sort(function (appl1, appl2) {

    if (type === 'asc') return appl1.appliedOn.toDate() - appl2.appliedOn.toDate();

    else return appl2.appliedOn.toDate() - appl1.appliedOn.toDate();

  });

  renderApplicants(applicants, currJobIndex, searchVal, filters);

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

 * Excel export.

 *

 * @returns {*}

 */

function fnExcelReport() {

  var tab_text = "<table border='2px'><tr bgcolor='#87AFC6'>";

  var j = 0;

  var tab = document.getElementById('applicant-table'); // id of table



  for (j = 0; j < tab.rows.length; j++) {

    tab_text = tab_text + tab.rows[j].innerHTML + "</tr>";

    //tab_text=tab_text+"</tr>";

  }



  tab_text = tab_text + "</table>";

  //tab_text= tab_text.replace(/<A[^>]*>|<\/A>/g, "");//remove if u want links in your table

  tab_text = tab_text.replace(/<img[^>]*>/gi, ""); // remove if u want images in your table

  //tab_text= tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params



  var ua = window.navigator.userAgent;

  var msie = ua.indexOf("MSIE ");



  if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer

  {

    txtArea1.document.open("txt/html", "replace");

    txtArea1.document.write(tab_text);

    txtArea1.document.close();

    txtArea1.focus();

    sa = txtArea1.document.execCommand("SaveAs", true, "Say Thanks to Sumit.xls");

  }

  else                 //other browser not tested on IE 11

    sa = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(tab_text));



  return (sa);

}



/**

 * Fetch jobs.

 */

function fetchJobs(country) {
  document.getElementById("country-flag").src = "images/" + country + ".png";

  firestore.collection(country).doc('team').get().then(function (snapshot) {

    var jobs = Object.values(snapshot.data() || {});
    
    var promiseData = [];

    for (var i = 0; i < jobs.length; i++) {

      promiseData[i] = fetchApplicants(jobs[i].title).then(function (snapshot) {

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

  })

}



/**

 * Render jobs with amount of applicants.

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

      '<td>' + job.category + '</td>' +

      '<td>' + numApplicants + '</td>' +

      '<td>' + job.createdAt + '</td>' +

      '</tr>';

    jobsArray.push(jobRow);

  }

  jobsTable.innerHTML = jobsArray.join(" ");

}



/**

 * Fetches applicants.

 *

 * @param job

 */

function fetchApplicants(job) {

  return firestore.collection('applicants').where("job", "==", job).get();

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

    '<i onclick="showModal(\'' + appl['cover-letter'] + '\')" class="fas fa-file-alt"></i></td>' +

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



function showModal(text) {

  document.getElementsByClassName('modal')[0].style.display = "flex";

  document.getElementById('cover-letter').innerHTML = text;

}



function hideModal() {

  this.style.display = "none";

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

    var fileString = "reject-mail.php?first-name=" + applicant['first-name'] + "&last-name=" +

      applicant['last-name'] + "&email=" + applicant['email'] + "&job=" + currJob.replace(' ', '%20');

    console.log(fileString);

    xhttp.onreadystatechange = function () {

      if (this.readyState === 4 && this.status === 200) {

        console.log(this.responseText);

        firestore.collection('applicants').doc(applId).update({

          status: 'rejected'

        })

          .then(function () {

            console.log('Updated successfully!');

            fetchJobs(rightCountry);

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

        fetchJobs(rightCountry);

      })

      .catch(function (err) {

        console.log(err)

      });

  }

}



/**

 * Changes status of applicant in the db.

 *

 * @param e

 * @param indexJob

 * @param indexAppl

 */

function changeStatusInDB(e, indexJob, indexAppl) {

  var status = e.target.value;

  var key = Object.keys(allApplicants[indexJob])[indexAppl];

  firestore.collection('applicants').doc(key).update({

    status: status

  }).then(function () {

    console.log('Successfully updated!');

    fetchJobs(rightCountry);

    renderApplicants(Object.values(allApplicants), indexJob);

  })

    .catch(function (err) {

      console.log(err)

    });

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