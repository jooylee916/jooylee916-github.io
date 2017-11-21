/**
Main Javascript functions and also hook ups

##Content##
- Flexslider
- Scroll to anchor section
**/
$(function () {
  var iPadAgent = navigator.userAgent.match(/iPad/i) != null;
  var iPodAgent = navigator.userAgent.match(/iPhone/i) != null;
  var AndroidAgent = navigator.userAgent.match(/Android/i) != null;
  var webOSAgent = navigator.userAgent.match(/webOS/i) != null;
  var mobileMenuStatus = false;
	
	// Enable and diable prefix function base on screen width
	function checkPrefix(){
		var windowWidth = $(window).width();
		if(windowWidth < 568) {
			//enable
			$(".pre-fix").addClass("disable");
		}
		else {
			//enable
			$(".pre-fix").removeClass("disable");
		}
	}
	
	//force thumb size to be 1:1 ratio
	function checkThumbSize(){
		var thumbSize = $(".work-thumb").width();
  	$(".work-thumb").height(thumbSize);
	}
	
	// default check
	checkPrefix();
	checkThumbSize();
	
	// window resize responsive check
	$(window).resize(function()
  {	checkThumbSize();
		checkPrefix();
  });
	
	
  function slideHideNav(){
    mobileMenuStatus = false;
    $('.main-nav').removeClass("active");
    $(".menu-toggle").removeClass("active");
  }
  function slideShowNav(){
    $('.main-nav').addClass("active");
    $(".menu-toggle").addClass("active");
    mobileMenuStatus = true;
  }
  // Show and hide menu effects
  $(".menu-toggle").click(function () {
    if (mobileMenuStatus != true) {
      slideShowNav();
    } else {
      slideHideNav();
    }
    return false;
  });
  $( '.scoll-to-content' ).on('click', function(event) {
    event.preventDefault();
    var target = "." + $(this).data('target');
    $('html, body').animate({
        scrollTop: $(target).offset().top -$(".top.band").height()
    }, 800);
  });
	// show work
	$(".work-thumb").click(function () {
		//reset active work item
		$(".work-detail-item.active").hide();
		$(".work-detail-item.active").removeClass("active");
		$(".work-thumb.active").removeClass( "active");
		
		//reset pre-fix
		$(".pre-fix.active").removeClass("active");
		
		//calculate respective data
		var workIndex = $(".work-thumb").index($(this));
		var workRow = Math.ceil((workIndex+1)/4);
		//console.log(workIndex+' '+workRow);
		
		// show respective detailItem
		var detailItem = $(".work-detail-item").get(workIndex);
		$(detailItem).show();
		$(detailItem).addClass("active");
		
		// turn on prefix function on display detail item
		$(detailItem).find(".pre-fix").addClass("active");
		
		//show arrow on work thumb
		$(this).addClass( "active");
		
		//slidedown respective work-detail-content
		var activeRowIndex = $(".work-detail-content").index($(".work-detail-content.active"));
		var detailRowIndex = workRow-1;
		var detailRow = $(".work-detail-content").get(detailRowIndex);
		if(activeRowIndex!=detailRowIndex){
			$(".work-detail-content.active").hide();
			$(".work-detail-content.active").removeClass("active");
			$(detailRow).slideDown(800);
			$(detailRow).addClass( "active");
		}
		
		//scroll to thumb
		$('html, body').animate({
         scrollTop: $(this).offset().top - $(".top.band").height()
     }, 500);
     return false;
  });

	// hide work
	$(".close-button").click(function () {
		//scroll to thumb
		$('html, body').animate({
         scrollTop: $(".work-thumb.active").offset().top - $(".top.band").height()
     }, 500);

		$(this).parents('.work-detail-item').hide();
		$(this).parents('.work-detail-item').removeClass("active");
		$(this).parents('.work-detail-content').hide();
		$(this).parents('.work-detail-content').removeClass("active");
		$(".work-thumb.active").removeClass( "active");
		
		//reset pre-fix
		$(".pre-fix.active").removeClass("fixed-bottom");
		$(".pre-fix.active").removeClass("fixed-item");
		$(".pre-fix.active").removeClass("active");
		return false;
	});
	
	// fix description when it hits the top bar and hits the bottom of detail content
	$(window).scroll(function () {
			//check if prefix function is enable
			if(!$(".pre-fix.active").hasClass("disable")){
				var windowOffset = $(this).scrollTop();
				if ($('.work-detail-content.active').length > 0) { 
					var prefixOffsetTop = $(".work-detail-content.active").offset().top;
					var prefixOffsetBottom = prefixOffsetTop + $(".work-detail-content.active").height();
					var prefixItem = $(".pre-fix.active");
					console.log(prefixOffsetTop +' '+ prefixOffsetBottom);
					// fix description when it hits the top bar
					if (windowOffset > prefixOffsetTop-75 && windowOffset < prefixOffsetBottom-425){
						prefixItem.addClass("fixed-item");
						prefixItem.removeClass("fixed-bottom");
					}
					// fix description when it hits the bottom of detail content
					else if (windowOffset > prefixOffsetBottom-425){
						prefixItem.removeClass("fixed-item");
						prefixItem.addClass("fixed-bottom");
					}
					//default
					else {
						prefixItem.removeClass("fixed-item");
						prefixItem.removeClass("fixed-bottom");
					}
				}
				return false;
			}
  });
});
$(document).ready(function() {
  // $('.flexslider').flexslider({
  //  directionNav:false,
  //  animation: "slide"
  // });
});