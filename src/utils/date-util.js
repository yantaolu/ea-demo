const oneWeek = 3600 * 1000 * 24 * 7
const oneMonth = 3600 * 1000 * 24 * 30
const threeMonth = 3600 * 1000 * 24 * 90

export default {
  oneWeek,
  oneMonth,
  threeMonth,

  getOneWeek () {
    return [new Date(new Date() - oneWeek), new Date()]
  },

  getPickerOptions (opts) {
    return {
      disabledDate: (date) => {
        return date > new Date()
      },
      shortcuts: [{
        text: '最近一周',
        onClick (picker) {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - oneWeek)
          picker.$emit('pick', [start, end])
        }
      }, {
        text: '最近一个月',
        onClick (picker) {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - oneMonth)
          picker.$emit('pick', [start, end])
        }
      }, {
        text: '最近三个月',
        onClick (picker) {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - threeMonth)
          picker.$emit('pick', [start, end])
        }
      }],

      ...opts
    }
  }
}
