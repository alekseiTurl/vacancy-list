<template>
  <svg>
    <use :xlink:href="`sprite.svg#${iconName}`"></use>
  </svg>
</template>

<script lang="ts" setup>
defineProps<{
  iconName: string
}>()
</script>
<style scoped lang="scss">
svg {
  width: 12px;
  height: 12px;
  fill: #ffffff;
  stroke: #ffffff;
}
</style>
