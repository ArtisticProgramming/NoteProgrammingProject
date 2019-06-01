(function () {

    // Initialize namespace 'utilities' (or use existing one if present)
    window.noteUtilityJs = window.noteUtilityJs || {};

     var page = 1;
    // Add function 'myFunction' to the namespace
    $(window).scroll(function () {
        if ($(window).scrollTop() + $(window).height() == $(document).height()) {
            console.log("bottom!");
            page = page + 1;
            $.get("/LoadMore?page=" + page, function (data, status) {
                console.log(data);
            });
        }
    });

    $(".OpenCloseNote").click(function () {
        debugger;
        var selctor =$(this).parent().parent().children(".cardHeigth")
        var sele = $(this).parent().parent().parent();
        var h = $(selctor).css("height");
        if (h == "200px") {
            $(selctor).css('height', 'auto');
            $(selctor).css('overflow-y', 'hidden');
            $(sele).removeClass("col-lg-6")
            $(sele).addClass("col-lg-12")
            //    $(selctor).animate({height:autoH}, 400, function() {
            //     // Animation complete.
            //   });

        } else {
            $(selctor).css('height', '200px');
            $(selctor).css('overflow-y', 'scroll');
            $(sele).removeClass("col-lg-12")
            $(sele).addClass("col-lg-6")
            // $(selctor).animate({height:"100px"}, 400, function() {
            //     // Animation complete.
            //   });
        }
        return false;
    });


})();