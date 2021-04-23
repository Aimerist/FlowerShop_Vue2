import $ from 'jquery'

export default ({
  namespaced: true,
  state: {
    favorites: [],
    favoriteLength: 0
  },
  actions: {
    getFavorite (context) {
      const data = JSON.parse(localStorage.getItem('favoriteData')) || []
      context.commit('FAVORITES', data)
      context.commit('FAVORITE_LENGTH')
    },
    addFavorite (context, data) {
      context.commit('ADD_FAVORITE', data)
      localStorage.setItem('favoriteData', JSON.stringify(context.state.favorites))
      context.dispatch('alertMessageModules/updateMessage',
        { message: '已加入收藏夾', status: 'success' },
        { root: true })
      context.dispatch('getFavorite')
    },
    removeFavorite (context, { id, isDeleteAll = false }) {
      if (isDeleteAll) {
        localStorage.removeItem('favoriteData')
        $('#delFavoriteModal').modal('hide')
      } else {
        context.commit('REMOVE_FAVORITE', id)
        localStorage.setItem('favoriteData', JSON.stringify(context.state.favorites))
      }
      context.dispatch('alertMessageModules/updateMessage',
        { message: '已刪除收藏', status: 'warning' },
        { root: true })
      context.dispatch('getFavorite')
    }
  },
  mutations: {
    FAVORITES (state, payload) {
      state.favorites = payload
    },
    FAVORITE_LENGTH (state) {
      state.favoriteLength = state.favorites.length
    },
    REMOVE_FAVORITE (state, id) {
      const index = state.favorites
        .map((item) => item.id)
        .indexOf(id)
      state.favorites.splice(index, 1)
    },
    ADD_FAVORITE (state, data) {
      state.favorites.push(data)
    }
  },
  getters: {
    favorites: (state) => state.favorites,
    favoriteLength: (state) => state.favoriteLength
  }
})
