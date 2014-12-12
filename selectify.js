(function ($) {
	$.fn.selectify = function() {
		return this.each(function() {

			//__ TEMPLATES
			var selectTemplate = '\
				<div class="selectify-container">\
					<ul class="selectify-select">\
						<li class="selectify-selected"></li>\
					</ul>\
				</div>\
			';

			var optionTemplate = '\
				<li class="selectify-option hidden"></li>\
			';

			//__ RETURN IF NOT A SELECT ELEMENT
			if ($(this).is('select') === false) {return;}

			//__ ELEMENT PLUGIN APPLIED TO
			var $select = $(this);
			var $options = $select.children();

			$select.addClass('selectify-hidden');

			//__ APPEND TEMPLATE AND MAKE APPENDED ELEMENT A VARIABLE
			$(selectTemplate).insertAfter($select);
			var $selectify = $select.next('.selectify-container').find('.selectify-select');

			//__ LOOP THROUGH OPTIONS AND CLONE THEM TO THE LIST
			$options.each(function(){
				var $option = $(this);
				var name = $.trim($option.text());
				var value = $option.val();
				var $clone = $(optionTemplate).clone();

				//__ MODIFY CLONE
				$clone.attr('data-value', value).text(name);

				//__ APPEND
				$selectify.append($clone);

				//__ FIND SELECTED AND ADD CLASS
				if( $option.is(':selected') ){
					$clone.addClass('selected');
					$selectify.find('.selectify-selected').text(name);
				}
			});

			// //__ BIND EVENTS TO CUSTOM NAMESPACE
			// //__ UL OPEN
			$selectify.on('click.selectify', {selectify: $selectify, base: $select}, open_select);

			// //__ MOUSELEAVE UL CLOSE
			$selectify.on('mouseleave.close-selectify', {selectify: $selectify, base: $select}, close_select);

			// //__ LI CLICK EVENT
			$selectify.find('.selectify-option').each(function(){
				$(this).on('click.selectify-option', {selectify: $(this), base: $select}, change_selected);
			});

			//__ DOCUMENT BOUND CLOSE EVENT
			$select.on('selectify-option-clicked', {selectify: $(this), base: $select}, close_select);
		});

		//__ EVENTS
		function open_select (event) {
			event.stopPropagation();
			var $selectify = event.data.selectify;
			var $base = event.data.base;


			$selectify.addClass('open').children().removeClass('hidden');
			$selectify.find('.selectify-selected').addClass('hidden');
			$base.trigger('selectify.focus');
		}

		function change_selected (event) {
			event.stopPropagation();
			var $selectify = event.data.selectify;
			var name = $selectify.text();
			var value = $selectify.data('value');
			var $select = event.data.base;
			var $selectify_option = $selectify.siblings('.selectify-selected');

			$select.children().removeAttr('selected');
			$select.find('[value="'+value+'"]').attr('selected', true);

			$selectify_option.text(name);

			$select.trigger('selectify-option-clicked');

			$select.trigger('selectify.change', {"elements": {"select": $select, "selectify": $selectify}});
		}

		function close_select (event) {
			event.stopPropagation();
			var $selectify = event.data.selectify.is('ul') === true ? event.data.selectify : event.data.selectify.next('.selectify-container').find('.selectify-select');
			var $base = $(event.data.base);

			$selectify.removeClass('open');
			$selectify.find('.selectify-option').addClass('hidden');
			$selectify.find('.selectify-selected').removeClass('hidden');
			// $selectify.children().off('click.selectify-option, mouseleave.close-selectify');

			$base.trigger('selectify.blur');
		}
	};
})(jQuery);
