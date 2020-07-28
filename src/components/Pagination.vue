<template>
  <div>
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{'disabled': !page.has_pre}">
          <a class="page-link" href="#" aria-label="Previous"
            @click.prevent="ChanePage(page.current_page - 1)">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item"
          v-for="page in page.total_pages" :key="page">
          <a class="page-link" href="#"
            @click.prevent="ChanePage(page)">{{ page }}</a></li>
        <li class="page-item"  :class=" {'disabled': !page.has_next}">
          <a class="page-link" href="#" aria-label="Next"
            @click.prevent="ChanePage(page.current_page + 1)">
            <span aria-hidden="true">&raquo;</span>
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
