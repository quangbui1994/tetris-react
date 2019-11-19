function setVendor(element, property, value) {
	element.style["webkit" + property] = value;
	element.style["moz" + property] = value;
	element.style["ms" + property] = value;
	element.style["o" + property] = value;
	element.style[property] = value;
  }

function slider(parentHolder, fakeSlidesData) {

	const sliderHolder = parentHolder.querySelector('.gb-image-carousel-1 .carousel-1-images-list');
	const carouselSlideAboutHolder = parentHolder.querySelector('.carousel-1-about-slide');
	const carousel1Title = parentHolder.querySelector('.carousel-1-about-slide .carousel-1-slide-title');
	const carousel1Author = parentHolder.querySelector('.carousel-1-about-slide .carousel-1-slide-author');
	const slides = [];
	const sliderBubles = [];
	const carousel1ImageList = parentHolder.querySelector('.carousel-1-images-list');
	const carousel1PaginationList = parentHolder.querySelector('.carousel-1-pagination');

	let activeSlide = 0;
	let clickable = true;

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
	}


	//the place where videos are saved after created with videoJs
	let videosHolder = {};


	// Populate Slides
	fakeSlidesData.forEach((el, idx) => {
		//Image slide item
		let imageSlideElement = document.createElement('li');
		if (idx == 0) imageSlideElement.classList.add('active');
		imageSlideElement.classList.add('gallery-slide');
		let imageElement = document.createElement('div');
		if (el['video-url']) { //Video element
			imageSlideElement.classList.add('video');
			imageSlideElement.dataset.videoUrl = el['video-url'];
			let videoStatusDiv = document.createElement('div');
			videoStatusDiv.classList.add('videoStatus');
			let statusDivContent = `<svg class='play-button' fill='white' width='50px' height='50px' version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">`;
			statusDivContent += `<use xlink:href="#play"></use></svg>`
			statusDivContent += `<img width='50px' height='50px' class='loading-image' src='images/loading.gif' alt='Loading...'></img>`
			videoStatusDiv.innerHTML = statusDivContent;
			imageElement.appendChild(videoStatusDiv);
		}


		imageElement.style.backgroundImage = `url('${el["image-url"]}')`;
		imageElement.classList.add('carousel-1-image-item');
		imageElement.addEventListener('transitionend',(e)=>{
			if(e.target==imageElement && imageElement.style.opacity == 0){
				imageElement.style.display = 'none';
			}
		})

		imageSlideElement.appendChild(imageElement);

		carousel1ImageList.appendChild(imageSlideElement);
		slides.push(imageSlideElement);

		//Pagination list item
		let paginationBuble = document.createElement('li');
		if (idx == 0) paginationBuble.classList.add('active');
		paginationBuble.classList.add('carousel-1-pagination-buble');
		paginationBuble.dataset.index = idx;
		carousel1PaginationList.appendChild(paginationBuble);
		sliderBubles.push(paginationBuble)
	})

	//Populate Slides about
	carousel1Title.innerText = fakeSlidesData[0]['slide-title'];
	carousel1Author.innerText = fakeSlidesData[0]['slide-author'];



	sliderBubles.forEach(el => el.addEventListener('click', () => {
		if (el.classList.contains('active') || !clickable) return;
		setVendor(sliderHolder , 'transition' , '0.4s 0.3s linear transform');
		clickable = false;
		//Change the active pagination
		sliderBubles[activeSlide].classList.remove('active');
		el.classList.add('active');

		const lastActiveSlide = slides[activeSlide];
		lastActiveSlide.classList.remove('active');
		lastActiveSlide.style.zIndex = 3;

		const lastVideoPlayed = videosHolder[`video-${activeSlide}`]
		if(lastVideoPlayed){ //if the last one was a video check if it is still playing in order to stop it
			lastActiveSlide.classList.remove('loading');
			const lastPlayer = lastVideoPlayed.videoPlayer;
			if (!lastPlayer.paused()) {
				lastPlayer.pause();
			}
		}

		activeSlide = Number(el.dataset.index);
		if (activeSlide == 0) {
			setVendor(sliderHolder , 'transform' , `translateX(15%)`);
		} else {
			setVendor(sliderHolder , 'transform' , `translateX(-${55 + 70 * (activeSlide - 1)}%)`);
		}

		//take down the zIndex of 3
		window.setTimeout(()=>{
			lastActiveSlide.removeAttribute("style")
		},200)


		//Change text
		carouselSlideAboutHolder.classList.add('fade-out');
	}))

	//when the image is done sliding, let the user click again, show next text info
	sliderHolder.addEventListener('transitionend', (e) => {
		if (e.srcElement != sliderHolder || e.propertyName != "transform") return;
		slides[activeSlide].classList.add('active');
		clickable = true;

		carousel1Title.innerText = fakeSlidesData[activeSlide]['slide-title'];
		carousel1Author.innerText = fakeSlidesData[activeSlide]['slide-author'];
		carouselSlideAboutHolder.classList.remove('fade-out')
	})







	/* REMOVE EVENT LISTENERS OF THE LASTACTIVE SLIDE */

	let moveable = true;
	let lastActiveSlide = slides[activeSlide]; // do not know exactly how to fix it, must find a better solution

	/*Function that update both the slides and the bubbles when the carousel moves */
	const updateActiveSlideAndBubble = (n) => {
		lastActiveSlide = slides[activeSlide];
		lastActiveSlide.classList.remove('active');
		lastActiveSlide.style.transform = null;

		let newIdx = activeSlide + n

		const lastVideoPlayed = videosHolder[`video-${activeSlide}`];
		if(lastVideoPlayed && lastActiveSlide != slides[newIdx]){ //if last one was a video check to see if it still playing to stop it

			lastActiveSlide.classList.remove('loading');
			const lastPlayer = lastVideoPlayed.videoPlayer;
			if(!lastPlayer.paused()){ // if the last one is still playing stop it and move on
				lastPlayer.pause();
			}
		}
		sliderBubles[activeSlide].classList.remove('active');

		activeSlide = newIdx;
		sliderBubles[activeSlide].classList.add('active');
		slides[activeSlide].classList.add('active');

		window.setTimeout(() => lastActiveSlide = '', 200) // do not know exactly how to fix it, must find a better solution
	}


	const createVideo = (parent, link, id, cover) => {
		let d = document.createElement('video');
		d.id = `video-${id}`;
		d.classList.add('my-videos', 'video-js', 'vjs-default-skin');
		parent.appendChild(d);


		let player = videojs(`video-${id}`, {
			controls: true,
			techOrder: ['youtube'],
			sources: [{ "type": "video/youtube", "src": link }],
			youtube: { "iv_load_policy": 1 }
		}, function onPlayerReady() {

			//autoplay video on load just if the parent is still active
			if (parent.classList.contains('active')) this.play();


			// When the video is paused show the cover
			this.on('pause', function () {
				cover.style.display = 'flex';
				parent.querySelector('.my-videos').classList.add('hidden');
				window.setTimeout(()=>{
					cover.style.opacity = 1;
				},10)

			});

			// When the video is played hide the cover
			this.on('play', function () {
				if (!parent.classList.contains('active')) {
					this.pause();
					parent.querySelector('.my-videos').classList.add('hidden');
				} else {
					cover.style.opacity = 0;
					parent.querySelector('.my-videos').classList.remove('hidden');
				}

				parent.classList.remove('loading');

			});
		});

		videosHolder[`video-${id}`] = {
			videoPlayer: player,
			parent: parent
		}

	}


	parentHolder.querySelectorAll('.carousel-1-image-item')
		.forEach(el => {
			let parent = el.parentElement;
			const elIdx = slides.indexOf(parent);
			const cover = el;
			el.addEventListener('click', (e) => {
				if (parent.classList.contains('active') && parent.classList.contains('video')) {
					//Set the spinner gif, later remove it when the video is ready to play;
					parent.classList.add('loading');
					if (videosHolder.hasOwnProperty(`video-${elIdx}`)) { //if the iframe is already loaded, play the video
						videosHolder[`video-${elIdx}`].videoPlayer.play();
					} else { //create and apppend the video to the slide
						let videoUrl = parent.dataset.videoUrl;
						createVideo(parent, videoUrl, elIdx, cover);
					}
				} else if (parent.classList.contains('active') || parent == lastActiveSlide) {
					return;
				};

				updateActiveSlideAndBubble(elIdx - activeSlide);
				const translateHolderTo = 15 - 70 * activeSlide;
				setVendor(sliderHolder , 'transform' , `translateX(${translateHolderTo}%)`);
			})
		})


	/*Remove the listener of the mousemove for the active element, as well mouseup/leave*/
	let removeListener = () => {
		/*Flag to return if this is false, in the move, createa a bug sometimes without it*/
		moveable = false;
		let lastActive = parentHolder.querySelector('.gallery-slide.active .carousel-1-image-item');
		lastActive.removeEventListener('mousemove', debouncedMouseMoveListener);
		lastActive.removeEventListener('mouseup', removeListener);
		lastActive.removeEventListener('mouseleave', removeListener);
		lastActive.removeEventListener('touchmove', removeListener);

		/*Depending on where the user has moved the mouse move the slider that direction */

		if (moveDiference > 0.2 && activeSlide > 0) {
			updateActiveSlideAndBubble(-1);
		} else if (moveDiference < -0.2 && activeSlide < slides.length - 1) {
			updateActiveSlideAndBubble(1)
		} else {
			slides[activeSlide].style.transform = null
		}
		const translateHolderTo = 15 - 70 * activeSlide;
		setVendor(sliderHolder , 'transform' , `translateX(${translateHolderTo}%)`);
		setVendor(sliderHolder , 'transition' , '0.4s linear transform');

		/* Reset thos 2 let so for the next slide will start from the point the user have clicked */
		moveDiference = undefined;
		firstTouchAt = undefined;
	}


	let moveDiference;
	let firstTouchAt = undefined;  //keeps track of the first touch, where the user has clicked so the move starts at that pos
	let actualHolderPos = 15 - 70 * activeSlide;
	let zoomRatio = 1.2;  //the zoom on the active slide


	/* LISTENERS FOR THE MOVEMENT OF THE MOUSE/TOUCH */
	const mouseMoveListener = (e) => {
		if (!moveable) return;
		const el = e.target;

		if (el.classList.contains('hidden')) { //the element is a video and is playing stop it then move on
			el.classList.remove('hidden');
			iframeControlls.pauseIframe(el.parentElement.querySelector('iframe'))
		}

		let slideWidth = el.scrollWidth; //get the width of the slide;

		let touchNow = e.changedTouches ? (e.changedTouches[0].clientX) : (e.clientX);

		/* The diference between first click , and the movement of the mouse(actual position), move and scale slide */
		moveDiference = - ((firstTouchAt - touchNow) / slideWidth);
		setVendor(el.parentElement , 'transform' , `scale(${zoomRatio - Math.abs(moveDiference / 3)})`);
		setVendor(sliderHolder , 'transform' , `translateX(${actualHolderPos + moveDiference * 70}%)`);

	};

	let debouncedMouseMoveListener = debounce(mouseMoveListener); // listener debounced

	const getFirstTouchPosition = (e) => {
		if (firstTouchAt == undefined) { //if we have not seted the firstTouch do it, just once perTouch
			if (e.changedTouches) {
				firstTouchAt = e.changedTouches[0].clientX;
			} else {
				firstTouchAt = e.clientX;
			}
			actualHolderPos = 15 - 70 * slides.indexOf(e.target.parentElement);
		}
	}

	/* ADD THE CLICKDOWN LISTENER TO ALL THE SLIDES */
	parentHolder.querySelectorAll('.carousel-1-image-item')
		.forEach(el => {
			const parent = el.parentElement;
			el.addEventListener('mousedown', (e) => {
				if (!parent.classList.contains('active')) return; // just if it has the active add the move, if not return
				moveable = true;

				/* remove mousemove when this happens */
				el.addEventListener('mouseup', removeListener);
				el.addEventListener('mouseleave', removeListener);
				setVendor(sliderHolder , 'transition' , '0s');
				/* add mousemove */
				el.addEventListener('mousemove', debouncedMouseMoveListener);
				getFirstTouchPosition(e)
			})
			el.addEventListener('touchstart', (e) => {
				if (!parent.classList.contains('active')) return; // just if it has the active add the move, if not return
				moveable = true;
				/* remove mousemove when this happens */
				el.addEventListener('touchend', removeListener);
				setVendor(sliderHolder , 'transition' , '0s');
				/* add mousemove */
				el.addEventListener('touchmove', debouncedMouseMoveListener);
				getFirstTouchPosition(e)
			})
		}
		)


}

const currSection = document.getElementById("section-title").innerText.toLowerCase();
firestore.collection(currSection).doc("video").onSnapshot(snapshot => {
  const data = snapshot.data();
  let fakeData = {
    videosData: [
      {

        'image-url': data.image,
        'slide-title': data.title,
        'slide-author': data.author,
        'video-url': data.link,
      }/*,
		{
			'image-url': 'https://i.ytimg.com/vi/DBN84XVIyqo/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLC-ZJ7paeu3-pSefJkCfRy7K41O9w',
			'slide-title': 'Magical winter in Lapland',
			'slide-author': 'Globuzzer',
			'video-url': 'https://www.youtube.com/watch?v=DBN84XVIyqo',
		}*/
    ],
    joinData: [
      {
        'image-url': './images/sharephotos.jpg',
        'slide-title': 'Share your photos',
        'slide-author': 'Our members come from all over the world. Meet and interact with them and make new friends.',
      },
      {
        'image-url': './images/meetnewppl.jpg',
        'slide-title': 'Meet new people',
        'slide-author': 'Our members come from all over the world..',
      },
      {
        'image-url': './images/joincommunity.jpg',
        'slide-title': 'Join our comunities',
        'slide-author': ' Meet and interact with them and make new friends.',
      },
      {
        'image-url': './images/chatlocals.jpg',
        'slide-title': 'Stockholm, Sweden',
        'slide-author': 'Our members come from all over the world. Meet and interact with.',
      },
      {
        'image-url': './images/becomeambasdor.jpg',
        'slide-title': 'Become an ambassador',
        'slide-author': 'Our members come from all over the world. Meet and interact.',
      }
    ]
  };

  document.querySelectorAll('.gb-image-carousel-1').forEach((el) => {
    let data = el.dataset.for;
    slider(el, fakeData[data]);
  });
});


