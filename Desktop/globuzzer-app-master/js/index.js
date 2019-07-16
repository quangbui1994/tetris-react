$(document).ready(function() {
    $(document).scroll(function() {
        if (window.scrollY > 50) {
            $(".Navigation").css({'background-color': 'rgba(128, 128, 128, 0.6)', 'box-shadow': '0px 1px 7px 0px rgba(0,0,0,0.63)'});
        } else {
            $(".Navigation").css({'background-color': '', 'box-shadow': ''});
        }
    });
    $(".left-banner").click(function() {
        $(this).toggleClass('left-changed');
        if ($(".right-banner").hasClass('right-changed')) {
            $(".right-banner").removeClass('right-changed');
        }
        $(".introBtnLeft").toggleClass('active');
        if ($(".introBtnRight").hasClass('active')) {
            $(".introBtnRight").removeClass('active')
        };
    });
    
    $(".right-banner").click(function() {
        $(this).toggleClass('right-changed');
        if ($(".left-banner").hasClass('left-changed')) {
            $(".left-banner").removeClass('left-changed');
        };
        $(".introBtnRight").toggleClass('active');
        if ($(".introBtnLeft").hasClass('active')) {
            $(".introBtnLeft").removeClass('active')
        };
    });
    $(".DrawerToggle").click(function() {
        $(".sideDrawer").addClass('sideDrawerOpen');
        $(".sideDrawer").removeClass('sideDrawerClose');
        $(".dark-layer").toggle();
        $('.close-btn div:first-child').css({'transform': '', 'transform': ''});
        $('.close-btn div:nth-child(2)').css('opacity', 0);
        $('.close-btn div:last-child').css({'transform': '', 'transform': ''});
    });
    $(".dark-layer").click(function() {
        $(".sideDrawer").addClass('sideDrawerClose');
        $(".sideDrawer").removeClass('sideDrawerOpen');
        $(this).toggle();
    });
    $(".close-btn").click(function() {
        $('.close-btn div:first-child').css({'transform': 'rotate(0deg)', 'transform': 'translateY(-8px)'});
        $('.close-btn div:nth-child(2)').css('opacity', 1);
        $('.close-btn div:last-child').css({'transform': 'rotate(0deg)', 'transform': 'translateY(8px)'});
        $(".sideDrawer").addClass('sideDrawerClose');
        $(".sideDrawer").removeClass('sideDrawerOpen');
        $(".dark-layer").toggle();
    });
    $(".article-nav-point").click(function() {
        const id = Number($(this).attr("id"));
        const slideNode = document.getElementsByClassName('ArticleItems');
        const slideArray = Array.prototype.slice.call(slideNode);
        slideArray.map((el, index) => {
            if (index === id) {
                slideNode[index].style.display = 'flex';
            } else {
                slideNode[index].style.display = 'none';
            }
        });
        $(".article-nav-point").css('background-color', 'white');
        $(this).css('background-color', 'red');
    })
});