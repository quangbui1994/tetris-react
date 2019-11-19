<?php
include_once("articles/barcelona-article.php");

global $aArticlesBarcelona;

$sSectionId = "195835";
$sPicture = "section-data/images/Barcelona.jpg";
$sDescription = "Barcelona, the cosmopolitan capital of Spain’s Catalonia region, it is known for its art and architecture. The fantastic Sagrada Família church and other modernist landmarks designed.";
$iNumMembers = 122;

$aDataBarcelona = [
    "id" => $sSectionId,
    "description" => $sDescription,
    "numMembers" => $iNumMembers,
    "image" => $sPicture,
    "articles" => $aArticlesBarcelona
];