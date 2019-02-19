document.addEventListener('DOMContentLoaded', () => {
  //current time
  //update every 10 seconds;
  setCurrentTime();
  setInterval(function () {
    setCurrentTime();
  }, 10 * 1000);

  let username = getCookie('username');
  //check cookie
  if (username) {

    document.querySelectorAll('.CWA-welcome-chrome-ext-greeting').forEach(elem => {
      elem.style.display = 'inline-block';
    });
    document.querySelectorAll('.CWA-welcome-chrome-ext-user-name').forEach(elem => {
      elem.style.display = 'none';
    });
    let interest = getCookie('interest');
    if (interest) {
      document.querySelectorAll('.CWA-welcome-chrome-ext-interest').forEach(elem => {
        elem.style.display = 'none';
      });
      document.querySelectorAll('.CWA-welcome-chrome-ext-interest-text').forEach(elem => {
        elem.innerHTML = interest;
      });
      document.querySelectorAll('.CWA-welcome-chrome-ext-greeting').forEach(elem => {
        elem.innerHTML = `Hello <span class="stored-name">${username}</span>.`;
      });
      let picture_url = getCookie('picture');
      let photo_by_name = getCookie('photo-by-name');
      let photo_by_url = getCookie('photo-by-url');
      if (!picture_url) {
        newimage(interest);
        picture_url = getCookie('picture');
      }
      document.querySelectorAll('.CWA-welcome-chrome-ext-photo-by').forEach(elem => {
        elem.innerHTML = photo_by_name;
      });
      document.querySelectorAll('.CWA-welcome-chrome-ext-photo-by').forEach(elem => {
        elem.setAttribute('href', photo_by_url);
      });
      document.body.style.backgroundImage = `url("${picture_url}")`;
      document.querySelectorAll('.CWA-welcome-chrome-ext-change-btn').forEach(elem => {
        elem.style.display = 'block';
      });
    } else {
      document.querySelectorAll('.CWA-welcome-chrome-ext-greeting').forEach(elem => {
        elem.innerHTML = `What's your interst?`;
      });
      document.querySelectorAll('.CWA-welcome-chrome-ext-interest').forEach(elem => {
        elem.style.display = 'inline-block';
      });
    }
  } else {


    document.querySelectorAll('.CWA-welcome-chrome-ext-interest').forEach(elem => {
      elem.style.display = 'none';
    });
    document.querySelectorAll('.CWA-welcome-chrome-ext-user-name').forEach(elem => {
      elem.style.display = 'inline-block';
    });
    document.querySelectorAll('.CWA-welcome-chrome-ext-greeting').forEach(elem => {
      elem.innerHTML = `What's your name?`;
    });
    document.querySelectorAll('.CWA-welcome-chrome-ext-greeting').forEach(elem => {
      elem.style.display = 'inline-block';
    });
  }

  document.querySelectorAll('.CWA-welcome-chrome-ext-user-name').forEach(elem => {
    elem.addEventListener('keypress', function (e) {
      if (e.which == 13) {
        let username = e.target.value;
        if (!username) return;
        $('.CWA-welcome-chrome-ext-user-name').fadeOut(function () {
          document.querySelectorAll('.CWA-welcome-chrome-ext-greeting').forEach(elem => {
            elem.innerHTML = `What's your interest?`;
          });
          document.querySelectorAll('.CWA-welcome-chrome-ext-interest').forEach(elem => {
            elem.style.display = 'inline-block';
          });
          $('.CWA-welcome-chrome-ext-greeting').fadeIn(function () {
            setCookie('username', username, 365);
          });
        });
      }
    });
  });
  document.querySelectorAll('.CWA-welcome-chrome-ext-interest').forEach(elem => {
    elem.addEventListener('keypress', function (e) {
      if (e.which == 13) {
        let interest = e.target.value;
        if (!interest) return;
        newimage(interest);
        let username = getCookie('username');
        $('.CWA-welcome-chrome-ext-interest').fadeOut(function () {
          document.querySelectorAll('.CWA-welcome-chrome-ext-greeting').forEach(elem => {
            elem.innerHTML = `Hello ${username}.`;
          });
          $('.CWA-welcome-chrome-ext-greeting').fadeIn(function () {

            setCookie('interest', interest, 1);
          });
        });
      }
    });
  });

  document.querySelectorAll('.CWA-welcome-chrome-ext-change-btn').forEach(elem => {
    elem.addEventListener('click', function () {
      document.querySelectorAll('.CWA-welcome-chrome-ext-greeting').forEach(elem => {
        elem.innerHTML = `What's your interest?`;
      });
      document.querySelectorAll('.CWA-welcome-chrome-ext-interest').forEach(elem => {
        elem.style.display = 'inline-block';
      });
      document.querySelectorAll('.CWA-welcome-chrome-ext-interest').forEach(elem => {
        elem.focus();
      });
    });
  });

});
function newimage(keyword) {

  const url = `https://source.unsplash.com/featured/?${keyword}`;
  fetch(url)
    .then((response) => {
      document.body.style.backgroundImage = `url(${response.url})`;
      document.body.style.backgroundRepeat = "no-repeat"
      document.querySelectorAll('.CWA-welcome-chrome-ext-interest-text').forEach(elem => {
        elem.innerHTML = keyword;
      });
      document.querySelectorAll('.CWA-welcome-chrome-ext-change-btn').forEach(elem => {
        elem.style.display = 'block';
      });
    });
}


function setCurrentTime() {
  let now = new Date();

  document.querySelectorAll('.CWA-welcome-chrome-ext-time').forEach(elem => {
    elem.innerHTML = now.getHours() + ":" + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
  });
  document.querySelectorAll('.CWA-welcome-chrome-ext-date').forEach(elem => {
    elem.innerHTML = now.toLocaleDateString('fr-BE', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  });
}

function setCookie(cname, cvalue, exdays) {
  let d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};
