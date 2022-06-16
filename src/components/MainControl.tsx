import styled from '@emotion/styled'
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  ImageList,
  ImageListItem,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material'
import { useCallback, useState } from 'react'
import useSWR from 'swr'
import { ScreenShotResponseType } from '~/pages/api/getScreenshot'

/**
 * アプリのメインボディ
 */
const MainControl = () => {
  const [screenshotOld, setScreenshotOld] = useState<string>()
  const [screenshotNew, setScreenshotNew] = useState<string>()
  const [pollingInterval, setPollingInterval] = useState(5000)

  const fetcher = (data: string): Promise<any> => {
    return fetch(data).then((res) => res.json())
  }
  const [isProcessing, setIsProcessing] = useState(false)
  const { data, error } = useSWR('/api/getScreenshot', fetcher, {
    refreshInterval: isProcessing ? pollingInterval : 0,
    onSuccess: (json: ScreenShotResponseType) => {
      // [screenshotOld] に古いスクショを移動し、[screenshotNew] に新しいスクショを代入
      // 初期スクショがない (最初のスクショ撮影時)、最新のスクショへの移動は行わない
      if (screenshotNew) {
        setScreenshotOld(screenshotNew)
      }
      setScreenshotNew(json.data)
    },
  })

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
              <MenuItem value={5000}>5s</MenuItem>
              <MenuItem value={10000}>10s</MenuItem>
              <MenuItem value={20000}>20s</MenuItem>
              <MenuItem value={50000}>50s</MenuItem>
              <MenuItem value={100000}>100s</MenuItem>
            </Select>
          </FormControl>
        </Box>
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
