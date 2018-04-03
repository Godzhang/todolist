//index.js
//获取应用实例
const app = getApp()

import { showWarn, judgeCustomTime } from '../../utils/util';
import { EXAMPLE, IMG_LIST } from '../../utils/constants';

Page({
    data: {
        list: [],
        isAddNewTask: false
    },
    onLoad: function () {
        this.setData({
            list: this.data.list.concat(EXAMPLE)
        });
        this.task = this.selectComponent("#task-box");
    },
    _closeTaskBox(){
        this.setData({
            isAddNewTask: false
        });
        this.task.reset();
    },
    _getNewList(e){
        let newItem = e.detail,
            newList = this.data.list.concat(newItem);
        
        this.setData({
            list: newList
        });
    },
    //打开任务添加栏
    showTaskBox(){
        this.setData({
            isAddNewTask: true
        });
    },
    //添加新任务
    // addNewTaskBox(){
    //     let data = this.data,
    //         taskName = data.taskName;      
        
    //     //如果未输入待办名称，提示错误
    //     if(taskName.length === 0){
    //         showWarn('请输入待办名称');
    //         return;
    //     }
        
    //     let newList = this.getNewList();
        
    //     this.setData({
    //         list: newList
    //     });
    //     this.closeTaskBox();
    // },
    //更新列表
    // getNewList(){
    //     let imgIndex = app.globalData.imgIndex,
    //         data = this.data,
    //         taskName = data.taskName,
    //         minutes = null;

    //     //判断计时方式
    //     if(data.bellIndex === 0){
    //         minutes = data.minutesList[data.minutesIndex];
    //     }else if(data.bellIndex === 1){
    //         minutes = '正计时';
    //     }else{
    //         minutes = '普通代办';
    //     }

    //     let newList = this.data.list.concat([{
    //         imgSrc: IMG_LIST[imgIndex],
    //         title: taskName,
    //         type: data.taskTypeList[data.taskTypeIndex],
    //         time_mode: data.bellList[data.bellIndex],
    //         minutes: minutes
    //     }]);

    //     if(imgIndex === IMG_LIST.length - 1){
    //         app.globalData.imgIndex = 0;
    //     }else{
    //         app.globalData.imgIndex++;
    //     }

    //     return newList;
    // },
    //设置自定义时间
    addCustomTime(){
        let time = parseInt(this.data.customTime);

        judgeCustomTime(time, () => {
            let ct = time + '分钟';

            this.setData({
                isShowCustomBox: false,
                minutesList: ['25分钟', '35分钟', ct],
                customClass: ''
            });
        });        
    },
    //长按事件
    longpress(e){
        let self = this;

        wx.showActionSheet({
            itemList: ['删除'],
            success(res){
                let index = res.tapIndex,
                    list = self.data.list.concat(),
                    itemIndex = e.target.dataset.index;

                if(index === 0){
                    list.splice(itemIndex, 1);
                }

                self.setData({
                    list: list
                });
            }
        });
    },
    startTask(){

    }
})
