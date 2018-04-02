export function showWarn(title, duration){
    wx.showToast({
        title: title,
        image: '../../images/warn.png',
        duration: duration || 1000
    });
}