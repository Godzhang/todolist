import { judgeCustomTime } from '../../utils/util';

Component({
	properties: {
		showCustomTime: {
			type: Boolean,
			value: false
		}
	},
	data: {
		customClass: '',
        customTime: '',
        lastTime: ''
	},
	methods: {
		_changeCustomClass(e){
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
	    //设置自定义时间
	    _addCustomTime(){
	        let time = this.data.customTime;

	        judgeCustomTime(time, (res) => {
	            this.setData({
	            	lastTime: this.data.customTime,
	                customClass: '',
	                customTime: ''
	            });

	            this.triggerEvent('setCustomTime', res);
	        });
	    }
	}
});