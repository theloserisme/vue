<template>
    <el-steps class="test" :active="active" finish-status="success" simple style="width: 75%;margin: 5%;">
        <el-step title="步骤 1"></el-step>
        <el-step title="步骤 2"></el-step>
        <el-step title="步骤 3"></el-step>
    </el-steps>
    <div v-show="step1">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" style="margin-top: 100px; margin-left: 40%;">
            <el-form-item prop="iphone">
                <el-input type="iphone" v-model="ruleForm.iphone" autocomplete="off" placeholder="请输入手机号"
                    style="width: 40%; height: 50px;"></el-input>
            </el-form-item>
            <el-button v-show="!ok" @click="showVerifyPut('ruleForm')" style="height: 50px; width: 40%;">点击获取验证码</el-button>
            <el-input v-show="ok" v-model="input" placeholder="请输入验证码" style="width: 40%; height: 50px;"></el-input>
            <el-form-item style="margin-top: 20px;">
                <el-button @click="submitForm"
                    style="height: 50px; width: 40%; background-color: red;color: aliceblue;">下一步</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import API from '../plugins/axiosInstance';
export default {
    data() {
        let validatorTelAndMobile = function (rule, value, callback) {
            if (!value) {
                return callback(new Error('请输入联系电话'));
            }
            let isTel = /^(0\d{2,3}-){0,1}\d{6,8}$/.test(value);
            let isMobile = /^1[345678]\d{9}$/.test(value);
            if (isTel || isMobile) {
                callback();
            } else {
                callback(new Error('请输入正确的联系电话'));
            }
        }
        return {
            ok: false,
            active: 1,
            step1: true,
            step2: false,
            step3: false,
            ruleForm: {
                iphone: ''
            },
            rules: {
                iphone: [
                    {
                        validator: validatorTelAndMobile, required: true, trigger: ['blur', 'change']
                    }
                ],
            }
        };
    },
    methods: {
        submitForm() {
            this.step1 = false
            if (this.active++ > 2) this.active = 1

        },
        showVerifyPut(ruleForm) {
            this.$refs[ruleForm].validate((valid) => {
                if (valid) {
                    this.ok = true
                    const data = '/login/verify?iphone=' + this.ruleForm.iphone
                    API({ url: data, method: 'get' }).then((res) => {
                        this.$message({
                            message: this.data.message,
                            type: 'success'
                        });
                    })
                } else {
                    this.$message({
                        message: this.data.message,
                        type: 'warning'
                    });
                    return false;
                }
            })

        }
    }
}
</script>
<style>
.test {
    width: 90%;
    height: 80px;
    left: 50%;
    top: 10%;
}
</style>
