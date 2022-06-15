import styled from '@emotion/styled'
import { Button, Card, CardContent, ImageList, ImageListItem, Typography } from '@mui/material'
import { useCallback, useState } from 'react'
import useSWR from 'swr'
import { ScreenShotResponseType } from '~/pages/api/getScreenshot'

/**
 * アプリのメインボディ
 */
const MainControl = () => {
  const [screenshotOld, setScreenshotOld] = useState<string>()
  const [screenshotNew, setScreenshotNew] = useState<string>()

  const fetcher = (data: string): Promise<any> => fetch(data).then((res) => res.json())
  const [isProcessing, setIsProcessing] = useState(false)
  const { data, error } = useSWR('/api/getScreenshot', fetcher, {
    refreshInterval: isProcessing ? 5000 : 0,
    onSuccess: (json: ScreenShotResponseType) => {
      console.log('fetch completed ->', data)
      // [screenshotOld] に古いスクショを移動し、[screenshotNew] に新しいスクショを代入
      // 初期スクショがない (最初のスクショ撮影時)、最新のスクショへの移動は行わない
      if (screenshotNew) {
        setScreenshotOld(screenshotNew)
      }
      setScreenshotNew(json.data)
    },
  })

  // スクリーンショット取得処理
  // const getScreenShot = useCallback(async () => {
  //   const res = await fetch('/api/getScreenshot', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //   const json: ScreenShotResponseType = await res.json()
  //   setScreenshot(json.data)
  // }, [setScreenshot])

  // スクショ取得定期実行開始
  // const startPolling = () => {}

  const togglePollingState = () => {
    setIsProcessing(!isProcessing)
  }

  const ConfigArea = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `

  return (
    <>
      <ConfigArea>
        <Button onClick={togglePollingState}>{isProcessing ? 'ポーリング終了' : 'ポーリング開始'}</Button>
      </ConfigArea>
      <ImageList variant='quilted' cols={2}>
        <ImageListItem>
          <Typography variant='h5' component='div' textAlign='center'>
            古いスクショ
          </Typography>
          {screenshotOld ? <img src={`data:image/png;base64,${screenshotOld}`} alt='古いスクショ' /> : <div></div>}
        </ImageListItem>
        <ImageListItem>
          <Typography variant='h5' component='div' textAlign='center'>
            新しいスクショ
          </Typography>
          {screenshotNew ? (
            <img src={`data:image/png;base64,${screenshotNew}`} alt='新しいスクショ' style={{ marginLeft: '4px' }} />
          ) : (
            <div></div>
          )}
        </ImageListItem>
      </ImageList>
    </>
  )
}

export default MainControl
