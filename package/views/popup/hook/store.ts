import { reactive } from 'vue';

// 向晚（Ava）、贝拉（Bella）、珈乐（Carol）、嘉然（Diana）、乃琳（Eileen）
type Skin = 'Ava' | 'Carol' | 'Diana' | 'Eileen' | 'Bella';
const store = reactive({
  skin: 'Ava' as Skin
});

export const useStore = () => store;
