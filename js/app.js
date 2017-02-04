
var score = 0;

$(document).ready(function(){

	$('.js-select-ball').on('click', function(e){
		$('.game-bg').addClass('game-bg-hand').removeClass('game-bg');
       
    });

	$('#js-shoot-ball').on('click', function(){
		$('#result').html(score);
		animate();
	})


});	

function animate(){
	var tl = new TimelineMax();
    var hand = $('#js-hand'),
	activeBall = $('#js-active-ball'),
    bg = $('.game-bg-hand'),
	xPos = 0,
	yPos = 0,
	xMax = 70,
	xMin = 30;

    bg.addClass('animate');
    $('.ball-shoot').addClass('animate');

	var random_boolean = Math.random() >= 0.5;
    if(!random_boolean){
    	var posOrNeg = Math.random() < 0.5 ? -1 : 1;
		var xPos = posOrNeg * (Math.floor(Math.random() * (xMax - xMin + 1)) + xMin);
    }else{
    	score = score + 1;
    }
	//pump
	tl.to( hand, .5, {css:{bottom:-350}});
	//shoot ball
	tl.to(activeBall, 4, {bezier: {
    	type:'thru',
     	values: [
    		{x:0, y:-250, height:250, width:250},
    		{x:xPos, y:-1100, height:100, width:100},
    		{x:xPos, y:-534, height:35, width:35}
    	]}, ease: CustomEase.create("custom", "M0,0 C0.152,0.532 0.48,0.836 0.624,1 0.726,0.888 0.868,1.014 0.89,0.99 0.936,0.948 1,1 1,1")});

	//add transparent net
    tl.to(bg, 1, {className: '+=net'}, 2);
 	//roll
	 xPos = xPos/2 + xPos;
	 tl.to(activeBall, 3, {css:{x:xPos}, ease: Power3.easeOut}, 2.8);
	 //remove net
	 tl.to(bg, 1, {className: '-=net'}, 4);
	 //rotate
	 tl.to(activeBall, 3, {onComplete: this.showResult, onCompleteParams: [score], ease: Circ.easeOut}, 1);
}

function showResult(score){
	$('#result').html(score);
	$('.game-bg-hand').removeClass('animate');
	$('.ball-shoot').removeClass('animate');
	$('#js-active-ball').removeAttr('transform');
}