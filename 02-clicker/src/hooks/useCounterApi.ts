import { useState } from "react";

type ResponseShape = {
  count: number,
  ok: boolean,
}

type ErrorShape = {
  error: string,
  error_ui: string,
  ok: boolean,
}

export default function useCounterApi() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  async function sendCounter(count: number) {
    setIsLoading(true)

    try {
      const res = await fetch(
        'https://lk.zont-online.ru/api/button_count',
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            "X-ZONT-Client": "palmally@yandex.ru",
          },
          body: JSON.stringify({ count })
        }
      )
  
      if (res.ok) {
        return res.json() as Promise<ResponseShape>
      }
  
      const {error_ui} = await res.json() as ErrorShape
      setError(error_ui)
    } catch(err) {
      console.log(err)
      setError('Непредвиденная ошибка при запросе')
    } finally {
      setIsLoading(false)
    }
  }

  function clearError() {
    setError(null)
  }

  return {
    isLoading,
    sendCounter,
    clearError,
    error,
  }
}
