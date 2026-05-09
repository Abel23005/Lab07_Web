(function () {
  var TOKEN_KEY = 'jwt';

  function parsePayload(token) {
    try {
      var parts = token.split('.');
      if (parts.length < 2) return null;
      var base64Url = parts[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var json = decodeURIComponent(
        atob(base64)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );
      return JSON.parse(json);
    } catch (e) {
      return null;
    }
  }

  function isExpired(token) {
    var p = parsePayload(token);
    if (!p || !p.exp) return true;
    return Date.now() >= p.exp * 1000;
  }

  function getToken() {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  function clearSession() {
    sessionStorage.removeItem(TOKEN_KEY);
  }

  function redirectSignIn() {
    clearSession();
    window.location.href = '/signin';
  }

  /**
   * Devuelve el token si es válido en tiempo; si no, redirige a Sign In.
   */
  function requireAuthPage() {
    var token = getToken();
    if (!token || isExpired(token)) {
      redirectSignIn();
      return null;
    }
    return token;
  }

  /**
   * Redirige a /403 si el usuario no tiene ninguno de los roles permitidos.
   */
  function requireRolePage(allowedRoles) {
    var token = requireAuthPage();
    if (!token) return null;
    var payload = parsePayload(token);
    var roles = (payload && payload.roles) || [];
    var ok = roles.some(function (r) {
      return allowedRoles.indexOf(r) !== -1;
    });
    if (!ok) {
      window.location.href = '/403';
      return null;
    }
    return token;
  }

  async function apiFetch(url, options) {
    options = options || {};
    var headers = Object.assign({}, options.headers || {});
    var token = getToken();
    if (token && !headers.Authorization) {
      headers.Authorization = 'Bearer ' + token;
    }
    var res = await fetch(url, Object.assign({}, options, { headers: headers }));
    if (res.status === 401) {
      redirectSignIn();
      throw new Error('Sesión caducada o no autorizado');
    }
    return res;
  }

  window.AuthLab = {
    TOKEN_KEY: TOKEN_KEY,
    getToken: getToken,
    setToken: function (t) {
      sessionStorage.setItem(TOKEN_KEY, t);
    },
    clearSession: clearSession,
    parsePayload: parsePayload,
    isExpired: isExpired,
    requireAuthPage: requireAuthPage,
    requireRolePage: requireRolePage,
    redirectSignIn: redirectSignIn,
    apiFetch: apiFetch
  };
})();
