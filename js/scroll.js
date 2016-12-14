jQuery(document).ready(function($){
	var contentSections = $('.cd-section'),
		navigationItems = $('#sidebar a');

	updateNavigation();
	$(window).on('scroll', function(){
		updateNavigation();
	});

	//smooth scroll to the section
	navigationItems.on('click', function(event){
        event.preventDefault();
        smoothScroll($(this.hash));
    });

	function updateNavigation() {
		contentSections.each(function(){
			$this = $(this);
			var activeSection = $('#sidebar a[href="#'+$this.attr('id')+'"]').data('number') - 1;

      // scrollTop scroll distance from top
      // offset is div distance from top
      // this.height is div height
      console.log($this);
			if (
        // If scroll is past top of div
        ( $(window).scrollTop() >= $this.offset().top ) &&
        // ... and not past bottom of div
        ( $(window).scrollTop() < $this.offset().top + $this.height() ) )
      {
				navigationItems.eq(activeSection).addClass('is-selected');
			} else {
				navigationItems.eq(activeSection).removeClass('is-selected');
			}
		});
	}

	function smoothScroll(target) {
        $('body,html').animate(
        	{'scrollTop':target.offset().top},
        	600
        );
	}
});
