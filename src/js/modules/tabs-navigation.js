// Функція навігації для табів з простим підходом без анкорів
window.addEventListener('load', function() {
  const tabButtons = document.querySelectorAll('.solutions__nav-button');
  const tabs = document.querySelectorAll('.solutions__tab');
  const tabsSection = document.querySelector('.solutions');
  
  if (!tabButtons.length || !tabs.length || !tabsSection) return;
  
  const SCROLL_OFFSET = 100; // Відступ при прокрутці
  const SCROLL_THROTTLE = 150; // Мс між обробкою скрол-подій (зменшив для кращої чутливості)
  const ACTIVATION_THRESHOLD = 0.3; // Зменшив поріг видимості для активації таба
  const SCROLL_TIMEOUT = 800; // Час блокування скролу після кліку
  
  let isScrolling = false; // Прапорець програмної прокрутки
  let lastScrollTime = 0; // Час останньої обробки скролу
  let activeTabIndex = -1; // Індекс поточного активного таба
  let scrollDirection = 0; // Напрямок скролу: 1 - вниз, -1 - вгору, 0 - невідомо
  let lastScrollY = 0; // Остання позиція скролу
  
  let tabPositions = [];
  
  init();
  
  function init() {
    lastScrollY = window.scrollY;
    
    tabButtons.forEach((button, index) => {
      if (button.classList.contains('_active')) {
        activeTabIndex = index;
        
        const tabId = button.getAttribute('data-tab');
        const tab = document.getElementById(tabId);
        if (tab) tab.classList.add('_active');
      }
    });
    
    if (activeTabIndex < 0 && tabButtons.length > 0) {
      activeTabIndex = 0;
      tabButtons[0].classList.add('_active');
      
      const tabId = tabButtons[0].getAttribute('data-tab');
      const tab = document.getElementById(tabId);
      if (tab) tab.classList.add('_active');
    }

    addEventListeners();
    
    calculateTabPositions();
    
    setTimeout(() => {
      updateNavigationOnScroll();
      // console.log('Початкове оновлення навігації');
    }, 500);
    
    // console.log('Навігацію таби ініціалізовано');
  }
  
  function addEventListeners() {
    tabButtons.forEach(button => {
      button.addEventListener('click', handleTabButtonClick);
    });
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    window.addEventListener('resize', () => {
      calculateTabPositions();
      setTimeout(updateNavigationOnScroll, 200);
    });
  }
  
  function calculateTabPositions() {
    tabPositions = [];
    
    tabs.forEach((tab, index) => {
      if (!tab) return;
      
      const rect = tab.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      tabPositions.push({
        id: tab.id,
        top: rect.top + scrollTop - SCROLL_OFFSET,
        bottom: rect.bottom + scrollTop,
        height: rect.height,
        index: index
      });
    });
    
    // console.log('Позиції табів оновлено:', tabPositions.length);
  }
  
  function handleTabButtonClick(event) {
    const button = event.currentTarget;
    const tabId = button.getAttribute('data-tab');
    const targetTab = document.getElementById(tabId);
    
    if (!targetTab) return;
    
    let clickedIndex = -1;
    tabButtons.forEach((btn, index) => {
      if (btn === button) {
        clickedIndex = index;
      }
    });
    
    tabButtons.forEach(btn => btn.classList.remove('_active'));
    tabs.forEach(tab => tab.classList.remove('_active'));
    
    button.classList.add('_active');
    
    activeTabIndex = clickedIndex;
    
    // console.log('Клік на таб:', activeTabIndex);
    
    scrollToTab(targetTab, tabId);
  }
  
  function scrollToTab(targetTab, tabId) {
    isScrolling = true;
    
    const position = tabPositions.find(pos => pos.id === tabId);
    
    if (!position) {
      // console.warn('Позицію для таба не знайдено:', tabId);
      isScrolling = false;
      return;
    }
    
    targetTab.classList.add('_active');
    
    window.scrollTo({
      top: position.top,
      behavior: 'smooth'
    });
    

    const scrollTimer = setTimeout(() => {
      isScrolling = false;
      // console.log('Прокрутку завершено, активовано таб:', activeTabIndex);
      updateNavigationOnScroll();
    }, SCROLL_TIMEOUT);
    
    window.addEventListener('scroll', function checkScrollEnd() {
      const currentPos = window.scrollY;
      if (Math.abs(currentPos - position.top) < 5) {
        clearTimeout(scrollTimer);
        isScrolling = false;
        window.removeEventListener('scroll', checkScrollEnd);
        // console.log('Скрол зупинився природньо');
      }
    }, { once: false, passive: true });
  }
  
  function handleScroll() {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY) {
      scrollDirection = 1; // вниз
    } else if (currentScrollY < lastScrollY) {
      scrollDirection = -1; // вгору
    }
    lastScrollY = currentScrollY;
    
    // Якщо це програмна прокрутка, пропускаємо
    if (isScrolling) return;
    
    // Обмежуємо частоту обробки подій скролу (тротлінг)
    const now = Date.now();
    if (now - lastScrollTime < SCROLL_THROTTLE) return;
    
    lastScrollTime = now;
    
    updateNavigationOnScroll();
  }
  
  function updateNavigationOnScroll() {
    if (!tabPositions.length) {
      // console.warn('Позиції табів не розраховані');
      calculateTabPositions(); 
      return;
    }
    
    const windowTop = window.scrollY;
    const windowBottom = windowTop + window.innerHeight;
    const windowMiddle = windowTop + (window.innerHeight / 2);
    
    let bestTabIndex = -1;
    let bestVisiblePortion = -1;
    
    tabPositions.forEach((position, index) => {
      if (position.bottom < windowTop || position.top > windowBottom) {
        return;
      }
      
      let visibleTop = Math.max(position.top, windowTop);
      let visibleBottom = Math.min(position.bottom, windowBottom);
      let visibleHeight = visibleBottom - visibleTop;
      
      let visiblePortion = visibleHeight / position.height;
      
      const distanceToMiddle = Math.abs(((position.top + position.bottom) / 2) - windowMiddle);
      const normalizedDistance = Math.min(1, distanceToMiddle / window.innerHeight);
      const centerBonus = (1 - normalizedDistance) * 0.3;
      
      visiblePortion = visiblePortion + centerBonus;
      
      if (index === activeTabIndex) {
        visiblePortion += 0.15;
      }
      
      if (scrollDirection > 0 && index > activeTabIndex) {
        visiblePortion += 0.2;
      } else if (scrollDirection < 0 && index < activeTabIndex) {
        visiblePortion += 0.2;
      }
      
      const isAdjacent = Math.abs(index - activeTabIndex) === 1;
      const effectiveThreshold = isAdjacent ? ACTIVATION_THRESHOLD - 0.1 : ACTIVATION_THRESHOLD;
      
      if (visiblePortion > bestVisiblePortion && visiblePortion >= effectiveThreshold) {
        bestVisiblePortion = visiblePortion;
        bestTabIndex = index;
      }
    });
    
    if (bestTabIndex >= 0 && bestTabIndex !== activeTabIndex) {
      // console.log('Активуємо новий таб:', bestTabIndex, 'замість', activeTabIndex, 'з видимістю', bestVisiblePortion.toFixed(2));
      activateTab(bestTabIndex);
    }
  }
  
  function activateTab(index) {
    activeTabIndex = index;
    
    tabButtons.forEach((button, i) => {
      if (i === index) {
        button.classList.add('_active');
        
        const tabId = button.getAttribute('data-tab');
        const tab = document.getElementById(tabId);
        
        tabs.forEach(t => t.classList.remove('_active'));
        
        if (tab) tab.classList.add('_active');
      } else {
        button.classList.remove('_active');
      }
    });
  }
}); 