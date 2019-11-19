<?php
include_once("articles/stockholm-article.php");

global $aArticlesStockholm;

$sSectionId = "195831";
$sPicture = "section-data/images/stockholm.jpg";
$sDescription = "Welcome to Stockholm, one of the most popular Scandinavian Capitals, where the weather turns like your mood, and the beauty lies between the mixture of colours, history, and the multicultural environment.";
$iNumMembers = 2025;

$aDataStockholm = [
    "id" => $sSectionId,
    "description" => $sDescription,
    "numMembers" => $iNumMembers,
    "image" => $sPicture,
    "articles" => $aArticlesStockholm
];