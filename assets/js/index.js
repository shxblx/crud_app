
$('#add_user').submit(function(event) {

    alert('Data inserted successfully')
})

$('#update_user').submit(function(event) {
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n,i){
        data [n['name']] = n['value'];
    })

    var request = {
        "url": `http://localhost:3000/api/users/${data.id}`,
        "method": "PUT",
        "data": data
    }

    $.ajax(request).done(function(response){
       
        alert('Data uploaded successfully');
    });
})

if(window.location.pathname == '/admindash'){
    $ondelete = $('.table tbody td a.delete');
    $ondelete.click(function(){
        var id = $(this).attr("data-id");

        var request = {
            "url": `http://localhost:3000/api/users/${id}`,
            "method": "DELETE"
        }

        if(confirm('Do you really want to delete this record?')){
            $.ajax(request).done(function(response){
                alert('Data Deleted successfully');
                
                location.reload();
            });
        }
    })
}

// Search jquery
$(document).ready(function () {
    // When the user types in the search box
    $("#name-search").on("keyup", function () {
        var searchText = $(this).val().toLowerCase();

        // Loop through each table row
        $("table tbody tr").each(function () {
            var userName = $(this).find("td:eq(1)").text().toLowerCase();
            var email = $(this).find("td:eq(2)").text().toLowerCase();  // Get the user's name in lowercase
            var number = $(this).find("td:eq(0)").text().toLowerCase();
            // If the user's name contains the search text, show the row; otherwise, hide it
            if (userName.includes(searchText)) {
                $(this).show();
            } else if (email.includes(searchText)){
                $(this).show();
            } else if(number.includes(searchText)){
                $(this).show();
            }else{
                $(this).hide();
            }
        });
    });
});