<?php

include_once("articles/zagreb-article.php");

global $aArticlesZagreb;

$sSectionId = "403651";
$sPicture = "https://media1-production-mightynetworks.imgix.net/asset/1997631/p83-zagreb_1.jpg?ixlib=rails-0.3.0&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max";
$sDescription = "Zagreb is a small, but vibrant metropolis, capital of a coastal attractive Croatia, country of more than 1200 islands. It’s a year-round outdoor city, very popular for drinking coffee in many cafes around the main square ban Jelacic, walking around historic Upper Town, and many other sights...";
$iNumMembers = 75;

$aDataZagreb = [
    "id" => $sSectionId,
    "description" => $sDescription,
    "numMembers" => $iNumMembers,
    "image" => $sPicture,
    "articles" => $aArticlesZagreb
];