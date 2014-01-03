;(function ($){

	$.fn.waffly = function( options ){

		// let's establish our default options
		var $dots, $dot, obj, rvalue, gvalue, def_bg, opacity_style, dot_styles, dot_width, settings = $.extend({
			class_name: 'waffly',
			style_override: false,
			default_color: '',
			graph_font: 'arial, sans-serif',
			graph_title_color: '#666',
			graph_value_color: '#05c',
			graph_color: '#05c',
			graph_value:'80%',
			graph_margin: '30px',
			graph_class:'sel',
			total_dots: 100,
			graph_width: 250,
			dot_row:10,
			dot_gap:3,
			dot_radius:'20%',
			dot_opacity:'.5',
			graph_reverse: false,
			graph_animate: true
		}, options);


		this.each(function() {

				if ( $(this).data('waffly-value') ){
					settings.graph_value = $(this).data('waffly-value').replace(',','.');
				} else {
					settings.graph_value = settings.graph_value.replace(',','.');
				}

				if ( settings.graph_value.indexOf('.') > -1 ){
					gvalue = settings.graph_value.split('.');

					if ( gvalue[1].length > 3 ){
						settings.graph_value = parseFloat(settings.graph_value).toFixed(2) + '%';
					}
				}

				obj = '<div class="' + settings.class_name + '" style="-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;font-family:' + settings.graph_font + ';padding:' + settings.graph_margin + ';width:' + settings.graph_width + 'px;" title="' + $(this).text() + '">';


				obj += '<div class="waffly_value" style="color:' + settings.graph_value_color + ';font-size:2.5em;font-weight:bold;margin:.5em 0 .25em;text-align:center">' + settings.graph_value + '</div>';


				dot_width = Math.floor( ( (settings.graph_width - ( ( parseInt(settings.graph_margin) )*2 )  ) - ( (settings.dot_row-1) * settings.dot_gap) ) / settings.dot_row );

				obj += '<ul class="waffly_dots" style="font-size:0;list-style:none;margin:0;padding:0;">';

				dot_styles = '';
				dot_styles += 'border-radius:' + settings.dot_radius + ';';
				dot_styles += 'display:inline-block;';
				dot_styles += 'height:' + dot_width + 'px;';
				dot_styles += 'margin:0 ' + settings.dot_gap + 'px ' + settings.dot_gap + 'px 0;';
				dot_styles += 'width:' + dot_width + 'px;';

				opacity_styles ='';
				if ( settings.default_color === '' ){

					def_bg = settings.graph_color;

					opacity_styles += "-ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=" + ( settings.dot_opacity * 100 ) + ")';";
					opacity_styles += 'filter: alpha(opacity=' + ( settings.dot_opacity * 100 ) + ');';
					opacity_styles += '-moz-opacity: ' + settings.dot_opacity + ';';
					opacity_styles += '-khtml-opacity: ' + settings.dot_opacity + ';';
					opacity_styles += 'opacity:' + settings.dot_opacity + ';';

				} else{

					def_bg = settings.default_color;

				}


				for (var i = 0; i < settings.total_dots; i++) {

					if ( i < parseInt(settings.graph_value) ) {
						if (settings.graph_animate){
							obj += '<li class="waffly_dot d' + (i+1) + ' ' + settings.graph_class + '" style="background:' + def_bg + ';' + dot_styles + opacity_styles + '"></li>';
						} else {
							obj += '<li class="waffly_dot d' + (i+1) + ' ' + settings.graph_class + '" style="background:' + settings.graph_color + ';' + dot_styles + '"></li>';
						}

					} else {
						obj += '<li class="waffly_dot d' + (i+1) +'" style="background:' + def_bg + ';' + dot_styles + opacity_styles + '"></li>';
					}

				};

				obj += '</ul>';

				if ( $(this).data('waffly-title') ){
					obj += '<div class="waffly_title" style="color:' + settings.graph_title_color + ';margin-top:.75em;text-align:center">' + $(this).data('waffly-title') + '</div>';
				}

				obj += '</div>';

				$(this).html( obj );

				if (settings.graph_reverse){
					$(this).find('.waffly_dots').append( $(this).find('.waffly_dot').get().reverse() );
				}

				// animacion

				$dots = $(this).find('.waffly_dot.sel');

				if (settings.graph_animate){

					if (settings.graph_reverse){

// resta 61 y coges el puto valor absoluto! Gañán!


						$(this).find('.waffly_dot.sel').each(function(index,el) {
							var $dot = $dots.eq( Math.abs(index - $dots.length + 1 ) );

							setTimeout(function(){
								$dot.animate({'opacity': 1}, 10);
							},500 + (index*20));

						});

					} else {

						$(this).find('.waffly_dot.sel').each(function(index,el) {

							setTimeout(function(){
								$(el).animate({'opacity': 1}, 10);
							},500 + (index*20));

						});

					}

				}

		});

		return this;

	};

}(jQuery));