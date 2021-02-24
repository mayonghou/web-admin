<template>
    <div class="jobIndex" id="jobIndex">
        <vheader></vheader>
        <div class="jobClass" id="jobClass">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import vheader from '../common/Header';
export default {
    name: 'jobIndex',
    components: {
        vheader
    },
    data() {
        return {
			heightBody: document.documentElement.clientHeight,
		};
    },
	watch: {
		heightBody:{
			handler(newdata, oldata) {
				// this.getHeight();
				this.heightBody = newdata;
			},
			deep: true,
			immediate: true
		}
	},
	
    mounted() {
		this.getHeight();
		this.heightBody = document.documentElement.clientHeight;
		let jobClass = document.getElementById('jobClass');
		jobClass.style.height = this.heightBody - 70 + 'px';
	},
	
    methods: {
		getHeight(){
			this.heightBody = document.documentElement.clientHeight;
			let jobClass = document.getElementById('jobClass');
			jobClass.style.height = this.heightBody - 70 + 'px';
		}
	}
};
</script>

<style scoped>
.jobIndex {
    box-sizing: border-box;
	-webkit-transition: left .3s ease-in-out;
	transition: left .3s ease-in-out;
}
.jobClass{
	height: 100%;
	overflow-y: scroll;
	box-sizing: border-box;
}
</style>