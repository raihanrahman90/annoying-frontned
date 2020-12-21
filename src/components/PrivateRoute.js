import jwt_decode from 'jwt-decode';
import {Redirect, Route} from 'react-router-dom';
export default function PrivateRoute ({component: Component, authed, ...rest}) {
    var token = sessionStorage.getItem("token") || null
    var hakAkses;
    if(token){
        hakAkses = jwt_decode(token).hakAkses
    }else{
        hakAkses = null
    }    
    return (
      <Route
        {...rest}
        render={(props) => authed.indexOf(hakAkses)>-1
          ? <Component {...props} />
          : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
      />
    )
}