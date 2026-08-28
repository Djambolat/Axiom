const AUTH_KEY = "axiom_user";

function saveUser(user) {
  const safeUser = {
    telegram_id: user.id,
    username: user.username || null,
    first_name: user.first_name || "",
    last_name: user.last_name || "",
    photo_url: user.photo_url || null
  };

  localStorage.setItem(
    AUTH_KEY,
    JSON.stringify(safeUser)
  );

  return safeUser;
}

function getUser() {
  const savedUser = localStorage.getItem(AUTH_KEY);

  if (!savedUser) {
    return null;
  }

  try {
    return JSON.parse(savedUser);
  } catch (error) {
    localStorage.removeItem(AUTH_KEY);
    return null;
  }
}

function logout() {
  localStorage.removeItem(AUTH_KEY);
  window.location.reload();
}

function showUser(user) {
  const telegramLogin =
    document.getElementById("telegram-login");

  if (!telegramLogin) {
    return;
  }

  telegramLogin.innerHTML = `
    <div class="user-profile">

      ${
        user.photo_url
          ? `
            <img
              class="user-profile__avatar"
              src="${user.photo_url}"
              alt=""
            >
          `
          : ""
      }

      <span class="user-profile__name">
        ${user.first_name}
      </span>

      <button
        class="user-profile__logout"
        type="button"
        id="logout-button"
      >
        Выйти
      </button>

    </div>
  `;

  const logoutButton =
    document.getElementById("logout-button");

  if (logoutButton) {
    logoutButton.addEventListener(
      "click",
      logout
    );
  }
}

function checkAuth() {
  const user = getUser();

  if (user) {
    showUser(user);
  }
}

document.addEventListener(
  "DOMContentLoaded",
  checkAuth
);