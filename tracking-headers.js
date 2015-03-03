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
				var headerPosition = $header.position();
				var hpt = headerPosition.top;
				headerDefaultPositions.push(hpt);
				headerHeights.push($header.outerHeight());
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
				var headerPosition = $header.position();
				var hpt = headerPosition.top;
				if ((headerDefaultPositions[i] < st && headerDefaultPositions[i + 1] > st && nowTrackingHeaderIndex != i) || (i + 1 == headerDefaultPositions.length && headerDefaultPositions[i] < st && nowTrackingHeaderIndex != i)) {
					$nowTrackingHeader = $header;
					nowTrackingHeaderIndex = i;
					$header.before($('<div class="jquery-trackingheaders-dammy">').css({
						height: $header.outerHeight() + 'px'
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

			var headerPosition = $nowTrackingHeader.position();
			var hpt = headerPosition.top;
			var hh = $nowTrackingHeader.outerHeight();

			$nowTrackingHeader.css({
				top: 0
			});

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