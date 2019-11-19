<?php
include_once("articles/milan-article.php");

global $aArticlesMilan;

$sSectionId = "258697";
$sPicture = "section-data/images/Milan.jpg";
$sDescription = "Situated in the north of Italy it is the second biggest Italian city after Rome. But it is so much more than that, as it is crowned as the economic capital of Italy. It is one of the four world fashion capitals, an international hub for exhibition halls, and a design centre.";
$iNumMembers = 100;

$aDataMilan = [
    "id" => $sSectionId,
    "description" => $sDescription,
    "numMembers" => $iNumMembers,
    "image" => $sPicture,
    "articles" => $aArticlesMilan
];