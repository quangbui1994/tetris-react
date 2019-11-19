<?php
include_once("articles/helsinki-article.php");

global $aArticlesHelsinki;

$sSectionId = "195832";
$sPicture = "section-data/images/helsinki.jpg";
$sDescription = "Welcome to Helsinki, the capital and the largest city in Finland, a lively seacoast city of beautiful islands and colourful buildings. The city’s centre is full of museums, and boasts a fabulous cycling infrastructure. Helsinki is one of the safest and organised cities in the world.";
$iNumMembers = 1288;

$aDataHelsinki = [
    "id" => $sSectionId,
    "description" => $sDescription,
    "numMembers" => $iNumMembers,
    "image" => $sPicture,
    "articles" => $aArticlesHelsinki
];