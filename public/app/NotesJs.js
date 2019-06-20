import { noteJsModel } from "./model/noteJsModel"
import { codeMirrorComponent } from "./components/codeMirrorComponent"
console.log(noteJsModel.test.name);

var action = 'inactive';
let page = 1;
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    searchTextBox: "",
    boxmodel: [],
    componentKey: 0
  },
  components: {
    codeMirrorComponent
  },
  updated: function () {

  },
  methods: {
    search: function () {
      page = 1;
      this.loadNote(page, true);
    },
    loadNote(page, reset) {
      var perPage = 8;
      let title = "";
      console.log(this.searchTextBox)
      if (this.searchTextBox !== undefined && this.searchTextBox != "")
        title = "&title=" + this.searchTextBox;
      // axios.get('/GetNotes?page=' + page + "&perPage=" + perPage + title)
      noteJsModel.getNotes(page, perPage, title)
        .then(response => {
          if (reset) {
            this.boxmodel = [];
            this.boxmodel = response.data.model
          }
          else {
            response.data.model.forEach(element => {
              this.boxmodel.push(element);
            });
          }
          action = 'inactive';
          this.$nextTick(function () {
            // DOM is now updated
            // `this` is bound to the current instance
            this.componentKey += 1;

          })
        }
        )

    },
    OpenCloseNote(id){
      alert("dd")
      var heigth="100px";
      debugger;
      $( "input[value='Hot Fuzz']" )
      console.log($(this).parent().parent().children(".cardHeigth"))
      var selctor =$(this).parent().parent().children(".cardHeigth")
      var sele = $(this).parent().parent().parent();
      var h = $(selctor).css("height");
      if (h == heigth) {
          $(selctor).css('height', 'auto');
          $(selctor).css('overflow-y', 'hidden');
          $(sele).removeClass("col-lg-6")
          $(sele).addClass("col-lg-12")
      } else {
          $(selctor).css('height', heigth);
          $(selctor).css('overflow-y', 'scroll');
          $(sele).removeClass("col-lg-12")
          $(sele).addClass("col-lg-6") 
          // $(selctor).animate({height:"100px"}, 400, function() {
          //     // Animation complete.
          //   });
      }
      return false;
    },
    deleteNote(id, index) {
      if (confirm("Wanna Delete?")) {
        noteJsModel.deleteNote(id)
          .then(response => {
            debugger;
            this.$delete(this.boxmodel, index)
            this.$nextTick(function () {
              //Update Components and everyThing
              this.componentKey += 1;
            })
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


$('body').on('click', '.OpenCloseNote', function () {

});