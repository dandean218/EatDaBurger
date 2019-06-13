$(document).ready(function(){
    $(".devour").on("click", function(){
        const id = $(this).data("burgerid");
    
        const updatedBurger = {
            devoured: true
        };

        $.ajax("/burgers/" + id, {
            type: "PUT",
            data: updatedBurger
        }).then(function(){
            console.log("updated id: ", id);
            location.reload();
            });
    });
});