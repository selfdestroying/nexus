import { Outlet } from 'react-router-dom'
import Footer from './components/footer'
import Header from './components/header'

const Layout = () => {
	return (
		<div className='flex min-h-screen justify-between w-full flex-col border-x bg-muted/40'>
			<Header />
			<main className='w-full'>
				<Outlet />
			</main>
			<Footer />
		</div>
	)
}

export default Layout
