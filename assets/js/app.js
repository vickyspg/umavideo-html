var DECENTTHEMES = DECENTTHEMES || {};

(function($){

    // USE STRICT
    "use strict";

    DECENTTHEMES.initialize = {

      init: function(){
        DECENTTHEMES.initialize.defaults();
        // DECENTTHEMES.initialize.swiper();
        DECENTTHEMES.initialize.revSlider();
        DECENTTHEMES.initialize.background();
        DECENTTHEMES.initialize.backgroundParallax();
        DECENTTHEMES.initialize.skills();
        DECENTTHEMES.initialize.countup();
        // DECENTTHEMES.initialize.owlSlider();
        DECENTTHEMES.initialize.sectionSwitch();
        DECENTTHEMES.initialize.mobileMenu();
        DECENTTHEMES.initialize.map();
        DECENTTHEMES.initialize.contactFrom();

      },
      /*==============================*/
      /*=           General          =*/
      /*==============================*/
      defaults: function() {

        /* Wow init */
        new WOW().init()

        $('#video-gallery').lightGallery();

        $('.typed-title').typed({
          stringsElement: $('.typing-title'),
          backDelay: 2000,
          typeSpeed: 0,
          loop: true
        });

        $('.swiper-container').each(function() {
          var $this = $(this);
          new swiperRunner($this);
        });

        /* JPush Menu Init */
        // $('.menu-toggle').jPushMenu();

        $(".service-item").hover3d({
          selector: ".service-thumb"
        });

        /* Loader Init */
        $(".loading").delay(1e3).addClass("loaded");

        // Portfolio
        $('.gp-portfolio-gallery, .gp-portfolio-gallery-two').lightGallery({
         selector: '.gp-portfolio-item'
       });

        $('.gallery').lightGallery({
         selector: '.gallery-item'
       });


        $('.video-play-icon').magnificPopup({
          disableOn: 700,
          type: 'iframe',
          mainClass: 'mfp-fade',
          removalDelay: 160,
          preloader: false,

          fixedContentPos: false
        });

        /* Search Open */
        $('.search-click').on('click', function(e) {
          $('.search-wrapper').toggleClass('search-open');

        });

        $('.close-btn').on('click', function(e) {
          $('.search-wrapper').removeClass('search-open');
          e.stopImmediatePropagation();
        });

        /* Navigation */

        [].slice.call(document.querySelectorAll('.menu')).forEach(function(menu) {
          var menuItems = menu.querySelectorAll('.menu-link'),
          setCurrent = function(ev) {
            ev.preventDefault();

                    var item = ev.target.parentNode; // li

            // return if already current
            if (classie.has(item, 'menu-item-current')) {
              return false;
            }
            // remove current
            classie.remove(menu.querySelector('.menu-item-current'), 'menu-item-current');
            // set current
            classie.add(item, 'menu-item-current');
          };

          [].slice.call(menuItems).forEach(function(el) {
            el.addEventListener('click', setCurrent);
          });
        });

        /* Banner Static */
        if (typeof $.fn.ripples == 'function') {
          try {
            $('#banner-ripple').ripples({
              resolution: 500,
              perturbance: 0.04
            });
          } catch (e) {
            $('.error').show().text(e);
          }
        }

      },

      /*====================================*/
      /*=           Swiper Slider          =*/
      /*====================================*/

      swiper: function() {
        $('[data-carousel="swiper"]').each( function() {

          var $this       = $(this);
          var $container   = $this.find('[data-swiper="container"]');
          var $asControl   = $this.find('[data-swiper="ascontrol"]');

          var conf = function(element) {
            var obj = {
              slidesPerView: element.data('items'),
              centeredSlides: element.data('center'),
              loop: element.data('loop'),
              initialSlide: element.data('initial'),
              effect: element.data('effect'),
              spaceBetween: element.data('space'),
              autoplay: element.data('autoplay'),
              direction: element.data('direction'),
              paginationType: element.data('pagination-type'),
              paginationClickable: true,
              breakpoints: element.data('breakpoints'),
              slideToClickedSlide: element.data('click-to-slide'),
              loopedSlides: element.data('looped'),
              fade: {
                crossFade: element.data('crossfade')
              },
              speed: 700
            };
            return obj;
          }

          var $primaryConf = conf($container);
          $primaryConf.prevButton = $this.find('[data-swiper="prev"]');
          $primaryConf.nextButton = $this.find('[data-swiper="next"]');
          $primaryConf.pagination = $this.find('[data-swiper="pagination"]');

          var $ctrlConf = conf($asControl);

          function animateSwiper(selector, slider) {
            var makeAnimated = function animated() {
              selector.find('.swiper-slide-active [data-animate]').each(function(){
                var anim = $(this).data('animate');
                var delay = $(this).data('delay');
                var duration = $(this).data('duration');

                $(this).addClass(anim + ' animated')
                .css({
                  webkitAnimationDelay: delay,
                  animationDelay: delay,
                  webkitAnimationDuration: duration,
                  animationDuration: duration
                })
                .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                  $(this).removeClass(anim + ' animated');
                });
              });
            };
            makeAnimated();
            slider.on('SlideChangeStart', function() {
              selector.find('[data-animate]').each(function(){
                var anim = $(this).data('animate');
                $(this).removeClass(anim + ' animated');
              });
            });
            slider.on('SlideChangeEnd', makeAnimated);
          };

          if ($container.length) {
            var $swiper = new Swiper( $container, $primaryConf);
            animateSwiper($this, $swiper);

            if ($asControl.length) {
              var $control = new Swiper( $asControl, $ctrlConf);
              $swiper.params.control = $control;
              $control.params.control = $swiper;
            }

          } else {
            console.log('Swiper container is not defined!');
          };

        });
      },

      /*========================================*/
      /*=           Revolution Slider          =*/
      /*========================================*/

      revSlider: function() {
        var particles = $("#rev_slider_10_1").show().revolution({
          sliderType:"standard",
          sliderLayout:"fullscreen",
          dottedOverlay:"none",
          delay:5000,
          particles: {startSlide: "first", endSlide: "last", zIndex: "1",
          particles: {
            number: {value: 200}, color: {value: "#ffffff"},
            shape: {
              type: "circle", stroke: {width: 0, color: "#ffffff", opacity: 1},
              image: {src: ""}
            },
            opacity: {value: 0.1, random: false, min: 0.25, anim: {enable: false, speed: 1, opacity_min: 0, sync: false}},
            size: {value: 1, random: true, min: 0.5, anim: {enable: false, speed: 40, size_min: 1, sync: false}},
            line_linked: {enable: true, distance: 30, color: "#ffffff", opacity: 0.75, width: 1},
            move: {enable: true, speed: 1, direction: "right", random: true, min_speed: 1, straight: false, out_mode: "out"}},
            interactivity: {
              events: {onhover: {enable: false, mode: "repulse"}, onclick: {enable: false, mode: "bubble"}},
              modes: {grab: {distance: 400, line_linked: {opacity: 0.5}}, bubble: {distance: 400, size: 100, opacity: 1}, repulse: {distance: 75}}
            }
          },
          navigation: {
            onHoverStop:"off",
          },
          responsiveLevels:[1240,1024,778,480],
          visibilityLevels:[1240,1024,778,480],
          gridwidth:[1240,1024,778,480],
          gridheight:[868,768,960,720],
          lazyType:"none",
          parallax: {
            type:"scroll",
            origo:"slidercenter",
            speed:400,
            levels:[10,15,20,25,30,35,40,-10,-15,-20,-25,-30,-35,-40,-45,55],
            type:"scroll",
          },
          shadow:0,
          spinner:"off",
          stopLoop:"on",
          stopAfterLoops:0,
          stopAtSlide:1,
          shuffle:"off",
          autoHeight:"off",
          fullScreenAutoWidth:"off",
          fullScreenAlignForce:"off",
          fullScreenOffsetContainer: "",
          fullScreenOffset: "",
          hideThumbsOnMobile:"off",
          hideSliderAtLimit:0,
          hideCaptionAtLimit:0,
          hideAllCaptionAtLilmit:0,
          debugMode:false,
          fallbacks: {
            simplifyAll:"off",
            nextSlideOnWindowFocus:"off",
            disableFocusListener:false,
          }
        });

        if ( $('#rev_slider_10_1').length ) {
          RsParticlesAddOn(particles);
        }

        $("#rev_slider_agency").show().revolution({
          sliderType:"standard",
          sliderLayout:"fullscreen",
          dottedOverlay:"none",
          delay:9000,
          navigation: {
            keyboardNavigation:"off",
            keyboard_direction: "horizontal",
            mouseScrollNavigation:"off",
            mouseScrollReverse:"default",
            onHoverStop:"off",
            arrows: {
              style:"uranus",
              enable:true,
              hide_onmobile:false,
              hide_onleave:true,
              hide_delay:200,
              hide_delay_mobile:500,
              tmp:'',
              left: {
                h_align:"left",
                v_align:"center",
                h_offset:20,
                v_offset:0
              },
              right: {
                h_align:"right",
                v_align:"center",
                h_offset:20,
                v_offset:0
              }
            }
          },
          parallax: {
            type:"mouse",
            origo:"slidercenter",
            speed:2000,
            levels:[2,3,4,5,6,7,12,16,10,50,46,47,48,49,50,55],
            type:"mouse",
          },
          responsiveLevels:[1240,1024,778,480],
          visibilityLevels:[1240,1024,778,480],
          gridwidth:[1240,1024,778,480],
          gridheight:[868,768,960,720],
          lazyType:"none",
          shadow:0,
          spinner:"",
          stopLoop:"off",
          stopAfterLoops:-1,
          stopAtSlide:-1,
          shuffle:"off",
          autoHeight:"off",
          fullScreenAutoWidth:"off",
          fullScreenAlignForce:"off",
          fullScreenOffsetContainer: "",
          fullScreenOffset: "",
          disableProgressBar:"on",
          hideThumbsOnMobile:"off",
          hideSliderAtLimit:0,
          hideCaptionAtLimit:0,
          hideAllCaptionAtLilmit:0,
          debugMode:false,
          fallbacks: {
            simplifyAll:"off",
            nextSlideOnWindowFocus:"off",
            disableFocusListener:false,
          }
        });

        $("#rev_slider_business").show().revolution({
          sliderType:"standard",
          sliderLayout:"fullscreen",
          dottedOverlay:"none",
          delay:9000,
          navigation: {
            keyboardNavigation:"off",
            keyboard_direction: "horizontal",
            mouseScrollNavigation:"off",
            mouseScrollReverse:"default",
            onHoverStop:"off",
            arrows: {
              style:"uranus",
              enable:true,
              hide_onmobile:false,
              hide_onleave:false,
              left: {
                h_align:"left",
                v_align:"center",
                h_offset:20,
                v_offset:0
              },
              right: {
                h_align:"right",
                v_align:"center",
                h_offset:20,
                v_offset:0
              }
            }
          },
          responsiveLevels:[1240,1024,778,480],
          visibilityLevels:[1240,1024,778,480],
          gridwidth:[1240,1024,778,480],
          gridheight:[868,768,960,720],
          lazyType:"none",
          parallax: {
            type:"mouse",
            origo:"slidercenter",
            speed:2000,
            levels:[2,3,4,5,6,7,12,16,10,50,46,47,48,49,50,55],
            type:"mouse",
          },
          shadow:0,
          spinner:"off",
          stopLoop:"off",
          stopAfterLoops:-1,
          stopAtSlide:-1,
          shuffle:"off",
          autoHeight:"off",
          fullScreenAutoWidth:"off",
          fullScreenAlignForce:"off",
          fullScreenOffsetContainer: "",
          fullScreenOffset: "",
          disableProgressBar:"on",
          hideThumbsOnMobile:"off",
          hideSliderAtLimit:0,
          hideCaptionAtLimit:0,
          hideAllCaptionAtLilmit:0,
          debugMode:false,
          fallbacks: {
            simplifyAll:"off",
            nextSlideOnWindowFocus:"off",
            disableFocusListener:false,
          }
        });

        $("#rev_slider").show().revolution({
          sliderType:"standard",
          sliderLayout:"fullscreen",
          dottedOverlay:"none",
          delay:5500,
          navigation: {
            keyboardNavigation:"off",
            keyboard_direction: "horizontal",
            mouseScrollNavigation:"off",
            mouseScrollReverse:"default",
            onHoverStop:"off",
            arrows: {
              style:"uranus",
              enable:true,
              hide_onmobile:false,
              hide_onleave:true,
              tmp:'',
              left: {
                h_align:"left",
                v_align:"center",
                h_offset:20,
                v_offset:0
              },
              right: {
                h_align:"right",
                v_align:"center",
                h_offset:20,
                v_offset:0
              }
            }
            ,
            bullets: {
              enable:true,
              hide_onmobile:false,
              style:"hermes",
              hide_onleave:false,
              direction:"horizontal",
              h_align:"center",
              v_align:"bottom",
              h_offset:0,
              v_offset:20,
              space:5,
              tmp:''
            }
          },
          responsiveLevels:[1240,1024,778,480],
          visibilityLevels:[1240,1024,778,480],
          gridwidth:[1240,1024,778,480],
          gridheight:[868,768,960,720],
          lazyType:"none",
          shadow:0,
          spinner:"off",
          stopLoop:"off",
          stopAfterLoops:-1,
          stopAtSlide:-1,
          shuffle:"off",
          autoHeight:"off",
          fullScreenAutoWidth:"off",
          fullScreenAlignForce:"off",
          fullScreenOffsetContainer: "",
          fullScreenOffset: "0px",
          hideThumbsOnMobile:"off",
          hideSliderAtLimit:0,
          hideCaptionAtLimit:0,
          hideAllCaptionAtLilmit:0,
          debugMode:false,
          fallbacks: {
            simplifyAll:"off",
            nextSlideOnWindowFocus:"off",
            disableFocusListener:false,
          }
        });
      },

      /*=======================================*/
      /*=           Background Image          =*/
      /*=======================================*/

      background: function() {
        $('[data-bg-image]').each(function() {

          var img = $(this).data('bg-image');

          $(this).css({
            backgroundImage: 'url(' + img + ')',
          });
        });
      },

      /*==========================================*/
      /*=           Parallax Background          =*/
      /*==========================================*/

      backgroundParallax: function() {
        $('[data-parallax="image"]').each(function() {

          var actualHeight = $(this).position().top;
          var speed      = $(this).data('parallax-speed');
          var reSize     = actualHeight - $(window).scrollTop();
          var makeParallax = -(reSize/2);
          var posValue   = makeParallax + "px";

          $(this).css({
            backgroundPosition: '50% ' + posValue,
          });
        });
      },

      /*=============================*/
      /*=           Skills          =*/
      /*=============================*/

      skills: function() {

        $( '.skill-bar li' ).each( function() {

          $( this ).appear( function() {
            $( this ).css({ opacity: 1, left: "0px" });
            var b = $( this ).find( ".progress-bar" ).attr( "data-width" );
            $( this ).find( ".progress-bar" ).css({
              width: b + "%"
            });
          });

        });
      },

      /*==============================*/
      /*=           Counter          =*/
      /*==============================*/

      countup: function() {
        var options = {
          useEasing : true,
          useGrouping : true,
          separator : ',',
          decimal : '.',
          prefix : '',
          suffix : ''
        };

        var counteEl = $('[data-counter]');

        if (counteEl) {
          counteEl.each(function() {
            var val = $(this).data('counter');

            var countup = new CountUp(this, 0, val, 0, 2.5, options);
            $(this).appear(function() {
              countup.start();
            }, {accX: 0, accY: 0})
          });
        }
      },

      /*================================*/
      /*=           Portfolio          =*/
      /*================================*/

      portfolio: function() {
        $('[data-area="filters"]').each( function() {

          var container = $(this).find('.gp-portfolio-gallery');
          var filters   = $(this).find('.portfolio-filter');

          setTimeout( function(){ container.isotope('layout'); }, 500 );

                // Filtering items
                filters.on( 'click', '.filter-btn', function() {
                  $(".portfolio-filter li a").removeClass("active");
                  $(this).addClass("active");

                  var filterValue = $( this ).attr('data-filter');
                  portfolio.isotope({ filter: filterValue });

                });

                var portfolio =  container.isotope({
                  itemSelector: '.item',
                  masonry: {
                    columnWidth: 1
                  }
                });

              });

        $('[data-area="filters-two"]').each( function() {

          var container = $(this).find('.gp-portfolio-gallery-two');
          var filters   = $(this).find('.portfolio-filter-two');


          setTimeout( function(){ container.isotope('layout'); }, 500 );

                // Filtering items
                filters.on( 'click', '.filter-btn', function() {
                  $(".portfolio-filter-two li a").removeClass("active");
                  $(this).addClass("active");

                  var filterValue = $( this ).attr('data-filter');
                  portfolio.isotope({ filter: filterValue });

                });

                var portfolio =  container.isotope({
                  itemSelector: '.col-md-3, col-md-4'
                });

              });

        $('[data-area="filters-three"]').each( function() {

          var container = $(this).find('.gp-portfolio-gallery-two');
          var filters   = $(this).find('.portfolio-filter-two');


          setTimeout( function(){ container.isotope('layout'); }, 500 );

                // Filtering items
                filters.on( 'click', '.filter-btn', function() {
                  $(".portfolio-filter-two li a").removeClass("active");
                  $(this).addClass("active");

                  var filterValue = $( this ).attr('data-filter');
                  portfolio.isotope({ filter: filterValue });

                });

                var portfolio =  container.isotope({
                  itemSelector: '.col-md-4'
                });

              });
      },


      /*=======================================*/
      /*=           Section Switcher          =*/
      /*=======================================*/

      sectionSwitch: function() {
        $('[data-type="section-switch"], .menu-item a, .side-menu li a, .accordion-menu li a').on('click', function() {
          if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            if (target.length > 0) {

              target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
              $('html,body').animate({
                scrollTop: target.offset().top
              }, 1000);
              return false;
            }
          }
        });
      },

      /*==================================*/
      /*=           Mobile Menu          =*/
      /*==================================*/

      mobileMenu: function(options) {
        $("#accordian a").on('click', function(){

          $("#accordian ul ul").slideUp();
          if(!$(this).next().is(":visible"))
          {
            $(this).next().slideDown();
          }
        })


        $('.offCanvMenuOn').on('click', function() {
          $('#SideNav').toggleClass('SideNavOpen');
        });

        $('.CloseNav').on('click', function() {
         $('#SideNav').removeClass('SideNavOpen');
       });

      },

      /*=================================*/
      /*=           Google Map          =*/
      /*=================================*/

      map: function() {

        $('.gmap3-area').each(function() {
          var $this  = $(this),
          key    = $this.data('key'),
          lat    = $this.data('lat'),
          lng    = $this.data('lng'),
          mrkr   = $this.data('mrkr');

          $this.gmap3({
            center: [lat, lng],
            zoom: 16,
            scrollwheel: false,
            mapTypeId : google.maps.MapTypeId.ROADMAP,
            styles: [
            {
              "featureType": "all",
              "elementType": "all",
              "stylers": [
              {
                "invert_lightness": true
              },
              {
                "hue": "#00ff90"
              }
              ]
            },
            {
              "featureType": "all",
              "elementType": "geometry.fill",
              "stylers": [
              {
                "saturation": "-92"
              },
              {
                "visibility": "on"
              }
              ]
            },
            {
              "featureType": "all",
              "elementType": "labels.text.fill",
              "stylers": [
              {
                "visibility": "on"
              },
              {
                "hue": "#00ff90"
              }
              ]
            },
            {
              "featureType": "all",
              "elementType": "labels.icon",
              "stylers": [
              {
                "visibility": "on"
              },
              {
                "hue": "#00ff90"
              },
              {
                "saturation": "-100"
              }
              ]
            }
            ]
          })
          .marker(function (map) {
            return {
              position: map.getCenter(),
              icon: mrkr
            };
          })

        });
      },

      /*===================================*/
      /*=           Contact Form          =*/
      /*===================================*/
      contactFrom: function() {

       $('[data-deventform]').each(function() {
        var $this = $(this);
        $('.form-result', $this).css('display', 'none');

        $this.submit(function() {

          $('button[type="submit"]', $this).addClass('clicked');

          // Create a object and assign all fields name and value.
          var values = {};

          $('[name]', $this).each(function() {
            var $this = $(this),
            $name = $this.attr('name'),
            $value = $this.val();
            values[$name] = $value;
          });

          // Make Request
          $.ajax({
            url: $this.attr('action'),
            type: 'POST',
            data: values,
            success: function success(data) {
              if (data.error == true) {
                $('.form-result', $this).addClass('alert-warning').removeClass('alert-success alert-danger').css('display', 'block');
              } else {
                $('.form-result', $this).addClass('alert-success').removeClass('alert-warning alert-danger').css('display', 'block');
              }
              $('.form-result > .content', $this).html(data.message);
              $('button[type="submit"]', $this).removeClass('clicked');
            },
            error: function error() {
              $('.form-result', $this).addClass('alert-danger').removeClass('alert-warning alert-success').css('display', 'block');
              $('.form-result > .content', $this).html('Sorry, an error occurred.');
              $('button[type="submit"]', $this).removeClass('clicked');
            }
          });
          return false;
        });

      });
     },
   };

   DECENTTHEMES.documentOnReady = {
    init: function(){
      DECENTTHEMES.initialize.init();
      DECENTTHEMES.initialize.portfolio();
    },
  };

  DECENTTHEMES.documentOnLoad = {
    init: function(){
      $(".loading-block").fadeOut("slow");
    },
  };

  DECENTTHEMES.documentOnResize = {
    init: function(){
      DECENTTHEMES.initialize.portfolio();
    },
  };

  DECENTTHEMES.documentOnScroll = {
    init: function(){

      DECENTTHEMES.initialize.backgroundParallax();

      /* Sticky Menu */
      if ($(this).scrollTop() > 0) {
        $('#header').addClass("navbar-small")
      } else {
        $('#header').removeClass("navbar-small")
      }


      if ($(window).scrollTop() > 300){
        $('.return-to-top').addClass('back-top');
      } else {
        $('.return-to-top').removeClass('back-top');
      }
    },
  };

  $(document).ready( DECENTTHEMES.documentOnReady.init );
  $(window).on( 'load', DECENTTHEMES.documentOnLoad.init );
  $(document).on( 'scroll', DECENTTHEMES.documentOnScroll.init );
  $(document).on( 'resize', DECENTTHEMES.documentOnResize.init );

})(jQuery);
