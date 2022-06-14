import { useState } from 'react'

export const useScreenShot = () => {
  const [screenshot, set] = useState<string>()

  function setScreenshot(buffer: Buffer) {
    console.log(Buffer.from(buffer).toString('base64'))

    set(Buffer.from(buffer).toString('base64'))
  }

  return { screenshot, setScreenshot }
}
