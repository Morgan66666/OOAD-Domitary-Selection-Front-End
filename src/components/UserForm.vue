<template>
    <div>
        <b-form @submit="onSubmit">
            <!-- First Row: 入睡时间 -->
            <b-row class="mb-3">
                <b-col>
                    <label for="sleepTime">入睡时间</label>
                </b-col>
                <b-col>
                    <b-form-timepicker id="sleepTime1" v-model="form.sleepTime1" required></b-form-timepicker>
                </b-col>
                <b-col>
                    <b-form-timepicker id="sleepTime2" v-model="form.sleepTime2" required></b-form-timepicker>
                </b-col>
            </b-row>

            <!-- Second Row: 起床时间 -->
            <b-row class="mb-3">
                <b-col>
                    <label for="wakeUpTime">起床时间</label>
                </b-col>
                <b-col>
                    <b-form-timepicker id="wakeUpTime1" v-model="form.wakeUpTime1" required></b-form-timepicker>
                </b-col>
                <b-col>
                    <b-form-timepicker id="wakeUpTime2" v-model="form.wakeUpTime2" required></b-form-timepicker>
                </b-col>
            </b-row>

            <!-- Third Row: 兴趣爱好 -->
            <b-row class="mb-3">
                <b-col>
                    <label for="interests">兴趣爱好</label>
                </b-col>
                <b-col>
                    <b-form-textarea id="interests" v-model="form.interests" rows="3"></b-form-textarea>
                </b-col>
            </b-row>

            <!-- Submit Button -->
            <b-button type="submit" variant="primary">提交</b-button>
        </b-form>
    </div>
</template>
    
<script>
export default {
    data() {
        return {
            form: {
                sleepTime1: '',
                sleepTime2: '',
                wakeUpTime1: '',
                wakeUpTime2: '',
                interests: ''
            }
        }
    },
    methods: {
        onSubmit(evt) {
            evt.preventDefault()
            // alert(JSON.stringify(this.form))
        },
        toggle() {
            console.log('Toggle button clicked')
            this.show = !this.show
        },
        dismissed() {
            console.log('Alert dismissed')
        }
    },
    watch: {
        show(newVal) {
            console.log('Alert is now ' + (newVal ? 'visible' : 'hidden'))
        }
    }
}
</script>  