$(document).ready(function(){
    //下拉列表部分
    $(".menu-banner").hover(function () {
        $(this).children("ul").stop().slideToggle();
    });
    //点击滚动部分
    $(".menu-banner").children("ul").children("li").
    each(function(index,elem){
        $(elem).on("click",function(){
            $.scrollTo("#jq-box>li:eq("+index+")",1500);
        });
    });

    //星座运势部分
    var starArr = [9,7,5,3,3,8,7,6,9,10,8,6];
    var xzctArr = ["白羊座运势","金牛座运势","双子座运势","巨蟹座运势","狮子座运势","处女座运势","天秤座运势","天蝎座运势","射手座运势","摩羯座运势","水平座运势","双鱼座运势"]; 
    var myDt = new Date();
    var currentDt = myDt.toLocaleDateString();
    var m = myDt.getMonth() + 1; 
    var d = myDt.getDate();
    var opIndex = getAstro(m,d);
    $("#cdt").html(currentDt);
    $("option")[opIndex].selected = true;
    $("#xzContent").html(xzctArr[opIndex]);
    $("#stPic").css("width",starArr[opIndex]*8+"px");
    $(".icon").on("change","#sele",function(){
        $("#xzPic").css("background-position","0 -"+$(this).val()*50+"px");
        $("#stPic").css("width",8*starArr[$(this).val()]+"px");
        $("#xzContent").html(xzctArr[$(this).val()]);
    });
    //根据日期得到星座索引号
    function getAstro(m,d){    
            var arr=[20,21,22,23,23,23,24,23,22,20,19,21];
            if(m>=4){
                return m-(d<arr[m-1]?4:3);
            }
            else
                return m+12-(d<arr[m-1]?4:3);
    }
    //星级评价
    var wjx_none = '☆',wjx_sel = '★';
    var msgTxt = ['看来您真的很不满意~','两颗星也太少了吧~','再考虑下吧，辛苦了~','感谢您的评价，我们再接再厉！','哇，太棒了，期待下次光临！'];
    $(".comment li").on({
      mouseenter:function(){
      $(this).text(wjx_sel)
             .prevAll()
             .text(wjx_sel)
             .end()
             .nextAll()
             .text(wjx_none);},
      click:function(){
      $(this).text(wjx_sel)
             .addClass("clicked")
             .prevAll()
             .text(wjx_sel)
             .end()
             .nextAll()
             .text(wjx_none);
      $(this).siblings()
             .removeClass("clicked")
      $('.star-msg').text(msgTxt[$(this).index()])},
      mouseleave:function(){
      $(".comment li").text(wjx_none);
      $(".clicked").text(wjx_sel)
                   .prevAll()
                   .text(wjx_sel)
                   .end()
                   .nextAll()
                   .text(wjx_none);
      }});

    //鼠标跟随效果
    $(document).on({mousemove: function (e) {
        $(".icon-mouse").offset({
            "top": e.pageY-$(".icon-mouse").height()/2,
            "left": e.pageX-$(".icon-mouse").width()/2
        }).css("display","block")
      },
       mouseleave:function(){
          $(".icon-mouse").css("display","none");
       }
    });

    var js_slider = $("#js_slider");
    var slider_main_block = $("#slider_main_block");
    var block_child = slider_main_block.children();
    var slider_ctrl = $("#slider_ctrl");
    //创建span
    block_child.each(function(index,value){
        var $span = $("<span></span>");
        $span.addClass('slider-ctrl-con')
             .insertBefore('#slider_ctrl>span:eq(1)');
    })

    var scWidth = js_slider.width();
    //图片1在当前位置 其他图片在右边
    $("#slider_main_block > div:gt(0)").css('left',scWidth+"px");
    $("#js_slider").on({
        'mouseenter':function(){
            $('.slider-ctrl-prev').show();
            $('.slider-ctrl-next').show();
    },
        'mouseleave':function(){
            $('.slider-ctrl-prev').hide();
            $('.slider-ctrl-next').hide();
    }});

    var iNow = 0;
    var $spans = slider_ctrl.children();
    $spans.eq(1).addClass('current');
    $spans.each(function(index,value){
        $(value).on('click',function(){
            if($(this).attr('class') == 'slider-ctrl-prev'){
                block_child.eq(iNow).animate({left: scWidth+"px"},500);
                --iNow < 0 ?  iNow = block_child.length - 1 : iNow;
                block_child.eq(iNow).css('left',-scWidth+"px");
                block_child.eq(iNow).animate({left: 0},500);
                setSquare();
            }else if($(this).attr('class') == 'slider-ctrl-next'){
                autoplay();
            }else{
                var $that = $(this).index() - 1;
                if($that > iNow){
                    block_child.eq(iNow).animate({left: -scWidth+"px"},500);
                    block_child.eq($that).css('left',scWidth+"px");
                }
                else if($that < iNow){
                    block_child.eq(iNow).animate({left: scWidth+"px"},500);
                    block_child.eq($that).css('left',-scWidth+"px");
                }
                iNow = $that;
                block_child.eq(iNow).animate({left: 0},500);
                setSquare();
            }
        });
    });
    //  控制span样式
    function setSquare() {
        $spans.removeClass('current').eq(iNow + 1).addClass('current');
    }
    function autoplay(){
        block_child.eq(iNow).animate({left: -scWidth+"px"},500);
        ++iNow > block_child.length - 1 ?  iNow = 0 : iNow;
        block_child.eq(iNow).css('left',scWidth+"px");
        block_child.eq(iNow).animate({left: 0},500);
        setSquare();
    }
    var timer = null;
    timer = setInterval(autoplay,2000);

    js_slider.on({
        'mouseenter':function(){
            clearInterval(timer);
        },
        'mouseleave':function(){
            clearInterval(timer);
            timer = setInterval(autoplay,2000);
        }
    });
});

//好友列表数据
var friendsList = ['小鱼', '小张', '背头', '阿茆','小海'];

//表情数据
var userFaces = { '0.gif': '微笑', '1.gif': '撇嘴', '2.gif': '色', '3.gif': '发呆', '4.gif': '得意', '5.gif': '流泪', '6.gif': '害羞', '7.gif': '闭嘴', '8.gif': '睡', '9.gif': '大哭', '10.gif': '尴尬', '11.gif': '发怒', '12.gif': '调皮', '13.gif': '呲牙', '14.gif': '惊讶', '15.gif': '难过', '16.gif': '酷', '17.gif': '冷汗', '18.gif': '抓狂', '19.gif': '吐', '20.gif': '偷笑', '21.gif': '可爱', '22.gif': '白眼', '23.gif': '傲慢', '24.gif': '饥饿', '25.gif': '困', '26.gif': '惊恐', '27.gif': '流汗', '28.gif': '憨笑', '29.gif': '大兵', '30.gif': '奋斗', '31.gif': '咒骂', '32.gif': '疑问', '33.gif': '嘘', '34.gif': '晕', '35.gif': '折磨', '36.gif': '衰', '37.gif': '骷髅', '38.gif': '敲打', '39.gif': '再见', '40.gif': '擦汗', '41.gif': '抠鼻', '42.gif': '鼓掌', '43.gif': '糗大了', '44.gif': '坏笑', '45.gif': '左哼哼', '46.gif': '右哼哼', '47.gif': '哈欠', '48.gif': '鄙视', '49.gif': '委屈', '50.gif': '快哭了', '51.gif': '阴险', '52.gif': '亲亲', '53.gif': '吓', '54.gif': '可怜', '55.gif': '菜刀', '56.gif': '西瓜', '57.gif': '啤酒', '58.gif': '篮球 ', '59.gif': '乒乓', '60.gif': '咖啡', '61.gif': '饭', '62.gif': '猪头', '63.gif': '玫瑰', '64.gif': '凋谢', '65.gif': '示爱', '66.gif': '爱心', '67.gif': '心碎', '68.gif': '蛋糕', '69.gif': '闪电', '70.gif': '炸弹', '71.gif': '刀', '72.gif': '足球', '73.gif': '瓢虫', '74.gif': '便便', '75.gif': '月亮', '76.gif': '太阳', '77.gif': '礼物', '78.gif': '拥抱', '79.gif': '强', '80.gif': '弱', '81.gif': '握手', '82.gif': '胜利', '83.gif': '抱拳', '84.gif': '勾引', '85.gif': '拳头', '86.gif': '差劲', '87.gif': '爱你', '88.gif': 'NO', '89.gif': 'OK', '90.gif': '爱情', '91.gif': '飞吻', '92.gif': '跳跳', '93.gif': '发抖', '94.gif': '怄火', '95.gif': '转圈', '96.gif': '磕头', '97.gif': '回头', '98.gif': '跳绳', '99.gif': '挥手', '100.gif': '激动', '101.gif': '街舞', '102.gif': '献吻', '103.gif': '左太极', '104.gif': '右太极', '105.gif': '淡定', '106.gif': '晕', '107.gif': '不满', '108.gif': '睡觉', '109.gif': '小调皮', '110.gif': '咒骂', '111.gif': '发怒', '112.gif': '偷笑', '113.gif': '微笑', '114.gif': '震惊', '115.gif': '囧' };

window.onload = function () {
        bindSendBtnHover();

        //插入话题
        bindInsertTopic();

        //at somebody
        bindAtSomeClick();

        bindFace();

        bindTxtChange();
};

function bindTxtChange() {
    $("#msgTxt").change(function () {
        checkMsgTxt();
    }).keyup(function () {
        checkMsgTxt();
    });

    function checkMsgTxt() {
        var $msgTxt = $("#msgTxt"),str;
        str = $msgTxt.val();
        
        if (str.length > 140) {
            $(".countTxt").html("超过字数：<em>"+(str.length -140) +"</em>字数");
        } else {
            $(".countTxt").html("您还能输入<em>"+(140-str.length)+"</em>字")
        }
    }
}

function bindFace() {
    //insertFace  funBox
    //创建表情div层
    var strHtml = "",
        divFaceImg,
        i,
        $insertFaceSpan,
        $domDivFace;
    strHtml = "<div id='faceImgDiv'>";
    for (i in userFaces) {
        strHtml += "<img src='faces/" + i + "' alt='" + userFaces[i] + "' />";
    }
    strHtml += "</div>"

    $insertFaceSpan = $("#funBox .insertFace");
    $domDivFace = $(strHtml);
    $domDivFace.appendTo($insertFaceSpan);

    $domDivFace.css("left", $insertFaceSpan.offset().left)
        .css("top",$insertFaceSpan.offset().top + 16+ "px")
        .hide()
        .children("img").click(function () {
            $("#msgTxt").val($("#msgTxt").val()+"["+$(this).attr("alt")+"]");
        });
    $("#funBox .insertFace").hover(function () {
        $("#faceImgDiv").show();
    }, function () {
        $("#faceImgDiv").hide();
    });
}

function bindAtSomeClick() {
    var str = "",
        i = 0,
        createDom;

    str += "<div id='friendDiv'>";
    for (; i < friendsList.length; i++) {
        str += "<span>@" + friendsList[i] + "</span>";
    }
    str += "</div>";
    //创建弹出来的dom对象
    createDom = $(str);
    $("a.atSome").append(createDom);

    createDom.css("left", $("a.atSome").offset().left + "px")
        .css("top", $("a.atSome").offset().top + 16 + "px")
        .hide()
        .children("span").click(function () {
             $("#msgTxt").val($("#msgTxt").val() + $(this).text());
        });

    $("a.atSome").hover(function () {       

        $("#friendDiv").show();

    },function () {
        $("#friendDiv").hide();
    });
    
}

//插入话题
function bindInsertTopic () {
    $("a.creatNew").click(function  () {
        var old  = $("#msgTxt").val( );
        old+="#插入话题#";
        $("#msgTxt").val(old); 
    });
}

//绑定  鼠标移动上来改变 背景图片
function bindSendBtnHover () {
    $("#sendBox input.sendBtn").hover(function (e) {
        //移动上来
        $(this).addClass("sendBtnHover");
    },function  () {
        //离开的时候
        $(this).removeClass("sendBtnHover");
    });
}