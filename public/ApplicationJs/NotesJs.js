$(document).ready(function(){
        $("#page").pagination({
            items: $("#banner").attr("count"),
            itemsOnPage: $("#banner").attr("perPage"),
            currentPage: $("#banner").attr("currentPage"),
            cssStyle: 'light-theme',
            hrefTextPrefix:"?page="
        });
})