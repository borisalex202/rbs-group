var grid = {
    xs: 480,
    sm: 760,
    md: 992,
    lg: 1200
};
var elements = {
    menu: $('.site-nav'),
    menuBtn: $('.icon-menu'),
    hasChilds: $('.has-childs'),
    menuBack: $('.site-nav-back'),
    searchLink: $('.search-link'),
    searchInput: $('.search-input'),
    siteHeader: $('.site-header'),
    shareLink: $('.share-link'),
    languageLink: $('.language-link'),
    languageItem: $('.language-item'),
    languageCurrent: $('.language-current'),
    timelineYear: $('.timeline-year'),
    timelineToggleAll: $('.timeline-toggle-all'),
    timelineItem: $('.timeline-item')
};
var options = {
    documentWith: $(document).width(),
    siteHeaderHeight: elements.siteHeader.outerHeight(),
    touchedStartX: 0,
    touchedDist: 0,
    touchedThreshold: 120,
    tdsName: []
};
var myMap;

(function($) {

    @@include('./partials/_sliders.js');

    /* Mobile menu */
    elements.menuBtn.on('click', function () {
        $('body').toggleClass('menu-opened').find('.has-childs').removeClass('show-childs');;
    });
    $(document).on('mouseup', function (e){
        var el = $('.site-nav, .icon-menu');
        if (!el.is(e.target)
            && el.has(e.target).length === 0) {
            $('body').removeClass('menu-opened');
        }
    });

    /* Search */
    elements.searchLink.on('click', function (e) {
        if(!elements.searchInput.val().length) {
            e.preventDefault();
        }
        $('body').toggleClass('search-opened');
        elements.searchInput.focus();
    });
    $(document).on('mouseup', function (e){
        var el = $('.search-input, .search-link');
        if (!el.is(e.target)
            && el.has(e.target).length === 0) {
            $('body').removeClass('search-opened');
        }
    });

    /* Share */
    elements.shareLink.on('click', function (e) {
        $('body').toggleClass('share-opened');
        e.preventDefault();
    });
    $(document).on('mouseup', function (e){
        var el = $('.share-list, .share-link');
        if (!el.is(e.target)
            && el.has(e.target).length === 0) {
            $('body').removeClass('share-opened');
        }
    });

    /* Languages */
    elements.languageLink.on('click', function (e) {
        $('body').toggleClass('language-opened');
        e.preventDefault();
    });
    elements.languageItem.on('click', function (e) {
        var language = $(this).find('use').attr('xlink:href');

        elements.languageCurrent.find('use').attr('xlink:href', language);
        $('body').removeClass('language-opened');
        e.preventDefault();
    });
    $(document).on('mouseup', function (e){
        var el = $('.language-list, .language-link');
        if (!el.is(e.target)
            && el.has(e.target).length === 0) {
            $('body').removeClass('language-opened');
        }
    });

    $('.disabled').on('click', function (e) {
        e.preventDefault();
    });

    $(window).on('load resize', function () {

        /* Options */
        options.documentWith = $(document).width();
        options.siteHeaderHeight = elements.siteHeader.outerHeight();

        /* Mobile menu */
        if(grid.md > options.documentWith) {
            elements.hasChilds.children('a').on('click', function (e) {
                if(!$(this).parent().hasClass('disabled')) {
                    $(this).closest('.has-childs').addClass('show-childs');
                    $('body').addClass('submenu-opened');
                }
                e.preventDefault();
            });
            elements.menuBack.on('click', function () {
                submenuHide($(this));
                $('body').removeClass('submenu-opened');
            });
            $('.site-nav-submenu')
                .on('touchstart', function (e) {
                    var touchobj = e.originalEvent.touches[0];

                    options.touchedDist = 0;
                    options.touchedStartX = touchobj.pageX;
                })
                .on('touchmove', function (e) {
                    var touchobj = e.originalEvent.touches[0];
                    options.touchedDist = touchobj.pageX - options.touchedStartX;
                    submenuMove($(this), options.touchedDist);

                })
                .on('touchend', function (e) {
                    var touchobj = e.originalEvent.changedTouches[0];

                    options.touchedDist = touchobj.pageX - options.touchedStartX;

                    if (!elements.menuBack.is(e.target)
                        && elements.menuBack.has(e.target).length === 0) {
                        if (options.touchedDist >= options.touchedThreshold) {
                            submenuHide($(this));
                        } else {
                            $(this).closest('.has-childs').find('.site-nav-submenu').css({
                                transform: 'translate(0, 0)'
                            });
                        }
                    }
                });
        }
    });

    /* Smooth scroll to id */
    $('.smooth').click(function() {
        var target = $(this).attr('href');
        if (target.length) {
            $('html, body').animate({
                scrollTop: $(target).offset().top - options.siteHeaderHeight
            }, 700);
            return false;
        }
    });

    /* Forms */
    $('input, textarea')
        .each(function () {
            if($(this).val()) {
                $(this).closest('.form-group').addClass('active');
            }
        })
        .on('blur', function() {
            if(!$(this).val()) {
                $(this).closest('.form-group').removeClass('active');
            }
        })
        .on('focus', function() {
            $(this).closest('.form-group').addClass('active')
        })
        .on('change', function(){
            var el = $(this);
            if (el.val()) {
                el.addClass('active');
                el.closest('.form-group').addClass('active');
            } else {
                el.removeClass('active');
                el.closest('.form-group').removeClass('active');
            }
            if ($(this).val().length && $(this).hasClass('error')) {
                $(this).removeClass('error');
                $(this).addClass('success');
            }
        });
    $(document).on('mouseup', function (e){
        var el = $('.form-control');
        if (!el.is(e.target)
            && el.has(e.target).length === 0) {
            el.each(function () {
                if(!$(this).val()) {
                    $(this).closest('.form-group').removeClass('active');
                }
            });
        }
    });

    var textarea = document.querySelector('textarea');
    if(textarea != null) {
        textarea.addEventListener('keydown', autosize);
    }

    /* Table js */
    $('table thead tr > td').each(function (i) {
        options.tdsName[i] = $(this).text();
    });
    $('table tbody td').each(function (i) {
        var index = $(this).index();
        $('table tbody tr > td').eq(i).prepend('<span class="table-name">' + options.tdsName[index] + '</span>');
    });

    /* Map */
    $('.toogle-map').on('click', function () {
        $('body').toggleClass('map-opened no-scroll');
        $('html, body').animate({
            scrollTop: 0
        }, 700);
        setTimeout(function () {
            if(myMap)
            myMap.container.fitToViewport();
        }, 300)
    });
    $(document).on('mouseup', function (e){
        var el = $('.site-map, .toogle-map');
        if (!el.is(e.target)
            && el.has(e.target).length === 0) {
            $('body').removeClass('map-opened no-scroll');
            setTimeout(function () {
                if(myMap)
                myMap.container.fitToViewport();
            }, 300);
        }
    });

    /* Timeline */
    var timelineShow = true;
    elements.timelineYear.on('click', function () {
        $(this).parent().find(elements.timelineItem).slideToggle();
    });
    elements.timelineToggleAll.on('click', function (e) {
        e.preventDefault();
        if(timelineShow) {
            $(this).find('span').text('Показать историю');
            $(this).closest('body').find(elements.timelineItem).slideUp();
            timelineShow = false;
        } else {
            $(this).find('span').text('Скрыть историю');
            $(this).closest('body').find(elements.timelineItem).slideDown();
            timelineShow = true;
        }
    });

    /* Animation and lazy load */
    $(window).on('load scroll', function () {
        var el = $('.animatedOnScroll'),
            img = $('img');

        el.each(function () {
            var animatedClass = $(this).data('animated');

            if ($(document).scrollTop() + $(window).height() > $(this).offset().top && $(document).scrollTop() - $(this).offset().top < $(this).height()) {
                if(animatedClass.length) {
                    $(this).addClass(animatedClass);
                } else {
                    $(this).addClass('fadeIn');
                }
            }
        });
        img.each(function () {
            var src = $(this).data('src');
            if ($(document).scrollTop() + $(window).height() > $(this).offset().top && $(document).scrollTop() - $(this).offset().top < $(this).height()) {
                $(this).attr('src', src);
            }
        });
    });

    /* Validation form */
    $('#feedback').on('submit', function (e) {
        e.preventDefault();
        var inputs = {
                name: $(e.target.name),
                email: $(e.target.email)
            };
        (!inputs.name.val().length ? inputs.name.addClass('error') : '');
        (!inputs.email.val().length ? inputs.email.addClass('error') : '');

        if(inputs.name.val().length && inputs.email.val().length) {
            $(this).closest('.form-container').find('.form-answer').addClass('in').closest('.form-container').find('.form-control').removeClass('error active success').val('').closest('.form-group').removeClass('error active success');
        } else {
            return false;
        }
    });
    $('.close-form-answer').on('click', function (e) {
        e.preventDefault();
        $(this).closest('.form-answer').removeClass('in');
    });

    /* Functions */
    function autosize(){
        var el = this;
        setTimeout(function(){
            el.style.cssText = 'height:auto;';
            el.style.cssText = 'height:' + el.scrollHeight + 'px';
        },0);
    }
    function submenuMove(el, dist) {
        if(dist >= 0) {
            el.closest('.has-childs').find('.site-nav-submenu').css({
                transform: 'translate(' + dist + 'px, 0)'
            });
        } else if(dist >= 0 && dist >= options.touchedThreshold) {
            el.closest('.has-childs').find('.site-nav-submenu').css({
                transform: 'translate(100%, 0)'
            });
            $('body').removeClass('submenu-opened');
        } else {
            el.closest('.has-childs').find('.site-nav-submenu').css({
                transform: 'translate(0, 0)'
            });
        }
    }
    function submenuHide(el) {
        el.closest('.has-childs').removeClass('show-childs').find('.site-nav-submenu')
            .css({
                transform: 'translate(100%, 0)'
            })
            .attr('style', '');
        $('body').removeClass('submenu-opened');
    }

})($);