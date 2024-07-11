    <template>
    <van-popup
        v-model:show="show"
        position="right"
        class="dia_person"
        >
        <header>
            <van-nav-bar title="添加办签人员"  fixed placeholder>
                <template #left>
                <img @click="goBack" src="../assets/image/left.png" alt="">
                </template>
            </van-nav-bar>
        </header>
        <div class="content">
            <van-form ref="diaFormRef" >
                <div class="form-item mg_item text-left">
                    <label class="mg-b16 font14 color-rgb94 require_start" style="display: inline-block;">安利卡号</label>
                    <van-field class="border-bottom1" style="padding:0 0 8px 0;" border v-model="form.card" name="卡号"
                    placeholder="安利卡号" :rules="[{ required: true, message: '请填写卡号' }]">
                    </van-field>
                </div>
                <div class="form-item mg_item text-left">
                    <label class="mg-b16 font14 color-rgb94 require_start" style="display: inline-block;">姓名</label>
                    <van-field class="border-bottom1" style="padding:0 0 8px 0;" border v-model="form.name" name="姓名"
                    placeholder="姓名" :rules="[{ required: true, message: '请填写姓名' }]">
                    </van-field>
                </div>
                <div class="form-item mg_item text-left">
                    <label class="mg-b16 font14 color-rgb94 require_start" style="display: inline-block;">类型</label>
                    <van-field class="border-bottom1" readonly style="padding:0 0 8px 0;" border v-model="typeValue" name="类型"
                    placeholder="类型" @click="typePickerToggle(true)" :rules="[{ required: true, message: '请选择类型' }]">
                    </van-field>
                </div>
                <div class="form-item mg_item text-left">
                    <label class="mg-b16 font14 color-rgb94 require_start" style="display: inline-block;">出生日期</label>
                    <van-field class="border-bottom1" readonly style="padding:0 0 8px 0;" border v-model="form.tr2" name="出生日期"
                    placeholder="出生日期" @click="datePickerToggle(true)" :rules="[{ required: true, message: '请选择出生日期' }]">
                    </van-field>
                </div>
                <div class="form-item mg_item text-left">
                    <label class="mg-b16 font14 color-rgb94 require_start" style="display: inline-block;">签证办理</label>
                    <van-field class="border-bottom1" readonly style="padding:0 0 8px 0;" border v-model="visaValue" name="签证办理"
                    placeholder="签证办理" @click="visaPickerToggle(true)" :rules="[{ required: true, message: '请选择签证办理方式' }]">
                    </van-field>
                </div>
            </van-form>
        </div>
        <footer class="btn flex align-middle space-between">
            <m-button height="48px" title="保存" :loading="loading" @close="addClick"/>
        </footer>
       <van-popup v-model:show="visaShow" round position="bottom">
        <van-picker
            title="类型"
            :columns="columns"
            @confirm="onConfirm"
            @cancel="visaPickerToggle(false)"
            />
       </van-popup>
       <van-popup v-model:show="typeShow" round position="bottom">
        <van-picker
            title="签证办理方式"
            :columns="columns2"
            @confirm="onConfirm2"
            @cancel="typePickerToggle(false)"
            />
       </van-popup>
       <van-popup v-model:show="dateShow" round position="bottom">
        <van-date-picker
            v-model="currentDate"
            title="出生日期"
            :min-date="minDate"
            @confirm="onConfirm3"
            @cancel="datePickerToggle(false)"
            />
       </van-popup>
        <!-- 确认添加 -->
          <van-dialog 
            v-model:show="backShow" 
            title="添加确认"  
            className="dia_close"
            :showConfirmButton="false"
            :showCancelButton="false"
            >
            <div class="txt">添加后，不可修改</div>
            <div class="flex align-middle space-between" style="margin: 24px;">
              <m-button height="48px" width="120px" @close="confirm" title="确认"/>
              <m-button height="48px" title="返回" type="default" width="120px" @click="backShowToggle(false)"/>
            </div>
          </van-dialog>
    </van-popup>
   </template>
   
   <script lang="ts" setup>
   import { ref,defineAsyncComponent, reactive } from "vue";
   import { useToggle } from '@vant/use';
   import { FormInstance,PickerConfirmEventParams ,PickerColumn, PickerOption } from 'vant';
   const MButton = defineAsyncComponent(() => import('@/components/button.vue'));
    const emit = defineEmits(['refresh']);
    interface formDate {
        card: String
        name: String,
        tr1: Number,
        tr2: String,
        tr3: Number
    }
    const form = reactive<formDate>({
        card:'',
        name:'',
        tr1:0,
        tr2:'',
        tr3:0
    })
    const typeValue = ref('') //类型
    const columns2:(PickerOption | PickerColumn)[] = [
      { text: '经销商', value: 1 },
      { text: '家属', value: 2 },
    ];
    // 点击确定
    const onConfirm2 = ( item:any ) => {
        typeValue.value = item.selectedOptions[0].text
        form.tr1 = item.selectedValues[0] as number
        typePickerToggle(false)
    };
    const visaValue = ref('') //签证办理方式
    const columns:(PickerOption | PickerColumn)[] = [
      { text: '委托新澳旅行社办理', value: 1 },
      { text: '自行办理', value: 2 },
      { text: '免签', value: 3 },
    ];
    // 点击确定
    const onConfirm = ( item:any ) => {
        visaValue.value = item.selectedOptions[0].text
        form.tr3 = item.selectedValues[0] as number
        visaPickerToggle(false)
    };
    const minDate =  new Date(1900, 0, 1)
    const currentDate = ref(['2000', '01', '01']);
    const onConfirm3 = ( { selectedValues }:PickerConfirmEventParams ) => {
        form.tr2 = selectedValues.join('/')
        datePickerToggle(false)
    }
    const [show, showToggle] = useToggle(false);
    const [loading, loadToggle] = useToggle(false);
    const [visaShow,visaPickerToggle] = useToggle(false);
    const [typeShow,typePickerToggle] = useToggle(false);
    const [dateShow,datePickerToggle] = useToggle(false);
    const [backShow,backShowToggle] = useToggle(false);
    // 打开弹窗
    const openDialog = () => {
        showToggle(true)
    };
    const diaFormRef = ref<FormInstance | undefined>();
    // 保存人员
    const addClick = async () => {
        try {
            await diaFormRef.value?.validate();
            console.log(form);
            backShowToggle(true)
        } catch(error) {
            console.log(error);
        }
    }
    //确认保存
    const confirm = () => {
        backShowToggle(false)
        loadToggle(true)
        setTimeout(() => {
            loadToggle(false)
            showToggle(false)
            emit('refresh');
            closeDialog()
        },2000)
    }
    const closeDialog = () => {
        form.card = ''
        form.name = ''
        form.tr1 = 0
        form.tr2 = ''
        form.tr3 = 0
        typeValue.value = ''
        visaValue.value = ''
    }
    // 暴露变量
    defineExpose({
        openDialog,
    });
    const goBack = () => {
        showToggle(false)
        closeDialog()
    }
   </script>
   
   <style scoped lang="less">
        .dia_person {
            width: 100vw;
            height: 100%;
            .btn {
                position: fixed;
                width: 100%;
                bottom: 0;
                left: 0;
                padding: 24px
            }
            .content {
                padding: 24px
            }
            .mg_item {
                margin-bottom: 24px
            }
            :deep(.dia_close) {
            .txt {
                margin: 24px 24px 34px
            }
            }
        }
   </style>
   