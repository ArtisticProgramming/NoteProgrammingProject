(function ($) {
  "use strict"; // Start of use strict
   var idc=1;
  $('body').on('click', '#addprogrammingnotebody', function () {
    // alert("s")
    debugger;
    let id="code"+idc
    var  formsecS=`<div class="form-group note-body"><label for="exampleFormControlTextarea1">Body</label>`;
    var  formsecE=`</div>`;
    var textAreaBody= `<textarea id="`+id+`" rows="8" name="body" style="margin: 10px; " value="" class="code form-control"></textarea>`
    $(".note-body").last().after(formsecS+textAreaBody+formsecE); 
    
    var editor = CodeMirror.fromTextArea(document.getElementById(id), {
      lineNumbers: true,
      styleActiveLine: true,
      matchBrackets: true,
      viewportMargin: Infinity,
      mode: "htmlmixed"
      });
    // editArr.push(editor)
    idc=idc+1; 
  });

  function toggleSidebar() {
    $("body").toggleClass("sidebar-toggled");
    $(".sidebar").toggleClass("toggled");
    if ($(".sidebar").hasClass("toggled")) {
      $('.sidebar .collapse').collapse('hide');
    };
  }
  toggleSidebar();
  // Toggle the side navigation
  $("#sidebarToggle, #sidebarToggleTop").on('click', function (e) {
    toggleSidebar();
    // $("body").toggleClass("sidebar-toggled");
    // $(".sidebar").toggleClass("toggled");
    // if ($(".sidebar").hasClass("toggled")) {
    //   $('.sidebar .collapse').collapse('hide');
    // };
  });

  // Close any open menu accordions when window is resized below 768px
  $(window).resize(function () {
    if ($(window).width() < 768) {
      $('.sidebar .collapse').collapse('hide');
    };
  });

  // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
  $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function (e) {
    if ($(window).width() > 768) {
      var e0 = e.originalEvent,
        delta = e0.wheelDelta || -e0.detail;
      this.scrollTop += (delta < 0 ? 1 : -1) * 30;
      e.preventDefault();
    }
  });

  // Scroll to top button appear
  $(document).on('scroll', function () {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  // Smooth scrolling using jQuery easing
  $(document).on('click', 'a.scroll-to-top', function (e) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: ($($anchor.attr('href')).offset().top)
    }, 1000, 'easeInOutExpo');
    e.preventDefault();
  });

})(jQuery); // End of use strict
