$(document).ready(function() {
    $("#woee").text("Press Button to get request food api");
});

function testy(food){
    //alert(food);
    console.clear();
    $('#foodName').html(food);

    var urlFood=encodeURI(food);

    //Using Jquery's Get request
    $.get( "https://api.edamam.com/api/food-database/parser?ingr="+urlFood+"&app_id=9ccfd3ea&app_key=422e0ba66ae6c563f47a9fe391a437f0", function( data, status) {
        alert(status);
        console.log("----------Response JSON----------");
        console.log(data);
        console.log("---------------------------------");
        var obj=data;
        //var objs;
        //console.log(data.hints[0].measures[1].label);
        var foodId;

        $.each(obj, function (key, value) {
            if(key=="hints"){
                //objs=value[0];
                console.log("----------Food JSON----------");
                console.log(value[0]);
                console.log("-----------------------------");
                foodId=value[0].food.foodId;
                console.log("Food Id: "+foodId);
            }
        });

        var nutrientReq={
            "ingredients": [
                {
                    "quantity": 100,
                    "measureURI": "http://www.edamam.com/ontologies/edamam.owl#Measure_gram",
                    "foodId": foodId,
                    "qualifiers": [ "http://www.edamam.com/ontologies/edamam.owl#Qualifier_large" ]
                }
            ]
        };

        $.ajax({
            type: "POST",
            data: JSON.stringify(nutrientReq),
            url: "https://api.edamam.com/api/food-database/nutrients?app_id=9ccfd3ea&app_key=422e0ba66ae6c563f47a9fe391a437f0",
            contentType: "application/json",
            success: function(nutrData){
                console.log("----------Nutrient JSON----------");
                console.log(nutrData);
                console.log("---------------------------------");
                //$("#result").html(glyc);

                var fullNutrData=nutrData.totalNutrients;
                $.each(fullNutrData,function (key,value) {
                    //console.log(value);

                    if(key=="ENERC_KCAL"){
                        $('#cal').html(""+value.quantity+value.unit);
                    }else if(key=="FAT"){
                        $('#fat').html(""+value.quantity+value.unit);
                    }else if(key=="PROCNT"){
                        $('#protein').html(""+value.quantity+value.unit);
                    }else if(key=="CHOCDF"){
                        $('#carbs').html(""+value.quantity+value.unit);
                    }
                });
            }
        });

        //var testyJSON=JSON.parse(data);
        //console.log(testyJSON);
        alert( "Load was performed.");
    });

}

