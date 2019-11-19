function init(){
	/* Nav Bar */
	const navBar = document.querySelector('.gb-navbar');
	const navBarHeight = navBar.scrollHeight;

	//Scroll to element when press on link
	const navLinks = navBar.querySelectorAll('a');
	const navAsideLinks = document.querySelectorAll('.nav-aside-content a');
	const navAside = document.querySelector('.gb-nav-aside');
	const pageWrapper = document.querySelector('.gb-page-wrapper');
	const appWrapper = document.querySelector('.gb-app-wrapper');

	//Function that scroll to an element when pressing a link from both nav and navaside
	const scrollToSection = (element) => {
		const scrollToElement = document.getElementById(element.dataset.scrollTo); //get the element to scrollTo
		const elementFromTop = scrollToElement.offsetTop; //get the distance from the top of the specific element
		
		// The cases when the user is clicking from the navaside links
		if(appWrapper.classList.contains('translated')){
			//close the navAside
			
			appWrapper.classList.remove('translated');
			navAside.classList.remove('translated');

			//after the transition of the navAside is done scroll to the element
			pageWrapper.addEventListener('transitionend' , function endingOfTransition(e){
				if(e.propertyName != 'transform') return;
				window.scrollTo({
					top: elementFromTop - navBarHeight + navBarHeight/2,
					behavior: "smooth"
				});

				//remove eventlistener
				pageWrapper.removeEventListener('transitionend', endingOfTransition )
			})
		}else{ //if the click comes from the other links just scroll to the element
			window.scrollTo({
				top: elementFromTop - navBarHeight + navBarHeight/2,  
				behavior: "smooth"
			});
		}
	}
	
	//add the click listener to all the links in the navBar
	navLinks.forEach(el => {
		if(el.dataset.scrollTo){
			el.addEventListener('click' ,(e) => {
				e.preventDefault();
				scrollToSection(el)
			})
		}
	})

	//add the click listener to all the links in the navAside
	navAsideLinks.forEach(el => {
		if(el.dataset.scrollTo){
			el.addEventListener('click' , (e) => {
				e.preventDefault();
				scrollToSection(el);
				document.querySelector('body').style.overflowY = 'unset';
			}
		)
		}
	})
}
init();