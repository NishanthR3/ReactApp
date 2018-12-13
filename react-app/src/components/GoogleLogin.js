import React, { Component } from 'react';

//Assets
import google from './google.png'

import config from '../config';

class GoogleLogin extends Component{
    constructor(props) {
        super(props)
    }

    componentDidMount(){
        (() => {
            var e = document.createElement("script");
            e.type = "text/javascript";
            e.async = true;
            e.src = "https://apis.google.com/js/client:platform.js?onload=gPOnLoad";
            var t = document.getElementsByTagName("script")[0];
            t.parentNode.insertBefore(e, t)
        })();
    }

    //Triggering login for google
    googleLogin = () => {
        let response = null;
        window.gapi.auth.signIn({
            callback: function(authResponse) {
                this.googleSignInCallback( authResponse )
            }.bind( this ),
            clientid: config.google, //Google client Id
            cookiepolicy: "none",
            requestvisibleactions: "http://schema.org/AddAction",
            scope: "https://www.googleapis.com/auth/plus.login email"
        });
    }

    googleSignInCallback = (e) => {
            window.gapi.client.load("plus", "v1", function() {
                if (e["access_token"])
                    this.getUserGoogleProfile( e["access_token"] )
            }.bind(this));
    }

    getUserGoogleProfile = accesstoken => {
        var e = window.gapi.client.plus.people.get({
            userId: "me"
        });
        e.execute(function(e) {
            if (e.error)
                return
             else if (e.id) {
                alert("Successfull login from google : "+ e.displayName )
                sessionStorage.setItem('user',e.displayName);
                sessionStorage.setItem('isAuth',1);
                window.location.reload();
                window.location = '/Home';
                return;
            }
        }.bind(this));
    }

    render(){
        return(
            <img src={google} title="google login" alt="google" onClick={ () => this.googleLogin() }/>
        )
    }
}

export default GoogleLogin;
