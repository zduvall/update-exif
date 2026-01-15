function App(): React.JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <div>
      <button onClick={ipcHandle}>Send Ping</button>
    </div>
  )
}

export default App
