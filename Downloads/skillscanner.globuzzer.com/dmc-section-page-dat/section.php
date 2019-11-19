<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <?php
    session_start();
    include_once("section-data/section-data.php");
    global $aSectionData;
    $aData = [];
    $sSectionId = "";
    $sName = "Globuzzer";
    $sDescription = "Social network for travelers and expats.";

    if (isset($_REQUEST["section"])) {
        $sName = $_REQUEST["section"]; // e.g. 322063 for Copenhagen
        $sName = strtolower($sName);
        $aData = $aSectionData[$sName]; // data of current section
        $sSectionId = $aData["id"];
        $sDescription = $aData["description"];
    }
    ?>

    <title><?php echo $sName ?> | Globuzzer</title>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
    <meta name="title" content="<?php echo $sName ?>">
    <meta name="description"
          content="<?php echo substr($sDescription, 0, 180) ?>">
    <meta name="keywords"
          content="Globuzzer <?php echo strtolower($sName) ?>, <?php echo $sName ?>, Visit <?php echo $sName ?>">
    <meta name="language" content="en">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta content="<?php echo $sName ?>" property="og:title">
    <meta content="<?php echo $sDescription ?>"
          property="og:description">
    <meta content="Globuzzer" property="og:site_name">
    <meta property="og:type" content="article">
    <meta property="og:url" content="http://www.globuzzer.com">
    <meta content="summary_large_image" name="twitter:card">
    <meta content="./images/screenshot-globuzzer.jpg" name="twitter:image">
    <meta content="<?php echo $sDescription ?>" name="twitter:title">

    <link rel="stylesheet" href="scripts/video-js.min.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.1/css/all.css"
          integrity="sha384-gfdkjb5BdAXd+lj+gudLWI+BXq4IuLW5IT+brZEZsLFm++aCMlF1V92rMkPaX4PP" crossorigin="anonymous">
    <link rel="stylesheet" type='text/css' href="gb-style.css">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet">

    <!--Adding Favicons-->
    <link rel="apple-touch-icon" sizes="57x57" href="./icons/shared/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="./icons/shared/apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="./icons/shared/apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="./icons/shared/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="./icons/shared/apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="./icons/shared/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="./icons/shared/apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="./icons/shared/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="./icons/shared/apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192" href="./icons/shared/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="./icons/shared/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="./icons/shared/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="./icons/shared/favicon-16x16.png">
</head>
<body>

<div class='gb-app-wrapper'>
    <?php include("svgs/symbol-defs.svg"); ?>
    <div class='gb-app-black-overlay'></div>
    <?php

    renderNavAside();
    renderNavBar();

    if (isset($_REQUEST["section"])) {
        renderData($sSectionId, $aData["image"], str_replace('-',' ',$sName), $aData["numMembers"], $aData["description"], $aData["articles"]);
    }

    renderVideoCarousel();
    renderContactUs();
    renderFooter();

    ?>
</div>
<?php

/**************
 * FUNCTIONS
 **************/

/**
 * Renders the data of the current section.
 *
 * @param $sSectionId
 * @param $sImgURL
 * @param $sTitle
 * @param $iNumberMembers
 * @param $sDescription
 * @param $aArticles
 */
function renderData($sSectionId, $sImgURL, $sTitle, $iNumberMembers, $sDescription, $aArticles)
{
    ?>
    <div class='gb-page-wrapper'>
        <!-- Header start-->
        <div class='header'>
            <?php
            renderHeader($sSectionId, $sImgURL, $sTitle, $sDescription, $iNumberMembers);
            renderCategories($sSectionId);
            renderArticles($sSectionId);
            ?>
        </div>
    </div>
    <?php
}

/**
 * Renders header with picture, title, description and number of
 * members of the current section.
 *
 * @param $sSectionId
 * @param $sImgURL
 * @param $sTitle
 * @param $sDescription
 * @param $iNumberMembers
 */
function renderHeader($sSectionId, $sImgURL, $sTitle, $sDescription, $iNumberMembers)
{
    ?>
    <div class="gb-card-two-wrapper fixed"
         style="position: relative; background-image: linear-gradient( to bottom right, rgba(0, 0, 0, 0.0001) 0%, #272121 100% ),url(<?php echo $sImgURL ?>);">
        <div class='header-black-overlay'></div>
        <h2 id="section-title"
            class="gb-title-xx-large gb-text-uppercase gb-margin-top-phone-16"><?php echo $sTitle ?></h2>
        <div class="gb-card-two-wrapper-description gb-margin-bottom-desktop-32 gb-margin-bottom-tablet-32">
            <p class="gb-paragraph-medium gb-margin-bottom-desktop-32 gb-text-center"><?php echo $sDescription ?></p>
        </div>
        <!--form class='gb-search-form gb-margin-bottom-16 gb-margin-bottom-phone-8 gb-margin-bottom-phone-8 gb-margin-bottom-tablet-16 gb-margin-bottom-desktop-16'>
            <input type='text' class='search-input' placeholder="Find topics...">
            <input type='submit' value='Search' class='gb-phone-hide search-btn-green gb-background-green'>
            <div class='gb-phone-show-flex gb-tablet-hide gb-desktop-hide search-btn-icon'>
                <input type='submit' value='' class='input-search-icon'>
                <svg class='gb-icon-medium gb-icon-white' version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <use xlink:href='#search'></use>
                </svg>
            </div>
        </form-->
        <div id="section-id" style="display: none;"><?php echo $sSectionId ?></div>
        <a href="https://globuzzer.mn.co/groups/<?php echo $sSectionId ?>"
           class='btn gb-btn gb-btn-green gb-btn-medium gb-text-uppercase'>Join us
        </a>
        <div class="gb-avatars">
            <!--div class="gb-avatars-list">
                <img class="gb-avatar gb-avatar-medium"
                     src="https://media1-production-mightynetworks.imgix.net/asset/3727554/profilepic.jpeg?ixlib=rails-0.3.0&fm=jpg&q=100&auto=format&w=98&h=98&fit=crop&crop=faces"
                     alt="user">
                <img class="gb-avatar gb-avatar-medium"
                     src="https://media1-production-mightynetworks.imgix.net/asset/3347730/8x4cso9bUJY.jpg?ixlib=rails-0.3.0&fm=jpg&q=100&auto=format&w=98&h=98&fit=crop&crop=faces"
                     alt="user">
                <img class="gb-avatar gb-avatar-medium"
                     src="https://media1-production-mightynetworks.imgix.net/asset/3863144/profilepic.jpeg?ixlib=rails-0.3.0&fm=jpg&q=100&auto=format&w=98&h=98&fit=crop&crop=faces"
                     alt="user">
                <img class="gb-avatar gb-avatar-medium"
                     src="https://media1-production-mightynetworks.imgix.net/asset/2441180/Q_B_W_-_Final.png?ixlib=rails-0.3.0&auto=format&w=98&h=98&fit=crop&crop=faces"
                     alt="user">
            </div-->
            <h4 class="gb-title-medium">
                <?php echo $iNumberMembers ?> Members
            </h4>
        </div>
    </div>
    <?php
}

function renderCategories($sSectionId)
{
    ?>
    <div id="topics" class="gb-category-container">
        <div id="hot" class="gb-category active">
            <div class="gb-icon">
                <i class="fab fa-hotjar"></i>
            </div>
            <h3 class="gb-category-title">Trending Now</h3>
        </div>
        <div id="accommodation" class="gb-category">
            <div class="gb-icon">
                <i class="fas fa-home"></i>
            </div>
            <h3 class="gb-category-title">Accommodation</h3>
        </div>
        <div id="culture" class="gb-category">
            <div class="gb-icon">
                <i class="fas fa-theater-masks"></i>
            </div>
            <h3 class="gb-category-title">Culture</h3>
        </div>
        <div id="attractions" class="gb-category">
            <div class="gb-icon">
                <i class="fas fa-star"></i>
            </div>
            <h3 class="gb-category-title">Attractions</h3>
        </div>
        <div id="guide" class="gb-category">
            <div class="gb-icon">
                <i class="fas fa-briefcase"></i>
            </div>
            <h3 class="gb-category-title">Career Guide</h3>
        </div>
        <div id="transportation" class="gb-category">
            <div class="gb-icon">
                <i class="fas fa-bus-alt"></i>
            </div>
            <h3 class="gb-category-title">Transportation</h3>
        </div>
        <div id="education" class="gb-category show-more hidden">
            <div class="gb-icon">
                <i class="fas fa-graduation-cap"></i>
            </div>
            <h3 class="gb-category-title">Education</h3>
        </div>
        <div id="events" class="gb-category show-more hidden">
            <div class="gb-icon">
                <i class="fas fa-calendar-alt"></i>
            </div>
            <h3 class="gb-category-title">Events</h3>
        </div>
        <div id="health" class="gb-category show-more hidden">
            <div class="gb-icon">
                <i class="fas fa-briefcase-medical"></i>
            </div>
            <h3 class="gb-category-title">Health</h3>
        </div>
        <a class="gb-grey-small-link show-more hidden" href="https://globuzzer.mn.co/groups/<?php echo $sSectionId ?>"
           target="_blank">Couldn't find your topic? Click here to look for more...</a>
        <div id="show-more" class="gb-icon gb-show-more-icon"><i class="fas fa-angle-down"></i></div>
    </div>
    <?php
}

/**
 * Renders previews of articles of the section.
 *
 * @param $sSectionId
 */
function renderArticles($sSectionId)
{
    ?>
    <h1 id="category-title" class="gb-header-underline">Trending now</h1>
    <p class="gb-small-subheader">Get to know the city from a local perspective</p>

    <div class='gb-card-50-wrapper' id="article-container">
    </div>
    <p class="gb-centered-small-p">Couldn't find an article for you? Click <a class="gb-bold-link" target="_blank"
                                                                              href="https://globuzzer.mn.co/groups/<?php echo $sSectionId ?>/topics">here</a>
        to find more...</p>
    <?php
}

/**
 * Renders preview of a single article.
 *
 * @param $sTitle
 * @param $sContent
 * @param $sSource
 * @param $sPostedDate
 * @param $sURL
 */
function renderArticle($sTitle, $sContent, $sSource, $sPostedDate, $sURL)
{
    ?>
    <div class="gb-card-50">
        <div class="gb-card-50-bg" style="background-image: url('<?php echo $sURL ?>')"></div>
        <div class="gb-card-50-overlay"></div>
        <h2 class="gb-card-50-title"><?php echo $sTitle ?></h2>
        <div class="gb-black-popup">
            <div class="gb-details gb-fade-in-bottom">
                <p><?php echo $sContent ?></p>
                <a class="gb-btn gb-btn-small gb-btn-white" target="_blank" href="<?php echo $sSource ?>">View
                    article</a>
            </div>
        </div>
    </div>
    <?php
}

/**
 * Renders sidebar for mobile menu.
 */
function renderNavAside()
{
    ?>
    <div class='gb-nav-aside gb-gradient-red-black'>
        <div class='nav-aside-image-background'>
        </div>
        <div class='nav-aside-content'>
            <div class='nav-aside-close'>
                <svg class='nav-aside-close-icon gb-icon-medium gb-icon-white-opacity-50 gb-phone-hide' version="1.1"
                     xmlns="http://www.w3.org/2000/svg"
                     xmlns:xlink="http://www.w3.org/1999/xlink">
                    <use xlink:href='#close'></use>
                </svg>
            </div>
            <ul class='nav-aside-content-top'>
                <li class='nav-aside-top-list-item'>
                    <a class='nav-aside-link gb-text-white' href='http://www.globuzzer.com/'>
                        <svg class='nav-aside-icon gb-icon-medium gb-icon-white-opacity-50' version="1.1"
                             xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                            <use xlink:href='#channels'></use>
                        </svg>
                        <h5 class='gb-text-uppercase gb-text-white gb-title-tiny gb-text-uppercase'>Home</h5>
                    </a>
                </li>
                <li class='nav-aside-top-list-item'>
                    <a data-scroll-to='topics' class='nav-aside-link gb-text-white' href='#'>
                        <svg class='nav-aside-icon gb-icon-medium gb-icon-white-opacity-50' version="1.1"
                             xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                            <use xlink:href='#news'></use>
                        </svg>
                        <h5 class='gb-text-uppercase gb-text-white gb-title-tiny gb-text-uppercase'>Topics</h5>
                    </a>
                </li>
                <li class='nav-aside-top-list-item'>
                    <a data-scroll-to='videos' class='nav-aside-link gb-text-white' href='#'>
                        <svg class='nav-aside-icon gb-icon-medium gb-icon-white-opacity-50' version="1.1"
                             xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                            <use xlink:href='#bookmarks'></use>
                        </svg>
                        <h5 class='gb-text-uppercase gb-text-white gb-title-tiny gb-text-uppercase'>Videos</h5>
                    </a>
                </li>
                <li class='nav-aside-top-list-item'>
                    <a data-scroll-to='contact-us' class='nav-aside-link gb-text-white' href='#'>
                        <svg class='nav-aside-icon gb-icon-medium gb-icon-white-opacity-50' version="1.1"
                             xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                            <use xlink:href='#overview'></use>
                        </svg>
                        <h5 class='gb-text-uppercase gb-text-white gb-title-tiny gb-text-uppercase'>Contact us</h5>
                    </a>
                </li>
            </ul>
            <div class='nav-aside-content-bottom line-top'>
                <div class='content-left'>
                    <a href="#">
                        <svg class="gb-logo-large gb-icon-fill-white" version="1.1" xmlns="http://www.w3.org/2000/svg"
                             xmlns:xlink="http://www.w3.org/1999/xlink">
                            <use xlink:href="#gb-logo-large"></use>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    </div>
    <?php
}

/**
 * Renders navigation bar on the top.
 */
function renderNavBar()
{
    ?>
    <div class="gb-navbar gb-background-transparent">
        <div class="left-content">
            <a href='#' class='nav-burger'>
                <svg class='gb-icon-medium gb-icon-white' version="1.1" xmlns="http://www.w3.org/2000/svg"
                     xmlns:xlink="http://www.w3.org/1999/xlink">
                    <use xlink:href='#menu'></use>
                </svg>
            </a>
        </div>
        <div class='center-content'>
            <a class='nav-logo' href="http://www.globuzzer.com/">
                <svg class="gb-logo-large gb-icon-fill-white gb-tablet-hide gb-desktop-hide" version="1.1"
                     xmlns="http://www.w3.org/2000/svg"
                     xmlns:xlink="http://www.w3.org/1999/xlink">
                    <use xlink:href="#gb-logo-small"></use>
                </svg>
                <svg class="gb-logo-large gb-icon-fill-white gb-phone-hide" version="1.1"
                     xmlns="http://www.w3.org/2000/svg"
                     xmlns:xlink="http://www.w3.org/1999/xlink">
                    <use xlink:href="#gb-logo-large"></use>
                </svg>
            </a>
        </div>
        <div class="right-content">
            <!--a class='gb-tablet-hide gb-phone-hide gb-paragraph-memdium gb-text-white' href='http://www.globuzzer.com/'>Home</a-->
            <a href='https://globuzzer.mn.co/sign_in' class='gb-text-capitalize gb-text-white gb-paragraph-memdium'>sign
                in</a>
            <!--a href='https://globuzzer.mn.co/sign_in' class='gb-tablet-hide gb-phone-hide gb-text-capitalize gb-text-white gb-paragraph-memdium'>Topics</a>
            <a href='https://globuzzer.mn.co/sign_in' class='gb-tablet-hide gb-phone-hide gb-text-capitalize gb-text-white gb-paragraph-memdium'>Videos</a>
            <a href='https://globuzzer.mn.co/sign_in' class='gb-tablet-hide gb-phone-hide gb-text-capitalize gb-text-white gb-paragraph-memdium'>Contact Us</a-->
        </div>
    </div>
    <?php
}

function renderVideoCarousel()
{
    ?>
    <div id="videos"
         class='gb-video-section gb-padding-top-phone-56 gb-padding-top-tablet-56 gb-padding-top-desktop-56 gb-padding-bottom-phone-56 gb-padding-bottom-tablet-56 gb-padding-bottom-desktop-56 gb-margin-top-tablet-32 gb-margin-top-desktop-56'>
        <h1 class="gb-header-underline">City video</h1>
        <div data-for='videosData' class='gb-image-carousel-1'>
            <ul class='carousel-1-images-list'>
            </ul>
            <div class='carousel-1-about-slide carousel-1-about-slide gb-margin-top-phone-8 gb-margin-top-tablet-8 gb-margin-top-desktop-16 gb-margin-bottom-phone-16 gb-margin-bottom-tablet-24 gb-margin-bottom-desktop-32'>
                <h2 class='carousel-1-slide-title gb-text-black gb-title-medium-large-on-desktop gb-margin-bottom-phone-8 gb-margin-bottom-tablet-8 gb-margin-bottom-desktop-16'></h2>
                <a class='carousel-1-slide-author gb-text-black-opacity-50 gb-paragraph-small'></a>
            </div>
            <ul class='carousel-1-pagination'>
            </ul>
        </div>
    </div>
    <?php
}

/**
 * Renders contact form.
 */
function renderContactUs()
{
    ?>
    <div id='contact-us'>
        <div class="gb-gradient-red-black gb-page-content-center gb-padding-top-phone-16 gb-padding-top-tablet-32 gb-padding-top-desktop-32 gb-padding-bottom-phone-8 gb-padding-bottom-tablet-16 gb-padding-bottom-desktop-16">
            <form class="gb-form-350" method="post" id="gb-feedback">
                <h2 class='gb-text-white gb-title-large gb-text-center gb-text-uppercase gb-margin-bottom-phone-16 gb-margin-bottom-tablet-16 gb-margin-bottom-desktop-40 gb-margin-top-phone-16 gb-margin-top-tablet-16 gb-margin-top-desktop-40'>
                    Contact us
                </h2>
                <p class='gb-paragraph-small gb-text-white gb-text-center gb-margin-bottom-phone-16 gb-margin-bottom-tablet-16 gb-margin-bottom-desktop-40 gb-margin-top-phone-16 gb-margin-top-tablet-16 gb-margin-top-desktop-40'>
                    If you have any questions, please don't hesitate to contact us...</p>
                <div class='gb-input-wrapper-relative'>
                    <label for="name">
                        <svg class="gb-input-icon-left" version="1.1" xmlns="http://www.w3.org/2000/svg"
                             xmlns:xlink="http://www.w3.org/1999/xlink">
                            <use xlink:href="#profile"></use>
                        </svg>
                    </label>
                    <input class="gb-input-primary gb-input-background-transparent" id='name' name="name" type="text"
                           placeholder="Name" required>
                </div>
                <div class='gb-input-wrapper-relative'>
                    <label for="email">
                        <svg class='gb-input-icon-left' version="1.1" xmlns="http://www.w3.org/2000/svg"
                             xmlns:xlink="http://www.w3.org/1999/xlink">
                            <use xlink:href='#email'></use>
                        </svg>
                    </label>
                    <input class="gb-input-primary gb-input-background-transparent" id='email' name="email" type="email"
                           placeholder="Email"
                           required>
                </div>
                <div class='gb-input-wrapper-relative'>
                    <label for="subject">
                        <svg class='gb-input-icon-left' version="1.1" xmlns="http://www.w3.org/2000/svg"
                             xmlns:xlink="http://www.w3.org/1999/xlink">
                            <use xlink:href='#name-lines'></use>
                        </svg>
                    </label>
                    <input class="gb-input-primary gb-input-background-transparent" id='subject' name="subject"
                           type="text" placeholder="Subject"
                           required>
                </div>
                <div class='gb-input-wrapper-relative'>
                    <label for="message">
                        <svg class='gb-input-icon-top' version="1.1" xmlns="http://www.w3.org/2000/svg"
                             xmlns:xlink="http://www.w3.org/1999/xlink">
                            <use xlink:href='#name-lines'></use>
                        </svg>
                    </label>
                    <textarea class="gb-input-textarea-primary gb-input-background-transparent" id="message"
                              name="message" placeholder="Message"
                              required></textarea>
                </div>
                <div class="gb-paragraph-medium gb-text-green gb-text-center gb-display-none" id="success-message"><p>
                        Your message has been successfuly sent, We will get back to you soon!</p></div>
                <div class="gb-paragraph-medium gb-text-red gb-text-center gb-display-none" id="error-message"><p>Error!
                        there is an error sending your message, please try again.</p></div>

                <div class="gb-input-wrapper-relative gb-margin-bottom-phone-40 gb-margin-bottom-tablet-40 gb-margin-bottom-desktop-48">
                    <button type="submit" class="gb-btn gb-btn-large gb-btn-primary">Submit</button>
                </div>
            </form>
        </div>
    </div>
    <?php
}

/**
 * Renders footer
 */
function renderFooter()
{
    ?>
    <div class="gb-footer gb-background-black-opacity-5">
        <div class="footer-wrapper">
            <div class='footer-top-content'>
                <ul class='footer-nav gb-phone-hide gb-tablet-hide'>
                    <li class="footer-nav-item gb-margin-bottom-8">
                        <a class="gb-text-black-opacity-50 gb-subtitle-medium"
                           href="https://mightynetworks.com/terms_of_use">
                            Terms &amp; Conditions
                        </a>
                    </li>
                    <li class="footer-nav-item gb-margin-bottom-8">
                        <a class="gb-text-black-opacity-50 gb-subtitle-medium"
                           href="https://mightynetworks.com/privacy_policy">
                            Privacy Policy
                        </a>
                    </li>
                </ul>
                <ul class="footer-contact-list">
                    <li class='footer-contact-item gb-margin-bottom-phone-8 gb-margin-bottom-tablet-8 gb-margin-bottom-desktop-8'>
                        <a class='footer-contact-link'
                           href='href="https://www.google.com/maps/place/Skyttev%C3%A4gen+29,+133+36+Saltsj%C3%B6baden,+Ruotsi/@59.2707216,18.2862762,17z/data=!3m1!4b1!4m5!3m4!1s0x465f7f0cd4f5b7b3:0x75deb43dec7d4645!8m2!3d59.2707216!4d18.2884649"'>
                            <svg class="gb-icon-fill-black-opacity-30 gb-icon-small" version="1.1"
                                 xmlns="http://www.w3.org/2000/svg"
                                 xmlns:xlink="http://www.w3.org/1999/xlink">
                                <use xlink:href="#location"></use>
                            </svg>
                            <p class='gb-text-black-opacity-50 gb-subtitle-medium'>Skyttevägen 29, Saltsjöbaden,
                                Sweden</p>
                        </a>
                    </li>
                    <li class='footer-contact-item gb-margin-bottom-phone-8 gb-margin-bottom-tablet-8 gb-margin-bottom-desktop-8'>
                        <a class='footer-contact-link' href='tel:46735555134'>
                            <svg class="gb-icon-fill-black-opacity-30 gb-icon-small" version="1.1"
                                 xmlns="http://www.w3.org/2000/svg"
                                 xmlns:xlink="http://www.w3.org/1999/xlink">
                                <use xlink:href="#phone"></use>
                            </svg>
                            <p class='gb-text-black-opacity-50 gb-subtitle-medium'>+46 73 555 5 134</p>
                        </a>
                    </li>
                    <li class='footer-contact-item gb-margin-bottom-phone-8 gb-margin-bottom-tablet-8 gb-margin-bottom-desktop-8'>
                        <a class='footer-contact-link' href='mailto:info@globuzzer.com'>
                            <svg class="gb-icon-fill-black-opacity-30 gb-icon-small" version="1.1"
                                 xmlns="http://www.w3.org/2000/svg"
                                 xmlns:xlink="http://www.w3.org/1999/xlink">
                                <use xlink:href="#envelope"></use>
                            </svg>
                            <p class='gb-text-black-opacity-50 gb-subtitle-medium'>info@globuzzer.com</p>
                        </a>
                    </li>
                </ul>
                <ul class="footer-social-media-list">
                    <li class="footer-social-media-item">
                        <a class='footer-contact-link'
                           href="https://globuzzer.mn.co/">
                            <svg class="gb-icon-fill-black-opacity-30 gb-icon-medium" version="1.1"
                                 xmlns="http://www.w3.org/2000/svg"
                                 xmlns:xlink="http://www.w3.org/1999/xlink">
                                <use xlink:href="#gb-logo-small"></use>
                            </svg>
                        </a>
                    </li>
                    <li class="footer-social-media-item">
                        <a class='footer-contact-link'
                           href="https://www.facebook.com/SocialNetworkforStudentsandExpats/?hc_ref=ARTpukVVg9pLASlFEgSEGsyb34HwQIISr3bQWcT-CghqMvRc2ccJmEMvOT4qVL7plus&__xts__[0]=68.ARAied8czZYuUH1SnAAN-tgadfzqVniY7HZvUHyax0rpZF33Xm97dZKIPU_3iBvcxypV5tTXGHDoy1aI-ZKVuoQ2L7nhf-RjbgQrrwX3FR93GfT85bpmIWr8ObZRBGqTdv1-IYLxVty6zPOYRG-0eRTzdoIxCsrQWIt1u_gqNVOKlCpQwLTe&__tn__=%3C-R">
                            <svg class="gb-icon-fill-black-opacity-30 gb-icon-medium" version="1.1"
                                 xmlns="http://www.w3.org/2000/svg"
                                 xmlns:xlink="http://www.w3.org/1999/xlink">
                                <use xlink:href="#facebook"></use>
                            </svg>
                        </a>
                    </li>
                    <li class="footer-social-media-item">
                        <a class='footer-contact-link' href="https://twitter.com/globuzzer">
                            <svg class="gb-icon-fill-black-opacity-30 gb-icon-medium" version="1.1"
                                 xmlns="http://www.w3.org/2000/svg"
                                 xmlns:xlink="http://www.w3.org/1999/xlink">
                                <use xlink:href="#twitter"></use>
                            </svg>
                        </a>
                    </li>
                    <li class="footer-social-media-item">
                        <a class='footer-contact-link' href="https://www.youtube.com/channel/UC4u8N-QBDMWG6OqzSni8clw">
                            <svg class="gb-icon-fill-black-opacity-30 gb-icon-medium" version="1.1"
                                 xmlns="http://www.w3.org/2000/svg"
                                 xmlns:xlink="http://www.w3.org/1999/xlink">
                                <use xlink:href="#youtube"></use>
                            </svg>
                        </a>
                    </li>
                    <li class="footer-social-media-item">
                        <a class='footer-contact-link' href="https://www.linkedin.com/company/globuzzer/">
                            <svg class="gb-icon-fill-black-opacity-30 gb-icon-medium" version="1.1"
                                 xmlns="http://www.w3.org/2000/svg"
                                 xmlns:xlink="http://www.w3.org/1999/xlink">
                                <use xlink:href="#linkedin"></use>
                            </svg>
                        </a>
                    </li>
                    <li class="footer-social-media-item">
                        <a class='footer-contact-link' href="https://www.pinterest.se/globuzzer/pins/">
                            <svg class="gb-icon-fill-black-opacity-30 gb-icon-medium" version="1.1"
                                 xmlns="http://www.w3.org/2000/svg"
                                 xmlns:xlink="http://www.w3.org/1999/xlink">
                                <use xlink:href="#pinterest"></use>
                            </svg>
                        </a>
                    </li>
                    <li class="footer-social-media-item">
                        <a class='footer-contact-link' href="https://www.instagram.com/globuzzer/">
                            <svg class="gb-icon-fill-black-opacity-30 gb-icon-medium" version="1.1"
                                 xmlns="http://www.w3.org/2000/svg"
                                 xmlns:xlink="http://www.w3.org/1999/xlink">
                                <use xlink:href="#instagram"></use>
                            </svg>
                        </a>
                    </li>
                </ul>
            </div>
            <div class='footer-bottom-content'>
                <div class="footer-rights-reserved">
                    <div class='left-content'>
                        <p class="gb-label gb-text-black-opacity-30">© 2018 All rights reserved.</p>
                    </div>
                    <ul class='right-content gb-desktop-hide'>
                        <li class="footer-nav-item">
                            <a class="gb-text-black-opacity-30 gb-subtitle-medium"
                               href="https://mightynetworks.com/terms_of_use">
                                Terms &amp; Conditions
                            </a>
                        </li>
                        <li class="footer-nav-item">
                            <a class="gb-text-black-opacity-30 gb-subtitle-medium"
                               href="https://mightynetworks.com/privacy_policy">
                                Privacy Policy
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <?php
}

?>
<script type='text/javascript' src='scripts/video.min.js'></script>
<script type='text/javascript' src='scripts/Youtube.min.js'></script>
<script type="text/javascript" src="scripts/scroll-to.js"></script>
<script type='text/javascript' src='scripts/nav-aside-trigger.js'></script>
<script type='text/javascript' src='scripts/navbar.js'></script>
<!-- Firebase App is always required and must be first -->
<script src="https://www.gstatic.com/firebasejs/5.7.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/5.7.0/firebase-firestore.js"></script>
<script>
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAeIYILCKVwHdn8nr7RVfg6Lfba99g-UqQ",
    authDomain: "newadminarea.firebaseapp.com",
    databaseURL: "https://newadminarea.firebaseio.com",
    projectId: "newadminarea",
    storageBucket: "newadminarea.appspot.com",
    messagingSenderId: "434967560482"


  };
  firebase.initializeApp(config);
</script>
<script src="scripts/fetch-data.js"></script>
<script type="text/javascript" src="scripts/image-carousel-1.js"></script>
</body>

</html>