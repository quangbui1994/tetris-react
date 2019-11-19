<?php
include_once("articles/lahore-article.php");

global $aArticlesLahore;

$sSectionId = "387773";
$sPicture = "https://media1-production-mightynetworks.imgix.net/asset/1888912/15881730128_94c9d1bdac_b.jpg?ixlib=rails-0.3.0&fm=jpg&q=75&auto=format&w=1600&h=600&fit=crop";
$sDescription = "Lahore, the city of gardens is the historic cultural centre of Pakistan. A cosmopolitan city famous for its ancient temples, mosques, palaces, forts and gardens dating back to 900AD. A major destination for tourism because of its welcoming hospitality and delicious Punjabi cuisine.";
$iNumMembers = 71;

$aDataLahore = [
    "id" => $sSectionId,
    "description" => $sDescription,
    "numMembers" => $iNumMembers,
    "image" => $sPicture,
    "articles" => $aArticlesLahore
];