function init(){

	/* Debouncer */

	const debounce = (func, wait = 10, immediate = false) => {

		let timeout;

		return function () {

			let context = this, args = arguments;

			let later = function () {

				timeout = null;

				if (!immediate) func.apply(context, args)

			};

			let callNow = immediate && !timeout;

			clearTimeout(timeout);

			timeout = setTimeout(later, wait);

			if (callNow) func.apply(context, args);

		}

	};



	/* Nav Bar */

	const navBar = document.querySelector('.gb-navbar');

	const header = document.querySelector('.gb-card-two-wrapper');

	const blackHeaderOverlay = document.querySelector('.header-black-overlay');

	 

	//Scroll effect

	const scrolling = () => {

    /* Script for the blackHeaderOverlay to change it's opacity */

    const scrollY = window.scrollY;

    const headerHeight = header.scrollHeight;

    if(scrollY < headerHeight){

      blackHeaderOverlay.style.opacity = ((scrollY + 1) /headerHeight )/2

    }

	

		/* Script for the nav to be sticky */



		const isPassed = scrollY >= 10;

		if(isPassed && navBar.classList.contains('gb-background-transparent')){

			navBar.classList.remove('gb-background-transparent');

			navBar.classList.add('gb-background-primary' , 'sticky');

		}else if(!isPassed && navBar.classList.contains('sticky')){

			navBar.classList.remove('gb-background-primary' , 'sticky')

			navBar.classList.add('gb-background-transparent');

		}



		/* Script that autoscroll when half of the sections is in the view */

	 

	};

	scrolling();

	window.addEventListener('scroll' , debounce(scrolling));



	//weird no space thing on the right part of the list , fixed here

	const listToBeFixed = document.querySelector('.card-16-list');

	const elementToFixWith = listToBeFixed.querySelector('.list-space-right-fix');



	const listToBeFixedListener = () => {

		const showElementToFixWith = listToBeFixed.clientWidth < listToBeFixed.scrollWidth;

		const shown = elementToFixWith.classList.contains('shown');

		if(showElementToFixWith && !shown){

			elementToFixWith.classList.add('shown')

		}else if(!showElementToFixWith && shown){

			elementToFixWith.classList.remove('shown')

		}

	};



	listToBeFixedListener();

	window.addEventListener('resize' , debounce(listToBeFixedListener));



}

init();