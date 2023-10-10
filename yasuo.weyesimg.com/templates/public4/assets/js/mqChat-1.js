$(function(){
	var mqChat = function(){},
		oBox = $('#mqChat-box'),
		oSmall = $('#mqChat-small,.tem06-float.add .model-display'),
		oBody = $('#mqChat-show .body'),
		oChat = $('#mqChat-chat .chat'),
		oForm = $('#mqChat-chat form'),
		oChatUl = oChat.find('ul'),
		oHead = $('#mqChat-head'),
		oSend = $('#mqChat-send'),
		oFile = $('#mqChat-file'),
		oFace = $('#mqChat-face'),
		iState = 'loading seen sent error',
		oTextarea = $('#mqChat-textarea'),
		oMore = $('<li class="more"></li>'),
		oForm_ = $('#mqChat-form'),
        oAutoReply = oForm_.find('.autoReply'),
        bubble_tip = oForm_.find('.bubble_tip_'),
		oSetConfig = oForm_.find('[set-config]'),
		autoReply_state = false,
		iMaxId = 0,
		emoji = [
			{n:'e04',i:'1f604'},{n:'e03',i:'1f603'},{n:'e00',i:'1f600'},{n:'e0a',i:'1f60a'},{n:'☺️',i:'263a-fe0f'},{n:'e09',i:'1f609'},{n:'e0d',i:'1f60d'},{n:'e18',i:'1f618'},{n:'e1a',i:'1f61a'},{n:'e17',i:'1f617'},
			{n:'e19',i:'1f619'},{n:'e1c',i:'1f61c'},{n:'e1d',i:'1f61d'},{n:'e1b',i:'1f61b'},{n:'e33',i:'1f633'},{n:'e01',i:'1f601'},{n:'e14',i:'1f614'},{n:'e0c',i:'1f60c'},{n:'e12',i:'1f612'},{n:'e1e',i:'1f61e'},
			{n:'e23',i:'1f623'},{n:'e22',i:'1f622'},{n:'e02',i:'1f602'},{n:'e2d',i:'1f62d'},{n:'e2a',i:'1f62a'},{n:'e25',i:'1f625'},{n:'e30',i:'1f630'},{n:'e05',i:'1f605'},{n:'e13',i:'1f613'},{n:'e29',i:'1f629'},
			{n:'e2b',i:'1f62b'},{n:'e28',i:'1f628'},{n:'e31',i:'1f631'},{n:'e20',i:'1f620'},{n:'e21',i:'1f621'},{n:'e24',i:'1f624'},{n:'e16',i:'1f616'},{n:'e06',i:'1f606'},{n:'e0b',i:'1f60b'},{n:'e37',i:'1f637'},
			{n:'e0e',i:'1f60e'},{n:'e34',i:'1f634'},{n:'e35',i:'1f635'},{n:'e32',i:'1f632'},{n:'e1f',i:'1f61f'},{n:'e26',i:'1f626'},{n:'e27',i:'1f627'},{n:'e08',i:'1f608'},{n:'c7f',i:'1f47f'},{n:'e2e',i:'1f62e'},
			{n:'e2c',i:'1f62c'},{n:'e10',i:'1f610'},{n:'e15',i:'1f615'},{n:'e2f',i:'1f62f'},{n:'e36',i:'1f636'},{n:'e07',i:'1f607'},{n:'e0f',i:'1f60f'},{n:'e11',i:'1f611'},{n:'c72',i:'1f472'},{n:'c73',i:'1f473'},
			{n:'c6e',i:'1f46e'},{n:'c77',i:'1f477'},{n:'c82',i:'1f482'},{n:'c76',i:'1f476'},{n:'c66',i:'1f466'},{n:'c67',i:'1f467'},{n:'c68',i:'1f468'},{n:'c69',i:'1f469'},{n:'c74',i:'1f474'},{n:'c75',i:'1f475'},
			{n:'c71',i:'1f471'},{n:'c7c',i:'1f47c'},{n:'c78',i:'1f478'},{n:'e3a',i:'1f63a'},{n:'e38',i:'1f638'},{n:'e3b',i:'1f63b'},{n:'e3d',i:'1f63d'},{n:'e3c',i:'1f63c'},{n:'e40',i:'1f640'},{n:'e3f',i:'1f63f'},
			{n:'e39',i:'1f639'},{n:'e3e',i:'1f63e'},{n:'c79',i:'1f479'},{n:'c7a',i:'1f47a'},{n:'e48',i:'1f648'},{n:'e49',i:'1f649'},{n:'e4a',i:'1f64a'},{n:'c80',i:'1f480'},{n:'c7d',i:'1f47d'},{n:'ca9',i:'1f4a9'}
		],
		_emoji = '\\ud83d\\ud';
		fanyi_ = $('#mqChat-fanyi').data('fanyi').split(', ');
	/*	翻译
		0: 请求超时
		1: 请联系客服
		2: 您可以和客服聊天了~
		3: 点击加载更多
		4: 没有更多了
		5: 送达
		6: 已读
		7: 你的账号在另一个网页登录，已下线~
		8: 密码被修改，被迫下线
		9: 以上为聊天记录
		10: 获取文件失败
		11: 输入你想说的内容
		12: 在线咨询
	*/
	/*	翻译2 mqChatFanyi
		0: 不允许为空
		1: 请输入正确的邮件格式
		2: name
		3: Phone
		4: email
		5: content
		6: 在线咨询
		7: 验证码有误
		8: 邮箱地址不存在
		9: 发送失败，这可能是邮箱的格式错误，请检查以下内容。
		10: quantity
	*/
	
	/***** 交互部分 *****/
		/* 初始化 */
		function initia(){
			
			if(getCookie("mp_chat_id")){
				// 获取记录
				mqChat.init()
				//mqChat.new_information()
			}else{
                if(oSetConfig.hasClass('bubble_tip') && bubble_tip.text() && !oSetConfig[0].bubble_tip_bols) {
                    b2c(0, bubble_tip.text())
                    oSetConfig[0].bubble_tip_bols = true;
                }
            }
	
			// 初始化表情
			var ul = '';
			for(var i = 0; i < emoji.length; i++) ul += '<li data-src="'+ emoji[i].i +'" data-emoji="'+ emoji[i].n +'">'+ emojiImg(emoji[i].i) +'</li>';
			oFace.find('ul').html(ul).find('li').on('click', function(){
				var dataIndex = _emoji + $(this).data('emoji');
				if($(this).data('emoji')=='☺️') dataIndex = $(this).data('emoji');
				oTextarea.append($($(this).find('img').clone().attr('data-index', dataIndex))).blur()
				oFace.blur()
			})
	
	
			//自动回复
			if(oSetConfig.hasClass('inquiryreply') && oAutoReply.text()) autoReply_state = true;
	
			// 表单
			if(oSetConfig.hasClass('inquiryform')) fun_form();
	
			oChat.animate({scrollTop: oChat.prop("scrollHeight") }, 400);
	
		}
		/* 客服模板 */
		function b2c(type, contant, id, time, _new){
	
			//创建数据
			var txt = contant;
            if(type==2) txt = '<img src='+ txt +'>';
            txt = txt.replace(/{({[^}}]+})}/g,function (a,b,c,d) {
                var text = '';
                try{
                    var obj = JSON.parse(b);
                    text = '<a target="_blank" href="'+obj.url+'">'+obj.text+'</a>'
                }catch(e){
        
                }
        
                return text;
            })
			var li = $('<li class="b2c" data-id="'+ id +'" style="order: '+ id +'"><em>'+ time +'</em><span>'+ checkEmoji(txt).replace(/\n/g, '<br>') +'</span></li>');
			if(!type){
				var dataId = li.prev().data('id');
				if(dataId>0) li.removeClass('waitId').css('order', dataId);
				else li.addClass('waitId');
				li.find('em').remove()
			}
			change(li)
	
			//前面发送的内容修改为已读
			oChatUl.find('li .sent').each(function(){
				var _id = parseInt($(this).parent().parent().data('id'));
				if(_id<id) c2b_state(_id, 1);
			})
	
			// 新数据
			if(!_new){
	
				// 隐藏重复时间
				hideTime();
	
				// 更新最大id
				if(id > iMaxId) iMaxId = id;
			}
		}
		/* 用户模板 */
		function c2b(type, contant, id, time, _new){
			if(contant.trim().length == 0 ) return
			var txt = contant;
			if(type==2) txt = '<img src='+ txt +'>';
			var li = $('<li class="c2b"><em></em><span><i></i>'+ checkEmoji(txt).replace(/\n/g, '<br>') +'</span></li>');
			li.data({
				'type': type,
				'contant': contant
			})
			if(id && time){
	
				//记录
				li.attr('data-id', id).css('order', id)
				li.find('em').html(time)
	
				// 新数据
				if(!_new){
	
					// 隐藏重复时间
					hideTime();
	
					// 更新最大id
					if(id > iMaxId) iMaxId = id;
				}
			}else{
	
				//发送
				li.css('order', iMaxId).find('i').addClass('loading')
				if(type==2) qiniu(li);
				else mqChat.send(type, contant, li);
				
			}
			change(li)
			
			if(!id){
				// 自动回复
				// if(autoReply_state){
				// 	b2c(0, oAutoReply.text())
				// 	autoReply_state = false
                // }
                
                var oAutoReply_text = oAutoReply.text();
                // oAutoReply_text = oAutoReply_text.replace(/{({[^}}]+})}/g,function (a,b,c,d) {
                //     var text = '',
                //         obj = JSON.parse(b);
                //     try{
                //         var obj = JSON.parse(b);
                //         text = '<a target="_blank" href="'+obj.url+'">'+obj.text+'</a>'
                //     }catch(e){
            
                //     }
            
                //     return text;
                // })

				if(!autoReply_state) return false;
				
				autoReply_state = false;
				$.ajax({
					type: 'POST',
					url: '/mq-pc/auto-response',
					data: {message: oAutoReply_text},
									dataType: "json",
					success: function(data){},
					error: function() {
						console.log('error')
					}
				})
	
				
			}
		}
		/* 改变状态 */
		function c2b_state(obj, state, id, time){
	
			var li = obj,
				li_i = 0,
				text_ = '',
				addClass_ = '';
	
			if(typeof(obj) != 'object') li = oChatUl.find('[data-id="'+ obj +'"]');
			li_i = li.find('i');
	
			switch(state){
				case 0:
					//送达
					addClass_ = 'sent';
					text_ = fanyi_[5];
					break;
				case 1:
					//已读
					addClass_ = 'seen';
					text_ = fanyi_[6];
					break;
				default:
					//发送失败
					addClass_ = 'error';
					li_i.on('click', function(){
						resend(li)
					})
			}
	
			li_i.removeClass(iState).addClass(addClass_).text(text_)
			if(id){
				li.attr('data-id', id).css('order', id)
				oChatUl.find('.waitId').each(function(){
					var dataId = $(this).prev().data('id');
					$(this).removeClass('waitId').css('order', dataId)
				})
				if(id > iMaxId) iMaxId = id;
			}
			if(time){
				li.find('em').text(time);
				hideTime()
			}
		}
		/* 改变对话 */
		function change(li){
	
			//创建内容
			oChatUl.append(li)
			oChat.scrollTop(oChatUl.height())
		}
		/* 检查记录 */
		function checkChat(len, init_data){
			if(!len&&len!=0) return;
	
			// 初始化
			if(!init_data){
	
				//完全没记录
				if(!len) oChatUl.append(oMore.html(fanyi_[2]).css('cursor', 'default'));
				else{
	
					//有数据
					oChatUl.append(oMore.clone().html('-- '+ fanyi_[9] +' --').css('order', oChatUl.find('li').last().data('id')))
					
					//数据达到10条，可以尝试获取更多
					if(len > 9) oChatUl.append(oMore.html(fanyi_[3]).on('click', function(){mqChat.used_information()}))
				}
	
				// 初始化后到底部看最新的
				oChat.scrollTop(oChatUl.height());
	
			}else if(!len && oChatUl.find('li').length > 1) oMore.html(fanyi_[4]).css('cursor', 'default');
	
			//拿到数据了，隐藏重复时间
			if(len) hideTime();
		}
		/* 隐藏重复的时间 */
		function hideTime(){
	
			var times = '';
			oChatUl.find('li').each(function(){
				var em = $(this).find('em'),
					id = parseInt($(this).data('id'));
				if(id > iMaxId) iMaxId = id;
				if(times.indexOf(em.text())<0) times += em.text()+';';
				else em.hide();
			})
		}
		/* 表情替换 */
		function checkEmoji(text){
			if(!text&&text!=0) return;
	
			var str = text;
			if(str.indexOf(_emoji)>-1){
				for(var i = 0; i < emoji.length; i++){
					str = str.replace(new RegExp('\\\\ud83d\\\\ud'+''+emoji[i].n,'g'), emojiImg(emoji[i].i));
				}
			}
			str = str.replace(/☺️/g, emojiImg('263a-fe0f'));
			return str;
		}
		function emojiImg(i){
			return '<img src="/templates/public4/assets/library/jmessage/emoji/2x/'+ i +'.png" class="emoji">';
		}
		/* 重发消息 */
		function resend(li){
			c2b(li.data('type'), li.data('contant'))
			li.remove()
		}
		/* 图片传到七牛云 */
		function qiniu(li){
			var obj = oFile;
			var filepath = obj.val();
			var extStart = filepath.lastIndexOf(".");
			var ext = filepath.substring(extStart+1, filepath.length).toLowerCase();
			if(filepath.length >0 && ext != "png" && ext != "gif" && ext != "jpg" && ext != "jpeg"){
				obj.val("");
				// _alert('请上传后缀名为：gif，jpg，png');
				_alert(finyi[10])
				return false;
			}
			var file = obj[0].files[0];
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
				data: {file_type: type, ext: ext, id: file.id},
				success: function(res) {
					token = res.token;
				}
			})
	
			var formData = new FormData();
			formData.append('token', token);
			formData.append('file', file);
			$.ajax({
				type: 'POST',
				url: window.location.protocol == 'http:' ? 'http://upload.qiniup.com' : (window.location.protocol == 'https:' && 'https://up.qbox.me'),
				data: formData,
				processData: false,
				contentType: false,
				success:function(res){
					//消息存到数据库
					var msg_type = 'image';
					var msg = res.url;
					mqChat.send(2, msg, li);
					// sendSingleMsg(msg, msg_type, send_time);
				}
			})
		}
	
		/* 散装 */
		// 最小化
		oHead.find('i').on('click', function(){
			oBox.removeClass('show');
			if (oBox.hasClass('add')) { 
				clean();
			}
			clearInterval(mqChat.setInterval)
		})
		oSmall.on('click', function(){
			
			if (oBox.hasClass('add')) {
				oBox.toggleClass('show');
			} else { 
        oBox.addClass('show');
			}
			if( oBox.hasClass('show') && oBox.hasClass('add') ){
        window['gtag'] && typeof window['gtag'] == 'function' && window['gtag']('event', 'click', {
          'event_category': '咨询按钮',
          'event_label': '打开咨询',
          'value': 'Chat online'
        });
				clean();
			}
			if(!oSmall.hasClass('noInitia')){
				// 首次展开
				oSmall.addClass('noInitia');
				initia();
			}
			if(!oBox.hasClass('show')){
				clearInterval(mqChat.setInterval)
			}else{
				// 定时获取最新的消息
				mqChat.setInterval = setInterval(function(){
					mqChat.new_information()
				}, 5000)
			}
			
		})
		// 输入框
		oTextarea.on('blur', function(){
			if(oTextarea.html().length>0) oTextarea.addClass('hideTips');
			else oTextarea.removeClass('hideTips');
		}).keydown(function(event){
			if(event.keyCode==13){
				oSend.click();
				return false;
			}
		})
		// 点击发送
		oSend.on('click', function(){
	
			var msg = oTextarea.html();
			if(!msg) return false;
			// 取表情
			msg = msg.replace(/<img+[^<>]+data\-index=\"([^\"]+)\"+>/gi, "$1");
			// 过滤换行
			msg = msg.replace(/<div>/g, "\n").replace(/<br>/g, "\n");
			// 过滤标签
			msg = msg.replace(/<[^<>]+>/g, "");
			// 过滤空格
			msg = msg.replace(/&nbsp;/g, " ");
	
			c2b(1, msg)
			oTextarea.html('')
		})
		// 选择文件之后
		oFile.on('change', function(){
			// 如果浏览器支持FileReader接口，则发送预览图
			if (typeof FileReader != 'undefined') {
				var file = this.files[0],
					reader = new FileReader();
				reader.onload = function (e) {
					c2b(2, this.result)
				}
				reader.readAsDataURL(file)
			}
		})
		// 移动端
		if($(window).width()<768){
			oFace.after(oTextarea.parent());
			oTextarea.on('input', function(){
				oChat.parent().css('padding-bottom', oForm[0].offsetHeight)
			})
		}
	
	/***** 接口部分 *****/
		mqChat.newId = 0;//记录最新客服内容id
		mqChat.usedId = 0;//记录最旧内容id
		mqChat.bol = false;//用于控制请求内容必须唯一性
		mqChat.setTimeout = null;//控制是不是用客户自己输入的作为新id
		mqChat.setInterval
		/* 日期格式修改 */
		mqChat.CurentTime = function(time){
			time = new Date(parseInt(time*1000)) || new Date();
			var month = time.getMonth()+1;	//月
			var day = time.getDate();		//日
			var hh = time.getHours();		//时
			var mm = time.getMinutes();	//分
			var clock = '';
			if(month < 10) clock += "0";
			clock += month + "-";
			if(day < 10) clock += "0";
			clock += day + " ";
			if(hh < 10) clock += "0";
			clock += hh + ":";
			if (mm < 10) clock += '0'; 
			clock += mm; 
			return(clock); 
		} 
		/* 发送请求 */
		mqChat.fun = function(obj){
			var data = {},
			url = '/mq-pc/get-talk-list',
			async = true;
			if (obj&&obj.data) {
				for (var key in obj.data) {
					data[key] = obj.data[key]
				}
			}
			if (obj&&obj.url&&obj.url!="") {
				url = obj.url
			}
			if(obj&& !obj.async){
				async = obj.async
			}
			$.ajax({
				url:url,
				data:data,
				async: async,
				type:'post',
				dataType:'json',
				success:function(json){
					if(json.status == 0){
	
					}else {
	
					}
					if (obj&&obj.fun) {
						obj.fun(json)
					}
				},
				error:function(json){
					if (obj&&obj.fun) {
						obj.fun()
					}
				}
			});
		}
		/* 初始化10条 */
		mqChat.init = function(init_data,first_bol){
			if (mqChat.bol) {return}
			mqChat.bol = true;
			var data = {
				// page:1,// 页数
				// limit:10, // 获取条数
				// max_id:16 // 现在显示最新id数 传参后获取比他更新的信息
				// min_id:16 // 现在显示最新id数 传参后获取比他更新的信息
			}
			if (init_data) {
				for (var key in init_data) {
					data[key] = init_data[key]
				}
			}
			mqChat.fun({
				// url:""
				data:data,
				fun:function(json){
					mqChat.bol = false;
					if (json) {
						if (json.status==0 && json.data.message_list.length>0) {
							var message_list = json.data.message_list,
								new_index = 0;// 用于判断是不是最新的客服信息
							if(!first_bol) mqChat.usedId = message_list[message_list.length-1].id; // 记录最旧id
							for(var i=0;i<message_list.length;i++){
								// 时间戳转换格式
								var times = mqChat.CurentTime(message_list[i].send_time),
									type = message_list[i].msg_type,
									_id_ = message_list[i].id,
									message = message_list[i].message;
								if (first_bol) {
									if (message_list[i].send_type == 1) {
										clearInterval(mqChat.setTimeout)
										if (new_index==0) {
											mqChat.newId = _id_;
											new_index++;
										}
										b2c(type, message, _id_, times, 1)
									}
								}else {
									if (new_index==0) {
										mqChat.newId = _id_;
										new_index++;
									}
									if (message_list[i].send_type == 1) {
										b2c(type, message, _id_, times, 1)
									}else c2b(type, message, _id_, times, 1);
								}
							}
						}else{
                            if(oSetConfig.hasClass('bubble_tip') && bubble_tip.text() && !oSetConfig[0].bubble_tip_bols) {
                                b2c(0, bubble_tip.text())
                            }
                        }
                        oSetConfig[0].bubble_tip_bols = true;
						if (json.status==0) {
							checkChat(json.data.message_list.length, init_data)
						}
	
						oChat.animate({scrollTop: oChat.prop("scrollHeight") }, 400);
					}
				}
			})
		}
		// 消息气泡功能
		var _countId;
		function messageBubble(_id){
			if( _countId && _countId !== _id ){
				// 展示波浪动画
				oSmall.addClass('chatOnlineCloseAndhaveMessage');
				// 更新气泡消息数量
				var _amountElements = oSmall.children('.default');
				var _num = parseInt( _amountElements.attr('data-amount') );
				// 针对回复频率过快的时候气泡消息数量的统计
				var _fast = ( _countId + 1 ) === _id ? ++_num : ( _num+= _id - _countId  ) ;
				_amountElements.attr('data-amount',_num >= 99 ? '99+' :  _fast );
			}
			_countId = _id;
		}
		// 对话窗口显示状态下, 数据重置
		function clean(){
			// 对话窗口显示状态隐藏气泡/清空气泡消息数量/隐藏波浪动画
			oSmall.removeClass('chatOnlineCloseAndhaveMessage');
			oSmall.children('.default').attr('data-amount',0);
		}
	
		/* 获取新信息 */
		mqChat.new_information = function(){
			var obj = {}
			if (mqChat.newId!=0) {
				// 对话窗口隐藏状态下才展示气泡
				if( !oBox.hasClass('show') && oBox.hasClass('add') ){
					messageBubble(mqChat.newId);
				}
				obj.max_id = mqChat.newId;
			}
			mqChat.init(obj,true);
		}
		/* 获取旧信息 */
		mqChat.used_information = function(){
			mqChat.init({
				min_id: mqChat.usedId
			})
		}
		/* 发送信息 */
		mqChat.send = function(msg_type, message, li){
			mqChat.fun({
				url:"/mq-pc/mq-talk",
				async: false,
				data:{
					msg_type: msg_type,
					message: message
				},
				fun:function(json){
					if(json&&json.status==0) {
						//保存会话id信息
						document.cookie = "mp_chat_id="+ json.data.data.relate_id +"";
						
						c2b_state(li, 0, json.data.message_id, mqChat.CurentTime(json.data.data.send_time));
						clearInterval(mqChat.setTimeout)
						mqChat.setTimeout = setTimeout(function(){
							mqChat.newid = json.data.message_id;
						},10000)
					}
					else c2b_state(li, 2);
				}
			})
		}
	
	
	/***** 表单 *****/
  function fun_form(){
    
    if(sessionStorage.getItem('mqChat-form')) return;
    
    oBody.addClass('show-form');

    var glxp_ = false,
      hc = oSetConfig[0].classList,
      notEmpty = {notEmpty: {message: mqChatFanyi[0]}},
      name_ = '',
      phone_ = '',
      email_ = '',
	  contents_ = '';
	console.log(hc)
    for(var i=hc.length-1; i>=0; i--){
      oForm_.find('.'+hc[i]).prop("required", true).siblings('label').find('i').show()
      switch(hc[i]){
        case 'name_':
          name_ = notEmpty;
          break;
        case 'phone_':
          phone_ = {notEmpty,regexp: { regexp: /^[0-9\-]+$/, message: "phone only include number or '-'" } };
          break;
        case 'email_':
          email_ = {notEmpty: {message: mqChatFanyi[0]},emailAddress: {message: mqChatFanyi[1]}};
          break;
        case 'contents_':
          contents_ = notEmpty;
          break;
        case 'glxp_':
          glxp_ = true;
          break;
      }
    }
	if (!phone_) {
		phone_ = {regexp: { regexp: /^[0-9\-]+$/, message: "phone only include number or '-'" } };
	}
	if (!email_) {
		email_ = {emailAddress: {message: mqChatFanyi[1]}}
	}

	oForm_.find('[type="submit"]').on('click', function(){
      oForm_.bootstrapValidator('validate');
      if(!oForm_.data('bootstrapValidator').isValid()) return;
  
      var name = oForm_.find('[name="name"]').val(),
        phone = oForm_.find('[name="phone"]').val(),
        email = oForm_.find('[name="email"]').val(),
        quantity = oForm_.find('[name="quantity"]').val(),
        contents = oForm_.find('[name="contents"]').val(),
        sendMsg_ = '',
        idType = 3,
        formData = new FormData();

        formData.set('idType', idType);
        formData.set('isattach', 0);
        formData.set('pages', location.href);

        if(name){
          sendMsg_ = sendMsg_ + mqChatFanyi[2] + ": "+ name;
          formData.set('name', name)
        }
        if(phone){
          sendMsg_ = sendMsg_ + "\n" + mqChatFanyi[3] + ": "+ phone;
          formData.set('phone', phone)
        }
        if(email){
          sendMsg_ = sendMsg_ + "\n" + mqChatFanyi[4] + ": "+ email;
          formData.set('email', email)
        }
        if(quantity){
          sendMsg_ = sendMsg_ + "\n" + mqChatFanyi[10] + ": "+ quantity;
          formData.set('quantity', quantity)
        }
        if(contents){
          sendMsg_ = sendMsg_ + "\n" + mqChatFanyi[5] + ": "+ contents;
          formData.set('contents', contents)
        }

      if(!glxp_){
        oBody.removeClass('show-form')
        sessionStorage.setItem("mqChat-form", true)
        c2b(1, sendMsg_)
        return;
      }
      
      // 判断是否开启腾讯验证
      if(get_siteInfo(['seo','verifyCode']) == 'OPEN' ) tx_submit(formData,sendMsg_);
      else submit(formData,sendMsg_)
      
    })
    oForm_.bootstrapValidator({
      feedbackIcons: {
        valid: 'icon-checkmark',
        invalid: 'icon-cancel3',
        validating: 'icon-refresh'
      },
      fields: {
        name: {
          validators: name_
        },
        phone: {
          validators: phone_
        },
        contents: {
          validators: contents_
        },
        email: {
          validators: email_
        }
      }
    })

    function tx_submit(formData,sendMsg_){
		loadTCaptchaNew(inquiry_submit, {
			formData: formData,
			sendMsg_: sendMsg_
		}, 2);
	}
	function inquiry_submit(formData,sendMsg_){
		console.log('mq1' ,formData)
      var ajax_config = {
        type: 'POST',
        data: formData,
        url: '/inquire/start-tx-captcha',
        dataType: 'json',
        cache: false,
        async: false,
        success: function (json) {
          if(json.status == 0){
            if(json.data.validate){
              new TencentCaptcha(json.data.key, function (reson) {
                if (reson.ret) {
                  // 验证失败或取消验证，恢复提交按钮
                  formData = ""
                  return
                }
                formData.set('ticket', reson.ticket);
                formData.set('random', reson.randstr);
                
                submit(formData,sendMsg_);
                
              }, {bizState: '自定义透传参数'}).show();
            }else submit(formData,sendMsg_);
          }else alert(json.msg);
        },
        error:function(){
          alert('请求网络失败');
        }
      };

      ajax_config.processData = false;
      ajax_config.contentType = false;
      
      $.ajax(ajax_config);
    }

    function submit(formData,sendMsg_){
      formData.set('page_title', document.title)
      formData.set('page_keywords', $('meta[name="keywords"]').attr('content'))
      formData.set('is_ajax', 'true');	// 异步方式提交询盘
      formData.set('auth_ver', 3);	// 告诉后端用的是腾讯验证
      formData.set('subject', formData.get('name'));
      $.ajax({
        type: "post",
        url: "/inquire/list",
        data: formData,
        dataType: "text",
        cache: false,
        processData: false,	// 不处理数据
        contentType: false,	// 不设置内容类型
        success: function(_return){
          var re = JSON.parse(_return.trim());
          switch(re.error){
            case 0:
              oBody.removeClass('show-form');
              sessionStorage.setItem("mqChat-form", true);
              sendMsg_ = sendMsg_ + "\n" + "Msg ID: " + re.msg_id;
              c2b(1, sendMsg_);
              var $iframe = $('<iframe src="/inquire/success" style="height:0;overflow:hidden;border:none;position:absolute;z-index:-1;"></iframe>');
              // chrome GA
              window['gtag'] && typeof window['gtag'] == 'function' && window['gtag']('event', 'click', {
                'event_category': '个人信息发送',
                'event_label': '询盘提交',
                'value': 'Chat online'
              });
              if(window.location.search == '?chat=1') window.location.href = '/inquire/success'
              else $(document.body).append($iframe);
              break;
            case 1:
              alert(mqChatFanyi[7])
              break;
            case 3:
              alert(mqChatFanyi[8])
              break;
            default:
              alert("SEND FAIL")
              break;
          }
        },
        error: function(err){ console.log(err) }
      })
    }
  }
})
	
