import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Layout.tsx'
import { ThemeProvider } from './components/theme-provider.tsx'

import './index.css'
import Main from './pages/main.tsx'
import Products from './pages/products.tsx'

const route = createBrowserRouter([
	{
		element: <Layout />,
		children: [
			{
				path: '/',
				element: <Main />,
			},
			{
				path: '/products',
				element: <Products />,
				children: [
					{
						path: ':category',
						element: <Products />,
					},
				],
			},
		],
	},
])

export const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
	<ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={route} />
			<ReactQueryDevtools />
		</QueryClientProvider>
	</ThemeProvider>
)
