var firestore = firebase.firestore();

const settings = {timestampsInSnapshots: true};

firestore.settings(settings);

var comdb = firestore.collection("companies")


DisplayCompanies()

function DisplayCompanies(keyword = "", sort = "lastest", packageSort = "all"){
    comdb.get().then(function(docSnapshot) {
        var tbody = $("#c-tbody")

        tbody.html("")

        var content_arr = []

        var createdAt_arr = []

        var sortedByPackage_arr = []

        docSnapshot.forEach(function(doc){
            if(!doc.data()["dummy"] && doc.data()["company_name"].toLowerCase().indexOf(keyword) > -1){

                var row = "<tr><td>" + doc.data()["company_name"] + "</td><td>" 
                + doc.data().location + "</td><td>" 
                + doc.data()["phone_number"] + "</td><td>" 
                + doc.data().email + "</td><td>" 
                + doc.data().description + "</td><td>" + doc.data().createdAt +"</td><td>"
                + doc.data().plan +"</td><td class = 'td-for-button'><button class='delete-company-button' onclick='DeleteCompany(\""+ doc.id +"\")'>Delete" + "</button></td></tr>"

                createdAt_arr.push({
                    row: row,
                    createdAt: doc.data().createdAt,
                    companyName: doc.data()["company_name"],
                    package: doc.data().plan
                })
            }
        })

        if(sort === "lastest"){
            createdAt_arr.sort(function(a, b) {
                return new Date(b.createdAt).getTime() - (new Date(a.createdAt).getTime())
            })
        }

        else if(sort === "ascending"){
            createdAt_arr.sort(function(a, b){
                return a.companyName.toLowerCase().localeCompare(b.companyName.toLowerCase())
            })
        }

        else if(sort === "descending"){
            createdAt_arr.sort(function(a, b){
                return -a.companyName.toLowerCase().localeCompare(b.companyName.toLowerCase())
            })
        }
        
        if(packageSort === "free"){
            createdAt_arr.forEach(function(data){
                if(data.package === "free_package")
                    content_arr.push(data.row)
            })
        }

        else if(packageSort === "plus"){
            createdAt_arr.forEach(function(data){
                if(data.package === "plus_package")
                    content_arr.push(data.row)
            })
        }

        else if(packageSort === "premium"){
            createdAt_arr.forEach(function(data){
                if(data.package === "premium_package")
                    content_arr.push(data.row)
            })
        }

        else{
            createdAt_arr.forEach(function(data){
                content_arr.push(data.row)
            })
        }
        
        tbody.html(content_arr.join("\n"))
    })
}


var searchBar = $("#search-cname"),
    selectDisplay = $("#select-display"),
    selectDisplayByPackage = $("#select-display-by-package")

searchBar.change(function(){
    DisplayCompanies(this.value, selectDisplay.val(), selectDisplayByPackage.val())
})

selectDisplay.change(function(){
    DisplayCompanies(searchBar.val(), this.value, selectDisplayByPackage.val())
})


selectDisplayByPackage.change(function(){
    DisplayCompanies(searchBar.val(), selectDisplay.val(), this.value)
})

function DeleteCompany(docId){
    comdb.doc(docId).delete().then(function(){
        firestore.collection('job_offers').where('companyId', '==', docId).get().then(function(querySnapshot){
            querySnapshot.forEach(function(doc){
                doc.ref.delete()
            })

            DisplayCompanies(searchBar.val(), selectDisplay.val())
        })
    })
    .catch(function(err){
        console.log(err)
    })
}