// JavaScript Document
function isValidEmailAddress(emailAddress) { 
        var pattern = new RegExp(/^(('[\w-\s]+')|([\w-]+(?:\.[\w-]+)*)|('[\w-\s]+')([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        return pattern.test(emailAddress);
    }
function callBack(f){
	var warn = 0;
	var error = '';
	var method = "POST";
	var action = "/callback.php";
	var email = $('.'+f+' input[name=f_Email]').val();
	$('.'+f+' .val').each(function(){
		if($(this).val()==''){
			$(this).addClass('warn'); warn = 1;
			error+=$(this).attr('placeholder')+"\n";
		} else {
			/*if($(this).attr('name')=='f_Email' && !isValidEmailAddress(email.val())){
				$(this).val('').attr('placeholder','Неправильный формат').addClass('warn'); warn = 1;
				error+='Неправильный формат E-mail';
			} else {*/
				$(this).removeClass('warn');
			//}
		}
	}); 
	if(email!='' && !isValidEmailAddress(email)){
		warn = 1;
		error+='Неправильный формат E-mail';
	}
	if(warn==0) { 
		var data = $('.'+f).serialize();	
		$.ajax({
			type: method,
			url: action,
			data: data,
			success: function(result){		
				if(result==1){
					swal("Спасибо за заявку!", "Наш менеджер свяжется с Вами в ближайшее время.", "success");
					//$("#close_button").click();
					$('.'+f).trigger('reset');
				} else {
					swal("Что то пошло не так! Просьба обратиться к администратору.", error, "error");
				}
			}
		});
	} else { 
		swal("Неправильно заполнены поля:", error, "error");
	}
}
function orderCall(f){
	var warn = 0;
	var email = $('.'+f+' input[name=f_Email]');
	//var check = $('.'+f+' input[name=f_Check]');
	$('.'+f+' .val').each(function(){
		if($(this).val()==''){
			$(this).addClass('warn'); warn = 1;
		} else {
			if($(this).attr('name')=='f_Email' && !isValidEmailAddress(email.val())){
				$(this).val('').attr('placeholder','Неправильный формат').addClass('warn'); warn = 1;
			} else {
				$(this).removeClass('warn');
			}
		}
	});
	/*if(check.is(':checked')){
		$('.policy').removeClass('warn-check');
	} else {
		$('.policy').addClass('warn-check'); warn = 1;
	}*/
	if(warn){ 
		return false;
	} else {
		return true;	
	}
}
function funcCall(f){
	var warn = 0;
	var error = '';
	var email = $('.'+f+' input[name=f_Email]');
	var phone = $('.'+f+' input[name=f_Phone]');
	if(phone.val()=='' && email.val()==''){
		email.addClass('warn');
		phone.addClass('warn');
		error += "<p>Телефон или E-mail являются обязательными для заполнения.</p>"; warn = 1;
	} else {
		email.removeClass('warn');
		phone.removeClass('warn');
	}	 
	if(email.val()!='' && !isValidEmailAddress(email.val())){
		$('.'+f+' input[name=f_Email]').addClass('warn'); warn = 1;
		error+='<p>Неправильный формат E-mail</p>';
	}
	if(warn){ 
		$('.warnText').html(error);
		return false;
	} else {
		return true;	
	}
}
$(document).ready(function(){
	$(window).scroll(function () {if ($(this).scrollTop() > 0) {$('#topcontrol').fadeIn();} else {$('#topcontrol').fadeOut();}});
	$('#topcontrol').click(function () {$('body,html').animate({scrollTop: 0}, 400); return false;});
	if ($("input[name=f_Phone],input[name=phone]").length > 0) {
		$("input[name=f_Phone],input[name=phone]").mask("+7 (999) 999-99-99", { placeholder: "_" });	
	}
	$('.fcall input[type=button]').click(function() {
		callBack('fcall');
	});
	$('.b-menu__m1 li.str').mouseenter(()=>{ 
		$('.b-menu__m1').addClass('b-menu__m1-full');
	});
	$('.b-menu__m1').children('li').not('.str').mouseenter((e)=>{ 
		$('.b-menu__m1').removeClass('b-menu__m1-full'); 
	});
	$('ul#cssmenu').children('li').mouseenter((e)=>{ 
		$('.b-menu__m1').removeClass('b-menu__m1-full'); 
	});
	$('ul#cssmenu').children('li').children('a').mouseenter((e)=>{ 
		$('.b-menu__m1').removeClass('b-menu__m1-full'); 
	});
	/*var HeaderTop = $('.header').offset().top;
	if($(window).width()>740){
		$(window).scroll(function(){
			if( $(window).scrollTop() > HeaderTop) {
				$('.header').css({position: 'fixed'});
			} else {
				$('.header').css({position: 'relative'});
			}
		});
	}
	if($(window).width()<740){
		$('#ymaps1517304248030563735').css('height','300px');
	}*/
	$('.but-submenu').on('click', function(event) {
		const parent = $(this).parent('.str');
		parent.toggleClass('active-submenu');
		parent.children('ul').slideToggle('normal',function(){
			if ($(this).is(':hidden')) {
				$(this).removeAttr('style');
			}
		}); 
   		return false;
	});
	$('.menu-but-w').on('click', function() {
		//$('.menu-but').toggleClass('on');
		//$('.menu').css('top',$('.menu-but').offset().top).toggleClass('active-menu', 'on');
		$('nav').toggleClass('active-menu', 'on');
   		return false;
	});
	$('.m-filtr').click(function() {
		$('.right-td').toggleClass('active-filtr', 'on');
	});
	/*$('.b-menu__m1 li.str').hover(()=>{
		$('.b-menu__m1').addClass('b-menu__m1-full');
	},()=>{
		$('.b-menu__m1').removeClass('b-menu__m1-full');
	});*/
	$('.poplight').click(function() {
		var popID = $(this).attr('rel'); 
		$('.warnText').empty();		
		$('#'+popID).fadeIn().css({ 'width': 354 }).prepend('<a href="#" class="close"><img id="close_button" src="/images/img-close.png" border="0" class="btn_close" title="Close Window" alt="Close"></a>');
		var popMargTop = ($('#'+popID).height() + 80) / 2;
		var popMargLeft = ($('#'+popID).width() + 80) / 2;
		$('#'+popID).css({ 
			'margin-top' : -popMargTop,
			'margin-left' : -popMargLeft
		});
		$('body').append('<div id="fade"></div>');
		$('#fade').css({'filter' : 'alpha(opacity=70)'}).fadeIn();
		return false;
	});	
	$('.h-info__callback').on('click',(event)=>{
		const obj = $(event.currentTarget); console.log(obj);
		obj.css({'display':'none'});
	});
	/*$('.b-kat-item-reyting svg').on('click',(event)=>{
		//event.preventDefault();
		const obj = $(event.currentTarget);
		const parent = obj.parent(); console.log(parent);
		//parent.find('svg').css({'display':'none'});
		parent.find('svg').removeClass('reyting-active');
		obj.addClass('reyting-active');
	});*/
	$('.b-kat-item-reyting__star').on('click',function(){
		$(this).parent().find('.b-kat-item-reyting__star').removeClass('reyting-active');
		$(this).addClass('reyting-active');
	});
});
$(document).on('click','a.close, #fade',function() { 
	$('#fade , .popup_block,.ordertrue').fadeOut(function() {
		$('#fade, a.close').remove();  
		$('.warn-text').empty();
	});
	
	return false;
});
$(document).on('click','.b-menu .close',function() {  
	$('nav').toggleClass('active-menu', 'on');
});
	
