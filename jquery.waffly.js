;(function ($){

	$.fn.waffly = function( options ){

		// let's establish our default options
		var $dots, obj, animation, rvalue, gvalue, def_bg, opacity_style, dot_styles, dot_width, settings = $.extend({
			class_name: 'waffly',
			style_override: false,
			default_color: '',
			graph_font: 'arial, sans-serif',
			graph_title_color: '#666',
			graph_value_color: '#05c',
			graph_color: '#05c',
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

			/**
			 * Dot is used as decimal mark
			 */
			if ( $(this).data('waffly-value') ){

				settings.graph_value = $(this).data('waffly-value').replace(',','.');

			} else {

				settings.graph_value = settings.graph_value.replace(',','.');

			}

			/**
			 * The percent value is rounded if necessary to keep the number of digits to appear after the decimal point lower than 3 digits
			 */
			if ( settings.graph_value.indexOf('.') > -1 ){
				gvalue = settings.graph_value.split('.');

				if ( gvalue[1].length > 3 ){
					settings.graph_value = parseFloat(settings.graph_value).toFixed(2) + '%';
				}
			}


			if ( settings.style_override ){

				obj = '<div class="' + settings.class_name + '">';


				obj += '<div class="waffly_value" >' + settings.graph_value + '</div>';

				obj += '<ul class="waffly_dots">';


				for (var i = 0; i < settings.total_dots; i++) {

					if ( i < parseInt(settings.graph_value) ) {
							obj += '<li class="waffly_dot d' + (i+1) + ' ' + 'waffly_sel' + '"></li>';


					} else {
						obj += '<li class="waffly_dot d' + (i+1) +'"></li>';
					}

				};

				obj += '</ul>';

				if ( $(this).data('waffly-title') ){

					obj += '<div class="waffly_title">' + $(this).data('waffly-title') + '</div>';

				}

				obj += '</div>';

			} else {

				obj = '<div class="' + settings.class_name + '" style="-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;font-family:' + settings.graph_font + ';padding:' + settings.graph_margin + ';width:' + settings.graph_width + 'px;" title="' + $(this).text() + '">';


				obj += '<div class="waffly_value" style="color:' + settings.graph_value_color + ';font-size:2.5em;font-weight:bold;margin:.5em 0 .25em;text-align:center">' + settings.graph_value + '</div>';


				dot_width = Math.floor( ( (settings.graph_width - ( ( parseInt(settings.graph_margin) )*2 )  ) - ( (settings.dot_row-1) * settings.dot_gap) ) / settings.dot_row );

				obj += '<ul class="waffly_dots" style="font-size:0;list-style:none;margin:0;padding:0;">';

				dot_styles = 'border-radius:' + settings.dot_radius + ';display:inline-block;height:' + dot_width + 'px;margin:0 ' + settings.dot_gap + 'px ' + settings.dot_gap + 'px 0;width:' + dot_width + 'px;';

				opacity_styles ='';
				if ( settings.default_color === '' ){

					def_bg = settings.graph_color;

					opacity_styles += "-ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=" + ( settings.dot_opacity * 100 ) + ")';" + 'filter: alpha(opacity=' + ( settings.dot_opacity * 100 ) + ');-moz-opacity: ' + settings.dot_opacity + ';-khtml-opacity: ' + settings.dot_opacity + ';opacity:' + settings.dot_opacity + ';';

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

			}

			$(this).html( obj );

			if (settings.graph_reverse){

					$(this).find('.waffly_dots').append( $(this).find('.waffly_dot').get().reverse() );

			}

			/**
			 * Animation
			 */

			if (settings.graph_animate){

				if ( settings.style_override ){
					$dots = $(this).find('.waffly_dot.waffly_sel');
					if (settings.graph_reverse){

						$dots.each(function(index,el) {

							setTimeout(function(){
								$dots.eq( Math.abs(index - $dots.length + 1 ) ).addClass('sel');
							},500 + (index*20));

						});

					} else {

						$dots.each(function(index,el) {

							setTimeout(function(){
								$(el).addClass('sel');
							},500 + (index*20));

						});

					}

				} else {

					$dots = $(this).find('.waffly_dot.sel');

					if (settings.graph_reverse){


						$dots.each(function(index,el) {
							var $dot = $dots.eq( Math.abs(index - $dots.length + 1 ) );

							setTimeout(function(){
								$dot.animate({'opacity': 1}, 10);
							},500 + (index*20));

						});

					} else {

						$dots.each(function(index,el) {

							setTimeout(function(){
								$(el).animate({'opacity': 1}, 10);
							},500 + (index*20));

						});

					}

				}

			}



		});

		return this;

	};

}(jQuery));