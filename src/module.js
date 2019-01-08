define(function (require, exports, module) {
  var moduleCommon = require('common');
  var fireWork = require('firework');
  var selfModuleName = 'lottery';
  var beginTimer; //开始抽奖
  var stopTimer; //停止抽奖
  var luckTimer;
  var scrollRange;
  var liWidth;
  var luckState = true; //抽奖状态
  var isLuck = ""; //中奖号
  var luckNumber; //抽奖次数
  var luckNumberList = 1;
  var luckLevel; //等级ID
  var showLevel; //等级名称
  var autoLuck = false; //自动抽奖
  var selectNumber = 1; //保存上一次抽奖人的数量,
  var luckScrollTime = 30;
  var stopLuckTime; //强制停止抽奖
  var luckUl = $("#luck_user ul");
  var deleteLuckUser = '';
  var lotteryPrize = $("#lottery .select-prize .selected")
  var lotteryNumber = $("#lottery .select-number .selected");
  var isShowMore = false;//是否大屏显示中奖用户列表
  var prizeName;
  var removeLotteryUser = 0;
  var isLucking = false; //是否是在抽奖中, 如果是在抽奖中, 则不允许删除中奖用户
  var moduleId = $('#lottery').data('moduleid');
  var activeModule = false;
  exports.init = function () {
    $(window).resize(function () {
      setPara();
    });
    setPara();
    $('#lottery .icon-more').click(function () {
      if (!isShowMore) {
        $('#lottery .right').addClass('right-fullscreen');
        $('#lottery .left').hide();
        isShowMore = true;
      } else {
        $('#lottery .right').removeClass('right-fullscreen');
        $('#lottery .left').show();
        isShowMore = false;
      }
    });


    $('body').on('active', function () {
      $('#beginLuck').click(function () {
        isAuto();
      });
      $('#stopLuck').click(function () {
        if (lotteryNumber.attr('data-amount') == 1) {
          stopLuck();
        }
      });
      $('#removeLottery').click(function () {
        removeLottery();
      });
      $('#submitLottery').click(function () {
        SubmitLotteryFans();
      });
      $('#luckUl').on('click', 'li a', function () {
        deleteThis($(this), $(this).parent().data('level'));
      });
      getLotteryAward();
    });
    $('body').on('modulechange', function (e, moduleName) {
      if (moduleName == selfModuleName) {
        $('#lottery').show();
        if (!activeModule) {
          getConfig();
          activeModule = true;
        }
        //快捷键操作
        //常用的keyCode  空格键：32  enter：13   alt：18   delete：46
        //滚动抽奖快捷键  单人开始停止 （开始空格，停止回车），确认名单（ALT+回车），重新抽奖（ALT+delete）
        $('body').keydown(function (e) {
          if (e.keyCode == 32 && activeModule && $('#beginLuck').css('display') != 'none' && $('#lottery').css('display') == "block") {
            isAuto();
            console.log("按了开始抽奖")
          }
          if (e.keyCode == 13 && activeModule && $('#stopLuck').css('display') != 'none' && $('#lottery').css('display') == "block") {
            console.log("按了停止抽奖")
            stopLuck();
          }
          if (e.altKey && e.keyCode == 13 && activeModule && !$('#submitLottery').hasClass('gray') && $('#lottery').css('display') == "block") {
            SubmitLotteryFans();
            console.log("按了确认名单")
          }
          if (e.altKey && e.keyCode == 46 && activeModule && !$('#removeLottery').hasClass('gray') && $('#lottery').css('display') == "block") {
            removeLottery();
            console.log("按了重新抽奖")
          }
        });
      } else {
        $('#lottery').hide();
        activeModule = false;
      }
    });
  };

  var setPara = function () {
    if ($(window).width() < 1920) {
      liWidth = 190;
      scrollRange = 190;
    } else {
      liWidth = 270;
      scrollRange = 270;
    }
    luckUl.find('li').width(liWidth);
    luckUl.width(luckUl.find('li').length * liWidth);
  }

  var getConfig = function () {
    $.extendGetJSON(moduleCommon.httpURL + $("#GetConfig").val(), {'moduleId': moduleId}, function (data) {
      removeLotteryUser = data.KXD_Lottery_WinnerWay;
      getLottery();
    }, function () {
      moduleCommon.showInfo("加载失败,请重试!");
      moduleCommon.loaded();
    });
  }

  //获取奖品信息和对应中奖用户
  var getLotteryAward = function () {
    $.extendGetJSON(moduleCommon.httpURL + $("#GetLotteryAward").val(), {}, function (data) {
      if (data.length > 0) {
        $('#lottery .prize').empty();
        $("#luckUl").empty();
        $(data).each(function (index, element) {
          $('#lottery .prize').append('<li data-prizeid="' + element.Id + '" data-prizename="' + element.PrizeName + '" data-name="' + element.Name + '" data-amount="' + element.Count + '">' + element.Name + ' <span>剩<label>' + element.Count + '</label>名</span></li>');
          if (element.Fans.length > 0) {
            if ($("#luckUl").find("#level_" + element.Id).length < 1) {
              $("#luckUl").append("<div id=level_" + element.Id + " class='level'><label>" + element.Name + "：<a></a></label><ul></ul></div>");
            }
            $(element.Fans).each(function (i, ele) {
              $("#level_" + element.Id).find("ul").prepend('<li class="submited" data-hasluck="1" data-level="' + element.Id + '"><img onerror="imgError(this);" src="' + ele.Head + '"><span>' + ele.NickName + '</span></li>');
            });
            var _length = $('#level_' + element.Id + ' li').length;
            $('#level_' + element.Id + ' label a').text(_length);
            $('#luckNumber').html($('#luckUl li').length);
          }
        });
      }
    }, function () {
      moduleCommon.showInfo("加载失败,请重试!");
      moduleCommon.loaded();
    });
  };

  //获取用户
  var getLottery = function () {
    moduleCommon.loading('数据加载中,请稍后');
    luckUl.html('');
    isLuck = '';
    $.extendGetJSON(moduleCommon.httpURL + $("#GetLotteryFans").val(), {'isGetAll': 'False'}, function (data) {
      if (removeLotteryUser == 0) {
        $.extendGetJSON(moduleCommon.httpURL + $("#GetFansWinnerRecord").val(), {'isGetAll': 'False'}, function (data2) {
          setlotteryUser(moduleCommon.removeLotteryedUser(data, data2));
        });
      } else {
        setlotteryUser(data);
      }
      moduleCommon.loaded();
    }, function () {
      luckUl.html("");
      moduleCommon.showInfo("加载失败,请重试!");
      moduleCommon.loaded();
    });
  };

  var setlotteryUser = function (data) {
    if (data.length > 0) {
      if (data.length > 50) {
        luckScrollTime = 1;
      }
      $("#luck .active_num span").html(data.length);
      $(data).each(function (index, element) {
        if ($("#lottery [data-isluck=" + element.Id + "]").size() == 0) {
          var str = '<li data-headpath="' + element.HeadPath + '" data-userid="' + element.Id + '"><img src="' + element.Head + '"><br><span>' + element.NickName + '</span></li>';
          luckUl.append(str);
        }
      });
      luckUserList();
    }
  };
  ///////////////////////////////////////////////////////////////////////////////抽奖
  //复制用户列表(滚动)
  var luckUserList = function () {
    luckUl.css("width", $("#luck_user").find("li").length * liWidth * 2);
    luckUl.append(luckUl.html());
  };
  //移除重复标签，用于增加新的用户
  var removeUserList = function () {
    luckUl.find("li").each(function (index, element) {
      if ($(this).index() + 1 > luckUl.find("li").length / 2) {
        $(this).remove();
      }
    });
  };

  var isAuto = function () {
    if (lotteryNumber.attr('data-amount') > 1) {
      autoLuck = true;
      luckNumberList = lotteryNumber.attr('data-amount');
      selectNumber = lotteryNumber.attr('data-amount');
    } else {
      autoLuck = false;
      selectNumber = 1;
      luckNumberList = 1;
    }
    luckLevel = lotteryPrize.attr("data-prizeid");
    levelMaxNum = lotteryPrize.attr("data-amount") * 1;
    luckNumber = lotteryNumber.attr('data-amount') * 1;
    prizeName = lotteryPrize.attr("data-prizename");
    showLevel = lotteryPrize.html();
    if (isLuck != "") {
      luckUl.find('li[data-userid=' + isLuck + ']').remove();
      luckUl.width(luckUl.width() - liWidth * 2); //移除已中奖人后重新设置宽度
      isLuck = "";
    }
    //判断是否有需要回到奖池的用户
    if (deleteLuckUser != '') {
      removeUserList();
      luckUl.append(deleteLuckUser);
      luckUserList();
      deleteLuckUser = '';
    }
    if ($('#luck_user li').length < 0) {
      moduleCommon.showInfo('当前还没有人参加活动');
      return false;
    }
    if ($("#luck_user li").length == 2) {
      $("#luck_user ul li:last").remove();
      luckUl.width(liWidth);
      luckUl.css('left', liWidth + 'px');
    }
    if (luckLevel == 0) {
      moduleCommon.showInfo("请选择抽奖等级");
      return false;
    }
    $('#test').val(luckNumberList);
    if (luckNumberList * 1 > levelMaxNum) {
      moduleCommon.showInfo("亲，奖品没那么多!");
      return false;
    }

    if (isLuck != "" && luckNumber > Math.max(1, $("#luck_user li").length / 2 - 1)) {
      moduleCommon.showInfo("抽奖人数不够!");
      return false;
    } else if (luckNumber > Math.max(1, $("#luck_user li").length / 2)) {
      moduleCommon.showInfo("抽奖人数不够!");
      return false;
    }
    beginLuck();
  };
  var beginLuck = function () {  //key 0:只抽一个人奖 1:自动抽奖
    isLucking = true;
    stopLuckTime = 0;
    $('#lottery #luck_user li').removeClass('lock-li');
    $('.userList').addClass('began');
    if (autoLuck == true) {
      $("#stopLuck").hide();
      $("#beginLuck").hide();
      $("#luckIng").show();
      $("#luckIng span").text(luckNumberList);
      setTimeout(function () {
        stopLuck(luckNumberList);
      }, 3000);
    }
    if (luckState) {
      if (!autoLuck) {
        $("#stopLuck").show();
        $("#beginLuck").hide();
      }
      if (isLuck != '') {
        luckUl.find('li[data-userid=' + isLuck + ']').remove();
        luckUl.width(luckUl.width() - liWidth * 2); //移除已中奖人后重新设置宽度
      }
      //判断奖池是否已经没人了
      if ($("#luck_user li").length == 0) {
        moduleCommon.showInfo("已经没有人了!");
        $("#stopLuck").hide();
        $("#beginLuck").show();
        return false;
      }
      $('#lottery .condition').addClass('disabled');
      if ($("#luck_user li").length == 1) {
        luckUl.width(liWidth);
        luckUl.css('left', liWidth + 'px');
      }
      if ($("#luck_user li").length == 2) {
        $("#luck_user li:last").remove();
        luckUl.width(liWidth);
        luckUl.css('left', liWidth + 'px');
      }
      if ($("#luck_user li").length > 2) {
        beginTimer = setInterval(function () {
          luckUl.css({left: -scrollRange});
          scrollRange = scrollRange + 50;
          if (scrollRange >= luckUl.width() / 2) {
            luckUl.css("left", -scrollRange + luckUl.width() / 2);
            scrollRange = liWidth;
          }
          stopLuckTime = stopLuckTime + 50;
          if (autoLuck == true && stopLuckTime > 150000) {
            clearInterval(beginTimer);
            stopLuck(luckNumberList);
          }
        }, 10);
      }
    } else {
      moduleCommon.showInfo("抽奖进行中...");
    }
  };

  //停止抽奖
  var stopLuck = function () {
    clearInterval(beginTimer);
    clearInterval(stopTimer);
    luckState = false;
    $("[data-prizeid=" + luckLevel + "]").find("label").html($("[data-prizeid=" + luckLevel + "]").find("label").html() * 1 - 1);
    $("[data-prizeid=" + luckLevel + "]").attr('data-amount', $("[data-prizeid=" + luckLevel + "]").find("label").html() * 1);
    if (!autoLuck) {
      $("#beginLuck").show();
      $("#stopLuck").hide();
    }
    var i = 10; //速度递减
    var j = 2; //时间控制
    if ($("#luck_user li").length > 1) {
      stopTimer = setInterval(function () {
        luckUl.css({left: -scrollRange});
        var stopRange = Math.ceil(scrollRange / liWidth) * liWidth;
        if (scrollRange < stopRange && scrollRange + i > stopRange) {
          i = 1;
        } else {
          scrollRange = scrollRange + i;
        }
        j++;
        if (j % 2 == 0) {
          i--;
        }
        if (scrollRange >= parseInt(luckUl.width() - liWidth)) {
          luckUl.css('left', 0);
          scrollRange = 20;
        }
        if (i <= 1) {
          clearInterval(stopTimer);
          stopRange = Math.ceil(scrollRange / liWidth) * liWidth;
          luckTimer = setInterval(function () {
            scrollRange = scrollRange + 1;
            luckUl.css({left: -scrollRange});
            if (scrollRange >= parseInt(luckUl.width() - liWidth)) {
              luckUl.css("left", 0);
              scrollRange = 20;
              stopRange = liWidth;
            }
            // console.log('scrollRange='+scrollRange +', stopRange='+stopRange);
            if (scrollRange == stopRange) {
              clearInterval(luckTimer);
              luckState = true;
              $("#submitLottery").removeClass("gray");
              $("#removeLottery").removeClass("gray");
              /////////////中奖
              var _index = Math.ceil(scrollRange / liWidth) + 1;
              var luckLi = $('#luck_user li:eq(' + _index + ')');

              console.log(luckLi.data('headpath'))
              isLuck = luckLi.data("userid"); //获取中奖data,也就是中奖人的ID啦
              luckLi.addClass('lock-li');
              var imgUl = luckLi.find("img").attr("src");
              var userName = luckLi.find("span").html();
              var headPath = luckLi.data("headpath");
              if ($("#luckUl").find("#level_" + luckLevel).length < 1) {
                $("#luckUl").prepend("<div id=level_" + luckLevel + " class='level'><label>" + showLevel + ":<a></a></label><ul></ul></div>");
              }
              $("#level_" + luckLevel).find("ul").prepend('<li data-hasluck="0" data-awardname="' + showLevel + '" data-prizename="' + prizeName + '" data-headpath="' + headPath + '" data-isluck="' + isLuck + '" data-level="' + luckLevel + '"><a href="javascript:void(0)"></a><img src="' + imgUl + '"><span>' + userName + '</span></li>');

              $("#level_" + luckLevel + " label a").text($("#level_" + luckLevel + " li").length);
              $("#luckNumber").html($("#luckUl li").length);
              if (luckNumberList > 1) {
                luckNumberList--;
                setTimeout(function () {
                  beginLuck();
                }, 0);  //重新抽奖
              } else {
                $("#luck_number").val(selectNumber); //重新赋值给抽奖人数
                $("#luckIng").hide();
                $("#beginLuck").show();
                $('#lottery .condition').removeClass('disabled');
              }
              showLuckAnimate(imgUl, showLevel, userName);
              moduleCommon.tempLotteryUser.push({
                'moduleId': moduleId,
                'fanseId': isLuck,
                'fansNickName': userName,
                'awardId': luckLevel,
                'PrizeName': prizeName,
                'AwardName': showLevel
              });
              moduleCommon.submitTempLottery();
            }
          }, 6);
        }
      }, 30);
    } else {
      setTimeout(function () {
        luckState = true;
        $("#luckIng").hide();
        $("#beginLuck").show();
        $('#lottery .condition').removeClass('disabled');
        $("#submitLottery").removeClass("gray");
        $("#removeLottery").removeClass("gray");
        isLuck = $("#luck_user li").data("userid");
        var imgUl = $("#luck_user li").find("img").attr("src");
        var userName = $("#luck_user li").find("span").html();
        var headPath = $("#luck_user li").data("headpath");
        if ($("#luckUl").find("#level_" + luckLevel).length < 1) {
          $("#luckUl").prepend("<div id=level_" + luckLevel + " class='level'><label>" + showLevel + ":<a></a></label><ul></ul></div>");
        }
        $("#level_" + luckLevel).find("ul").prepend('<li data-hasluck="0" data-awardname="' + showLevel + '" data-prizename="' + prizeName + '" data-headpath="' + headPath + '" data-isluck="' + isLuck + '" data-level="' + luckLevel + '"><a href="javascript:void(0)"></a><img src="' + imgUl + '"><span>' + userName + '</span></li>');

        $("#level_" + luckLevel + " label a").text($("#level_" + luckLevel + " li").length);
        $("#luckNumber").html($("#luckUl li").length);
        $("#luck_number").val(selectNumber); //重新赋值给抽奖人数
        $("#luckIng").css("display", "none");
        showLuckAnimate(imgUl, showLevel, userName);
        moduleCommon.tempLotteryUser.push({
          'moduleId': moduleId,
          'fanseId': isLuck,
          'fansNickName': userName,
          'awardId': luckLevel,
          'PrizeName': prizeName,
          'AwardName': showLevel
        });
        moduleCommon.submitTempLottery();
      }, 1000);
    }
    isLucking = false;
  };
  //删除中奖
  var deleteThis = function (v, luckLevel) {
    if (isLucking) {
      return;
    }
    var li = v.parent();
    if (li.data("hasluck") != 1) {
      deleteLuckUser = deleteLuckUser + '<li data-userid="' + li.attr("data-isluck") + '" data-headpath="' + li.attr("data-headpath") + '"><img src="' + li.find("img").attr("src") + '"><br><span>' + li.find("span").html() + '</span></li>';
      $("[data-prizeid=" + luckLevel + "]").find("label").html($("[data-prizeid=" + luckLevel + "]").find("label").html() * 1 + 1);
      // 邓辉 2016-06-17 22:39
      $("[data-prizeid=" + luckLevel + "]").attr('data-amount', $("[data-prizeid=" + luckLevel + "]").find("label").html() * 1);
      // 邓辉 2016-06-17 22:39
      //添加到需要回到奖池的数组
      _parents = $(v).parents(".level");
      li.remove();
      if (_parents.find("li").length == 0) { //如果本奖项下没人就清除标题
        _parents.remove();
      }
      _parents.find("label a").text(_parents.find("li").length); //更新人数
      $("#luckNumber").html($("#luckUl li").length);
    }
  };

  //重新抽奖
  var removeLottery = function () {
    if (!$("#removeLottery").hasClass("gray")) {
      $("#removeLottery").addClass("gray");
      $("#submitLottery").addClass("gray");
      $("#luckUl li").each(function (index, element) {
        if ($(element).data("hasluck") != 1) {
          deleteLuckUser = deleteLuckUser + '<li data-userid="' + $(element).attr("data-isluck") + '" data-headpath="' + $(element).attr("data-headpath") + '"><img src="' + $(element).find("img").attr("src") + '"><br><span>' + $(element).find("span").html() + '</span></li>';
          $("[data-prizeid=" + $(element).data("level") + "]").find("label").html($("[data-prizeid=" + $(element).data("level") + "]").find("label").html() * 1 + 1);
          // 邓辉 2016-06-17 22:39
          $("[data-prizeid=" + $(element).data("level") + "]").attr('data-amount', $("[data-prizeid=" + $(element).data("level") + "]").find("label").html() * 1);
          // 邓辉 2016-06-17 22:39
          //添加到需要回到奖池的数组
          var _parents = $(element).parents(".level");
          $(element).remove();

          if (_parents.find("li").length == 0) { //如果本奖项下没人就清除标题
            _parents.remove();
          }
          _parents.find("label a").text(_parents.find("li").length); //更新人数
          $("#luckNumber").html($("#luckUl li").length);
        }
      });
    }
  };

  //显示抽奖动画
  var showLuckAnimate = function (imgUl, showLevel, userName) {
    fireWork.show();
    $('#lottery').append('<div class="animate-bg"><div class="light"></div><div class="lottery-animate-bg"><div class="lotteryuserhead"><img src="' + imgUl + '"/></div><div class="level">恭喜<span class="user-name">' + userName + '</span>获得<p class="awards-name">' + showLevel + '</p></div></div></div>');
    setTimeout(function () {
      fireWork.hide();
      $(".animate-bg").animate({"opacity": "0"}, "slow", function () {
        $(".animate-bg").remove();
      });
    }, 2000);
  };
  //提交中奖名单
  var SubmitLotteryFans = function (v) {
    var submitCount = $("#luckUl li[data-hasluck!=1]").size();
    if ($('#submitLottery').hasClass('gray') || submitCount == 0) {
      moduleCommon.showInfo("亲，请先完成抽奖再提交哦!");
      return;
    }
    
    if (!$("#removeLottery").hasClass("gray") && submitCount > 0) {
	  moduleCommon.loading("正在提交，请稍后");
      var submitForm = $('<form/>');
      $("#luckUl li[data-hasluck!=1]").each(function (index, element) {
        submitForm.append('<input name="[' + index + '].Module_Id" type="hidden" value="' + moduleId + '" />');
        submitForm.append('<input name="[' + index + '].Fans_Id" type="hidden" value="' + $(element).data('isluck') + '" />');
        submitForm.append('<input name="[' + index + '].Fans_NickName" type="hidden" value="' + $(element).find('span').text() + '" />');
        submitForm.append('<input name="[' + index + '].AwardId" type="hidden" value="' + $(element).data('level') + '" />');
        submitForm.append('<input name="[' + index + '].PrizeName" type="hidden" value="' + $(element).data('prizename') + '" />');
        submitForm.append('<input name="[' + index + '].AwardName" type="hidden" value="' + $(element).data('awardname') + '" />');
      });
      $.extendPost(moduleCommon.httpURL + $("#SubmitWinnerRecord").val() + '?moduleId=' + moduleId, submitForm.serializeArray(), "json", function (data) {
        var submitForm2 = $('<form/>');
        $("#luckUl li[data-hasluck!=1]").each(function (index, element) {
          if (index < 50) {
            submitForm2.append('<input name="[' + index + '].AwardId" type="hidden" value="' + $(element).data('level') + '" />');
            submitForm2.append('<input name="[' + index + '].FansId" type="hidden" value="' + $(element).data('isluck') + '" />');
            submitForm2.append('<input name="[' + index + '].FansNickName" type="hidden" value="' + $(element).find('span').text() + '" />');
            submitForm2.append('<input name="[' + index + '].FansHead" type="hidden" value="' + $(element).data('headpath') + '" />');
          }
        });
        console.log(submitForm2.serializeArray())
        $.extendPost(moduleCommon.httpURL + $("#SubmitLotteryFans").val(), submitForm2.serializeArray(), "json", function (data) {
          moduleCommon.loaded();
          if (data.ResultType == 1) {
            $("#luckUl li[data-hasluck!=1]").each(function (index, element) {
              if (index < 200) {
                $(this).attr('data-hasluck', 1).addClass('submited').find('a').remove();
              }
            });
            if ($("#luckUl li[data-hasluck!=1]").size() == 0) {
              $("#submitLottery").addClass("gray");
              $("#removeLottery").addClass("gray");
              moduleCommon.showInfo("提交成功", 1);
            } else {
              SubmitLotteryFans();
            }
          } else {
            moduleCommon.showInfo(data.Message);
          }
        }, function () {
          moduleCommon.showInfo('连接超时，请重试!');
        });
      });
    }
  };
});
