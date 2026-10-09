/*  ---------------------------------------------------
  Template Name: Gym
  Description:  Gym Fitness HTML Template
  Author: Colorlib
  Author URI: https://colorlib.com
  Version: 1.0
  Created: Colorlib
---------------------------------------------------------  */

'use strict';

(function ($) {

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");
    });

    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });

    // Mobile navigation drawer
    var $menuWrapper = $('.offcanvas-menu-wrapper');
    var $menuOverlay = $('.offcanvas-menu-overlay');
    var $menuOpener = $('.canvas-open');
    $menuWrapper.prop('inert', true);

    function setMobileMenuOpen(isOpen) {
        var wasOpen = $menuWrapper.hasClass('show-offcanvas-menu-wrapper');
        if (!$menuWrapper.length) {
            return;
        }
        $menuWrapper.toggleClass('show-offcanvas-menu-wrapper', isOpen)
            .attr('aria-hidden', String(!isOpen))
            .prop('inert', !isOpen);
        $menuOverlay.toggleClass('active', isOpen).attr('aria-hidden', String(!isOpen));
        $menuOpener.attr('aria-expanded', String(isOpen));
        $('body').toggleClass('mobile-menu-open', isOpen);
        if (isOpen) {
            window.setTimeout(function () {
                var closeButton = $menuWrapper.find('.canvas-close').get(0);
                if ($menuWrapper.hasClass('show-offcanvas-menu-wrapper') && closeButton) {
                    closeButton.focus();
                }
            }, 350);
        } else if (wasOpen) {
            var opener = $menuOpener.get(0);
            if (opener) {
                opener.focus();
            }
        }
    }

    $menuOpener.on('click', function () {
        setMobileMenuOpen(true);
    });
    $('.canvas-close, .offcanvas-menu-overlay').on('click', function () {
        setMobileMenuOpen(false);
    });
    $menuWrapper.on('click', '#mobile-menu-wrap a[href]:not(.slicknav_item)', function () {
        if ($(this).attr('href') !== '#') {
            setMobileMenuOpen(false);
        }
    });

    $menuWrapper.on('click', '#mobile-menu-wrap .slicknav_parent-link > a:first-child', function (event) {
        var href = $(this).attr('href');
        if (href === '#locations' || href === '#') {
            event.preventDefault();
            var parentItem = $(this).closest('li');
            var expander = parentItem.children('.slicknav_parent-link').children('.slicknav_item').get(0);
            if (expander) {
                $(expander).trigger('click');
            }
        }
    });

    $menuWrapper.on('click', '#mobile-menu-wrap .slicknav_parent-link > .slicknav_item', function (event) {
        event.preventDefault();
        event.stopPropagation();
    });

    $menuWrapper.on('click', '.canvas-search', function () {
        setMobileMenuOpen(false);
    });
    $(document).on('keydown', function (event) {
        if (!$menuWrapper.hasClass('show-offcanvas-menu-wrapper')) {
            return;
        }
        if (event.key === 'Escape') {
            event.preventDefault();
            setMobileMenuOpen(false);
            return;
        }
        if (event.key === 'Tab') {
            var $focusable = $menuWrapper.find('button, a[href], input').filter(':visible');
            var first = $focusable.get(0);
            var last = $focusable.get($focusable.length - 1);
            if (!first || !last) {
                return;
            }
            if (event.shiftKey && (document.activeElement === first || !$menuWrapper[0].contains(document.activeElement))) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && (document.activeElement === last || !$menuWrapper[0].contains(document.activeElement))) {
                event.preventDefault();
                first.focus();
            }
        }
    });

    // SlickNav creates the drawer's navigable copy of the source menu.
    // Search trigger and dialog behavior is handled by js/search.js.
    $('.search-switch').attr('aria-haspopup', 'dialog');

    // Masonry
    $('.gallery').not('.gallery--balanced').masonry({
        itemSelector: '.gs-item',
        columnWidth: '.grid-sizer',
        gutter: 10
    });

    /*------------------
		Navigation
	--------------------*/
    $(".mobile-menu").slicknav({
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true,
        nestedParentLinks: false
    });

    function normalizeNavigationPath(path) {
        var pathname = new URL(path, window.location.href).pathname;
        return pathname.replace(/\/+$/, '') || '/';
    }

    var currentPagePath = normalizeNavigationPath(window.location.pathname);
    var $navigationLinks = $('.nav-menu a[href], #mobile-menu-wrap a[href]');
    $navigationLinks.closest('li').removeClass('active').end().removeAttr('aria-current');
    $navigationLinks.each(function () {
        var href = this.getAttribute('href');
        if (!href || href.charAt(0) === '#') {
            return;
        }
        if (normalizeNavigationPath(href) === currentPagePath) {
            $(this).attr('aria-current', 'page').closest('li').addClass('active')
                .parents('li').addClass('active');
        }
    });

    /*------------------
        Carousel Slider
    --------------------*/
    var hero_s = $(".hs-slider");
    hero_s.owlCarousel({
        loop: true,
        margin: 0,
        nav: true,
        items: 1,
        dots: false,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: false
    });

    /*------------------
        Team Slider
    --------------------*/
    $(".ts-slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 3,
        dots: true,
        dotsEach: 2,
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        responsive: {
            320: {
                items: 1,
            },
            768: {
                items: 2,
            },
            992: {
                items: 3,
            }
        }
    });

    /*------------------
        Testimonial Slider
    --------------------*/
    $(".ts_slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 1,
        dots: false,
        nav: true,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true
    });

    /*------------------
        Image Popup
    --------------------*/
    $('.image-popup').not('.gallery .image-popup').magnificPopup({
        type: 'image'
    });

    $('.gallery .image-popup').magnificPopup({
        type: 'image',
        focus: '.mfp-close',
        gallery: {
            enabled: true,
            preload: [0, 1],
            tPrev: 'Previous image (Left arrow key)',
            tNext: 'Next image (Right arrow key)',
            tCounter: '%curr% of %total%'
        },
        image: {
            titleSrc: function (item) {
                return item.el.attr('aria-label');
            }
        },
        callbacks: {
            open: function () {
                this.wrap.attr({
                    role: 'dialog',
                    'aria-modal': 'true',
                    'aria-label': 'Gallery image viewer'
                });
            }
        }
    });

    /*------------------
        Video Popup
    --------------------*/
    $('.video-popup').magnificPopup({
        type: 'iframe'
    });

    /*------------------
        Barfiller
    --------------------*/
    $('#bar1').barfiller({
        barColor: '#ffffff',
        duration: 2000
    });
    $('#bar2').barfiller({
        barColor: '#ffffff',
        duration: 2000
    });
    $('#bar3').barfiller({
        barColor: '#ffffff',
        duration: 2000
    });

    $('.table-controls ul li').on('click', function () {
        var tsfilter = $(this).data('tsfilter');
        $('.table-controls ul li').removeClass('active');
        $(this).addClass('active');

        if (tsfilter == 'all') {
            $('.class-timetable').removeClass('filtering');
            $('.ts-meta').removeClass('show');
        } else {
            $('.class-timetable').addClass('filtering');
        }
        $('.ts-meta').each(function () {
            $(this).removeClass('show');
            if ($(this).data('tsmeta') == tsfilter) {
                $(this).addClass('show');
            }
        });
    });

})(jQuery);