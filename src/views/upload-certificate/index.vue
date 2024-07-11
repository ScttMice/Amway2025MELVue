<template>
    <div class="page">
        <div class="page-header">
            <van-nav-bar left-arrow placeholder fixed title="李小丽" :border="false" @click-left="onBack" />
        </div>

        <div class="page-body" style="padding-bottom: 130px;">

            <div v-for="(item, index) in uploadList" class="file-box flex space-between border-bottom1">
                <div class="file-box-label flex">
                    <span class="font14"><i v-if="item.required || index === 0"
                            :style="{ color: iColor(item.required) }">*</i> {{
                                item.title }}</span>
                    <div class="font14 mg-l16 " style="color: rgb(4, 134, 254);">
                        <div class="flex align-middle" @click="onViewTips(item)">
                            <van-icon size="20px" name="question-o" />
                            <span v-if="index === 0">查看范例</span>
                        </div>
                    </div>
                </div>
                <div class="flex flex-column">
                    <span class="font14 mg-b10" style="color: rgb(1, 145, 255);">{{ item.pdfName }}</span>
                    <van-button style="height: 30px;width: 85px;" :color="buttonColor(item.status)" @click="onUpload">
                        <span class="font14">{{ buttonText(item.status) }}</span>
                    </van-button>
                </div>
            </div>

        </div>

        <div class="page-footer pd24">
            <van-button block type="primary" loading-type="circular">
                完成
            </van-button>
        </div>



        <van-popup v-model:show="show" round closeable close-icon-position="top-left" position="bottom"
            :style="{ height: '80%' }">
            <div class="tips">
                <div class="tips-header flex justify-center  border-bottom1">
                    <h3 class="tips-header-title">{{ activeItem?.title }}</h3>
                </div>


                <div class="tips-body pd20">

                </div>
            </div>
        </van-popup>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { useToggle } from '@vant/use';

export interface UploadList {
    title: string;
    required: boolean,
    pdfName: string,
    status: number
}

const router = useRouter();
const [show, showToggle] = useToggle(false);
let activeItem = ref<UploadList>();

const uploadList = ref<UploadList[]>([
    {
        title: '护照整本扫描件',
        required: false,
        pdfName: '213413513.pdf',
        status: 1
    },
    {
        title: '旧护照整本扫描件',
        required: false,
        pdfName: '213413513.pdf',
        status: 0
    },
    {
        title: '身份证彩色扫描件',
        required: true,
        pdfName: '213413513.pdf',
        status: 0
    },
    {
        title: '户口本整本彩色扫描件',
        required: true,
        pdfName: '213413513.pdf',
        status: 0
    },
    {
        title: '财力证明',
        required: false,
        pdfName: '213413513.pdf',
        status: 0
    },
    {
        title: '关系证明',
        required: false,
        pdfName: '213413513.pdf',
        status: 0
    },
    {
        title: '在职证明彩色扫描件',
        required: false,
        pdfName: '213413513.pdf',
        status: 0
    },
    {
        title: '营业执照彩色扫描件',
        required: false,
        pdfName: '213413513.pdf',
        status: 0
    },
])

const iColor = computed(() => {
    return (required: boolean): string => {
        return required ? 'red' : '';
    }
})

const buttonColor = computed(() => {
    return (status: number): string => {
        let color = '#2678FF';
        switch (status) {
            case 1:
                color = '#999999';
                break;
            default:
                break;
        }
        return color
    }
})


const buttonText = computed(() => {
    return (status: number): string => {
        let text = '上传';
        switch (status) {
            case 1:
                text = '已审批';
                break;
            default:
                break;
        }
        return text
    }
})


const onBack = () => router.back();

const onViewTips = (item: UploadList) => {
    activeItem.value = item;

    showToggle(true)
}
const onUpload = () => {

}
</script>

<style scoped lang="less">
.file-box {
    height: 80px;
    width: 100%;
    margin-bottom: 24px;
}

.tips {
    height: 100%;

    &-header {
        // height: 74px;
        // line-height: 74px;
        padding: var(--van-popup-close-icon-margin);
        width: 100%;

        &-title {
            font-size: 16px;
            font-weight: bold;
        }
    }

    &-body {
        overflow: auto;
        height: calc(100% - 54px);
    }
}
</style>