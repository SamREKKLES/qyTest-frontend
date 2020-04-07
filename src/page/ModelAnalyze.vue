<template>
    <div>
        <br/>
        <br/>
        <div align="middle" style="font-size:20px">二维分析后端模型：{{backmodel1}}
            <el-select v-model="model2" filterable placeholder="请选择">
                <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
            <el-button type="primary" @click="checkmodel1">确认切换</el-button>
        </div>
        <br/>
        <br/>
        <br/>
        <div align="middle" style="font-size:20px">三维分析后端模型：{{model3}}
            <el-select v-model="model3" filterable placeholder="请选择">
                <el-option
                    v-for="item in options3"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
            <el-button type="primary" @click="checkmodel2">确认切换</el-button>
        </div>
    </div>


</template>

<script>
    export default {
        name: 'ModelAnalyze',
        props:{
            backend1: ''
        },
        data () {
            return {
                options2: [{
                    value: 'RandomForest',
                    label: 'RandomForest'
                }, {
                    value: 'ResNet',
                    label: 'ResNet'
                }, {
                    value: 'FRCNN',
                    label: 'FRCNN'
                }],
                options3: [{
                    value: '3D-ResNet',
                    label: '3D-ResNet'
                }, {
                    value: '3D-FRCNN',
                    label: '3D-FRCNN'
                }, {
                    value: '3D-PRCNN',
                    label: '3D-PRCNN'
                }],
                model2: '',
                model3: '',
                backmodel1: '',
                backmodel2: ''
            }
        },
        methods: {
            checkmodel1(){
                this.backmodel1 = this.model2;
            },
            checkmodel2(){
                this.backmodel2 = this.model3;
            }
        }
    }
</script>
