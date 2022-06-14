import styled from '@emotion/styled'
import { Button, Card } from '@mui/material'
import { GetServerSideProps } from 'next/types'

/**
 * アプリのメインボディ
 */
const MainControl = () => {
  const startPolling = async () => {}

  const Center = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
  `

  return (
    <Center>
      <Button onClick={startPolling}>スタート</Button>
    </Center>
  )
}

export default MainControl
