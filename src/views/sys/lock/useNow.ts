import { reactive, toRefs } from "vue";
import { tryOnMounted, tryOnUnmounted } from '@vueuse/core';

export function useNow(immediate = true) {

    let timer: NodeJS.Timer;
    let weeks = new Array("日", "一", "二", "三", "四", "五", "六");
    const state = reactive({
        year: 0,
        month: 0,
        week: '',
        day: 0,
        hour: '',
        minute: '',
        second: 0,
        meridiem: '',
    })

    const update = () => {
        console.log(123123)
        let nowDate = new Date()
        state.year = nowDate.getFullYear()
        state.month = nowDate.getMonth() + 1
        state.day = nowDate.getDate()
        state.week = weeks[nowDate.getDay()]
        state.hour = nowDate.getHours()>10?nowDate.getHours().toString() :'0'+nowDate.getHours() 
        state.minute = nowDate.getMinutes()>10?nowDate.getMinutes().toString() :'0'+nowDate.getMinutes() 
        state.second = nowDate.getSeconds()
        state.meridiem = nowDate.getHours()>12?'下午': '上午'
    }

    function start() {
        update();
        clearInterval(timer);
        timer = setInterval(() => update(), 1000);
    }

    function stop() {
        clearInterval(timer);
    }

    tryOnMounted(() => {
        immediate && start();
      });
    
    tryOnUnmounted(() => {
        stop();
    })
 

    return {
        ...toRefs(state),
        start,
        stop,
    };
}