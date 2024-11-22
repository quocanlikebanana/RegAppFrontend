import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import './styles/tailwind.css'
import App from './App.tsx'
import MuiStyleEngineProvider from './app/mui.styleengine.provider.tsx'
import ReactQueryProvider from './app/reactquery.provider.tsx'

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<MuiStyleEngineProvider>
			<ReactQueryProvider>
				<App />
			</ReactQueryProvider>
		</MuiStyleEngineProvider>
	</StrictMode>,
)