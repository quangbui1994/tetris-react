<?php

include_once("articles/wuerzburg-article.php");

global $aArticlesWuerzburg;

$sSectionId = "318520";
$sPicture = "https://media1-production-mightynetworks.imgix.net/asset/1648042/DSCN3227__2__Fotor.jpg?ixlib=rails-0.3.0&fm=jpg&q=75&auto=format&w=800&h=300&fit=crop";
$sDescription = "You love wine, you like German sausages, you are interested in old ancient but young and vibrant city at the same time – It is definitely time for you to go and visit Würzburg! hosts the UNESCO World Heritage Site – the Würzburg Residenz, and is famous for its fortress- Festung Marienberg.";
$iNumMembers = 53;

$aDataWuerzburg = [
    "id" => $sSectionId,
    "description" => $sDescription,
    "numMembers" => $iNumMembers,
    "image" => $sPicture,
    "articles" => $aArticlesWuerzburg
];