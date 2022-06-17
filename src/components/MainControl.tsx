import styled from '@emotion/styled'
import {
  Box,
  Button,
  FormControl,
  ImageList,
  ImageListItem,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import useSWR from 'swr'
import { ScreenShotResponseType } from '~/pages/api/getScreenshot'
import { ScreenshotDiffRequestBody, ScreenshotDiffResponseType } from '~/pages/api/getScreenshotDiff'
import { setMediaType } from '~/utils/image'

type DiffScreenShotType = {
  old: string
  new: string
}

// エイリアス
type ScreenShotValue = string | null

/**
 * アプリのメインボディ
 */
const MainControl = () => {
  const [screenshotOld, setScreenshotOld] = useState<string>()
  const [screenshotNew, setScreenshotNew] = useState<string>()
  const [screenshotDiff, setScreenshotDiff] = useState<string>()
  const [pollingInterval, setPollingInterval] = useState(5000)

  const fetcher = (data: string): Promise<any> => {
    return fetch(data).then((res) => res.json())
  }
  const [isProcessing, setIsProcessing] = useState(false)
  const { data, error, mutate } = useSWR('/api/getScreenshot', fetcher, {
    refreshInterval: isProcessing ? pollingInterval : 0,
    onSuccess: async (json: ScreenShotResponseType) => {
      // useStateのstateが再レンダリングしないと変わらないため、コードの視認性を
      // 上げるためにスクショ結果用の変数を用意している。
      // FIXME: もっといい方法ないか？
      let newValue: ScreenShotValue = null
      let oldValue: ScreenShotValue = null

      // [screenshotOld] に古いスクショを移動し、[screenshotNew] に新しいスクショを代入
      // 初期スクショがない (最初のスクショ撮影時)、[screenshotOld]への移動は行わない
      if (screenshotNew) {
        setScreenshotOld(screenshotNew)
        oldValue = screenshotNew
      }
      setScreenshotNew(json.data)
      newValue = json.data

      if (newValue && oldValue) {
        diffScreenshot(oldValue, newValue)
      }
    },
  })

  const diffScreenshot = async (oldImage: string, newImage: string) => {
    if (screenshotNew) {
      const body: ScreenshotDiffRequestBody = {
        image1: setMediaType(oldImage),
        image2: setMediaType(newImage),
      }
      try {
        const res = await fetch('/api/getScreenshotDiff', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        })
        const json: ScreenshotDiffResponseType = await res.json()
        setScreenshotDiff(json.data)
      } catch (e) {
        console.error(e)
      }
    }
  }

  const setInterval = (event: SelectChangeEvent) => {
    setPollingInterval(Number(event.target.value))
  }

  const togglePollingState = () => {
    setIsProcessing(!isProcessing)
  }

  const ConfigArea = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `

  const Head = styled(Typography)`
    position: absolute;
    top: 8px;
    right: 8px;
    background-color: white;
  `

  return (
    <>
      <ConfigArea>
        <Box style={{ width: '400px' }}>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>ポーリング間隔</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              size='small'
              value={pollingInterval.toString()}
              label='ポーリング間隔 (s)'
              onChange={setInterval}
            >
              <MenuItem value={5000}>5秒</MenuItem>
              <MenuItem value={10000}>10秒</MenuItem>
              <MenuItem value={20000}>20秒</MenuItem>
              <MenuItem value={50000}>50秒</MenuItem>
              <MenuItem value={100000}>100秒</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Button onClick={togglePollingState}>{isProcessing ? 'ポーリング終了' : 'ポーリング開始'}</Button>
        <Button onClick={() => mutate()}>一度だけ実行</Button>
      </ConfigArea>
      <ImageList variant='quilted' cols={2}>
        <ImageListItem>
          <Head variant='h5' textAlign='center'>
            古いスクショ
          </Head>
          {screenshotOld ? <img src={`data:image/png;base64,${screenshotOld}`} alt='古いスクショ' /> : <div></div>}
        </ImageListItem>
        <ImageListItem>
          <Head variant='h5' textAlign='center'>
            新しいスクショ
          </Head>
          {screenshotNew ? (
            <img src={`data:image/png;base64,${screenshotNew}`} alt='新しいスクショ' style={{ marginLeft: '4px' }} />
          ) : (
            <div></div>
          )}
        </ImageListItem>
      </ImageList>
      <ImageList variant='quilted' cols={1}>
        <ImageListItem>
          <Head variant='h5' textAlign='center'>
            比較結果
          </Head>
          {screenshotDiff ? <img src={setMediaType(screenshotDiff)} alt='スクショの比較結果' /> : <div></div>}
        </ImageListItem>
      </ImageList>
    </>
  )
}

export default MainControl
