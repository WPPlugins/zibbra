(function($) {
	
	$.fn.fakeSelect = function(customOptions) {
		var o = $.extend({}, $.fn.fakeSelect.defaultOptions, customOptions);

		return this.each(function(index) {
			
		var _select = $(this),
			 select_id     = (_select.attr('id') == undefined) ? 'fake-select-'+index : _select.attr('id'),
			 selected_text = _select.val()!=-1 ? _select.find("option:selected").html() : -1,
			 label = $("label[for='"+select_id+"']").html();
		
			if(selected_text == -1) {
				
				selected_text = label;
				$("label[for='"+select_id+"']").hide();
				
			}else{
				
				selected_text = label+": "+selected_text
				
			} // end if
		
			if(selected_text == -1) {
				
				selected_text = _select.find('option').first().text();
				
			}
		
			 o = $.extend({}, o, _select.data());
			 
			 if($(this).val()==-1) o.btnStyle += " no-value";
		
			$("#"+select_id+"-mask").remove();			
		
			_select.wrap('<div class="fake-select-wrap" style="display:inline-block;position:relative"/>');
			_select.before('<span class="fake-select-mask" id="'+select_id+'-mask"><button type="button" class="btn '+o.btnStyle+' '+o.btnSize+' dropdown-toggle" data-toggle="dropdown" data-label="'+label+'"> <span class="fake-selected">'+selected_text+'</span> <span class="caret"></span></button><ul class="dropdown-menu"></ul></span>');
			
			var select_mask  = _select.prev('.fake-select-mask');
		
			_select.find('option').each(function() {
				var text = $(this).text();
				if($(this).val()!=-1) select_mask.find('.dropdown-menu').append('<li'+($(this).attr("disabled")=="disabled" ? ' class="disabled"' : '')+'><a data-val="'+$(this).val()+'" href="#">'+text+'</a></li>');
			});
			
			
			select_mask.attr('title',(_select.attr('title') || ''));
			select_mask.find('.dropdown-menu li a').each(function() {
				$(this).click(function(e){
					_select.val($(this).data('val')).change();
					//select_mask.find('.fake-selected').text($(this).text());
					e.preventDefault();
				});
			});
			_select.hide();
			
			_select.on('change',function() {
				select_mask.find('.fake-selected').text(_select.find('option[value="'+_select.val()+'"]').text());
				var l = select_mask.find('.btn.no-value').attr("data-label");
				var t = select_mask.find('.btn.no-value > span.fake-selected').html();
				select_mask.find('.btn.no-value > span.fake-selected').html(l+": "+t);
				select_mask.find('.btn.no-value').removeClass("no-value");
			});
		}); /* end loop*/

	};
 
	$.fn.fakeSelect.defaultOptions = {
		btnSize : '',
		btnStyle: 'btn-default'  
	};
	
})(jQuery);