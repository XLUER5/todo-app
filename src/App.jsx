import { ConfigProvider } from 'antd'
import esES from 'antd/lib/locale/es_ES'
import AppRoutes from './router/AppRoutes'

function App() {
  return (
    <ConfigProvider locale={esES}>
      <AppRoutes />
    </ConfigProvider>
  )
}

export default App