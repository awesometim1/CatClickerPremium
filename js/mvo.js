$(function(){

    var model = {
        currentCat: null,
        init: function() {
            if (!localStorage.cats) {
                var models = [];
                //Initialize all of the cats
                for (var i = 1; i <= 5; i ++){
                    models.push({
                        catName: "kitten" + i,
                        catLink: "static/img/kitten" + i + ".jpg",
                        catScore: 0

                    });
                }
                localStorage.cats = JSON.stringify(models);
            }
        },
        addScore: function(id) {
            var cats = JSON.parse(localStorage.cats);
            for (var i = 0; i < cats.length; i ++){
                var catName = "kitten" + id;
                if (cats[i]['catName']==catName){
                    cats[i]['catScore']++;
                    break;
                }
            }
            localStorage.cats = JSON.stringify(cats);
        },
        getModel: function() {
            return JSON.parse(localStorage.cats);
        }
    };


    var octopus = {
        init: function() {

            model.init();
            model.currentCat = model.getModel()[0];
            nameView.init();
            catView.init();
        },
        getCats: function() {
            return model.getModel();
        },
        incScore: function(id){
            model.addScore(id);
        },
        matchCat: function(catName){
            var cats = model.getModel();
            for (var i = 0; i < cats.length; i ++){
                if (cats[i]['catName']==catName){
                    return cats[i];
                }
            };//end for
        },
        getCurrentCat: function(){
            return model.currentCat;
        },
        setCurrentCat: function(cat){
            model.currentCat = cat;
        }
    };


    var catView = {
        init: function() {
            this.catDisplay = $('.cat-display');
            this.render();
        },
        render: function(){
            var display = this.catDisplay;
            var buttons = $('button');
            display.html('<img class = "display" src ="">');

            // Add all eventlisteners
            $('.display').click(function(){
                var idNum = parseInt($('.display').attr('src').slice(17));
                octopus.incScore(idNum);
                var score = $('.score').html();
                $('.score').html("" + (parseInt(score) + 1));
                
            });
            $('#admin').click(function(){
                $('.form').css('display', "inline-block");
                var currentCat = octopus.getCurrentCat();
                $('#name').attr('placeholder', currentCat.catName);
                $('#url').attr('placeholder', currentCat.catLink);
                $('#clicks').attr('placeholder', currentCat.catScore);
            })
            $('#cancel').click(function(){
                $('.form').css('display', "none");
            })
            $('#submit').click(function(){
                //Get all inputs
                var name = $('#name').val();
                var url = $('#url').val();
                var clicks = $('#clicks').val();
                var currentCat = octopus.getCurrentCat();
                currentCat.catName = (name.length < 1) ? currentCat.catName:name;
                currentCat.catLink = (url.length < 1) ? currentCat.catLink:url;
                currentCat.catScore = (clicks.length < 1) ? currentCat.catScore:clicks;
                nameView.render();
                catView.render();
                $('.form').css("display", "none");

                $('.cat-display').prepend('<h1>' + currentCat.catName + '</h1>')
                $('.display').attr('src', currentCat.catLink);
                $('.cat-display').append('<h1 class = "score">' + currentCat.catScore + '</h1>');

            })

        }//end render
    };//end catView
    var nameView = {
        init: function() {
            this.catLinks = $('.cat-links');
            this.render();
        },
        render: function(){
            var linkStr = '';
            cats = octopus.getCats();
            for (var i = 0; i < cats.length ; i ++){
                linkStr += '<button type = "button" id="'+ i +'">' + cats[i].catName + '</button>';
            }
            this.catLinks.html( linkStr );
            var buttons = $('button');
            // Add event Listeners for cat buttons
            for (var i = 0; i < buttons.length; i ++){
                var cat = cats[i];
                //Select all of the buttons by id and add eventlistener onClick()
                $('#' + i).click((function(catCopy){
                    return function(){
                        if ($('h1').length > 1){
                            $('h1')[0].remove();
                            $('h1')[0].remove();
                        }
                        $('.cat-display').prepend('<h1>' + catCopy.catName + '</h1>')
                        $('.display').attr('src', catCopy.catLink);
                        $('.cat-display').append('<h1 class = "score">' + catCopy.catScore + '</h1>');
                        octopus.setCurrentCat(catCopy);

                    }
                    
                })(cat));

            }; //end for
        }//end render
    };//end nameView

    octopus.init();


});