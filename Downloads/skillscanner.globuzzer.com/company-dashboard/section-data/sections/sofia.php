<?php
include_once("articles/sofia-article.php");

global $aArticlesSofia;

$sSectionId = "435389";
$sPicture = "https://ik.imagekit.io/mn/media-production/asset/2107918/first_estates.jpeg?tr=w-1400,h-1400,q-75,c-at_max";
$sDescription = "The capital of Bulgaria – Sofia, is one of those cities you will either fall in love with at first sight or will never understand. Sofia is both old and young. Full of history and looking in the future. Modern and ancient.";
$iNumMembers = 49;

$aDataSofia = [
    "id" => $sSectionId,
    "description" => $sDescription,
    "numMembers" => $iNumMembers,
    "image" => $sPicture,
    "articles" => $aArticlesSofia
];