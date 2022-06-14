import styled from '@emotion/styled'
import { Button } from '@mui/material'
import { useCallback, useState } from 'react'
import { ScreenShotResponseType } from '~/pages/api/getScreenshot'

/**
 * アプリのメインボディ
 */
const MainControl = () => {
  const [screenshot, setScreenshot] = useState<string>()

  const postScreenShot = useCallback(async () => {
    const res = await fetch('/api/getScreenshot', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const json: ScreenShotResponseType = await res.json()
    setScreenshot(json.data)
  }, [setScreenshot])

  const ConfigArea = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `

  const ScreenshotArea = styled.div`
    text-align: center;
  `

  return (
    <>
      <ConfigArea>
        <Button onClick={postScreenShot}>スクリーンショット撮影</Button>
      </ConfigArea>
      <ScreenshotArea>
        {screenshot ? <img src={`data:image/png;base64,${screenshot}`} alt='' /> : <div></div>}
      </ScreenshotArea>
    </>
  )
}

export default MainControl
