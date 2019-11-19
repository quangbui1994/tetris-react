var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
  
    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction
  
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
  
    ['clean']                                         // remove formatting button
  ];

var jobDescriptionQuill = new Quill("#job-description-field", {
    theme: 'snow',
    placeholder: 'Add description here (max 600 characters)',
})

var jobDescritionLimit = 600

jobDescriptionQuill.on('text-change', function(delta, old, source){
    if(jobDescriptionQuill.getLength() > jobDescritionLimit){
        jobDescriptionQuill.deleteText(jobDescritionLimit, jobDescriptionQuill.getLength())
    }

    $("#warning-empty-field-job-description").removeClass("show-warning-empty-field")
})


var jobRequirementQuill = new Quill("#job-requirement-field", {
    theme: 'snow',
    placeholder: 'Add requirements here (max 500 characters)'
})

var jobRequirementLimit = 500

jobRequirementQuill.on('text-change', function(delta, old, source){
    if(jobRequirementQuill.getLength() > jobRequirementLimit){
        jobRequirementQuill.deleteText(jobRequirementLimit, jobRequirementQuill.getLength())
    }

    $("#warning-empty-field-job-requirement").removeClass("show-warning-empty-field")
})


