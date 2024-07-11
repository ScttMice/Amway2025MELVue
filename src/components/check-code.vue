<template>
	<van-popup v-model:show="props.show" position="right" class="check-code-pop text-left">
		<div class="header">
			<van-nav-bar left-arrow :border="false" @click-left="$emit('update:show', false)">
				<template #left>
					<div>返回</div>
				</template>
			</van-nav-bar>
		</div>

		<div class="body pd16 pd-t0">
			<h2 class="title mg-t24 text-left">输入验证码</h2>

			<div class="tips font14 mg-b24">
				<p class="color-rgb94" style="line-height: 20px;"> 证码已发送至</p>
				<p style="line-height: 20px;">+ 86 12345678901</p>
			</div>

			<van-password-input :mask="false" gutter="10px" style="margin: 0;" :value="checkCode"
				:focused="showKeyboard" @focus="showKeyToggle(true)" />
			<van-number-keyboard v-model="checkCode" :show="showKeyboard" @blur="showKeyToggle(false)" />

			<p class="font14 color-rgb94" style="margin-top: 32px;">51秒后重新发送</p>
		</div>

		<div class="mg16" style="margin-top: 0;">
			<van-button square block type="primary" loading-type="circular" loading-size="24px" :loading="loginLoading"
				loading-text="登录" @click="login">
				登录
			</van-button>
		</div>


	</van-popup>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useToggle } from '@vant/use';
import { type LoginForm } from "@/views/login/index.vue";

export interface Props extends LoginForm {
	size?: string
	color?: string
	show: boolean
}

const props = withDefaults(defineProps<Props>(), {
	size: '16px',
	color: '#000000'
})


const checkCode = ref<string | undefined>();

const [loginLoading, loginLoadingToggle] = useToggle(false)
const [showKeyboard, showKeyToggle] = useToggle(false)


const login = () => {
	loginLoadingToggle(true)
	try {

	} finally {
		setTimeout(() => {
			loginLoadingToggle(false)
		}, 1000)
	}
}
</script>

<style lang="less" scoped>
.check-code-pop {
	height: 100%;
	width: 100vw;

	.body {
		// padding: 16px;

		.title {
			font-size: 24px;
			font-family: bold;
			margin-bottom: 64px;
		}

	}

	:deep(.van-password-input__security li) {
		border: 1px solid #5E5E5E;
		border-radius: 8px;
		height: 55px;
		width: 55px;
	}
}
</style>