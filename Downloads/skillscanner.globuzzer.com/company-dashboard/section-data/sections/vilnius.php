<?php
include_once("articles/vilnius-article.php");

global $aArticlesVilnius;

$sSectionId = "210260";
$sPicture = "https://media1-production-mightynetworks.imgix.net/asset/1853372/20150616-G0022840-1200x674.jpg?ixlib=rails-0.3.0&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max";
$sDescription = "City connecting north and south, east and west, well known as a center of Europe, one of the largest medieval old towns, unique history and marvelous Republic of Užupis invites you to enjoy it every time of the year.";
$iNumMembers = 153;

$aDataVilnius = [
    "id" => $sSectionId,
    "description" => $sDescription,
    "numMembers" => $iNumMembers,
    "image" => $sPicture,
    "articles" => $aArticlesVilnius
];