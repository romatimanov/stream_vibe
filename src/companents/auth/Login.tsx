import { Button } from "@/ui/Button/Button";
import { useState } from "react";
import style from "./login.module.css";

export default function Login() {
  const [authUrl, setAuthUrl] = useState<string | null>(null);
  const [requestToken, setRequestToken] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const fetchAccountId = async () => {
    const sessionId = localStorage.getItem("sessionId");

    if (!sessionId) {
      console.error("Ошибка: sessionId отсутствует");
      return;
    }

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/account?api_key=${process.env.NEXT_PUBLIC_API_KEY}&session_id=${sessionId}`
      );

      const data = await response.json();
      if (data.id) {
        localStorage.setItem("accountId", data.id);
      } else {
        console.error("Ошибка получения account_id:", data);
      }
    } catch (error) {
      console.error("Ошибка API TMDb:", error);
    }
  };

  const fetchSession = async () => {
    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (data.authUrl) {
        setAuthUrl(data.authUrl);
        setRequestToken(data.requestToken);

        localStorage.setItem("requestToken", data.requestToken);
      }
    } catch (error) {
      console.error("Ошибка получения request_token:", error);
    }
  };

  const createSession = async () => {
    const requestToken = localStorage.getItem("requestToken");

    if (!requestToken) {
      console.error("Ошибка: requestToken отсутствует в localStorage");
      return;
    }

    try {
      const response = await fetch("/api/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestToken }),
      });

      const data = await response.json();

      if (data.sessionId) {
        console.log("✅ Session ID:", data.sessionId);
        localStorage.setItem("sessionId", data.sessionId);

        await fetchAccountId();

        window.location.href = "/dashboard";
      } else {
        console.error("Ошибка создания session_id:", data);
      }
    } catch (error) {
      console.error("Ошибка создания session_id:", error);
    }
  };

  return (
    <div className={style.container}>
      {!authUrl ? (
        <Button onClick={fetchSession}>Запросить авторизацию</Button>
      ) : (
        <div className={style.content}>
          <h3 className="global-title--small">
            Перейдите по ссылке, чтобы авторизоваться:
          </h3>
          <a
            className={style.link}
            href={authUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              setIsSuccess(true);
            }}
          >
            Подтвердить авторизацию на TMDb
          </a>
          <button
            className={`${style.button} ${!isSuccess ? style.active : ""}`}
            onClick={createSession}
          >
            Подтвердить
          </button>
        </div>
      )}
    </div>
  );
}
