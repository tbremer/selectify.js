(function ( $ ) {

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

      //__ ELEMENT PLUGIN APPLIED TO
      $base = $(this);
      $base.hide();

      //__ FIND CLOSEST SELECT
      var $select  = ( $base.closest('select').length ? $base.closest('select') : $base.find('select') ),
          $options = $select.children();

      //__ APPEND TEMPLATE AND MAKE APPENDED ELEMENT A VARIABLE
      $(selectTemplate).insertAfter($base);
      var $selectify = $base.siblings('.selectify-container').find('.selectify-select');


      //__ REMOVE NON SELECTS SENT
      if( !$base.is('select') ){ exit_no_stop($base); }

      //__ LOOP THROUGH OPTIONS AND CLONE THEM TO THE LIST
      $options.each(function(){
          var $option = $(this),
              name = $.trim($option.text()),
              value = $option.val(),
              $clone = $(optionTemplate).clone(),
              $ul = $base.siblings().find('.selectify-select');

          //__ MODIFY CLONE
          $clone.attr('data-value', value).text(name);

          //__ APPEND
          $ul.append($clone);

          //__ FIND SELECTED AND ADD CLASS
          if( $option.is(':selected') ){
              $clone.addClass('selected');
              $ul.find('.selectify-selected').text(name);
          };
      });

      //__ BIND EVENTS TO CUSTOM NAMESPACE
      //__ UL OPEN
      $selectify.on('click.selectify', {selectify: $selectify, base: $base}, open_select);
      //__ MOUSELEAVE UL CLOSE
      $selectify.on('mouseleave.close-selectify', {selectify: $selectify, base: $base}, close_select);
      //__ LI CLICK EVENT
      $selectify.find('.selectify-option').each(function(){
          $(this).on('click.selectify-option', {selectify: $(this), base: $base}, change_selected);
      });
      //__ DOCUMENT BOUND CLOSE EVENT
      $(document).on('selectify-option-clicked', {selectify: $(this), base: $base}, close_select);


    });

    //__ EVENTS
    function open_select(event){
      event.stopPropagation();
      var $selectify = event.data.selectify,
          $base = event.data.base;

      $selectify.children().removeClass('hidden');
      $selectify.find('.selectify-selected').addClass('hidden');
      $base.trigger('selectify.focus');
    }

    function change_selected(event){
      event.stopPropagation();
      var $selectify = event.data.selectify,
          name = $selectify.text(),
          value = $selectify.data('value'),
          $select = $base,
          $selectify_option = $selectify.siblings('.selectify-selected');

      $select.children().removeAttr('selected');
      $select.find('[value="'+value+'"]').attr('selected', true);

      $selectify_option.text(name);

      $(document).trigger('selectify-option-clicked');
      $select.trigger('selectify.change');
    };

    function close_select(event){
      event.stopPropagation();
      var $selectify = $(event.data.selectify),
          $selectify = ($selectify.is('ul') ? $selectify : $selectify.parent()),
          $base = $(event.data.base);

      $selectify.find('.selectify-option').addClass('hidden');
      $selectify.find('.selectify-selected').removeClass('hidden');
      $selectify.children().off('click.selectify-option, mouseleave.close-selectify');

      $base.trigger('selectify.blur');
    }
  };

}( jQuery ));
