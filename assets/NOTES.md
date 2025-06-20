NOTES FOR MS4L

Click on image > Redirect to Whatsapp(DM) > Type out a default text.
Each image has a unique text

CATEGORIES
Underwear:lingerie,bra,pants,shapers,boxers,singlets
Materials:kaftan,wrappers,crepe
Leisurewear:night wears,gym wears,lounge wears

BRAND COLOURS
#ff911e - main
#f60543 - main_2
#ffcb67 - accent
#d90896 - minor
#1d1a1b - dark

TYPOGRAPHY
Google Fonts:
- Cinzel
- Sora

.menu {
    position: fixed;
    top: 0;
    right: 0;
    height: 100%;
    width: 250px;
    background-color: #f0f0f0;
    transform: translateX(100%);
    opacity: 0;
    transition: transform 0.3s ease, opacity 0.3s ease;
    padding: 20px;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
    z-index: 1000;
  }
  
  .menu ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .menu li {
    margin-bottom: 15px;
  }
  
  .menu a {
    text-decoration: none;
    color: #333;
    font-weight: 500;
  }
  
  .menu.active {
    transform: translateX(0);
    opacity: 1;
  }

HTML

      <header>
      <div class="nav_container">
        <div class="logo"><a href="#"><img src="" alt=""></a></div>
        <div class="toggle_icon">
          <i
            id="menu-toggle"
            class="ri-menu-line"
            style="font-size: 24px; cursor: pointer"
          ></i>
        </div>
      </div>

      <nav id="menu" class="menu">
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>
    </header>

JavaScript
          const menu = document.getElementById("menu");
      const toggleButton = document.getElementById("menu-toggle");

      toggleButton.addEventListener("click", function (e) {
        e.stopPropagation();
        menu.classList.toggle("active");
        toggleButton.classList.toggle("ri-menu-line");
        toggleButton.classList.toggle("ri-close-line");
      });

      // Close menu on outside click and reset icon
      document.addEventListener("click", function (e) {
        const isClickInsideMenu = menu.contains(e.target);
        const isClickOnToggle = toggleButton.contains(e.target);

        if (!isClickInsideMenu && !isClickOnToggle) {
          menu.classList.remove("active");
          toggleButton.classList.remove("ri-close-line");
          toggleButton.classList.add("ri-menu-line");
        }
      });

      <i class="ri-grid-fill"></i>