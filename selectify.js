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
            $selectify.on('click.selectify', {element: $selectify}, open_select);
            //__ MOUSELEAVE UL CLOSE
            $selectify.on('mouseleave.close-selectify', {element: $selectify}, close_select);
            //__ LI CLICK EVENT
            $selectify.find('.selectify-option').each(function(){
                $(this).on('click.selectify-option', {element: $(this)}, change_selected);
            });
            //__ DOCUMENT BOUND CLOSE EVENT
            $(document).on('selectify-option-clicked', {element: $selectify}, close_select);


        });

        //__ EVENTS
        function open_select(event){
            event.stopPropagation();
            var $base = event.data.element;

            $base.children().removeClass('hidden');
            $base.find('.selectify-selected').addClass('hidden');
        }

        function change_selected(event){
            event.stopPropagation();
            var $base = event.data.element,
                name = $base.text(),
                value = $base.data('value'),
                $select = $base.parentsUntil('.selectify-container').parent().siblings('select'),
                $selectify_option = $base.siblings('.selectify-selected');

            $select.children().removeAttr('selected');
            $select.find('[value="'+value+'"]').attr('selected', true);

            $selectify_option.text(name);

            $(document).trigger('selectify-option-clicked');
        };

        function close_select(event){
            event.stopPropagation();
            var $base = (event.data.element.is('ul') ? event.data.element : event.data.elemet.parent());

            $base.find('.selectify-option').addClass('hidden');
            $base.find('.selectify-selected').removeClass('hidden');

            $base.children().off('click.selectify-option, mouseleave.close-selectify');
        }

        function dbg(data){
            console.info(data);
        }

        function exit_no_stop($base){
            $base.siblings('.selectify-container').remove();
        }
    };

}( jQuery ));
