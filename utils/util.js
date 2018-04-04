//警告框
export function showWarn(title, duration){
    wx.showToast({
        title: title,
        image: '../../images/warn.png',
        duration: duration || 1000
    });
}
//判断自定义时间
export function judgeCustomTime(time, callback){
	if(time === '' || (time <= 150 && time > 0)){
        callback && callback(time);
    }else if(time > 150){
        showWarn('不能超过150分钟');
    }else if(time < 0){
        showWarn('分钟不能为负数');
    }else{
        showWarn('请输入正确格式');
    }
}
//获取随机数
export function getRandom(min, max){
    return parseInt(Math.random() * (max - min) + min);
}

