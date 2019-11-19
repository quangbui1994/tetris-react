<?php
include_once("articles/belgrade-article.php");

global $aArticlesBelgrade;

$sSectionId = "294024";
$sPicture = "https://media1-production-mightynetworks.imgix.net/asset/1712123/savamala_1.jpg?ixlib=rails-0.3.0&fm=jpg&q=75&auto=format&w=1600&h=600&fit=crop";
$sDescription = "Belgrade - rich in history, rich in culture, rich in food, rich in hospitality. No matter the age or a point of interest there is something for everyone. You can choose from best restaurants in Skadarlija, to the beach of Ada Ciganlija or a place of sub-urban culture of Savamala.";
$iNumMembers = 137;

$aDataBelgrade = [
    "id" => $sSectionId,
    "description" => $sDescription,
    "numMembers" => $iNumMembers,
    "image" => $sPicture,
    "articles" => $aArticlesBelgrade
];