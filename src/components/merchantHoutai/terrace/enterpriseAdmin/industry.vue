<template>
	<div>
		<div class="showIndustry clear">
			<div class="Industry_top clear">
				<div class="fl"><label>设置企业可见的行业：</label></div>
				<div class="kaiguan fr">
					<el-switch v-model="value" active-color="#13ce66">
					</el-switch>
					<label>勾选可见行业</label>
				</div>
			</div>
		</div>
		<div class="mmm">
			<el-checkbox-group v-model="checkboxGroup" size="small">
				<el-checkbox label="旅游业" border><i class=""></i></el-checkbox>
				<el-checkbox label="旅游业2" border></el-checkbox>
				<el-checkbox label="旅游业3" border></el-checkbox>
				<el-checkbox label="旅游业4" border></el-checkbox>
				<el-checkbox label="旅游业5" border></el-checkbox>
				<el-checkbox label="旅游业6" border></el-checkbox>
				<el-checkbox label="旅游业7" border></el-checkbox>
				<el-checkbox label="旅游业8" border></el-checkbox>
				<el-checkbox label="旅游业9" border></el-checkbox>
				<el-checkbox label="旅游业10" border></el-checkbox>
				<el-checkbox label="旅游业11" border></el-checkbox>
				<el-checkbox label="旅游业12" border></el-checkbox>
				<el-checkbox label="旅游业13" border></el-checkbox>
				<el-checkbox label="旅游业14" border></el-checkbox>
				<el-checkbox label="旅游业15" border></el-checkbox>
				<el-checkbox label="旅游业16" border></el-checkbox>
				<el-checkbox label="旅游业17" border></el-checkbox>
				<el-checkbox label="旅游业18" border></el-checkbox>
				<el-checkbox label="旅游业19" border></el-checkbox>
				<el-checkbox label="旅游业20" border></el-checkbox>
				<el-checkbox label="旅游业21" border></el-checkbox>
				<el-checkbox label="旅游业22" border></el-checkbox>
				<el-checkbox label="旅游业23" border></el-checkbox>
				<el-checkbox label="旅游业24" border></el-checkbox>
				<el-checkbox label="旅游业25" border></el-checkbox>
				<el-checkbox label="旅游业26" border></el-checkbox>
				<el-checkbox label="旅游业27" border></el-checkbox>
				<el-checkbox label="旅游业28" border></el-checkbox>
				<el-checkbox label="旅游业29" border></el-checkbox>
				<el-checkbox label="旅游业30" border></el-checkbox>
				<el-checkbox label="旅游业31" border></el-checkbox>
				<el-checkbox label="旅游业32" border></el-checkbox>
				<el-checkbox label="旅游业33" border></el-checkbox>
				<el-checkbox label="旅游业34" border></el-checkbox>
				<el-checkbox label="旅游业35" border></el-checkbox>
				<el-checkbox label="旅游业36" border></el-checkbox>
				<el-checkbox label="旅游业37" border></el-checkbox>
				<el-checkbox label="旅游业38" border></el-checkbox>
				<el-checkbox label="旅游业39" border></el-checkbox>
				<el-checkbox label="旅游业40" border></el-checkbox>
			</el-checkbox-group>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				value: '',
				checkboxGroup: [],
			}
		}
	};
</script>

<style>
	.clear {
		clear: both;
	}

	.fl {
		float: left;
	}

	.fr {
		float: right;
	}
	.mmm{
		margin-left: 20px;
	}
	.qiyeguanli {
		width: 1200px;
		height: 45px;
		background: #F5F9F1;
		margin: 0 auto;
	}

	.kaiguan {
		margin-right: 60px;
		/* margin-top: 10px; */
	}

	.Industry_top {
		margin-top: 10px;
	}

	.el-checkbox-group {
		margin-left: 30px;
		margin-right: 30px;
	}

	.el-checkbox-group .el-checkbox {
		width: 100px;
		margin-left: 0px;
	}

	.el-checkbox.is-bordered+.el-checkbox.is-bordered {
		margin-left: 0px;
		margin-top: 20px;
	}

	.el-tabs__item {
		width: 120px;
		height: 45px;
		line-height: 45px;
		color: #2450D2;
		background: #fff;
		border: 1px solid #2450D2;
		text-align: center;
		margin: 0;
		padding-left: 0;
	}

	.el-tabs__item.is-active {
		color: #fff;
		background: #2450D2;
	}

	.function {
		margin-top: 10px;
	}

	.qiyeGn {
		color: #101010;
		font-size: 14px;
		margin-left: 20px;
	}

	.indexShow {
		margin-top: 30px;
	}

	.ulshow .lishow {
		list-style: none;
		float: left;
		margin-left: 30px;
	}

	.el-checkbox__original {
		width: 108px;
		height: 40px;
		line-height: 25px;
	}

	.showIndustry {
		width: 1200px;
		height: 30px;
		margin: 30px 0px 20px 30px;
	}
</style>
