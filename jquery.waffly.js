;(function ($){

	$.fn.waffly = function( options ){

		// let's establish our default options
		var obj, gvalue, dot_styles, dot_width, settings = $.extend({
			class_name: 'waffly',
			style_override: false,
			default_color: '#ddd',
			graph_font: 'arial, sans-serif',
			graph_title_color: '#05c',
			graph_color: '#05c',
			graph_value:'80%',
			graph_class:'sel',
			total_dots: 100,
			graph_width: 900,
			dot_row:10,
			dot_gap:4,
			dot_radius:'0%'
		}, options);


		this.each(function() {

				if ( $(this).data('waffly-value') ){

					settings.graph_value = $(this).data('waffly-value').replace(',','.');

					gvalue = settings.graph_value.split('.');
					console.log(gvalue);
					if ( gvalue[1].length > 2 ){
						settings.graph_value = settings.graph_value;
					}

				}

				obj = '<div class="' + settings.class_name + '" style="font-family:' + settings.graph_font + ';width:' + settings.graph_width + 'px;" title="' + $(this).text() + '">';

				if ( $(this).data('waffly-value') ){
					obj += '<div class="waffly_value" style="font-size:2.65em;font-weight:bold;margin:1em 0 .5em;text-align:center">' + $(this).data('waffly-value') + '</div>';
				}

				dot_width = Math.floor( ( settings.graph_width - ( (settings.dot_row-1) * settings.dot_gap) ) / settings.dot_row );

				obj += '<ul class="waffly_dots" style="font-size:0;list-style:none;margin:0;padding:0;">';

				dot_styles = '';
				dot_styles += 'border-radius:' + settings.dot_radius + ';';
				dot_styles += 'display:inline-block;';
				dot_styles += 'height:' + dot_width + 'px;';
				dot_styles += 'margin:0 ' + settings.dot_gap + 'px ' + settings.dot_gap + 'px 0;';
				dot_styles += 'width:' + dot_width + 'px;';

				for (var i = 0; i < settings.total_dots; i++) {

					if ( i < parseFloat(settings.graph_value) ) {
						obj += '<li class="waffly_dot d' + (i+1) + ' ' + settings.graph_class + '" style="background:' + settings.graph_color + ';' + dot_styles + '"></li>';
					} else {
						obj += '<li class="waffly_dot d' + (i+1) +'" style="background:' + settings.default_color + ';' + dot_styles + '"></li>';
					}

				};

				obj += '</ul>';

				if ( $(this).data('waffly-title') ){
					obj += '<div class="waffly_title" style="margin-top:.5em;text-align:center">' + $(this).data('waffly-title') + '</div>';
				}

				obj += '</div>';
				$(this).html( obj );

				/*
				$(this).prepend('<div class="' + settings.className + '"></div>');
				$('.' + settings.className).text($(window).width() + ' px');

				if ( settings.style ) {
					$('.' + settings.className).css( settings.style );
				}

				$(window).resize(function() {
					$('.' + settings.className).text($(window).width() + ' px');
				});
				*/
		});

		return this;

	};

}(jQuery));