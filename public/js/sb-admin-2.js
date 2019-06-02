(function ($) {
  "use strict"; // Start of use strict
  var idc = 1;
  $('body').on('click', '#addprogrammingnotebody', function () {
    // alert("s")
    debugger;
    let id = "code" + idc
    let idSelect = "code" + idc

    var textAreaBody = `<div class="form-group note-body">
                          <textarea id="`+ id + `" rows="8" name='code[` + idc + `][body]' style="margin: 10px; "
                          value="" class="code form-control"></textarea>
                      </div`

    var row = `<div class="row">
            <div class="form-group col-md-9"><input id="exampleInputEmail1" 
                type="text" aria-describedby="emailHelp"
                    placeholder="Title" name="code[`+ idc + `][desc]" class="form-control"></div>
            <div box-id="`+ id + `"  class="form-group col-md-3 selectlang">
            <select class="form-control form-control" name="code[`+ idc + `][codelang]">
                    <option value="htmlmixed">Html</option>
                    <option value="text/css"> CSS</option>
                    <option value="text/javascript"> JavaScript</option>
                    <option value="text/x-sql"> SQl</option>
                    <option value="text/x-csharp"> C#</option>
                    <option value="text/x-python"> Python</option>
                    <option value="text/x-java"> Java</option>
                    <option value="text/x-php"> PHP</option>
                    <option value="text/x-c++src"> C++</option>
                    <option value="text/x-csrc"> C</option>
                    <option value="text/x-go"> Go</option>
                    <option value="text/x-rsrc"> R</option>
                    <option value="application/x-powershell"> PowerShell</option>
                </select></div>
            </div>`

    $(".note-body").last().after(row + textAreaBody);

    var editor = CodeMirror.fromTextArea(document.getElementById(id), {
      lineNumbers: true,
      styleActiveLine: true,
      matchBrackets: true,
      viewportMargin: Infinity,
      // mode: "htmlmixed"
    });
    // editArr.push(editor)
    idc = idc + 1;
  });

  $('body').on('change', '.selectlang', function () {
    var s = $(this).attr("box-id")
    var v = $(this).val()
    // alert(s+v);
  });

  $("#searchBoxBtn").click(function () {
    var result = $("#searchBox").val();
    location.href = "/Notes?title="+result;
  });



  function toggleSidebar() {
    $("body").toggleClass("sidebar-toggled");
    $(".sidebar").toggleClass("toggled");
    if ($(".sidebar").hasClass("toggled")) {
      $('.sidebar .collapse').collapse('hide');
    };
  }
  //toggleSidebar();
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
