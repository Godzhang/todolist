import { showWarn } from '../../utils/util';
import { IMG_LIST } from '../../utils/constants';
//获取应用实例
const app = getApp()

Component({
	properties: {
		existData: {
			type: Object,
			value: null
		}
	},
	data: {
		taskName: '',
		labelClass: '',

		taskTypeIndex: 0,
        // taskTypeList: ['普通番茄钟', '定目标', '养习惯'],
        taskTypeList: ['普通番茄钟'],
        
        bellIndex: 0,
        bellList: ['倒计时', '正计时', '不计时'],

        minutesIndex: 0,
        minutesList: ['25分钟', '35分钟', '自定义'],

        isShowCustomBox: false
	},
	ready(){
		let fillBackData = this.properties.existData,
			data = this.data;

		if(fillBackData == null) return;

		let taskTypeIndex = data.taskTypeList.findIndex(item => item === fillBackData.type),
			bellIndex = data.bellList.findIndex(item => item === fillBackData.time_mode),
			minutesIndex = data.minutesList.findIndex(item => item === fillBackData.minutes),
			taskName = fillBackData.title;

		if(minutesIndex === -1){
			this.setData({
				'minutesList[2]': fillBackData.minutes
			});
			minutesIndex = 2;
		}

		this.setData({
			taskName,
			taskTypeIndex,
			bellIndex,
			minutesIndex
		});

	},
	methods: {
		_reset(){
			this.setData({
				taskTypeIndex: 0,
	            bellIndex: 0,
	            minutesIndex: 0,
	            labelClass: '',
	            taskName: '',
	            minutesList: ['25分钟', '35分钟', '自定义']
			});
		},
		_closeTaskBox(){
			this.triggerEvent('closeTaskBox');
			this._reset();
		},
		_addNewTaskBox(){
	        //如果未输入待办名称，提示错误
	        if(this.data.taskName.length === 0){
	            showWarn('请输入待办名称');
	            return;
	        }
	        
	        let newItem = this._getNewItem();
	        
	        this.triggerEvent('getNewList', newItem);

	        this._closeTaskBox();
		},
		//根据输入框字数改变文字提示的样式
	    _changeLabelClass(e){
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
	    //点击切换tab
	    _changeTab(e){
	        let index = e.target.dataset.index;
	        
	        if(this.data.taskTypeIndex !== index){
				this.setData({
		            taskTypeIndex: index
		        });
	        }		        
	    },
	    //改变计时方式
	    _changeBell(e){
	        let index = e.target.dataset.index;

	        if(this.data.bellIndex !== index){
	        	this.setData({
		            bellIndex: index
		        });
	        }		        
	    },
	    //添加自定义时间
	    //改变后样式无效
	    _setCustomTime(e){
	    	let time = e.detail,
	    		customTime = null;

	    	if(time !== ''){
	    		this.setData({
	    			'minutesList[2]': time + '分钟'
	    		});
	    	}

	    	this.setData({
	            isShowCustomBox: false
	        });
	    },
	    //改变倒计时分钟数
	    _changeMinutes(e){
	        let list = this.data.minutesList,
	            index = e.target.dataset.index;

	        if(this.data.minutesIndex !== index){
	        	if(index === 2){
		            this.setData({
		                isShowCustomBox: true
		            });
		        }
		        this.setData({
		            minutesIndex: index
		        });
	        }		        
	    },
	    _getNewItem(){
	        let imgIndex = app.globalData.imgIndex,
	            data = this.data,
	            taskName = data.taskName,
	            minutes = null;

	        //判断计时方式
	        if(data.bellIndex === 0){
	        	//如果第三个没有输入，仍是‘自定义’三个字，默认为25分钟
	        	if(data.minutesList[data.minutesIndex] === '自定义'){
	        		minutes = data.minutesList[0];
	        	}else{
	        		minutes = data.minutesList[data.minutesIndex];
	        	}	            
	        }else if(data.bellIndex === 1){
	            minutes = '正计时';
	        }else{
	            minutes = '普通代办';
	        }

	        let newItem = [{
	            imgSrc: IMG_LIST[imgIndex],
	            title: taskName,
	            type: data.taskTypeList[data.taskTypeIndex],
	            time_mode: data.bellList[data.bellIndex],
	            minutes: minutes
	        }];

	        if(imgIndex === IMG_LIST.length - 1){
	            app.globalData.imgIndex = 0;
	        }else{
	            app.globalData.imgIndex++;
	        }

	        return newItem;
	    }
	}
});