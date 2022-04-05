import { reactive } from 'vue';

const uid = {
  offical: '703007996',
  Ava: '672346917',
  Diana: '672328094',
  Carol: '351609538',
  Eileen: '672342685',
  Bella: '672353429'
};
// 向晚（Ava）、贝拉（Bella）、珈乐（Carol）、嘉然（Diana）、乃琳（Eileen）
type Skin = 'Ava' | 'Carol' | 'Diana' | 'Eileen' | 'Bella' | 'offical';
const store = reactive({
  theme: {
    skin: 'Ava' as Skin,
    mid: uid['Ava']
  }
});

export const useStore = () => store;
