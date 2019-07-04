
export const codeMirrorComponent =Vue.component('code-mirror', {
  template: '<textarea>{{body}}</textarea>',
  props: ['body', "lang","index"],
  methods: {
    methodThatForcesUpdate() {
      // ...
      // Notice we have to use a $ here
      // ...
    }
  },
  mounted: function () {
    var vm= this;
    // console.log(this.lang)
    var element = $(this.$el)
    var code = CodeMirror.fromTextArea(element[0], {
      mode: this.lang,
      lineNumbers: true,
      styleActiveLine: true,
      matchBrackets: true,
      viewportMargin: Infinity,
    }).on('change', editor => {
      // console.log(editor.getValue());
      vm.$emit("input-text-area", {"index":vm.index,"value":editor.getValue()});
    });

  },
  beforeDestroy: function () {
    // console.log(cm)
    let i=0;
    for (i = 0; i < $('.CodeMirror').length; i++) {
      var cm = $('.CodeMirror')[i];
      if (cm !== undefined) {
        cm.CodeMirror.setOption("mode", "text/x-csrc");
        cm.CodeMirror.getWrapperElement().parentNode.removeChild(cm.CodeMirror.getWrapperElement());
        cm.CodeMirror = null;
      }
    }
  },
  destroyed: function () {

  }
});
