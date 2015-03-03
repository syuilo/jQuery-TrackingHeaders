(function($) {
	$.fn.trackingHeaders = function() {
		var $this = $(this);
		var headerDefaultPositions = [];
		var headerHeights = [];
		var $nowTrackingHeader = null;
		var nowTrackingHeaderIndex = null;

		function init() {
			$('body').find('.jquery-trackingheaders-dammy').remove();
			headerDefaultPositions = [];
			headerHeights = [];
			$nowTrackingHeader = null;
			nowTrackingHeaderIndex = null;
			$this.find('h1, h2, h3, h4, h5, h6').each(function() {
				var $header = $(this);
				var headerPosition = $header.offset();
				var hpt = headerPosition.top - parseInt($header.css('margin-top'));
				headerDefaultPositions.push(hpt);
				headerHeights.push($header.outerHeight(true));
				$header.css({
					position: 'relative'
				});
			});
		}

		init();

		$(window).scroll(function() {
			var st = $(window).scrollTop();

			$this.find('h1, h2, h3, h4, h5, h6').each(function(i) {
				var $header = $(this);
				if ((headerDefaultPositions[i] < st && headerDefaultPositions[i + 1] > st && nowTrackingHeaderIndex != i) ||
				(i + 1 == headerDefaultPositions.length && headerDefaultPositions[i] < st && nowTrackingHeaderIndex != i)) {
					$nowTrackingHeader = $header;
					nowTrackingHeaderIndex = i;
					$header.before($('<div class="jquery-trackingheaders-dammy">').css({
						height: $header.outerHeight() + 'px',
						'margin-top': $header.css('margin-top'),
						'margin-bottom': $header.css('margin-bottom')
					}));
					$header.css({
						position: 'fixed',
						top: 0
					});
				} else if (nowTrackingHeaderIndex != i) {
					$header.prev().remove();
					$header.css({
						position: 'relative'
					});
				}
			});

			var hh = $nowTrackingHeader.outerHeight(true);

			$nowTrackingHeader.css({
				top: 0
			});

			if (nowTrackingHeaderIndex == 0) {
				if (headerDefaultPositions[0] > st) {
					var t = headerDefaultPositions[0] - st;
					$nowTrackingHeader.css({
						top: t
					});
				}
			}

			if (headerDefaultPositions.length > nowTrackingHeaderIndex) {
				if (headerDefaultPositions[nowTrackingHeaderIndex + 1] <= st + hh) {
					var t = headerDefaultPositions[nowTrackingHeaderIndex + 1] - (st + hh);
					$nowTrackingHeader.css({
						top: t
					});
				}
			}

			if (headerDefaultPositions[nowTrackingHeaderIndex - 1] + headerHeights[nowTrackingHeaderIndex - 1] >= st) {
				var t = (st) - (headerDefaultPositions[nowTrackingHeaderIndex - 1] + headerHeights[nowTrackingHeaderIndex - 1]);
				$header.css({
					top: t
				});
			}
		});

		$(window).resize(function() {
			init();
		});

		return (this);
	};
})(jQuery);