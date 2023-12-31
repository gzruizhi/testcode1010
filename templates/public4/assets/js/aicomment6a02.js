//评分显示
function scoreshow(obj,opt){
	let scorenum = opt.scorenum,
		bgsize = ''+opt.imgwidth+'px '+opt.imgheight+'px';
	obj.attr('score-num',scorenum);
	if(opt.type == 10) scorenum = opt.num/2;
	obj.css({
		'width': opt.imgwidth * opt.num,
		'height': opt.imgheight,
		'backgroundImage': 'url('+opt.imgsrc+')',
		'backgroundSize': bgsize,
		'position': 'relative'
	});
	obj.append('<p></p>');
	obj.find('p').css({
		'width': scorenum*opt.imgwidth,
		'height': opt.imgheight,
		'backgroundImage': 'url('+opt.curimgsrc+')',
		'background-size': bgsize,
		'position': 'absolute',
		'left':'0'
	});
}
//操作评分
function startscore(obj,opt){
	if(opt == undefined){
		opt = {
			Fraction: 5, //总分
			startnum: 5, //个数
			color: '#e4e7ed', //默认颜色
			higcolor: '#f57f17', //高亮颜色
			width: '32px', //单个的宽
			height: '32px', //单个的高
			decimal: true, //是否显示小数点
			Rating: 0, //默认高亮个数，和下面的配合使用
			readOnly: false //只读模式,
		}
	}
	obj.html('');
	let _rating;
	state = {
        rating: (Math.round(opt.Rating * 2 ) / 2).toFixed(1)
    }
	let _uid = Math.floor( Math.random() * 999 ),
		num = opt.Fraction / opt.startnum;
	function getIndex(e){
        let $target = $(e.currentTarget);
        let width = $target.width();
        let side = ( e.offsetX < (width / 2) && !false) ? 'left' : 'right';
        if(opt.decimal){
        	let index = ($target.index() - ((side === 'left') ? 0.5 : 0));
        	index = ( index < 0 && (e.offsetX < width / 10) ) ? -1 : index;
        	return index;
        }else{
        	let index = $target.index();
        	index = ( index < 0 && (e.offsetX < width / 10) ) ? -1 : index;
        	return index;
        }    
    }
	function getLinearGradient(id, startColor, endColor){
        return '<linearGradient id="'+ id +'" gradientUnits="userSpaceOnUse" x1="128.1501" y1="-70.35" x2="121.15" y2="125.0045"><stop  offset="30%" style="stop-color:' + startColor + '"/><stop  offset="0" style="stop-color:' + endColor + '"/></linearGradient>';
    }
	let strhtml;
	for(let i=0;i<opt.startnum;i++){
		let star = '<div class="score-star" style="width:'+opt.width+'px;height:'+opt.height+'px;cursor:pointer">';
		star += '<svg version="1.0" class="jq-star-svg" shape-rendering="geometricPrecision" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="99%" height="99%" viewBox="60 -82 309 350" style="enable-background:new 64 -59 305 305; stroke-width:32px;" xml:space="preserve">';
		star += '<style type="text/css">.svg-empty-' + _uid + '{fill:url(#' + _uid + '_SVGID_1_);}.svg-hovered-' + _uid + '{fill:url(#' + _uid + '_SVGID_2_);}.svg-active-' + _uid + '{fill:url(#' + _uid + '_SVGID_3_);}</style>';
		star += getLinearGradient(_uid + '_SVGID_1_', opt.color, opt.color);
		//  star += getLinearGradient(_uid + '_SVGID_2_', 'red', 'red') +   //这个可以用作鼠标滑过的颜色。
		star += getLinearGradient(_uid + '_SVGID_3_', opt.higcolor, opt.higcolor);
		star += '<polygon data-side="left" class="svg-empty-' + _uid + '" points="281.1,129.8 364,55.7 255.5,46.8 214,-59 172.5,46.8 64,55.4 146.8,129.7 121.1,241 213.9,181.1 213.9,181 306.5,241 "/>';
		star += '<polygon data-side="right" class="svg-empty-' + _uid + '" points="364,55.7 255.5,46.8 214,-59 213.9,181 306.5,241 281.1,129.8 " style="stroke-dasharray: 230 232 230 0;"/>';
            star += '</svg>'
            star += '</div>';
        obj.append(star);
	}
	obj.addClass('flexBoxWrap');
	if(opt.Rating != 0){
		obj.attr('score', opt.Rating);
	}
	obj.find('.score-star').on('click', function (e) {
		let index = getIndex(e);
		let rating = index + 1;
		paintStars(index, 'active');
		//  executeCallback(rating,$(this).$el);
		state.rating = rating * num;
		obj.attr('score', state.rating);
	});
	function paintStars(endIndex, stateClass){
        let $polygonLeft;
        let $polygonRight;
        let leftClass;
        let rightClass;
        $.each(obj.find('.score-star'), function(index, star){
            $polygonLeft = $(star).find('polygon[data-side="left"]');
            $polygonRight = $(star).find('polygon[data-side="right"]');
            leftClass = rightClass = (index <= endIndex) ? stateClass : 'empty';
            leftClass = ( index - endIndex === 0.5 ) ? stateClass : leftClass;
            $polygonLeft.attr('class', 'svg-'  + leftClass + '-' + _uid);
            $polygonRight.attr('class', 'svg-'  + rightClass + '-' + _uid);
        }.bind(this))
		if (opt.readOnly) {
			obj.find('.score-star').off();
		}
    }
	paintStars(state.rating-1, 'active');
}
//七牛图片上传
function qiniu(obj,Sizeprompt){
	var filepath = obj.val();
	var extStart = filepath.lastIndexOf(".");
	var ext = filepath.substring(extStart+1, filepath.length).toLowerCase();
	if(filepath.length >0 && ext != "png" && ext != "gif" && ext != "jpg" && ext != "jpeg"){
		obj.val("");
		_alert('请上传后缀名为：gif，jpg，png');
		// _alert(finyi[10])
		return false;
	}
	var file = obj[0].files[0];
	if(file.size/1024 > 500){
		Sizeprompt.show();
		return false;
	}
	var type = file.type;
	if(!file.type){
		type = 'application/octet-stream';
	}
	var token = '';
	$.ajax({
		url: '/member/token',
		type: 'post',
		dataType: 'json',
		async: false,
		data: { file_type: type, ext: ext, id: file.id },
		success: function (res) {
			token = res.token;
		},
		error: function (res) {
			console.log(res);
		}
	});
	let imgurl;
	var formData = new FormData();
	formData.append('token', token);
	formData.append('file', file);
	$.ajax({
		type: 'POST',
		url: 'http://upload.qiniup.com',
		data: formData,
		processData: false,
		contentType: false,
		success: function (res) {
			imgurl = res.url;
			obj.closest('[aIcomment-img]').append('<div imglist><img src=' + imgurl + ' alt="" /><div class="close">×</div></div>');
			obj.attr('type', 'text').val('');
		},
		error: function (res) {
			console.log(res);
		}
	});
}
//名字脱敏保密*
function formatName(name){
    let newStr;
	if(name.length > 2){
      let char = '';
      for(let i = 0,len=name.length - 2;i<len;i++){ char += '*'; }
      newStr = name.substr(0, 1) + char + name.substr(-1, 1);
    }else{
      newStr = name;
    }
    return newStr;
}
//时间拆分替换
function ComTime(timestamp){
    let date = new Date(timestamp * 1000),
    	timer = {
    		'y':'',
    		'm':'',
    		'd':''
    	};
    Y = date.getFullYear();
    M = date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1;
    D = date.getDate();
    timer.y = Y.toString();
    timer.m = M.toString();
    timer.d = D.toString();
    return timer;
}
function ComMonth(time){
	let Montharry = [
			{'month':'01','month_en':'Jan'},
			{'month':'02','month_en':'Feb'},
			{'month':'03','month_en':'Mar'},
			{'month':'04','month_en':'Apr'},
			{'month':'05','month_en':'May'},
			{'month':'06','month_en':'Jun'},
			{'month':'07','month_en':'Jul'},
			{'month':'08','month_en':'Aug'},
			{'month':'09','month_en':'Sep'},
			{'month':'10','month_en':'Oct'},
			{'month':'11','month_en':'Nov'},
			{'month':'12','month_en':'Dec'},
		]
	let Time = ComTime(time);
	let Monthtime = "";
	for(let o=0;o<Montharry.length;o++){
		if(Time.m == Montharry[o].month) Monthtime = Montharry[o].month_en;
	}
	return Monthtime;
}
//分页
function commPage(obj,opt){
	//渲染分页页面
	function html(curpage){
		var html = '<div aicomment="items" class="flexBoxWrap aicommentitems">';
		html += '<ul class="flexBoxWrap">';
		html += '<li class="compage-prev compage-action compage" compage-prev><div class="icon icon-chevron_left"></div></li>';
		if(opt.pagesize > opt.gtpage){
			html += '<li aicomment-page="1" class="compage">1</li>';
			if (curpage <= 2){
				html += '<li aicomment-page="2" class="compage">2</li>';
				html += '<li aicomment-page="3" class="compage">3</li>';
				html += '<li class="ui-paging-ellipse">...</li>';
			}else
			if(curpage > 2 && curpage <= opt.pagesize - 2){
				html += '<li>...</li>';
				html += '<li aicomment-page="' + (curpage - 1) + '" class="compage">' + (curpage - 1) + '</li>';
				html += '<li aicomment-page="' + curpage + '" class="compage">' + curpage + '</li>';
				html += '<li aicomment-page="' + (curpage + 1) + '" class="compage">' + (curpage + 1) + '</li>';
				html += '<li class="ui-paging-ellipse" class="compage">...</li>';
			}else{
				html += '<li class="ui-paging-ellipse" >...</li>';
				for (var i = opt.pagesize-2;i<opt.pagesize;i++){
					html += '<li aicomment-page="' + i + '" class="compage">' + i + '</li>';
				}
			}
			html += '<li aicomment-page="'+opt.pagesize+'" class="compage">'+opt.pagesize+'</li>';
		}else{
			for(var i=1;i<= opt.pagesize;i++){
				html += '<li aicomment-page="' + i + '" class="compage">' + i + '</li>';
			}
		}
		html += '<li class="compage-next compage-action compage" compage-next><div class="icon icon-chevron_right"></div></li>';
		html += '</ul>';
		if(opt.showinput == true){
			html += '<div class="ui-paging-toolbar">&nbsp;&nbsp;' + obj.attr('page-go') + '&nbsp;&nbsp;<input type="text" class="ui-paging-count" aicomment-pageinput/>&nbsp;&nbsp;' + obj.attr('page-page') + '</div>';
		}
		html += '</div>';
		obj.html(html);
		obj.find('.compage[aicomment-page='+curpage+']').attr('compage',"active");
		obj.find('[compage="active"]').css({
			'background-color': opt.bgcolor,
			'border-color': opt.bdcolor,
			'color': opt.color,
		});
	}
	html(opt.curpage);
}
