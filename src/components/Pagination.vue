<template>
  <nav class="page border-top" aria-label="page">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ 'disabled': !page.has_pre }">
        <a class="page-link page-previous" href="#" aria-label="Previous"
          @click.prevent="ChanePage(page.current_page - 1)">
          <span class="d-none d-sm-block">PREVIOUS</span>
          <span class="d-sm-none"><i class="fas fa-arrow-left"></i></span>
        </a>
      </li>
      <li class="page-item" v-for="item in page.total_pages" :key="item"
        :class="{ 'active': item == page.current_page }">
        <a class="page-link" href="#"
          @click.prevent="ChanePage(item)">{{ item }}</a></li>
      <li class="page-item"  :class="{ 'disabled': !page.has_next }">
        <a class="page-link page-next" href="#" aria-label="Next"
          @click.prevent="ChanePage(page.current_page + 1)">
          <span class="d-none d-sm-block">NEXT</span>
          <span class="d-sm-none"><i class="fas  fa-arrow-right"></i></span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['page'],
  data () {
    return {}
  },
  methods: {
    ChanePage (page = 1) {
      this.$emit('ChanePageKey', Number(page))
    }
  }
}
</script>
