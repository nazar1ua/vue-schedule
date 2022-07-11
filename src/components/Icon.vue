<template>
  <Alchemy v-if="lesson === 'Хімія'"/>
  <Ethics v-else-if="lesson === 'Християнська етика'"/>
  <Rights v-else-if="lesson === 'Правознавство'"/>
  <Paint v-else-if="lesson === 'Мистецтво'"/>
  <Health v-else-if="lesson === 'Основи здоров\'я'"/>
  <Geography v-else-if="lesson === 'Географія'"/>
  <It v-else-if="lesson === 'Інформатика'"/>
  <Ualiterature v-else-if="lesson === 'Українська література'"/>
  <Algebra v-else-if="lesson === 'Алгебра'"/>
  <English v-else-if="lesson === 'Англійська мова'"/>
  <Ukrainian v-else-if="lesson === 'Українська мова'"/>
  <Uahistory v-else-if="lesson === 'Історія України'"/>
  <History v-else-if="lesson === 'Всесвітня історія'"/>
  <Pe v-else-if="lesson === 'Фізкультура'"/>
  <Geometry v-else-if="lesson === 'Геометрія'"/>
  <Work v-else-if="lesson === 'Трудове навчання'"/>
  <German v-else-if="lesson === 'Німецька мова'"/>
  <Physics v-else-if="lesson === 'Фізика'"/>
  <Literature v-else-if="lesson === 'Зарубіжна література'"/>
  <Biology v-else-if="lesson === 'Біологія'"/>
</template>

<script>
import {Alchemy, Ethics, Rights, Paint, Health, Geography, It, Ualiterature, Algebra, English, Ukrainian, Uahistory, History, Pe, Geometry, Work, German, Physics, Literature, Biology} from '../assets/icons/icons'
export default {
  name: "Icon",
  components: {Alchemy, Ethics, Rights, Paint, Health, Geography, It, Ualiterature, Algebra, English, Ukrainian, Uahistory, History, Pe, Geometry, Work, German, Physics, Literature, Biology},
  props: ['lesson'],
}
</script>

<style scoped>

</style>