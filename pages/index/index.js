//index.js
//获取应用实例
const app = getApp()

import { EXAMPLE } from '../../utils/constants';

Page({
    data: {
        list: [],
        isAddNewTask: false,
        backFillData: ''
    },
    onLoad: function () {
        this.setData({
            list: this.data.list.concat(EXAMPLE)
        });
        // this.task = this.selectComponent("#task-box");
    },
    _closeTaskBox(){
        this.setData({
            isAddNewTask: false
        });
        // this.task.reset();
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
    //长按事件
    longpress(e){
        let self = this,
            itemData = e.target.dataset.item;

        wx.showActionSheet({
            // itemList: ['编辑', '删除'],
            itemList: ['删除'],
            success(res){
                let index = res.tapIndex,
                    list = self.data.list.concat(),
                    itemIndex = e.target.dataset.index;

                // if(index === 0){
                //     self.backFill(itemData);                    
                // }else if(index === 1){
                //     list.splice(itemIndex, 1);
                // }
                if(index === 0){
                    list.splice(itemIndex, 1);
                }

                self.setData({
                    list: list
                });
            }
        });
    },
    backFill(data){
        this.setData({
            isAddNewTask: true,
            backFillData: data
        });
    },
    startTask(){

    }
})
