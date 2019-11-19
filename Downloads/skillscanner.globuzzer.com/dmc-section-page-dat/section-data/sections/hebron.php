<?php
include_once("articles/hebron-article.php");

global $aArticlesHebron;

$sSectionId = "273962";
$sPicture = "https://media1-production-mightynetworks.imgix.net/asset/1485882/MatsReinbertsen3.JPG.jpg?ixlib=rails-0.3.0&fm=jpg&q=75&auto=format&w=1600&h=600&fit=crop";
$sDescription = "Hebron is the largest city in Palestine in both area and population and considered its commercial center. It is located in a distance of 30 Km to the South of Jerusalem, the capital of Palestine.";
$iNumMembers = 50;

$aDataHebron = [
    "id" => $sSectionId,
    "description" => $sDescription,
    "numMembers" => $iNumMembers,
    "image" => $sPicture,
    "articles" => $aArticlesHebron
];