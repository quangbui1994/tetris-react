<?php
include_once("articles/salatiga-article.php");

global $aArticlesSalatiga;

$sSectionId = "588489";
$sPicture = "section-data/images/Salatiga.jpg";
$sDescription = "";
$iNumMembers = 39;

$aDataSalatiga = [
    "id" => $sSectionId,
    "description" => $sDescription,
    "numMembers" => $iNumMembers,
    "image" => $sPicture,
    "articles" => $aArticlesSalatiga
];