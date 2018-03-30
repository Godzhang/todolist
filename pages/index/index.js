//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        list: [],
        example: [{
            imgSrc: '../../images/bg/1.jpg',
            type: 'bell',
            title: '示例——看书',
            time_mode: 'countdown',
            minutes: 25
        },{
            imgSrc: '../../images/bg/2.jpg',
            type: 'bell',
            title: '示例——锻炼',
            time_mode: 'countdown',
            minutes: 25
        },{
            imgSrc: '../../images/bg/3.jpg',
            type: 'bell',
            title: '示例——工作',
            time_mode: 'countdown',
            minutes: 25
        },{
            imgSrc: '../../images/bg/4.jpg',
            type: 'bell',
            title: '示例——玩游戏',
            time_mode: 'countdown',
            minutes: 25
        }],
        isAddNewTask: true
    },
    onLoad: function () {
        this.setData({
            list: this.data.list.concat(this.data.example)
        });
        
    }
})
