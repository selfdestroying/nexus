const Footer = () => {
	return (
		<footer className='w-full'>
			<section className='mx-auto flex justify-between px-6 py-4 border-gray-700 text-sm text-gray-400'>
				<p>&copy; 2024 Acme Store. All rights reserved.</p>
				<nav className='flex gap-4'>
					<a href='#' className='hover:text-gray-50'>
						Terms of Service
					</a>
					<a href='#' className='hover:text-gray-50'>
						Privacy Policy
					</a>
					<a href='#' className='hover:text-gray-50'>
						Contact Us
					</a>
				</nav>
			</section>
		</footer>
	)
}

export default Footer
