<?php
include_once("articles/london-article.php");

global $aArticlesLondon;

$sSectionId = "195344";
$sPicture = "section-data/images/london.jpg";
$sDescription = "";
$iNumMembers = 165;

$aDataLondon = [
    "id" => $sSectionId,
    "description" => $sDescription,
    "numMembers" => $iNumMembers,
    "image" => $sPicture,
    "articles" => $aArticlesLondon
];