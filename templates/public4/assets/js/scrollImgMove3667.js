/* 图片滚动效果 */
function scrollImgMove($obj, options){
	var obj = this;
	if(typeof $obj == 'string') $obj = $($obj);
	if(!$obj) return;
	/* 配置项 */
	obj.config = {
		oppose: false,	//向左
		item: 'img'		//子项目
	};

	/* 自定义 */
	for(var key in options) obj.config[key] = options[key];

	obj.calcu = function(oDOM){
		oDOM.each(function () {
			var $img = $(this).find(obj.config.item),			//子项目
				thisHeight = this.scrollHeight,					//高度
				imgWidth = $img.width(),						//宽度
				wp = (imgWidth - this.clientWidth) / imgWidth,	//子项目宽度多出父盒子宽度的百分比（相对于子项目）
				percent = wp * (($(this).offset().top - window.pageYOffset + thisHeight) / (thisHeight + window.innerHeight)) * 100;	//计算后的百分比

			if ($(this).hasClass('oppose') || obj.config.oppose) percent -= wp * 100;
			else percent = '-' + percent;

			$img.css('transform', 'translateX(' + percent + '%)');
		});
	};
	obj.calcu($obj);
	$(window).scroll(function () { obj.calcu($obj) });
	$('body').on('touchmove', function () { obj.calcu($obj) });
}
