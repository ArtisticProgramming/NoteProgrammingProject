import LiquorTree from 'liquor-tree'
import { noteJsModel } from "./model/noteJsModel"

var app = new Vue({
  el: '#appList',
  components: {
    LiquorTree
  },
  data: function () {
    
    return {
      // treeData0: f0,
      treeFilter0: '',
      treeOptions0: {
        filter: {
          emptyText: 'aaaaaaaaaa!'
        }
      },
      treeData: this.getData(),
      treeOptions: {
        
      }
    }
  },
  mounted() {
    $("#filter").focus();

  },
  methods: {
    filter() {

    },
    getData() {

      return fetch("/GetNoteTree")
      .then(r =>

        r.json()
      )
      .catch(e => console.log(e))
    },
    search: function () {
      // alert("s")
      console.log(this.$refs)
      
    },
    onNodeSelected(item) {

      if (item.children.length == 0) {
        window.location.href = '/Note?id='+item.id+'&title='+item.text.replace(/ /g,'_')
      }
    }
  }
})
