import {defineComponent} from 'vue/dist/vue.esm-bundler';

import ualiterature from './ua-literature.svg'
import algebra from './math.svg'
import english from './en-lang.svg'
import ukrainian from './ua-lang.svg'
import uahistory from './ua-history.svg'
import history from './world-history.svg'
import physical from './pe.svg'
import geometry from './geometry.svg'
import work from './work.svg'
import german from './de-lang.svg'
import physics from './physics.svg'
import literature from './world-literature.svg'
import biology from './biology.svg'
import it from './it.svg'
import geography from './world.svg'
import health from './health.svg'
import alchemy from './alchemy.svg'
import ethics from './ethics.svg'
import rights from './rights.svg'
import paint from './paint.svg'

export const Alchemy = defineComponent({
    data() {return {alchemy}},
    template: '<img :src="alchemy" alt="Хімія">'
})
export const Ethics = defineComponent({
    data() {return {ethics}},
    template: '<img :src="ethics" alt="Християнська етика">'
})
export const Rights = defineComponent({
    data() {return {rights}},
    template: '<img :src="rights" alt="Правознавство">'
})
export const Paint = defineComponent({
    data() {return {paint}},
    template: '<img :src="paint" alt="Мистецтво">'
})
export const Health = defineComponent({
    data() {return {health}},
    template: '<img :src="health" alt="Основи здоров\'я">'
})
export const Geography = defineComponent({
    data() {return {geography}},
    template: '<img :src="geography" alt="Географія">'
})
export const It = defineComponent({
    data() {return {it}},
    template: '<img :src="it" alt="Інформатика">'
})
export const Ualiterature = defineComponent({
    data() {return {ualiterature}},
    template: '<img :src="ualiterature" alt="Українська література">'
})
export const Algebra = defineComponent({
    data() {return {algebra}},
    template: '<img :src="algebra" alt="Алгебра">'
})
export const English = defineComponent({
    data() {return {english}},
    template: '<img :src="english" alt="Англійська мова">'
})
export const Ukrainian = defineComponent({
    data() {return {ukrainian}},
    template: '<img :src="ukrainian" alt="Українська мова">'
})
export const Uahistory = defineComponent({
    data() {return {uahistory}},
    template: '<img :src="uahistory" alt="Історія України">'
})
export const History = defineComponent({
    data() {return {history}},
    template: '<img :src="history" alt="Всесвітня історія">'
})
export const Pe = defineComponent({
    data() {return {physical}},
    template: '<img :src="physical" alt="Фізкультура">'
})
export const Geometry = defineComponent({
    data() {return {geometry}},
    template: '<img :src="geometry" alt="Геометрія">'
})
export const Work = defineComponent({
    data() {return {work}},
    template: '<img :src="work" alt="Трудове навчання">'
})
export const German = defineComponent({
    data() {return {german}},
    template: '<img :src="german" alt="Німецька мова">'
})
export const Physics = defineComponent({
    data() {return {physics}},
    template: '<img :src="physics" alt="Фізика">'
})
export const Literature = defineComponent({
    data() {return {literature}},
    template: '<img :src="literature" alt="Зарубіжна література">'
})
export const Biology = defineComponent({
    data() {return {biology}},
    template: '<img :src="biology" alt="Біологія">'
})