<template>
  <div>
    <q-expansion-item
      v-if="item.childs.length === 0"
      group="somegroup"
      :icon="item.icon"
      :label="item.label"
      dense
      hide-expand-icon
      :class="item.path === $route.path ? 'bg-grey-8 text-white' : ''"
      @click="$router.push({ path: item.path })"
    />

    <q-expansion-item
      v-else
      group="somegroup"
      :icon="item.icon"
      :label="item.label"
      dense
      :default-opened="
        item.childs.find((obj) => obj.path === $route.path) ? true : false
      "
      :content-inset-level="0.5"
    >
      <q-list>
        <q-item
          clickable
          v-ripple
          v-for="(val, i) in item.childs"
          :key="i"
          dense
          :active="val.path === $route.path ? true : false"
          active-class="bg-grey-8 text-white"
          @click="$router.push({ path: val.path })"
        >
          <q-item-section avatar>
            <q-icon :name="val.icon" />
          </q-item-section>
          <q-item-section>{{ val.label }}</q-item-section>
        </q-item>
      </q-list>
    </q-expansion-item>
  </div>
</template>
<script>
export default {
  name: "SidebarList",
  props: ["item"],
};
</script>