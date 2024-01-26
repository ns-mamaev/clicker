import Button from "@mui/material/Button"
import { FC, useRef, useState } from "react"
import useCounterApi from "../hooks/useCounterApi"
import useDebouncedFunction from "../hooks/useDebouncedFunction"
import { CircularProgress } from "@mui/material"
import Alert from "@mui/material/Alert"
import Container from "@mui/material/Container"

export const App: FC = () => {
  const [clicks, setClicks] = useState<number>(0)
  const [serverClicks, setServerClicks] = useState<number>(0)
  const { isLoading, sendCounter, error, clearError } = useCounterApi()
  const firstClickRef = useRef<boolean>(true)

  const sendClicks = useDebouncedFunction<(click: number) => void>(
    async (clicks) => {
      const serverCounter = await sendCounter(clicks)
      if (serverCounter) {
        setServerClicks(serverCounter.count)
      }
      firstClickRef.current = true
    },
    1000,
    true
  )

  const onClick = () => {
    if (firstClickRef.current) {
      setClicks(1)
      sendClicks(1)
      firstClickRef.current = false
    } else {
      setClicks((clicks) => clicks + 1)
      sendClicks(clicks + 1)
    }
    if (error) {
      clearError()
    }
    if (serverClicks) {
      setServerClicks(0)
    }
  }

  const spinner = <CircularProgress size={24} />

  return (
    <Container
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        rowGap: 1,
      }}
      maxWidth="sm"
    >
      <Button
        sx={{ bgcolor: "orange", display: "block", height: "48px" }}
        disabled={isLoading}
        variant="contained"
        onClick={onClick}
      >
        {isLoading ? spinner : "Кликнуть"}
      </Button>
      <Alert severity="info">{`Кликнули ${clicks} раз`}</Alert>
      {error && <Alert severity="error">{error}</Alert>}
      {!!serverClicks && (
        <Alert severity="warning">
          {`По версии сервера ${serverClicks} раз`}
        </Alert>
      )}
    </Container>
  )
}
