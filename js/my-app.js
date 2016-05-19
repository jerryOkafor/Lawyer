// Initialize your app
var myApp = new Framework7();

// Export selectors engine
var $$ = Dom7;

//current lawyer user
var user;

//email sender
var email;
//Toast
var Toast;


////add device ready event
//document.addEventListener('deviceready',function(e){
//
//    email = cordova.plugins.email;
//    Toast = window.plugins.toast;
//},false)

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        //var parentElement = document.getElementById(id);
        //var listeningElement = parentElement.querySelector('.listening');
        //var receivedElement = parentElement.querySelector('.received');
        //
        //listeningElement.setAttribute('style', 'display:none;');
        //receivedElement.setAttribute('style', 'display:block;');
        //
        //console.log('Received Event: ' + id);
        email = cordova.plugins.email;
    Toast = window.plugins.toast;
    }
};

app.initialize();
//Get the json config files
$.getJSON("app-config.json", function (data) {

    })
    .done(function (data) {
        user = data;

    });

// Add view
var mainView = myApp.addView('.view-main', {
    // dynamic navbar
    dynamicNavbar: true
});

//init the abour me page
myApp.onPageInit('about', function (page) {
    $('#name').text(user.user.about.name);
    $('#current-position').text(user.user.about.currentPosition);
    $('#objective-p1').text(user.user.about.objectiveP1);
    $('#objective-p2').text(user.user.about.objectiveP2);
    $('#phone').attr('href', "tel:" + user.user.about.phone);
    $('#f-link').attr('href', user.user.about.facebookLink);
    $('#t-link').attr('href', user.user.about.twitterLink);
    $('#l-link').attr('href', user.user.about.linkedinLink);
    $('#tu-link').attr('href', user.user.about.tumbleLink);


})

//init the practice page
myApp.onPageInit('practice', function (page) {
    $('#practice-text').text(user.user.practice.practiceText);
    $('#practice-1').text(user.user.practice.practiceOne);
    $('#practice-2').text(user.user.practice.practiceTwo);
    $('#practice-3').text(user.user.practice.practiceThree);
    $('#practice-4').text(user.user.practice.practiceFour);
    $('#practice-5').text(user.user.practice.practiceFive);
    $('#practice-6').text(user.user.practice.practiceSix);
})

// appoinment page:
myApp.onPageInit('appointment', function (page) {
    var calendarDateFormat = myApp.calendar({
        input: '#date-piker',
        dateFormat: 'DD, MM dd, yyyy'
    });

    //set the appoint ment text
    $("#appointment-text").text(user.user.appointment.appointmentText);
    $$('.primary-btn').on('click',function(e){
        var formData = myApp.formToJSON('#appointment-form');
        alert(JSON.stringify(formData));
    });
    email.open({
        to: user.user.about.email,
        //cc: ['cc1@email.de', 'cc2@email.de'],
        //bcc: ['bcc1@email.de', 'bcc2@email.de'],
        //subject: isHtml ? 'Body with HTML and CSS3' : 'Body with plain text',
        subject: 'Client Appointment Book',
        body: JSON.stringify(formData),
        isHTML: isHtml
    }, showToast);

});
// case-result
myApp.onPageInit('caseresult', function (page) {
    $('#case-text').text(user.user.case.caseText);
    $('#happy-clients').text(user.user.case.happyClients);
    $('#case-handle').text(user.user.case.caseHandle);
    $('#successful-case').text(user.user.case.successfulCase);
    $('#case-dismissed').text(user.user.case.caseDismissed);


    /*-- counter --*/
    $('.statistics-counter').counterUp({
        delay: 50,
        time: 3000
    });

});
// testimonial
myApp.onPageInit('testimonial', function (page) {
    var list = user.user.testimonial.list;
    $('#testimonial-text').text(user.user.testimonial.testimonialText);
    var testimonyList = $('#testimony-list');
    for(i=0;i<list.length;i++)
    {
        testimonyList.append('<div class="single-testimonial swiper-slide swiper-slide-active" style="width: 1336px;">' +
            '<div class="single-testimonial-image">' +
            '<img src="img/testimonial1.jpg" alt="testimonial photos"></div>' +
            '<div class="single-testimonial-text">' +
            '<h2>'+list[i].name+'<span>'+list[i].company+'</span></h2>' +
            '<blockquote>'+list[i].text+'</blockquote></div></div>');
    }

    /* testimonial slider */
    var mySwiper = myApp.swiper('.testimonial-item', {
        pagination: '.testimonial-pagination',
        paginationHide: false,
        paginationClickable: true
    });

});

//Conatct me Page
myApp.onPageInit('contact-me',function(page){

    $$('#contact-me-btn').on('click',function(e){
        var formData = myApp.formToJSON('#contact-me-form');
        alert(JSON.stringify(formData));
        Toast.show(JSON.stringify(formData),'bottom','short');

        function showToast() {
            Toast.show("Main Sent",'bottom','short');
        }

        email.open({
            to: user.user.about.email,
            //cc: ['cc1@email.de', 'cc2@email.de'],
            //bcc: ['bcc1@email.de', 'bcc2@email.de'],
            //subject: isHtml ? 'Body with HTML and CSS3' : 'Body with plain text',
            subject: 'Client Contact Mail',
            body: JSON.stringify(formData),
            //isHTML: isHtml
            isHTML: false
        }, showToast)

    });

})
// map
myApp.onPageInit('map', function (page) {
    // map hide show
    $(".toggle-btn").click(function () {
        $(".map-overlay").toggle();
        $('.toggle-btn').toggleClass('on');
    });


});   
