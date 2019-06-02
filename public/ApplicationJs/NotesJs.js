
// $(document).ready(function(){
//         $("#page").pagination({
//             items: $("#banner").attr("count"),
//             itemsOnPage: $("#banner").attr("perPage"),
//             currentPage: $("#banner").attr("currentPage"),
//             cssStyle: 'light-theme',
//             hrefTextPrefix:"?page="
//         });
// })
var action = 'inactive';
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    boxmodel: [],
    // todos: [
    //   { text: 'Learn JavaScript' },
    //   { text: 'Learn Vue' },
    //   { text: 'Build something awesome' }
    // ]

  },
  updated: function () {
    // alert("dd")
    var editArr = [];
    for (i = 0; i < document.getElementsByClassName("code").length; i++) {
      var lang = $($(".code")[i]).attr("lang");
      console.log("lang = " + lang);
      var editor = CodeMirror.fromTextArea(document.getElementsByClassName("code")[i], {
        mode: lang,
        lineNumbers: true,
        styleActiveLine: true,
        matchBrackets: true,
        viewportMargin: Infinity,
      });

      editArr.push(editor)
    }

    for (i = 0; i < document.getElementsByClassName("code").length; i++) {
      $("textarea").removeClass("code");
    }
    

  },
  methods: {
    Hello() {
      // alert("mounted")
      axios
        .get('/GetNotes')
        .then(response => {
          // console.log(response.data),
          response.data.model.forEach(element => {
            this.boxmodel.push(element);
          });
          // console.log(boxmodel)
           action = 'inactive';

        }
        )

    }
  },
  mounted() {
    // alert("mounted")
    axios
      .get('/GetNotes')
      .then(response => {
        // console.log(response.data),
        this.boxmodel = response.data.model;
        // console.log(boxmodel)
        debugger;

      }
      )
  }
});

// $(window).scroll(function () {

  
//   if ($(window).scrollTop() + $(window).height() > $(document).height() - 5) {
//     // $(window).unbind('scroll');
//     // alert("near bottom!");
//     console.log(app)
//     app.Hello();
//   }
// }); 

$(window).scroll(function(){
  
  if (($(window).scrollTop() + $(window).height() > $(document).height() - 5) && action == 'inactive')
  {
   action = 'active';
  //  start = start + limit;
   setTimeout(function(){
    app.Hello();
   }, 500);
  }
 });
