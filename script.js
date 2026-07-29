(function(){
  "use strict";

  var SUPPORTED = ["en","pt","es"];

  function detectLang(){
    try{
      var saved = localStorage.getItem("ffp_lang");
      if(saved && SUPPORTED.indexOf(saved) !== -1) return saved;
    }catch(e){}
    var nav = (navigator.language || "en").toLowerCase();
    if(nav.indexOf("pt") === 0) return "pt";
    if(nav.indexOf("es") === 0) return "es";
    return "en";
  }

  function applyLang(lang){
    if(SUPPORTED.indexOf(lang) === -1) lang = "en";
    var dict = FFP_I18N[lang];
    document.documentElement.setAttribute("lang", lang);

    document.querySelectorAll("[data-i18n]").forEach(function(el){
      var key = el.getAttribute("data-i18n");
      if(dict[key] !== undefined){
        el.innerHTML = dict[key];
      }
    });

    document.querySelectorAll("[data-i18n-attr]").forEach(function(el){
      var spec = el.getAttribute("data-i18n-attr").split(":");
      var attr = spec[0], key = spec[1];
      if(dict[key] !== undefined){
        el.setAttribute(attr, dict[key]);
      }
    });

    document.querySelectorAll(".lang-switch button").forEach(function(btn){
      btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
    });

    document.title = dict.meta_title || document.title;

    try{ localStorage.setItem("ffp_lang", lang); }catch(e){}
  }

  document.querySelectorAll(".lang-switch button").forEach(function(btn){
    btn.addEventListener("click", function(){
      applyLang(btn.getAttribute("data-lang"));
    });
  });

  applyLang(detectLang());

  // Mobile nav toggle
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");
  var siteHeader = document.querySelector(".site-header");

  function positionMobileNav(){
    if(siteHeader && navLinks){
      var h = siteHeader.getBoundingClientRect().bottom;
      navLinks.style.top = h + "px";
      navLinks.style.height = (window.innerHeight - h) + "px";
    }
  }

  if(navToggle && navLinks){
    navToggle.addEventListener("click", function(){
      positionMobileNav();
      var open = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    window.addEventListener("resize", function(){
      if(navLinks.classList.contains("open")) positionMobileNav();
    });
    navLinks.querySelectorAll("a").forEach(function(a){
      a.addEventListener("click", function(){
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Scroll reveal
  var revealEls = document.querySelectorAll(".reveal");
  if("IntersectionObserver" in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, {threshold:0.15});
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add("in"); });
  }

  // Animate report card bars once visible
  var card = document.getElementById("reportCard");
  if(card){
    var fillBars = function(){
      card.querySelectorAll(".rc-fill").forEach(function(bar){
        bar.style.width = bar.getAttribute("data-pct") + "%";
      });
    };
    if("IntersectionObserver" in window){
      var io2 = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if(entry.isIntersecting){
            fillBars();
            io2.disconnect();
          }
        });
      }, {threshold:0.3});
      io2.observe(card);
    } else {
      fillBars();
    }
  }

  // Footer year
  var yearEl = document.getElementById("year");
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // Agenciados video teasers — activates automatically once you fill in
  // data-video="assets/players/name.mp4" and/or data-photo="assets/players/name.jpg"
  // on a .agent-card in index.html. Leave them empty to keep the logo showing.
  // When a video is present, the logo shows first, then fades out once the video starts.
  document.querySelectorAll(".agent-card").forEach(function(card){
    var videoSrc = card.getAttribute("data-video");
    var photoSrc = card.getAttribute("data-photo");
    var youtubeId = card.getAttribute("data-youtube");
    var media = card.querySelector(".agent-media");
    var placeholder = card.querySelector(".agent-placeholder");

    function hidePlaceholderAfter(ms){
      if(!placeholder) return;
      setTimeout(function(){ placeholder.classList.add("is-hidden"); }, ms);
    }

    if(youtubeId){
      var iframe = document.createElement("iframe");
      iframe.src = "https://www.youtube.com/embed/" + youtubeId +
        "?autoplay=1&mute=1&loop=1&playlist=" + youtubeId +
        "&controls=0&modestbranding=1&playsinline=1&rel=0";
      iframe.setAttribute("frameborder", "0");
      iframe.setAttribute("allow", "autoplay; encrypted-media");
      iframe.className = "agent-youtube";
      media.insertBefore(iframe, placeholder);
      hidePlaceholderAfter(2500);
    } else if(videoSrc){
      var video = document.createElement("video");
      video.src = videoSrc;
      video.muted = true;
      video.loop = true;
      video.autoplay = true;
      video.playsInline = true;
      if(photoSrc) video.poster = photoSrc;
      media.insertBefore(video, placeholder);
      video.addEventListener("playing", function(){ hidePlaceholderAfter(300); }, {once:true});
      hidePlaceholderAfter(3000); // fallback in case "playing" never fires
    } else if(photoSrc){
      media.style.backgroundImage = "url('" + photoSrc + "')";
      media.style.backgroundSize = "cover";
      media.style.backgroundPosition = "center";
      if(placeholder) placeholder.classList.add("is-hidden");
    }
    // If none of the above: logo placeholder stays visible permanently — that's the intended default.
  });

  // Cookie consent banner
  (function cookieBanner(){
    var CONSENT_KEY = "ffp_cookie_consent";
    var existing;
    try{ existing = localStorage.getItem(CONSENT_KEY); }catch(e){ existing = null; }

    function loadAnalytics(){
      // Placeholder: paste your Google Analytics (GA4) snippet here.
      // Only runs after the visitor accepts cookies.
      // Example:
      // var s = document.createElement('script');
      // s.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX';
      // s.async = true;
      // document.head.appendChild(s);
      // window.dataLayer = window.dataLayer || [];
      // function gtag(){ dataLayer.push(arguments); }
      // gtag('js', new Date());
      // gtag('config', 'G-XXXXXXX');
    }

    if(existing === "accepted"){ loadAnalytics(); return; }
    if(existing === "declined"){ return; }

    var dict = FFP_I18N[document.documentElement.getAttribute("lang") || "en"];
    var bar = document.createElement("div");
    bar.className = "cookie-bar";
    bar.innerHTML =
      '<p><span data-i18n="cookie_text">' + dict.cookie_text + '</span> ' +
      '<a href="privacy.html" data-i18n="cookie_link">' + dict.cookie_link + '</a>.</p>' +
      '<div class="cookie-actions">' +
      '<button type="button" class="btn btn-outline cookie-decline" data-i18n="cookie_decline">' + dict.cookie_decline + '</button>' +
      '<button type="button" class="btn btn-gold cookie-accept" data-i18n="cookie_accept">' + dict.cookie_accept + '</button>' +
      '</div>';
    document.body.appendChild(bar);
    requestAnimationFrame(function(){ bar.classList.add("in"); });

    bar.querySelector(".cookie-accept").addEventListener("click", function(){
      try{ localStorage.setItem(CONSENT_KEY, "accepted"); }catch(e){}
      loadAnalytics();
      bar.classList.remove("in");
      setTimeout(function(){ bar.remove(); }, 300);
    });
    bar.querySelector(".cookie-decline").addEventListener("click", function(){
      try{ localStorage.setItem(CONSENT_KEY, "declined"); }catch(e){}
      bar.classList.remove("in");
      setTimeout(function(){ bar.remove(); }, 300);
    });
  })();

  // Contact form: tries Formspree endpoint; falls back to mailto if not configured
  var form = document.getElementById("ffpForm");
  var status = document.getElementById("formStatus");
  var TO_EMAIL = "info@footballfuturepros.com";

  if(form){
    form.addEventListener("submit", function(e){
      var action = form.getAttribute("action") || "";
      var notConfigured = action.indexOf("YOUR_FORM_ID") !== -1;

      if(notConfigured){
        e.preventDefault();
        var name = form.querySelector("[name=name]").value;
        var email = form.querySelector("[name=email]").value;
        var role = form.querySelector("[name=role]").value;
        var message = form.querySelector("[name=message]").value;
        var subject = "FFP inquiry from " + name + " (" + role + ")";
        var body = "Name: " + name + "\nEmail: " + email + "\nRole: " + role + "\n\n" + message;
        window.location.href = "mailto:" + TO_EMAIL +
          "?subject=" + encodeURIComponent(subject) +
          "&body=" + encodeURIComponent(body);
        if(status){
          status.textContent = "Opening your email app…";
          status.className = "form-status ok";
        }
        return;
      }

      // If a real Formspree endpoint is configured, submit via fetch for a smooth no-reload experience.
      e.preventDefault();
      var data = new FormData(form);
      fetch(action, {
        method: "POST",
        body: data,
        headers: { "Accept": "application/json" }
      }).then(function(res){
        if(res.ok){
          if(status){ status.textContent = "Sent — thank you."; status.className = "form-status ok"; }
          form.reset();
        } else {
          if(status){ status.textContent = "Something went wrong. Please email us directly."; status.className = "form-status err"; }
        }
      }).catch(function(){
        if(status){ status.textContent = "Something went wrong. Please email us directly."; status.className = "form-status err"; }
      });
    });
  }
})();
