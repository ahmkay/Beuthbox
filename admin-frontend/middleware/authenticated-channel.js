//Middleware for protected routes
//Redirect if not logged in

export default function ({ store, redirect, route }) {
 
    if (!store.state.user.userData) {
      return redirect('/auth/login')
    }
    else if (!store.state.user.currentChannel && route.path !== '/channel/choose'){
      return redirect('/channel/choose')
    }
  }