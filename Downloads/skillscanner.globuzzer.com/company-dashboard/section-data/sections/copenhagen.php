<?php
include_once("articles/copenhagen-article.php");

global $aArticlesCopenhagen;

$sSectionId = "322063";
$sPicture = "section-data/images/copenhagen.jpg";
$sDescription = "Copenhagen is the City of Fairytales. The rich history of Denmark’s capital has created a city with stories around every corner, a must on any traveller’s itinerary! From the arresting colours and views of Nyhavn to the sub-cultures of Christiania, there is something for everyone in Copenhagen";
$iNumMembers = 1143;

$aDataCopenhagen = [
    "id" => $sSectionId,
    "description" => $sDescription,
    "numMembers" => $iNumMembers,
    "image" => $sPicture,
    "articles" => $aArticlesCopenhagen
];