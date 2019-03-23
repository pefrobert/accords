$(function() {

var slideTeasers = {
	root: $('#teaser-slogans'),
	displayTime: 4000,
	maxHeight: 0,
	viewerWidth: 0,
	next: function () {
		var a = this.root.find('.slogan.active').eq(0);
		var n = a.next();
		var l = this.root.find('.slogan.last');
		if (! n.length) {
			n = this.root.find('.slogan').eq(0);
		}
		n.addClass('active').removeClass('next');
		a.addClass('last').removeClass('active');
		if (l.length) {
			l.removeClass('last').addClass('next');
		}
	},
	init: function () {
		this.root.find('.slogan').each(function () {
			var t = $(this);
			var h = t.outerHeight();
			if (h > slideTeasers.maxHeight) {
				slideTeasers.maxHeight = h;
			}
			t.addClass('next').css('visibility', 'visible');
		});
		this.root.css('height', this.maxHeight + 20);
		this.root.find('.slogan').eq(0).addClass('active').removeClass('next');
		this.delayInterval = setInterval(function() {
			slideTeasers.next();
		}, this.displayTime);
	},
};

slideTeasers.init();

});
