<?php
include_once("articles/bogota-article.php");

global $aArticlesBogota;

$sSectionId = "569795";
$sPicture = "section-data/images/bogota.jpg";
$sDescription = "";
$iNumMembers = 38;

$aDataBogota = [
    "id" => $sSectionId,
    "description" => $sDescription,
    "numMembers" => $iNumMembers,
    "image" => $sPicture,
    "articles" => $aArticlesBogota
];