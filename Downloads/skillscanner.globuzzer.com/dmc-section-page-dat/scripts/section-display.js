Array.from(document.getElementsByClassName("section-content-container")).forEach(element =>{
    element.style.display ="none";
});

let category= document.getElementsByName("category")[0].value


let showSection= document.getElementsByClassName(category)[0]
showSection.style.display= "block";
document.getElementsByName("category")[0].addEventListener("change", ()=>{
    Array.from(document.getElementsByClassName("section-content-container")).forEach(element =>{
        element.style.display ="none";
    });
    let categoryy= document.getElementsByName("category")[0].value

    let showSectionn= document.getElementsByClassName(categoryy)[0]
    showSectionn.style.display= "block";
})