$(window).on('load', function () {
    $('.slider-main').slick({
        dots: true,
        prevArrow: "<button type='button' class='slick-prev'><svg class='icon icon-slider-arrow-prev'><use xlink:href='#icon-slider-arrow-prev'></use></svg></button>",
        nextArrow: "<button type='button' class='slick-next'><svg class='icon icon-slider-arrow-next'><use xlink:href='#icon-slider-arrow-next'></use></svg></button>"
    });
});