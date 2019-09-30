//Middleware for protected routes
//Redirect if not logged in

export default function ({ store, redirect }) {

    if (!store.state.user.userData) {
      return redirect('/auth/login')
      
      if(store.state.user.userData.group !== 'admin'){
        return redirect('/auth/login')
      }
      
    }
  }