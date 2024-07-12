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
                    <span @click="toViewPdf(item.pdfUrl, item.pdfName)" class="font14 mg-b10"
                        style="color: rgb(1, 145, 255);">{{
                            item.pdfName }}</span>
                    <div class="text-right">
                        <van-uploader :readonly="item.status === 1" :before-read="beforeRead"
                            :after-read="(items, detail) => afterRead(items, detail, item)">
                            <van-button style="height: 30px;width: 85px;" :color="buttonColor(item.status)">
                                <span class="font14">{{ buttonText(item.status) }}</span>
                            </van-button>
                        </van-uploader>
                    </div>
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
import { ref, reactive, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useToggle } from '@vant/use';
import { showLoadingToast, showToast } from "vant";
import { UploaderBeforeRead, UploaderFileListItem } from "vant/lib/uploader/types";
import { Numeric } from "vant/lib/utils";

export interface UploadList {
    title: string;
    required: boolean,
    pdfUrl?: string,
    pdfName?: string,
    status: number,
}

const router = useRouter();
const route = useRoute();

const [show, showToggle] = useToggle(false);
let activeItem = ref<UploadList>();

const uploadList = ref<UploadList[]>([
    {
        title: '护照整本扫描件',
        required: false,
        pdfName: '213413513.pdf',
        pdfUrl: '213413513.pdf',
        status: 1,
    },
    {
        title: '旧护照整本扫描件',
        required: false,
        pdfName: '213413513.pdf',
        pdfUrl: '213413513.pdf',
        status: 0
    },
    {
        title: '身份证彩色扫描件',
        required: true,
        pdfName: '213413513.pdf',
        pdfUrl: '213413513.pdf',
        status: 0
    },
    {
        title: '户口本整本彩色扫描件',
        required: true,
        pdfName: '213413513.pdf',
        pdfUrl: '213413513.pdf',
        status: 0
    },
    {
        title: '财力证明',
        required: false,
        pdfName: '213413513.pdf',
        pdfUrl: '213413513.pdf',
        status: 0
    },
    {
        title: '关系证明',
        required: false,
        pdfName: '213413513.pdf',
        pdfUrl: '213413513.pdf',
        status: 0
    },
    {
        title: '在职证明彩色扫描件',
        required: false,
        pdfName: '213413513.pdf',
        pdfUrl: '213413513.pdf',
        status: 0
    },
    {
        title: '营业执照彩色扫描件',
        required: false,
        pdfName: '213413513.pdf',
        pdfUrl: '213413513.pdf',
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


onMounted(() => {
    console.log(route.params)
})

// 拦截
const beforeRead: UploaderBeforeRead = (file) => {
    const _file = file as File;
    console.log(file);

    const canUpType: string[] = ['application/pdf'];

    if (!canUpType.includes(_file.type)) {
        showToast('请上传pdf格式文件');
        return false;
    }
    return true;
};

type AfterRead = (items: UploaderFileListItem | UploaderFileListItem[], detail: {
    name: Numeric;
    index: number;
}, upItem: UploadList) => void


const afterRead: AfterRead = (items, detail, upItem) => {
    console.log(items, detail, upItem);
    const loadingToast = showLoadingToast({
        message: '上传中',
        forbidClick: true
    })
    try {
        // upItem.pdfName = (items as UploaderFileListItem).file?.name;
    } catch (error) {

    } finally {
        setTimeout(() => {
            loadingToast.close();
            upItem.pdfName = (items as UploaderFileListItem).file?.name;
            upItem.pdfUrl = (items as UploaderFileListItem).objectUrl;
            showToast('上传成功 ');
        }, 1000)
    }
}



const onBack = () => router.back();

const onViewTips = (item: UploadList) => {
    activeItem.value = item;

    showToggle(true)
}

const toViewPdf = (url: UploadList['pdfUrl'], name: UploadList['pdfName']): void => {
    if (!url) return;
    router.push({
        name: "pdfView",
        params: {
            pdf_url: url,
            pdf_name: name
        }
    })
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
</style>, UploaderFileListItem