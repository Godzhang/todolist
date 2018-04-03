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
        customTime: ''
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
	        let time = parseInt(this.data.customTime);

	        judgeCustomTime(time, () => {
	            this.setData({
	                // isShowCustomBox: false,
	                // minutesList: ['25分钟', '35分钟', ct],
	                customClass: '',
	                customTime: ''
	            });

	            this.triggerEvent('setCustomTime', time);
	        });
	    }
	}
});