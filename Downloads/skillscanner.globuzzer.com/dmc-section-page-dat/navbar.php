<div class="navbar">

    <div class="left-side">

        <div class="avatar">

            <a target="_blank"

               id="redirect"

               href="http://staging1.globuzzer.com/dmc-SkillScanner-remake/index.html">

                <img src="images/ss-logo-version_Fotor.png"/>

            </a>

        </div>

        <a class="button" href="section-admin.php">Create New Content</a>

        <a class="button" href="section-admin-show.php">See all categories</a>

        <a class="button" href="application-dashboard.php">Application dashboard</a>

        <a class="button" href="create-user.php">Create user</a>

        <a class="button" href="company-dashboard.php">Company dashboard</a>
    </div>

    <div class="left-side">

        <!-- Duong Chinh's alternative of country section select -->
        <div class="country-section-wrapper">
            <div class="country-section-dropdown">
                <img id="country-flag" class="dropdown-flag" src="images/SE.png"> 
                <p id="country-name">Sweden</p>
                <div id="country-section-content-wrapper" class="country-section-content-wrapper"> 
                    <div class="country-section-dropdown-content">
                        <a onclick="DropdownSelectCountry(0)">
                            <div class="dropdown-option">
                                <img class="dropdown-flag" src="images/SE.png"> <p>Sweden</p>
                            </div>
                        </a>
                        <a onclick="DropdownSelectCountry(1)">
                            <div class="dropdown-option">
                                <img class="dropdown-flag" src="images/FI.png"> <p>Finland</p>
                            </div>
                        </a>
                        <a onclick="DropdownSelectCountry(2)">
                            <div class="dropdown-option">
                                <img class="dropdown-flag" src="images/NO.png"> <p>Norway</p>
                            </div>
                        </a>
                        <a onclick="DropdownSelectCountry(3)">
                            <div class="dropdown-option">
                                <img class="dropdown-flag" src="images/DK.png"> <p>Denmark</p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <a class="button" id="logout">Logout</a>

    </div>

</div>