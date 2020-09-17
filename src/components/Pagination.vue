<template>
  <div v-if="page.total_pages !== 1">
    <nav aria-label="Page navigation">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{'disabled': !page.has_pre}">
          <a class="page-link" href="#" aria-label="Previous"
            @click.prevent="ChanePage(page.current_page - 1)">
            <span aria-hidden="true"><i class="fas fa-arrow-left"></i></span>
            <span class="sr-only">Previous</span>
          </a>
        </li>
        <li class="page-item" v-for="item in page.total_pages" :key="item"
          :class="{'active': item == page.current_page}">
          <a class="page-link" href="#"
            @click.prevent="ChanePage(item)">{{ item }}</a></li>
        <li class="page-item"  :class=" {'disabled': !page.has_next}">
          <a class="page-link" href="#" aria-label="Next"
            @click.prevent="ChanePage(page.current_page + 1)">
            <span aria-hidden="true"><i class="fas  fa-arrow-right"></i></span>
            <span class="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: ['page'],
  data() {
    return {};
  },
  methods: {
    ChanePage(page = 1) {
      this.$emit('ChanePageKey', Number(page));
    },
  },
};
</script>
