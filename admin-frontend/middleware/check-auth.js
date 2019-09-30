//check if there is a session on the user-service

import axios from '~/plugins/axios'

export default function ({ isServer, store, req, redirect, route }) {

    let cookie;

    if (isServer) {

        //TODO choose the right cookie
        cookie = req.headers.cookie;

    }

    if (cookie) {

        return axios.get("/user/me", {
            withCredentials: true,
            headers: {
                Cookie: cookie
            }
        })
            .then(res => {
                
                store.commit('user/SET_USER', res.data)
                if (res.data.group == "channel") {
                    if (res.data.channels.length > 1 && route.path !== '/channel/choose') {                   
                        return redirect('/channel/choose')
                    }
                    else if (res.data.channels.length == 1) {
                        store.commit("user/SET_CHANNEL", res.data.channels[0])
                    }
                    else {
                        new Error("You don't have a Channel associated! Please conntact your Admin")
                    }
                }
                
            })
            .catch(e => {
                
                store.commit('user/SET_USER', null)
            })

    }
}