// import {AES, enc}from 'crypto-js';
import { Cookies } from 'quasar'

export function user (state) {
  if(state.user) {
    return state.user
  }
  return Cookies.get('user')
  // const envrypted = Cookies.get('user')
  // if(!envrypted) return null
  // const decrypted = AES.decrypt(envrypted, process.env.KEYENC);
  // const user = decrypted.toString(enc.Utf8);
  // return user
}

export function loggedIn (state) {
  return state.loggedIn
}

export function roles (state) {
  return state.roles
}

export function permissions (state) {
  if(state.permissions) {
    return state.permissions
  }
  return Cookies.get('permissions')
}

export function token (state) {
  return state.token
}

export function rememberMe (state) {
  return state.rememberMe
}

export const check = state => roles => {
  const user = state.user
  if (user) {
    if (Array.isArray(roles) && roles.length) {
      for (const role of roles) {
        if (!user.roleNames.includes(role)) {
          return false
        }
      }
    } else if (roles) {
      if (!user.roleNames.includes(roles)) {
        return false
      }
    }
    return true
  }
  return false
}
