$(document).ready(function(){
    $(document).ready(function () {
        // $('.moreContent').moreContent();

    var preload_data = [
        { id: 'user0', text: 'Disabled User', locked: true}
        , { id: 'user1', text: 'Jane Doe'}
        , { id: 'user2', text: 'John Doe', locked: true }
        , { id: 'user3', text: 'Robert Paulson', locked: true }
        , { id: 'user5', text: 'Spongebob Squarepants'}
        , { id: 'user6', text: 'Planet Bob' }
        , { id: 'user7', text: 'Inigo Montoya' }
      ];
       
    
        $('#w').select2({
            theme: "bootstrap"
        });


    debugger;
    var editArr=[];
    for( i=0; i < document.getElementsByClassName("code").length; i++){
        var editor = CodeMirror.fromTextArea(document.getElementsByClassName("code")[i], {
            mode: "sql",
            lineNumbers: true,
            styleActiveLine: true,
            matchBrackets: true,
            viewportMargin: Infinity,
            // mode: "htmlmixed"
            });

            editArr.push(editor)
    }
  

    $('#themeSelect').change(function(){
        debugger;
        var theme = $("#themeSelect option:selected").text();
        editArr.forEach(element => {
            element.setOption("theme", theme);
        });
       
    })
})
})
