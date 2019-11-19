<?php
include_once("articles/toronto-article.php");

global $aArticlesToronto;

$sSectionId = "466728";
$sPicture = "https://media1-production-mightynetworks.imgix.net/asset/2289215/Billy_Bishop.jpg?ixlib=rails-0.3.0&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max";
$sDescription = "Toronto is often described as a smaller and less intense version of New York City. But as Canada’s most populous and largest city, this place has its own unique spirit.";
$iNumMembers = 56;

$aDataToronto = [
    "id" => $sSectionId,
    "description" => $sDescription,
    "numMembers" => $iNumMembers,
    "image" => $sPicture,
    "articles" => $aArticlesToronto
];