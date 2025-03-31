import os
from telegram import Update, WebAppInfo
from telegram.ext import Application, CommandHandler, ContextTypes

# Токен бота
TOKEN = "8169386170:AAE02ChmwMkfGDsZMvdRtq8n6OVrIQp8Ig0"

# URL фронтенда (замените на ваш URL после деплоя)
FRONTEND_URL = "https://your-app-name.vercel.app"

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Отправляет сообщение с кнопкой для открытия WebApp."""
    try:
        await update.message.reply_text(
            "Добро пожаловать в FastReed! Нажмите кнопку ниже, чтобы начать чтение.",
            reply_markup={
                "inline_keyboard": [[
                    {
                        "text": "Открыть FastReed",
                        "web_app": {"url": FRONTEND_URL}
                    }
                ]]
            }
        )
    except Exception as e:
        print(f"Ошибка при отправке сообщения: {e}")
        await update.message.reply_text(
            "Произошла ошибка. Пожалуйста, попробуйте позже."
        )

async def error_handler(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Обработчик ошибок."""
    print(f"Произошла ошибка: {context.error}")

def main():
    """Запускает бота."""
    try:
        # Создаем приложение и передаем токен бота
        application = Application.builder().token(TOKEN).build()

        # Добавляем обработчики
        application.add_handler(CommandHandler("start", start))
        application.add_error_handler(error_handler)

        print("Бот запущен...")
        # Запускаем бота
        application.run_polling(allowed_updates=Update.ALL_TYPES)
    except Exception as e:
        print(f"Ошибка при запуске бота: {e}")

if __name__ == "__main__":
    main() 