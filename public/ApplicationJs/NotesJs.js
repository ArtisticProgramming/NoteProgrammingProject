
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
page = 1;
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    searchTextBox: "",
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
    search: function () {
      page = 1;
      this.loadNote(page, true);

    },
    loadNote(page, reset) {
      // alert("mounted")
      var perPage = 4;

      title = "";
      console.log(this.searchTextBox)
      if (this.searchTextBox !== undefined && this.searchTextBox != "")
        title = "&title=" + this.searchTextBox ;

      axios
        .get('/GetNotes?page=' + page + "&perPage=" + perPage + title)
        .then(response => {
          // console.log(response.data),
          if (reset)
            this.boxmodel = response.data.model
          else {
            response.data.model.forEach(element => {
              this.boxmodel.push(element);
            });
          }
          // console.log(boxmodel)
          action = 'inactive';

        }
        )

    },

    deleteNote(id, index) {
      if (confirm("Wanna Delete?")) {
        axios
          .get('/DeleteNote?id=' + id)
          .then(response => {
            this.boxmodel.splice(index, 1);
          }
          )
      }
    }
  },
  mounted() {
    // alert("mounted")
    this.loadNote(page);
  }
});

// $(window).scroll(function () {


//   if ($(window).scrollTop() + $(window).height() > $(document).height() - 5) {
//     // $(window).unbind('scroll');
//     // alert("near bottom!");
//     console.log(app)
//     app.loadNote();
//   }
// }); 

$(window).scroll(function () {

  if (($(window).scrollTop() + $(window).height() > $(document).height() - 5) && action == 'inactive') {
    action = 'active';
    //  start = start + limit;
    setTimeout(function () {
      page = page + 1;
      app.loadNote(page);
    }, 500);
  }
});
