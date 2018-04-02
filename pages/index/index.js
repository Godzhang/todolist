//index.js
//获取应用实例
const app = getApp()

import { showWarn } from '../../utils/util';

Page({
    data: {
        list: [],
        example: [{
            imgSrc: '../../images/bg/1.jpg',
            type: 'bell',
            title: '示例——看书(长按删除)',
            time_mode: 'countdown',
            minutes: 25
        },{
            imgSrc: '../../images/bg/2.jpg',
            type: 'bell',
            title: '示例——锻炼(长按删除)',
            time_mode: 'countdown',
            minutes: 25
        },{
            imgSrc: '../../images/bg/3.jpg',
            type: 'bell',
            title: '示例——工作(长按删除)',
            time_mode: 'countdown',
            minutes: 25
        },{
            imgSrc: '../../images/bg/4.jpg',
            type: 'bell',
            title: '示例——玩游戏(长按删除)',
            time_mode: 'countdown',
            minutes: 25
        }],
        isAddNewTask: true,
        isShowCustomBox: false,
        labelClass: '',
        customClass: '',
        customTime: '',
        taskName: '',

        taskTypeIndex: 0,
        taskTypeList: ['普通番茄钟', '定目标', '养习惯'],
        
        bellIndex: 0,
        bellList: ['倒计时', '正计时', '不计时'],

        minutesIndex: 0,
        minutesList: ['25分钟', '35分钟', '自定义']
    },
    onLoad: function () {
        this.setData({
            list: this.data.list.concat(this.data.example)
        });
        
    },
    //根据输入框字数改变文字提示的样式
    changeLabelClass(e){
        let content = e.detail.value,
            labelClass = null;
        if(content.length === 0){
            labelClass = '';
        }else if(content.length > 0){
            labelClass = e.target.dataset.class;
        }
        this.setData({
            labelClass: labelClass,
            taskName: content
        });
    },
    changeCustomClass(e){
        let content = e.detail.value,
            customClass = null;
        if(content.length === 0){
            customClass = '';
        }else if(content.length > 0){
            customClass = e.target.dataset.class;
        }
        this.setData({
            customClass: customClass,
            customTime: content
        });
    },
    //打开任务添加栏
    showTaskBox(){
        this.setData({
            isAddNewTask: true
        });
    },
    //关闭任务添加栏
    closeTaskBox(){
        this.setData({
            isAddNewTask: false,
            taskTypeIndex: 0,
            bellIndex: 0,
            minutesIndex: 0
        });
    },
    //添加新任务
    addNewTaskBox(){
        let data = this.data,
            taskName = data.taskName,
            list = data.list;

        if(taskName.length === 0){
            showWarn('请输入待办名称');
            return;
        }
        list.push({
            imgSrc: ''
            taskName: taskName,
            taskType: data.taskTypeIndex,
            taskMode: data.bellIndex,
            taskTime: data.minutesIndex
        });
        this.closeTaskBox();
    },
    //点击切换tab
    changeTab(e){
        let index = e.target.dataset.index;
        this.setData({
            taskTypeIndex: index
        });
    },
    changeBell(e){
        let index = e.target.dataset.index;
        this.setData({
            bellIndex: index
        });
    },
    changeMinutes(e){
        let list = this.data.minutesList,
            index = e.target.dataset.index;
        if(index === 2){
            this.setData({
                isShowCustomBox: true
            })
        }
        this.setData({
            minutesIndex: index
        });
    },
    addCustomTime(){
        let time = parseInt(this.data.customTime);
        if(time && time <= 150 && time > 0){
            let ct = time + '分钟';

            this.setData({
                isShowCustomBox: false,
                minutesList: ['25分钟', '35分钟', ct],
                customClass: ''
            });
        }else if(time > 150){
            showWarn('不能超过150分钟');
        }else if(time < 0){
            showWarn('分钟不能为负数');
        }else{
            showWarn('请输入正确格式');
        }
    }
})
