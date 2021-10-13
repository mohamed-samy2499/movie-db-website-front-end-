//current page of 
let hereArray = []

async function getData(url) {
    let response = await fetch(url)
    let myResult = await response.json();
    let final_array = await myResult.results;
    display_posters(final_array);
}

function display_posters(final_array) {
    hereArray = final_array;
    let cartoona = ""
    for (let i = 0; i < final_array.length; i++) {
        cartoona += `<div class="col-md-4">
        <div class="movie-poster position-relative">
            <img  src="https://image.tmdb.org/t/p/w500${final_array[i].poster_path}" alt="" class="w-100 rounded">
            <div class="layer position-absolute d-flex align-items-center ">
                <div class="text-center">
                    <h2>${final_array[i].original_title}</h2>
                    <p>${final_array[i].overview}</p>
                    <br>
                    <p>rate:${final_array[i].vote_average}</p>
                    <br>
                    <p>${final_array[i].release_date}</p>
                </div>

            </div>
        </div>

    </div>`
    }
    document.getElementById("myRow").innerHTML = cartoona;
}
//api key
let key = "eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR32Px4_3ZTHYF-tjdSOdkN82Esd5XSCl7c0ueF0LR8urOnlJBZ4TJJdf_k";

//default posters to display
getData("https://api.themoviedb.org/3/movie/now_playing?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR32Px4_3ZTHYF-tjdSOdkN82Esd5XSCl7c0ueF0LR8urOnlJBZ4TJJdf_k&language=en-US&page=1");

//options to choose what is displayed
$("#now-playing").click(function () {
    getData("https://api.themoviedb.org/3/movie/now_playing?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR32Px4_3ZTHYF-tjdSOdkN82Esd5XSCl7c0ueF0LR8urOnlJBZ4TJJdf_k&language=en-US&page=1");
});

$("#popular").click(function () {
    getData(`https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`);
});
$("#top-rated").click(function () {
    getData(`https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`)
});
$("#trending").click(function () {
    getData(`
    https://api.themoviedb.org/3/trending/all/day?api_key=${key}`)
});
$("#up-coming").click(function () {
    getData(`
    https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`)
});
$("#contact").click(function()
{
    window.scrollTo(0,document.body.scrollHeight);
})
//search by word

function searching(insearch) {
    
    if (insearch == "") {
        getData("https://api.themoviedb.org/3/movie/now_playing?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR32Px4_3ZTHYF-tjdSOdkN82Esd5XSCl7c0ueF0LR8urOnlJBZ4TJJdf_k&language=en-US&page=1");
    }
    else
    {
        getData(`
    https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&page=1&include_adult=false&query=${insearch}`);
    }
}

//search in the current page

function hereSearching(inpSearch) {
    if (inpSearch == "") {
        //getData("https://api.themoviedb.org/3/movie/now_playing?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR32Px4_3ZTHYF-tjdSOdkN82Esd5XSCl7c0ueF0LR8urOnlJBZ4TJJdf_k&language=en-US&page=1");
        document.getElementById("searchRow").innerHTML = "";
        display_posters(hereArray);
    }
    else {
        let resultArray = []
        for (let i = 0; i < hereArray.length; i++) {
            if (hereArray[i].original_title.toLowerCase().includes(inpSearch.toLowerCase())) {
                resultArray.push(hereArray[i]);
            }  
        }
        let cartoona = ""
        for (let i = 0; i < resultArray.length; i++) {
            cartoona += `<div class="col-md-4">
        <div class="movie-poster position-relative">
            <img  src="https://image.tmdb.org/t/p/w500${resultArray[i].poster_path}" alt="" class="w-100 rounded">
            <div class="layer position-absolute d-flex align-items-center ">
                <div class="text-center">
                    <h2>${resultArray[i].original_title}</h2>
                    <p>${resultArray[i].overview}</p>
                    <br>
                    <p>rate:${resultArray[i].vote_average}</p>
                    <br>
                    <p>${resultArray[i].release_date}</p>
                </div>

            </div>
        </div>

    </div>`
        }
        document.getElementById("searchRow").innerHTML = cartoona + "<hr class = 'line_white'>";
    }

}

//side menu animation
$("#toggle-btn").click(function () {
    let option_w = $(".options-bar").innerWidth();
    console.log(option_w);
    if ($(".options-bar").css("left") == "0px") {
        $('#now-playing').addClass('awl-li').removeClass('awl1-li');
        $('#popular').addClass('tany-li').removeClass('tany1-li');
        $('#top-rated').addClass('talt-li').removeClass('talt1-li');
        $('#trending').addClass('rab3-li').removeClass('rab31-li');
        $('#up-coming').addClass('oams-li').removeClass('oams1-li');
        $('#contact').addClass('sads-li').removeClass('sads1-li');
        $(".options-bar").animate({ left: `-${option_w}px` }, 1000);
        $(".logo-bar").animate({ left: `0px` }, 1000,function()
        {
            
            $("#toggle-btn").empty().append("<i class='fas fa-bars'></i>");
            
        });
        
    }
    else {
        $(".logo-bar").animate({ left: `240px` }, 1000,function()
        {
            $('#now-playing').addClass('awl1-li').removeClass('awl-li');
            $('#popular').addClass('tany1-li').removeClass('tany-li');
            $('#top-rated').addClass('talt1-li').removeClass('talt-li');
            $('#trending').addClass('rab31-li').removeClass('rab3-li');
            $('#up-coming').addClass('oams1-li').removeClass('oams-li');
            $('#contact').addClass('sads1-li').removeClass('sads-li');
        });
       
        $(".options-bar").animate({ left: `0px` }, 1000 ,function()
        {
            
            $("#toggle-btn").empty().append("<i class='fas fa-times'></i>"); 
        });
        
    }


})

//valdiation 
//name
function name_validate()
{
    let regex = /^[A-Z][a-z]{1,}$/;
    let myName = document.getElementById("name")
    if (regex.test(myName.value) == false) {
        document.getElementById("name_er").innerHTML = "your name should start with capital letter and then one or more small letters only"
        $("#name_er").css("color","red");
    }
    else
    {
        document.getElementById("name_er").innerHTML = "Accepted";
        $("#name_er").css("color","green");
    }
}
$("#name").keyup(function()
{
    name_validate();
})

//age
function age_validate()
{
    let regex = /^(1[89]|[2:9][0-9])$/;
    let myAge = document.getElementById("age")
    if (regex.test(myAge.value) == false && myAge.value<100) {
        document.getElementById("age_er").innerHTML = "your age should be 18+"
        $("#age_er").css("color","red");
    }
    else
    {
        document.getElementById("age_er").innerHTML = "Accepted";
        $("#age_er").css("color","green");
    }
}
$("#age").keyup(function()
{
    age_validate();
})
//email
function email_validate()
{
    let regex = /^[A-Za-z0-9_]{5,30}@[A-Za-z]{1,15}.com$/;
    let myemail = document.getElementById("email")
    if (regex.test(myemail.value) == false) {
        document.getElementById("email_er").innerHTML = "please enter a valid email .your email should only contain letters numbers and _  (min. 5 letters,numbers or _ and max. 30) ex.(mohamed@example.com)"
        $("#email_er").css("color","red");
    }
    else
    {
        document.getElementById("email_er").innerHTML = "Accepted";
        $("#email_er").css("color","green");
    }
}
$("#email").keyup(function()
{
    email_validate();
})
//phone
function phone_validate()
{
    let regex = /^(002)?01[0125][0-9]{8}$/;
    let myphone = document.getElementById("phone")
    if (regex.test(myphone.value) == false) {
        document.getElementById("phone_er").innerHTML = "please enter a valid phone number. your number can start with 002 or not then 01 then 9 digits"
        $("#phone_er").css("color","red");
    }
    else
    {
        document.getElementById("phone_er").innerHTML = "Accepted";
        $("#phone_er").css("color","green");
    }
}
$("#phone").keyup(function()
{
    phone_validate();
})


//pass
function pass_validate()
{
    let regex = /[A-Za-z]/;
    let mypass = document.getElementById("pass")
    if (regex.test(mypass.value) == false || mypass.value.length<8 ||(mypass.value.includes('_')==false && mypass.value.includes('*')==false &&mypass.value.includes('&')==false) || (mypass.value.includes('0')==false && mypass.value.includes('1')==false && mypass.value.includes('2')==false && mypass.value.includes('3')==false && mypass.value.includes('4')==false && mypass.value.includes('5')==false && mypass.value.includes('6')==false && mypass.value.includes('7')==false && mypass.value.includes('8')==false && mypass.value.includes('9')==false)) {
        document.getElementById("pass_er").innerHTML = "entre valid password *Minimum eight characters, at least one letter and one number and one special character(_,*,&)"
        $("#pass_er").css("color","red");
    }
    else
    {
        document.getElementById("pass_er").innerHTML = "Accepted";
        $("#pass_er").css("color","green");
    }
}
$("#pass").keyup(function()
{
    pass_validate();
})

//repass
function repass_validate()
{
    let repass = document.getElementById("repass").value;
    let mypass = document.getElementById("pass").value;
    if(repass != mypass)
    {
        document.getElementById("repass_er").innerHTML = "please rewrite the password correclty";
        $("#repass_er").css("color","red");
    }
    else
    {
        document.getElementById("repass_er").innerHTML = "Accepted";
        $("#repass_er").css("color","green");
    }
}
$("#repass").keyup(function()
{
    repass_validate();
})

$(".btn").click(function()
{
    
})