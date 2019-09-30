import Vue from 'vue'
import moment from 'moment'

Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(String(value)).format('DD.MM.YYYY')
  }
}),

Vue.filter('formatDateDT', function (value) {
  if (value) {
    return moment(String(value)).format('DD.MM.YYYY HH:mm:ss')
  }
}),

  Vue.filter('categoryArrayToString', function (value) {
    if (value) {
       const categories = value.map(item => {
         if(item){
          return item['name']
         }else return ""
        });

      return categories.toString()
    }
  }),

  Vue.filter('userArrayToString', function (value) {
    if (value) {

       const categories = value.map(item => {
          return item['username']
        });

      return categories.toString()
    }
  }),
  Vue.filter('arrayToString', function (value) {
    if (value.length) {    
      return value.toString()
    }
  })