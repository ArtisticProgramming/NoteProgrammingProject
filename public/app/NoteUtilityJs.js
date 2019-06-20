(function () {
    // Initialize namespace 'utilities' (or use existing one if present)
    window.noteUtilityJs = window.noteUtilityJs || {};
  

    var editArr = [];
    for (i = 0; i < document.getElementsByClassName("mirrorCode").length; i++) {
      var lang = $($(".mirrorCode ")[i]).attr("lang");
      console.log("lang = " + lang);
      var editor = CodeMirror.fromTextArea(document.getElementsByClassName("mirrorCode")[i], {
        mode: lang,
        lineNumbers: true,
        styleActiveLine: true,
        matchBrackets: true,
        viewportMargin: Infinity,
      });
      editArr.push(editor)
    }

    $(document).ready(function() {
        // Setup - add a text input to each footer cell
        $('#example thead tr').clone(true).appendTo( '#example thead' );
        $('#example thead tr:eq(1) th').each( function (i) {
            var title = $(this).text();
            $(this).html( '<input type="text" placeholder="Search '+title+'" />' );
     
            $( 'input', this ).on( 'keyup change', function () {
                if ( table.column(i).search() !== this.value ) {
                    table
                        .column(i)
                        .search( this.value )
                        .draw();
                }
            } );
        } );
     
        var table = $('#example').DataTable( {
            orderCellsTop: true,
            fixedHeader: true
        } );
    } );
})();