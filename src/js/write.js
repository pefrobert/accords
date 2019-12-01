$(function() {

	// pouvoir décocher un bouton radio
	$('.form-input-radio').on('click', 'input[type="radio"]', function (e) {
		var t = $(this);
		var inputs = t.parents('.form-input').eq(0).find('input[type="radio"]');
		if (t.is('.checked')) {
			t.removeClass('checked').prop('checked', false);
		} else {
			inputs.removeClass('checked');
			t.addClass('checked');
		}
	});

});
