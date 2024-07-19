<template>
    <div class="page">
        <div class="page-header">
            <van-nav-bar left-arrow placeholder fixed :title="visaTitle" :border="false" @click-left="onBack" />
        </div>

        <div class="page-body" style="padding-bottom: 130px;">
            <template v-for="(item, index) in uploadList">
                <div class="file-box flex space-between border-bottom1" v-if="item.required == 1">
                    <div class="file-box-label flex">
                        <span class="font14"><i style="color: red">*</i> {{ item.title }}</span>
                        <div class="font14 mg-l16 " style="color: rgb(4, 134, 254);">
                            <div class="flex align-middle" @click="onViewTips(item)">
                                <van-icon size="20px" name="question-o" />
                                <span v-if="index === 0">查看范例</span>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-column">
                        <span @click="toViewPdf(item.fileUrl, item.fileName)" class="font14 mg-b10"
                            style="color: rgb(1, 145, 255);">{{
                                item.fileName }}</span>
                        <div class="text-right">
                            <van-uploader :readonly="item.status === 1" :before-read="(e) => beforeRead(e, item.type)"
                                :after-read="(items, detail) => afterRead(items, detail, item)" accept=".pdf">
                                <van-button style="height: 30px;width: 85px;" :color="buttonColor(item.status)">
                                    <span class="font14">{{ buttonText(item.status) }}</span>
                                </van-button>
                            </van-uploader>
                        </div>
                    </div>
                </div>
            </template>

        </div>

        <div class="page-footer pd24">
            <van-button block type="primary" loading-type="circular" @click="onBack">
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
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useToggle } from '@vant/use';
import { showLoadingToast, showToast } from "vant";
import { UploaderFileListItem } from "vant/lib/uploader/types";
import { Numeric } from "vant/lib/utils";
import { getVisa, uploadFile } from '@/api/user'

export interface UploadList {
    title: string;
    required: number,
    fileUrl?: string,
    fileName?: string,
    status: number,
    type: number
}

const router = useRouter();
const route = useRoute();

const [show, showToggle] = useToggle(false);
let activeItem = ref<UploadList>();

const uploadList = ref<UploadList[]>([])

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
let visaTitle = ref()
// 获取签证信息
const getList = () => {
    let id = Number(route.params.id)
    getVisa(id).then(res => {
        if (res.code == 0) {
            uploadList.value = res.data.materials
            visaTitle.value = res.data.name
        }
    })
}

onMounted(() => {
    getList()
})

// 拦截
const beforeRead = (file: File | File[], type: number) => {
    const _file = file as File;
    console.log(file);
    const canUpType: string[] = ['application/pdf'];

    if (!canUpType.includes(_file.type)) {
        showToast('请上传pdf格式文件');
        return false;
    }
    let fd = new FormData()
    fd.append('fileData', file as any)
    fd.append('trID', route.params.id as string)
    fd.append('type', type as any)
    uploadFile(fd).then(res => {
        if (res.code == 0) {
            getList()
        }
    })
    return false;
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
        // upItem.fileName = (items as UploaderFileListItem).file?.name;
    } catch (error) {

    } finally {
        setTimeout(() => {
            loadingToast.close();
            upItem.fileName = (items as UploaderFileListItem).file?.name;
            upItem.fileUrl = (items as UploaderFileListItem).objectUrl;
            showToast('上传成功 ');
        }, 1000)
    }
}


const onBack = () => router.back();

const onViewTips = (item: UploadList) => {
    activeItem.value = item;

    showToggle(true)
}

const toViewPdf = (url: UploadList['fileUrl'], name: UploadList['fileName']): void => {
    console.log("🚀 ~ toViewPdf ~ url:", url)
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