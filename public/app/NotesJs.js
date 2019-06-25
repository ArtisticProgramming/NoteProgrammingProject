import { noteJsModel } from "./model/noteJsModel"
import { codeMirrorComponent } from "./components/codeMirrorComponent"
console.log(noteJsModel.test.name);

var action = 'inactive';
let page = 1;
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    searchModel: {
      searchTextBox: "",
      bookMark: false
    },
    boxmodel: [],
    deleteModalNote: {
      id: 0,
      index: 0,
      text: ""
    },
    componentKey: 0,

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
      let bookMark = "";

      console.log(this.searchModel.searchTextBox)
      
      if (this.searchModel.searchTextBox !== undefined && this.searchModel.searchTextBox != "")
        title = "&title=" + this.searchModel.searchTextBox;

      if (this.searchModel.bookMark !== undefined && this.searchModel.bookMark != false)
        bookMark = "&bookMark=" + this.searchModel.bookMark;


      noteJsModel.getNotes(page, perPage, title, bookMark)
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
    OpenCloseNote(id) {
      var heigth = "100px";
      debugger;
      $("#oc-" + id)
      console.log($(this).parent().parent().children(".cardHeigth"))
      var selctor = $("#oc-" + id);
      var sele = $(selctor).parent().parent()
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
    openDeleteModal(id, index) {
      console.log(id)
      this.deleteModalNote.id = id;
      this.deleteModalNote.index = index;
      index
      this.$nextTick(function () {
        $('#deleteModal').modal('toggle');
      })
    },
    deleteNote(id, index) {
      // if (confirm("Wanna Delete?")) {
      noteJsModel.deleteNote(id)
        .then(response => {
          debugger;
          this.$delete(this.boxmodel, index)
          this.$nextTick(function () {
            $('#deleteModal').modal('hide');
            //Update Components and everyThing
            this.componentKey += 1;
          })
        }
        )
      // }
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