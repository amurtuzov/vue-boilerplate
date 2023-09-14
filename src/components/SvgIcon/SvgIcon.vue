<template>
  <component v-if="dynamicSvg" :is="dynamicSvg" ref="svgRef" />
</template>
<script lang="ts" src="./SvgIcon.ts"></script>
