<?php
include_once("articles/Lisbon-article.php");

global $aArticlesLisbon;

$sSectionId = "446233";
$sPicture = "section-data/images/Lisbon.jpg";
$sDescription = "Welcome to Lisbon, the sunny city by the Atlantic ocean! Lisbon is a vibrant city with something for everyone, all the time. It can offer you a city life full of things to explore, at the same as you can go to the beach at the end of each day and feel connected to the ocean like nowhere else!";
$iNumMembers = 62;

$aDataLisbon = [
    "id" => $sSectionId,
    "description" => $sDescription,
    "numMembers" => $iNumMembers,
    "image" => $sPicture,
    "articles" => $aArticlesLisbon
];