<?php
include_once("articles/rome-article.php");

global $aArticlesRome;

$sSectionId = "195833";
$sPicture = "section-data/images/Rome.jpg";
$sDescription = "Rome. The capital of Italy offers a unique cultural heritage which always enchants people. Rome has been the centre of the most important historical events & home to the brightest minds.";
$iNumMembers = 142;

$aDataRome = [
    "id" => $sSectionId,
    "description" => $sDescription,
    "numMembers" => $iNumMembers,
    "image" => $sPicture,
    "articles" => $aArticlesRome
];