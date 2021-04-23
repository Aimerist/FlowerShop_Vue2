export default ({
  namespaced: true,
  state: {
    messages: []
  },
  actions: {
    updateMessage (context, { message, status }) {
      const timestamp = Math.floor(new Date() / 1000)
      context.commit('PUSH_MESSAGE', {
        message,
        status,
        timestamp
      })
      context.dispatch('removeMessageWithTiming', timestamp)
    },
    removeMessage (context, num) {
      context.commit('REMOVE_MESSAGE', num)
    },
    removeMessageWithTiming (context, timestamp) {
      const messageData = [...context.state.messages]
      setTimeout(() => {
        messageData.forEach((item, i) => {
          if (item.timestamp === timestamp) {
            context.commit('REMOVE_MESSAGE', i)
          }
        })
      }, 2000)
    }
  },
  mutations: {
    PUSH_MESSAGE (state, messageData) {
      state.messages.push(messageData)
    },
    REMOVE_MESSAGE (state, num) {
      state.messages.splice(num, 1)
    }
  },
  getters: {
    messages: (state) => state.messages
  }
})
