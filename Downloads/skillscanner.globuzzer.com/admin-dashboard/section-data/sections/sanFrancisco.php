<?php
include_once("articles/san-francisco-article.php");

global $aArticlesSanFrancisco;

$sSectionId = "312045";
$sPicture = "https://media1-production-mightynetworks.imgix.net/asset/3264429/jack-finnigan-539853-unsplash.jpg?ixlib=rails-0.3.0&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max";
$sDescription = "";
$iNumMembers = 107;

$aDataSanFrancisco = [
    "id" => $sSectionId,
    "description" => $sDescription,
    "numMembers" => $iNumMembers,
    "image" => $sPicture,
    "articles" => $aArticlesSanFrancisco
];