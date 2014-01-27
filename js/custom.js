jQuery.noConflict();

jQuery(document).ready(function () {

	/* Smooth Scroller
	 ------------------------------------------------------------------------*/
	
	/* Position fixed hack for iPad and iPhone */
	if (navigator.platform == 'iPad' || navigator.platform == 'iPhone' || navigator.platform == 'iPod') {
		
		jQuery.localScroll({
			onAfter : function(){
					  	change_header_position();
					  }
		});
		
		jQuery('.fixed').css('position',  'absolute');
		
		function change_header_position() {
			
			/* With animation */
			jQuery('.fixed').stop().animate({ top : window.scrollY + 'px' }, { queue: false, duration: 450, easing: 'easeOutQuint'});
			
			/* Without animation */
  			//jQuery('.fixed').css('top',  window.scrollY + "px");
		}

		jQuery(document).bind('scroll', function() {
  			change_header_position();
		});
	} else {
		jQuery.localScroll();
	}
	
	
	/* PrettyPhoto
	 ------------------------------------------------------------------------*/
	function prettyphoto() {
    jQuery('a[rel^="lightbox"]').prettyPhoto({
		default_width: 640,
		default_height: 360,
        'theme': 'facebook' /* facebook / light_rounded / dark_rounded / light_square / dark_square */
    })
	}
	
	/* Init PrettyPhoto */
	prettyphoto();
	
	
	/* Google Maps
	 ------------------------------------------------------------------------*/
	jQuery('#gmap').googleMaps({
		latitude: 52.263301,
        longitude: 21.028317,
		markers: {
        	latitude: 52.263301,
            longitude: 21.028317
		}
	}); 
	
	
	/* Sliders
	 ------------------------------------------------------------------------*/
	 
    /* Homepage slider */
	jQuery('#homepage-slider').RSlider({
								   delay			: 0,
								   duration			: 1000,
								   height			: 480,
								   width			: 960,
								   slices			: 6,
								   easing			: 'easeOutExpo',
								   effect			: 'vertical_slice'
								   });
	
	/* Showcase slider */
	jQuery('#showcase-slider').RSlider({
								   delay			: 5000,
								   duration			: 1000,
								   height			: 480,
								   width			: 960,
								   slices			: 6,
								   easing			: 'easeOutExpo',
								   effect			: 'fade',
								   pause_on_hover	: true
								   });
	/* Medium slider */
	jQuery('.medium-slider').RSlider({
								   delay			: 5000,
								   duration			: 1000,
								   height			: 300,
								   width			: 960,
								   slices			: 6,
								   easing			: 'easeOutExpo',
								   effect			: 'fade',
								   pause_on_hover	: true
								   });
	
	
	/* Display sliders navigation */
	jQuery('.navigation .rs-nav').css({opacity : 0, display : 'block'});
    jQuery('.navigation').hover(function(){
		jQuery('.rs-nav',this).stop().animate({ opacity : 1 }, { queue: false, duration: 450});
		jQuery('.rs-next',this).stop().animate({ right : '10px'}, { queue: false, duration: 450, easing: 'easeOutQuint' });
		jQuery('.rs-prev',this).stop().animate({ left : '10px'}, { queue: false, duration: 450, easing: 'easeOutQuint' })
	}, function(){
		jQuery('.rs-nav',this).stop().animate({ opacity : 0 }, { queue: false, duration: 450});
	    jQuery('.rs-next',this).stop().animate({ right : '-68px'}, { queue: false, duration: 450, easing: 'easeOutQuint' });
	    jQuery('.rs-prev',this).stop().animate({ left : '-68px'}, { queue: false, duration: 450, easing: 'easeOutQuint' })
	})
	
	
    /* Menu
	 ------------------------------------------------------------------------*/
    jQuery('ul#menu').RMenu({
							sub_menu_width	 	: parseInt(jQuery('#menu ul').css('width')),
							menu_height 		: 80, // Menu height px
							fade_effect 		: 'true'
							});
	
	/* Remove border-bottom value in last child sub-menu. Only in IE browsers */
	if (jQuery.browser.msie) {
		jQuery('ul#menu li li:last-child').css('border-bottom', 'none');
	} 


	/* Contact Form
	 ------------------------------------------------------------------------*/
	/* Messages */
	var invalid_answer = 'Validation Error: Invalid answer',
	    is_not_valid = 'Validation Error: Value is not valid',
		success = '<strong>Your message has been sent. Thank you for contacting us.</strong>',
		error = 'Error: Sending message';
	
	 
	jQuery('.contact-form').RForms({
    	path : 'contact-form.php',
		submit : 
			function(form, input) {
				form.find('.rf-message').html('');
				form.find('.req').parent().removeClass('error');
			},
		valid_error	: 
			function(form, input) {
				input.parent().addClass('error');
				if (input.is('.valid_asq')) {
					form.find('.rf-message').append(invalid_answer + ' <br/>');
				} else {
					form.find('.rf-message').append(is_not_valid + '<br/>');
				}
			},
		sending	: 
			function(form) {
				form.find('.rf-loader').fadeIn(400)
			},
		complete : 
			function(form) {
				form.find('.rf-loader').fadeOut(400)
			},
		success	: 
			function(form) {
				form.find('.rf-item, .rf-send').fadeOut(400);
				form.find('.rf-message').html(success);
			},
		error : 
			function(form) {
				form.find('.rf-message').html(error);
			}
    });
	
	
	/* Portfolio
	 ------------------------------------------------------------------------*/
	 
	var
  		speed = 750,  // animation speed
  		portfolio_grid = jQuery('.portfolio-grid');
		
    /* Add active class to first navigation item */
	jQuery('.portfolio-nav li:first-child a').addClass('active');
	
	portfolio_grid.masonry({
		columnWidth: 246, // Column width 222px + margin right 24px
		singleMode: true,
		resizeable: false,
		/* only apply masonry layout to visible elements */
		itemSelector: '.grid-item:not(.invis)',
		animate: true,
		animationOptions: {
    		easing: 'easeOutQuad',
			duration: speed,
			queue: false
	  }
	});
	
	/* Portfolio navigation action */
	jQuery('.portfolio-nav li a').click(function(){
		/* Remove .active class from portfolio navigation */
		jQuery('.portfolio-nav li a').removeClass('active');
		var colorClass = '.' + jQuery(this).attr('class');
		
		if (colorClass=='.all') {
			/* Show all hidden boxes */
			portfolio_grid.children('.invis').toggleClass('invis').fadeIn(speed);
		} else {  
			/* Hide visible boxes */
			portfolio_grid.children().not(colorClass).not('.invis').toggleClass('invis').fadeOut(speed);
			/* Show hidden boxes */
			portfolio_grid.children(colorClass+'.invis').toggleClass('invis').fadeIn(speed);
		}
		
		/* Run masonry class */
		portfolio_grid.masonry();
		
		/* Add .active class to portfolio navigation */
		jQuery(this).addClass('active');
		return false;
	});

	/* Hover effect */
	var portfolio_hover = {
		init : function() {
				var el = jQuery('.portfolio-item');
				el.hover(function(){
					jQuery('.portfolio-hover', this).stop().fadeTo(600, 0.70);
					jQuery('.portfolio-content', this).css('left', '-222px');
					jQuery('.portfolio-content', this).stop().animate({ left : '0px'}, { queue: false, duration: 450, easing: 'easeOutQuint' })
				}, function(){
					jQuery('.portfolio-hover', this).stop().fadeTo(800, 0);
					jQuery('.portfolio-content', this).stop().animate({ left : '222px'}, { queue: false, duration: 300, easing: 'easeOutQuint' })
				})
			}
	}
	portfolio_hover.init();
	
	
	/* News
	 ------------------------------------------------------------------------*/
	 
	/* Show first article */
	jQuery('.news-article:eq(0)').show();
	
	/* Add active class to first news item */
	jQuery('.news-list li:first-child').addClass('active');
	
	/* News list click event */
	jQuery('.news-list li').click(function(){
	    if (!jQuery(this).is('.active')) {
			var index = jQuery(this).index();
			jQuery('.news-list li.active').removeClass('active');
			jQuery('.news-article').hide();
			jQuery('.news-article:eq('+ index +')').fadeIn(400, function(){
			    if (jQuery.browser.msie){ 
			        this.style.removeAttribute('filter')
			    }
			});
			jQuery(this).addClass('active');
		}
	})
	
	/* News List */
	jQuery('.news-list').RDynamicList({
									  display_num : 1,
									  element_height : 65
									  });
	
	
	
	/* About
	 ------------------------------------------------------------------------*/
	
	/* Slider */
	jQuery('#about-slider').RSlider({
								   delay			: 0,
								   duration			: 1000,
								   height			: 192,
								   width			: 624,
								   slices			: 6,
								   easing			: 'easeOutExpo',
								   pause_on_hover	: true
								   });
	
	
	/* Accordion
	 ------------------------------------------------------------------------*/
	jQuery('.accordion').RAccordion({element : 'li'});
	
	
	/* Toggle
	 ------------------------------------------------------------------------*/
	jQuery('.toggle').RToggle({toggle_switch : '.switch'});
	 
	
	/* Helper Functions
	 ------------------------------------------------------------------------*/
	 
	/* Images fade effect */
	jQuery('.fade').hover(function() {  
   		jQuery(this).stop().animate({ opacity : .7 }, 200);  
     },function() {  
     	jQuery(this).stop().animate({ opacity : 1}, 500);  
     }); 
	
	/* Zoom images */
	var zoom_offset = 100;
	zoom_offset = 100/2;
	jQuery('.img-zoom').hover(function() {  
   		jQuery(this).stop().animate({ width: '322px', height: '356px', top: '-'+zoom_offset+'px', left: '-'+zoom_offset+'px'}, 200);  
     },function() {  
     	jQuery(this).stop().animate({ width: '222px', height: '256px', left: '0px', top: '0px'}, 500);  
     }); 
	
	/* Tooltip */
	jQuery('.tip').tipsy({
		fade : true,
		gravity: 's'
	});
	
	
	/* Cufon Fonts
	 ------------------------------------------------------------------------*/
	Cufon.replace('h1, h2, h3, h4, h5, h6, #menu > li > a, .black-box > p', {fontFamily: 'PT Sans Narrow', hover: 'true', textShadow: '#222 1px 1px'});

	
/* End custom scripts */
}) 


;(function ($) {

    /* 
	 *  R-DYNAMIC LIST
     *  Copyright (c) 2010 Rascals Labs
	 *  http://www.rascals.eu
     *  rascals@rascals.eu
	 *  ver 1.0
     */

    jQuery.fn.RDynamicList = function(options) {
		
		return this.each(function() {		  
			var opts = jQuery.extend({
				'display_num' : 4,
				'element_height' : 65,
				'border' : 0
			}, options);
			   
			/* List variables */
			var container = $('ul', this),
				list_padding = $('li', this).css('padding-bottom').replace('px', ''),
				element_height = opts.element_height + 2*(parseInt(list_padding))+opts.border,
				list_height = opts.display_num * (element_height),
				element_num = $('li' ,this).size(),
				total = element_num - opts.display_num,
				current = 0;
			
			/* Bulid list */
			$('li' ,this).css('height', opts.element_height+'px');
			$('.dynamic-container', this).css('height', list_height+'px');
			
			/* Display navigation list */
			if (element_num > opts.display_num ) {
				
				/* Add navigation arrows */
				$(this).append('<div class="dynamic-nav"><a href="" class="nav-up"></a><a href="" class="nav-down"></a></div>');
				
				/* Bind click functions */
				$('a.nav-next', this).click(function () {
					if (current == total) current = total;
					else current++;
					container.animate({ top: (-current) * element_height }, { duration: 400, easing: 'easeOutQuart', queue: false });
					return false;
				});
				
				$('a.nav-prev', this).click(function () {
					if (current == 0) current = 0;
					else current--;
					container.animate({ top: (-current) * element_height }, { duration: 400, easing: 'easeOutQuart', queue: false });
					return false;
				});
			}
		})
    }

})(jQuery);


;(function ($) {

    /* 
	 *  R-Accordion
     *  Copyright (c) 2011 Rascals Labs
	 *  http://www.rascals.eu
     *  rascals@rascals.eu
	 *  ver 1.0
     */

    jQuery.fn.RAccordion = function(options) {
		
		return this.each(function() {		  
			var opts = jQuery.extend({
				'element' : 'li'
			}, options);
					 
			/* List variables */
			var accordion = $(this);

			/* Show active element */
			$('.active .hidden-content', accordion).show();
			
			/* Click on accordion list item */
			$(opts.element, this).click(function () {
				if (!$(this).is('.active')) {
					
					/* Hide all active items */
					$('.active', accordion).removeClass('active').find('.hidden-content').slideUp(400);
					
					/* Add active class to this item */
					$(this).addClass('active');
					$('.hidden-content', this).slideDown(400);
				} 
				return false;
			});
			
		})
    }

})(jQuery);

;(function ($) {

    /* 
	 *  R-Toggle 
     *  Copyright (c) 2011 Rascals Labs
	 *  http://www.rascals.eu
     *  rascals@rascals.eu
	 *  ver 1.0
     */

    jQuery.fn.RToggle = function(options) {
		
		return this.each(function() {		  
			var opts = jQuery.extend({
				'toggle_switch' : 'li'
			}, options);
					 
			/* List variables */
			var toggle = $(this);

			/* Show active element */
			if (toggle.is('.active')) {
			  $(opts.toggle_switch, toggle).addClass('active');
			  $('.hidden-content', toggle).show();
			}
	
			/* Click on toggle list item*/
			$(opts.toggle_switch, toggle).click(function () {
				if ($(this).is('.active')) {
					$(this).removeClass('active');
					$('.hidden-content', toggle).slideUp(400);
				} else {
					$(this).addClass('active');
					$('.hidden-content', toggle).slideDown(400);
				}
				return false;
			});
			
		})
    }

})(jQuery);


/**
 * jQuery.ScrollTo - Easy element scrolling using jQuery.
 * Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 5/25/2009
 * @author Ariel Flesler
 * @version 1.4.2
 *
 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
 */
;(function(d){var k=d.scrollTo=function(a,i,e){d(window).scrollTo(a,i,e)};k.defaults={axis:'xy',duration:parseFloat(d.fn.jquery)>=1.3?0:1};k.window=function(a){return d(window)._scrollable()};d.fn._scrollable=function(){return this.map(function(){var a=this,i=!a.nodeName||d.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!i)return a;var e=(a.contentWindow||a).document||a.ownerDocument||a;return d.browser.safari||e.compatMode=='BackCompat'?e.body:e.documentElement})};d.fn.scrollTo=function(n,j,b){if(typeof j=='object'){b=j;j=0}if(typeof b=='function')b={onAfter:b};if(n=='max')n=9e9;b=d.extend({},k.defaults,b);j=j||b.speed||b.duration;b.queue=b.queue&&b.axis.length>1;if(b.queue)j/=2;b.offset=p(b.offset);b.over=p(b.over);return this._scrollable().each(function(){var q=this,r=d(q),f=n,s,g={},u=r.is('html,body');switch(typeof f){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(f)){f=p(f);break}f=d(f,this);case'object':if(f.is||f.style)s=(f=d(f)).offset()}d.each(b.axis.split(''),function(a,i){var e=i=='x'?'Left':'Top',h=e.toLowerCase(),c='scroll'+e,l=q[c],m=k.max(q,i);if(s){g[c]=s[h]+(u?0:l-r.offset()[h]);if(b.margin){g[c]-=parseInt(f.css('margin'+e))||0;g[c]-=parseInt(f.css('border'+e+'Width'))||0}g[c]+=b.offset[h]||0;if(b.over[h])g[c]+=f[i=='x'?'width':'height']()*b.over[h]}else{var o=f[h];g[c]=o.slice&&o.slice(-1)=='%'?parseFloat(o)/100*m:o}if(/^\d+$/.test(g[c]))g[c]=g[c]<=0?0:Math.min(g[c],m);if(!a&&b.queue){if(l!=g[c])t(b.onAfterFirst);delete g[c]}});t(b.onAfter);function t(a){r.animate(g,j,b.easing,a&&function(){a.call(this,n,b)})}}).end()};k.max=function(a,i){var e=i=='x'?'Width':'Height',h='scroll'+e;if(!d(a).is('html,body'))return a[h]-d(a)[e.toLowerCase()]();var c='client'+e,l=a.ownerDocument.documentElement,m=a.ownerDocument.body;return Math.max(l[h],m[h])-Math.min(l[c],m[c])};function p(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);

/**
 * jQuery.LocalScroll - Animated scrolling navigation, using anchors.
 * Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 3/11/2009
 * @author Ariel Flesler
 * @version 1.2.7
 **/
;(function($){var l=location.href.replace(/#.*/,'');var g=$.localScroll=function(a){$('body').localScroll(a)};g.defaults={duration:1e3,axis:'y',event:'click',stop:true,target:window,reset:true};g.hash=function(a){if(location.hash){a=$.extend({},g.defaults,a);a.hash=false;if(a.reset){var e=a.duration;delete a.duration;$(a.target).scrollTo(0,a);a.duration=e}i(0,location,a)}};$.fn.localScroll=function(b){b=$.extend({},g.defaults,b);return b.lazy?this.bind(b.event,function(a){var e=$([a.target,a.target.parentNode]).filter(d)[0];if(e)i(a,e,b)}):this.find('a,area').filter(d).bind(b.event,function(a){i(a,this,b)}).end().end();function d(){return!!this.href&&!!this.hash&&this.href.replace(this.hash,'')==l&&(!b.filter||$(this).is(b.filter))}};function i(a,e,b){var d=e.hash.slice(1),f=document.getElementById(d)||document.getElementsByName(d)[0];if(!f)return;if(a)a.preventDefault();var h=$(b.target);if(b.lock&&h.is(':animated')||b.onBefore&&b.onBefore.call(b,a,f,h)===false)return;if(b.stop)h.stop(true);if(b.hash){var j=f.id==d?'id':'name',k=$('<a> </a>').attr(j,d).css({position:'absolute',top:$(window).scrollTop(),left:$(window).scrollLeft()});f[j]='';$('body').prepend(k);location=e.hash;k.remove();f[j]=d}h.scrollTo(f,b).trigger('notify.serialScroll',[f])}})(jQuery);