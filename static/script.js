const prayers = [
  { name: "صلاة باكر", time: "6:00 صباحًا", url: "" },
  { name: "صلاة الثالثة", time: "9:00 صباحًا", url: "https://st-takla.org/Agpeya/Agbeya_03_Terce_.html" },
  { name: "صلاة السادسة", time: "12:00 ظهرًا", url: "https://st-takla.org/Agpeya/Agbeya_06_Sext_.html" },
  { name: "صلاة التاسعة", time: "3:00 مساءً", url: "https://st-takla.org/Agpeya/Agbeya_09_None_.html" },
  { name: "صلاة الغروب", time: "6:00 مساءً", url: "https://st-takla.org/Agpeya/Agbeya_11_Vespers_.html" },
  { name: "صلاة النوم", time: "9:00 مساءً", url: "https://st-takla.org/Agpeya/Agbeya_12_Compline_.html" },
  { name: "صلاة الستار", time: "10:00 مساءً", url: "https://st-takla.org/Agpeya/Agbeya_Viel_.html" },
  { name: "الخدمات الأولى من نصف الليل", time: "12:00 صباحًا", url: "https://st-takla.org/Agpeya/Agbeya_Midnight_.html" },
];

function updateNextPrayer() {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  let nextPrayer = prayers[0];

  if (currentHour < 6 || (currentHour === 0 && currentMinute === 0)) {
    nextPrayer = prayers[0];
  } else if (currentHour < 9 || (currentHour === 9 && currentMinute === 0)) {
    nextPrayer = prayers[1];
  } else if (currentHour < 12 || (currentHour === 12 && currentMinute === 0)) {
    nextPrayer = prayers[2];
  } else if (currentHour < 15 || (currentHour === 15 && currentMinute === 0)) {
    nextPrayer = prayers[3];
  } else if (currentHour < 18 || (currentHour === 18 && currentMinute === 0)) {
    nextPrayer = prayers[4];
  } else if (currentHour < 21 || (currentHour === 21 && currentMinute === 0)) {
    nextPrayer = prayers[5];
  } else if (currentHour < 22 || (currentHour === 22 && currentMinute === 0)) {
    nextPrayer = prayers[6];
  } else {
    nextPrayer = prayers[7];
  }

  document.getElementById("prayer_name").textContent = `${nextPrayer.name} - ${nextPrayer.time}`;
  document.getElementById("prayer_link").setAttribute("href", nextPrayer.url);

  // تحديث الروابط في القائمة المنبثقة
  prayers.forEach((prayer, index) => {
    const prayerLink = document.getElementById(`prayer-${index + 1}-link`);
    if (prayerLink) {
      prayerLink.setAttribute("href", prayer.url);
    }
  });
  console.log(`${nextPrayer.name}  ${nextPrayer.time}`);
}

// تفعيل الوضع الداكن
function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle("dark-mode");
  const icon = document.getElementById("dark-mode-toggle");
  if (body.classList.contains("dark-mode")) {
    icon.textContent = "🌞"; // تغيير الأيقونة إلى شمس عند التبديل لوضع الليل
    localStorage.setItem("darkMode", "Enabled");
  } else {
    icon.textContent = "🌙"; // تغيير الأيقونة إلى قمر عند التبديل لوضع النهار
    localStorage.setItem("darkMode", "Disabled");
  }
}
// حدث التبديل عند تحميل الصفحة
window.onload = function () {
  const darkModeButton = document.getElementById("dark-mode-toggle");
  if (localStorage.getItem("darkMode") === "Enabled") {
    document.body.classList.add("dark-mode");
    document.getElementById("dark-mode-toggle").textContent = "🌞";
  }
  darkModeButton.addEventListener("click", toggleDarkMode);
  updateNextPrayer(); // تحديث الصلاة القادمة عند تحميل الصفحة
  setInterval(updateNextPrayer, 60000); // تحديث الصلاة القادمة كل دقيقة

  // إضافة حدث لفتح القائمة المنبثقة عند الضغط على الزر
  const menuToggle = document.getElementById("menu-toggle");
  const floatingMenu = document.getElementById("floating-menu");

  menuToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    floatingMenu.classList.toggle("hidden");
  });

  // إغلاق القائمة عند الضغط خارجها
  document.addEventListener("click", (event) => {
    if (!floatingMenu.contains(event.target) && !menuToggle.contains(event.target)) {
      floatingMenu.classList.add("hidden");
    }
  });
};
