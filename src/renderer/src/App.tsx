/*
 * @Author: nhsoft.wh
 * @Date: 2024-01-20 15:48:03
 * @LastEditors: nhsoft.wh
 * @LastEditTime: 2024-01-20 17:40:34
 * @Description: file content
 */
import { useState } from 'react'
import { useMemoizedFn, useMount } from 'ahooks'

enum EControlState {
  'linked' = 'linked',
  'unlinked' = 'unlinked'
}

const ipcRenderer = window.electron.ipcRenderer

function App(): JSX.Element {
  const [controlState, setControlState] = useState(EControlState.unlinked)

  const [controlCode, setControlCode] = useState(Math.floor(Math.random() * 10000000).toString())

  const [inputCode, setInputCode] = useState('')

  const [warningText, setWarningText] = useState('')

  useMount(() => {
    ipcRenderer.on('control-code-update', (_, value: string) => {
      setControlCode(value)
    })

    ipcRenderer.on('control-window-close', () => {
      setControlState(EControlState.unlinked)
    })
  })

  const handleCreateControlWindow = useMemoizedFn(() => {
    ipcRenderer.send('create-control-window')
  })

  const handleControlRemoteDesktop = useMemoizedFn(() => {
    if (!inputCode) {
      setWarningText('请输入终端控制码')

      return
    }

    setWarningText('')

    ipcRenderer.invoke('verify-control-key', inputCode).then((verifyPass: boolean) => {
      if (verifyPass) {
        setControlState(EControlState.linked)

        handleCreateControlWindow()
      }
    })
  })

  return controlState === EControlState.linked ? (
    <div>远程中...</div>
  ) : (
    <>
      <div>{controlCode}</div>
      <div>
        请输入终端控制码：
        <input value={inputCode} onChange={(e) => setInputCode(e.target.value)} />
        <div style={{ color: 'red' }}>{warningText}</div>
      </div>
      <button onClick={handleControlRemoteDesktop}>控制</button>
    </>
  )
}

export default App
