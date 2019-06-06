var editorArray = [];

Vue.component('code-mirror', {
  template: '<textarea>{{body}}</textarea>',
  props: ['body',"lang"],
  methods: {
    methodThatForcesUpdate() {
      // ...
      // Notice we have to use a $ here
      // ...
    }
  },
  mounted: function () {
    console.log(this.lang)
    var element = $(this.$el)
    var code = CodeMirror.fromTextArea(element[0], {
      mode: this.lang,
      lineNumbers: true,
      styleActiveLine: true,
      matchBrackets: true,
      viewportMargin: Infinity,
    });

  },
  beforeDestroy: function () {
    // for (i = 0; i < $('.CodeMirror').length; i++) {
    // var s = $('.CodeMirror')[i].CodeMirror.toTextArea();
   // var id = $(this.$el).first().attr("id")
    // console.log($($(this.$el)[0]).parent())
    // console.log($($(this.$el)[0]).parent().find(".CodeMirror"))
    // console.log($($(this.$el)[0]).parent().find(".CodeMirror")[0])
   // var cm = $("#" + id).parent().find(".CodeMirror")[0]
    // var cm = $('.CodeMirror')[i].CodeMirror;
    console.log(cm)
    for (i = 0; i < $('.CodeMirror').length; i++) {
      var cm = $('.CodeMirror')[i];
      if (cm !== undefined) {
        cm.CodeMirror.setOption("mode", "text/x-csrc");
        cm.CodeMirror.getWrapperElement().parentNode.removeChild(cm.CodeMirror.getWrapperElement());
        cm.CodeMirror = null;
      }
    }
    // $(s).remove()
    // }
    // for(i=0;i<$('.CodeMirror').length;i++){
    //   $('.CodeMirror')[0].CodeMirror.toTextArea();
    // }
    // $(this.$el).datepicker('hide').datepicker('destroy');
  },
  destroyed: function () {
    debugger;

    // var s = $('.CodeMirror')[i].CodeMirror.toTextArea();
    // for (i = 0; i < $('.CodeMirror').length; i++) {
    // console.log($(this.$el).next());
    // var cm = $(this.$el).next().CodeMirror //$('.CodeMirror')[i].CodeMirror;
    // console.log(cm)
    // cm.setOption("mode", "text/x-csrc");
    // cm.getWrapperElement().parentNode.removeChild(cm.getWrapperElement());
    // cm = null;
    // $(s).remove()
    // }
    //     var element=$(this.$el)
    //  console.log($(this.$el).CodeMirror)
    //  console.log($(this.$el)[0].CodeMirror)
    //  console.log($($(this.$el)[0]).CodeMirror);
    //  console.log($($(this.$el)[0]));
    // for (i = 0; i < editorArray.length; i++) {
    //   var cm = editorArray[i].CodeMirror.toTextArea();
    //   // editorArray[i].CodeMirror.toTextArea();
    //   cm.setOption("mode", "text/x-csrc");
    //   cm.getWrapperElement().parentNode.removeChild(cm.getWrapperElement());
    //   cm = null;
    // }
    //   console.log('my-component created');

    // $($($(this.$el)[0]).CodeMirror).remove()
    // console.log('my-component destroyed');
  }
});
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
    componentKey:0
    // todos: [
    //   { text: 'Learn JavaScript' },
    //   { text: 'Learn Vue' },
    //   { text: 'Build something awesome' }
    // ]

  },

  updated: function () {


    // alert("dd")
    // var editArr = [];
    // for (i = 0; i < document.getElementsByClassName("code").length; i++) {
    //   var lang = $($(".code")[i]).attr("lang");
    //   console.log("lang = " + lang);
    //   var editor = CodeMirror.fromTextArea(document.getElementsByClassName("code")[i], {
    //     mode: lang,
    //     lineNumbers: true,
    //     styleActiveLine: true,
    //     matchBrackets: true,
    //     viewportMargin: Infinity,
    //   });

    //   editArr.push(editor)
    // }

    // for (i = 0; i < document.getElementsByClassName("code").length; i++) {
    //   $("textarea").removeClass("code");
    // }


  },
  methods: {
    search: function () {
      page = 1;
      this.loadNote(page, true);

    },
    loadNote(page, reset) {
      // alert("mounted")
      var perPage = 8;

      title = "";
      console.log(this.searchTextBox)
      if (this.searchTextBox !== undefined && this.searchTextBox != "")
        title = "&title=" + this.searchTextBox;

      axios.get('/GetNotes?page=' + page + "&perPage=" + perPage + title)
        .then(response => {
          // console.log(response.data),


          if (reset) {

            this.boxmodel = [];
            this.boxmodel = response.data.model
          

          }
          else {
            response.data.model.forEach(element => {
              this.boxmodel.push(element);
              
            });
          }

          // console.log(boxmodel)
          action = 'inactive';
          this.$nextTick(function () {
            // DOM is now updated
            // `this` is bound to the current instance
            this.componentKey += 1;  
           
          })

        }
        )

    },

    deleteNote(id, index) {
      if (confirm("Wanna Delete?")) {
        axios
          .get('/DeleteNote?id=' + id)
          .then(response => {
            debugger;
            // $("[note-id="+id+"]").first().remove();
            // this.boxmodel.splice(index, 1);
            this.$delete(this.boxmodel, index)

            this.$nextTick(function () {
              // this.$forceUpdate();
              //alert("s")
              // this.$forceUpdate();
              this.componentKey += 1;  
              // DOM is now updated
              // `this` is bound to the current instance
            })
            //this.$forceUpdate();
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
