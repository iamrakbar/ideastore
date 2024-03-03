/* TOGGLE MENU */
(function() {
  'use strict';

  var last_known_scroll_position = 0;
  var ticking = false;
  var nav = document.getElementById('nav');
  var menu = document.getElementById('menu');
  var menuOpenButton = document.getElementById('menu-open-btn');
  var menuCloseButton = document.getElementById('menu-close-btn');

  function menuOpen() {
    menuOpenButton.classList.add('hidden');
    menuCloseButton.classList.remove('hidden');
    menu.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  }

  function menuClose() {
    menuOpenButton.classList.remove('hidden');
    menuCloseButton.classList.add('hidden');
    menu.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }

  function setShadow(scroll_pos) {
    if (scroll_pos > 0) {
      nav.classList.add('shadow');
    } else {
      nav.classList.remove('shadow');
    }
  }

  function onScroll(e) {
    last_known_scroll_position = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(function() {
        setShadow(last_known_scroll_position);
        ticking = false;
      });

      ticking = true;
    }
  }

  menuOpenButton.addEventListener('click', menuOpen);
  menuCloseButton.addEventListener('click', menuClose);

  window.addEventListener('scroll', onScroll);
})();

/* TIPPY */
(function() {
  'use strict';

  var tippyButton = document.querySelectorAll('.tippy-button');
  var template = document.getElementById('popover');
  var container = document.createElement('div');
  container.appendChild(document.importNode(template.content, true));

  var instances = tippy(tippyButton, {
    theme: 'light',
    arrow: true,
    interactive: true,
    content: container.innerHTML
  });
})();

/* FLICKITY */
(function() {
  'use strict';
  var carousel = document.querySelector('.carousel');
  var carouselNavButton = document.querySelectorAll('.carousel-nav-btn');

  if (carousel !== null) {
    var flkty = new Flickity(carousel, {
      imagesLoaded: true,
      prevNextButtons: false,
      pageDots: false,
      lazyLoad: true
    });

    for (var i = 0; i < carouselNavButton.length; i++) {
      carouselNavButton[i].addEventListener(
        'click',
        function(i) {
          flkty.selectCell(i);
        }.bind(null, i)
      );
    }
  }
})();

/* CHAT BOX */
(function() {
  'use strict';

  var isChatOpen = JSON.parse(localStorage.getItem('isChatOpen'));
  var chatBox = document.getElementById('chat-box');
  var openChatButton = document.getElementById('open-chat-btn');
  var closeChatButton = document.getElementById('close-chat-btn');
  var chatForm = document.getElementById('chat-form');
  var chatPhone = document.getElementById('chat-phone');
  var chatText = document.getElementById('chat-text');
  var chatDialogue = document.getElementById('chat-dialogue');
  var today = new Date();
  var curHr = today.getHours();
  var greeting = document.createElement('p');

  function setGreeting() {
    if (curHr < 12) {
      return 'Selamat Pagi 🌅';
    } else if (curHr < 14) {
      return 'Selamat Siang ☀️';
    } else if (curHr < 18) {
      return 'Selamat Sore 🌇';
    } else {
      return 'Selamat Malam 🌃';
    }
  }

  function onChatSend(e) {
    e.preventDefault();
    if (chatText.value !== '')
      window.open(
        'https://api.whatsapp.com/send?phone=' +
          chatPhone.value +
          '&text=' +
          encodeURIComponent(chatText.value),
        '_blank'
      );
  }

  function openChatBox() {
    chatBox.classList.remove('hidden');
    localStorage.setItem('isChatOpen', JSON.stringify(true));
  }

  function closeChatBox() {
    chatBox.classList.add('hidden');
    localStorage.setItem('isChatOpen', JSON.stringify(false));
  }

  function checkChatBoxState() {
    if (chatBox.classList.contains('hidden')) {
      openChatBox();
    } else {
      closeChatBox();
    }
  }

  function onDocumentReady() {
    openChatButton.classList.remove('hidden');
    if (isChatOpen !== false) {
      setTimeout(function() {
        openChatBox();
      }, 1500);
    }
  }

  if (chatBox !== null) {
    chatForm.addEventListener('submit', onChatSend);
    closeChatButton.addEventListener('click', closeChatBox);
    openChatButton.addEventListener('click', checkChatBoxState);

    if (
      document.readyState === 'complete' ||
      (document.readyState !== 'loading' && !document.documentElement.doScroll)
    ) {
      onDocumentReady();
    } else {
      document.addEventListener('DOMContentLoaded', onDocumentReady);
    }
    greeting.textContent = setGreeting();
    chatDialogue.insertBefore(greeting, chatDialogue.firstChild);
  }
})();
