if (typeof jQuery === 'undefined') {
  throw new Error('eSlider\'s JavaScript requires jQuery')
}
if (typeof Hammer === 'undefined') {
  throw new Error('eSlider\'s JavaScript requires hammer.js')
}
+function ($) {
  var sliderLog1 = 0 ;

  $.fn.eSlider = function(options, slider, sliderDelay) {
    var settings = $.extend( {
      'sliderDelay' : 500,
      'dots': false,
      'arrows': false,
      'animate': 'custom',
      'draggable': true
    }, options);
    return this.each(function() {

      function removeAddClass(counter, prevCounter, position) {
        $(slider).find(".eslide-current").removeClass("eslide-current");
        if(settings.dots)
          $(dots).removeClass("eslide-dot-current").removeProp("disabled");
        $($(slides)[prevCounter]).addClass("eslide-back");
        setTimeout(
          function(){
            $(slider).find(".eslide-back").removeClass("eslide-back");
            $($(slider).find(".eslider-wrapper")).css("margin-left",position+"px");
            $($(slides)[counter]).addClass("eslide-current");
            sliderLog1 = 0;
          }
          , settings.sliderDelay);
        $($(dots)[counter]).addClass("eslide-dot-current").prop("disabled");
        $($(slides)[counter]).addClass("eslide-current");
      };

      var slider = $(this),
          step=slider.width(),
          slider_box_width=slider.innerWidth(),
          slides = slider.children(),
          //dots = slider.find(".dots li"),
          count = slides.length,
          prevSlide = count,
          col_main_left=0,
          dotsCount =0,
          max_col_main_left=count * step,
          prevSlideCount = 0,
          slide_counter=0,
          slider_mouse_x1 = 0,
          slider_mouse_x2 = 0;
      $(slider).addClass('eslider');
      $( "<div class='eslider-wrapper'></div>" ).appendTo( slider ).width(slider_box_width*count);
      slides.appendTo( '.eslider-wrapper' ).addClass("eslide-slide").width(slider_box_width);
      $(slides[slide_counter]).addClass("eslide-current");
      $(slider).on('mousedown', function() {return false});
      // Dots settings
      if(settings.dots) {
        var dots = '';
        for (var i = 0; i < count; i++) {
          dots += '<li><button eslide-index='+i+'>'+(i+1)+'</button></li>';
        }
        dots = '<ul class="eslide-dots">' + dots + '</ul>';
        $(dots).appendTo(slider);
        dots = $('.eslide-dots li');
        $(dots[slide_counter]).addClass("eslide-dot-current");
        $(dots).children("button").on("click", function(){
          if(sliderLog1 == 0){
            sliderLog1 = 1;
            slide_counter = $(this).attr("eslide-index");
            prevSlide = 0;
            $(slides).each( function() {
              if(!$(this).hasClass("eslide-current"))
                prevSlide++;
              else
                prevSlideCount = prevSlide;
            });
            col_main_left = -slide_counter * step;
            removeAddClass(slide_counter, prevSlideCount, col_main_left);
          } else {
            console.log(sliderLog1);
          }
        });
      }
      // Arrows settings
      if(settings.arrows) {
        var prevArrow = '<button class="eslider-prev" type="button">Previous</button>',
            nextArrow = '<button class="eslider-next" type="button">Next</button>';
        $(prevArrow).prependTo(slider).addClass("eslider-arrow");
        $(nextArrow).appendTo(slider).addClass("eslider-arrow");
        slider.find('.eslider-prev').on('click', function() {
          if(sliderLog1 == 0) {
            if(col_main_left==0){
              col_main_left=-max_col_main_left+step;
              prevSlideCount=slide_counter;
              slide_counter=count-1;
            } else{
                col_main_left=col_main_left+step;
                prevSlideCount=slide_counter;
                slide_counter=slide_counter-1;
            }
            removeAddClass(slide_counter,prevSlideCount, col_main_left);
          } else {
            console.log(sliderLog1);
          };
        })
        slider.find('.eslider-next').on('click', function() {
          if(sliderLog1 == 0) {
            if(-col_main_left==max_col_main_left-step){
              col_main_left=0;
              prevSlideCount=slide_counter;
              slide_counter=0;
            } else{
              col_main_left=col_main_left-step;
              prevSlideCount=slide_counter;
              slide_counter=slide_counter+1;
            }
            removeAddClass(slide_counter,prevSlideCount, col_main_left);
          } else {
            console.log(sliderLog1);
          };
        })
      }
      // Draggable settings
      if(settings.draggable) {
        slider.hammer().bind('swipeleft', function() {
          if(-col_main_left==max_col_main_left-step){
            col_main_left=0;
            prevSlideCount=slide_counter;
            slide_counter=0;
          } else {
            col_main_left=col_main_left-step;
            prevSlideCount=slide_counter;
            slide_counter=slide_counter+1;
          };
          removeAddClass(slide_counter,prevSlideCount, col_main_left);
        });

        slider.hammer().bind('swiperight', function() {
          if(col_main_left==0){
            col_main_left=-max_col_main_left+step;
            prevSlideCount=slide_counter;
            slide_counter=count-1;
          } else {
            col_main_left=col_main_left+step;
            prevSlideCount=slide_counter;
            slide_counter=slide_counter-1;
          };
          removeAddClass(slide_counter,prevSlideCount, col_main_left);
        });
      }
    });

    
  };
}(jQuery);