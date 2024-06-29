import { useRequestCategories } from '@/utils/api/hooks/useRequestCategories'
import { useUser } from '@/utils/api/hooks/useUser'
import { useQueryClient } from '@tanstack/react-query'
import { SearchIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import Cart from './cart'
import LoginCard from './login-card'
import Profile from './profile'
import RegisterCard from './register-card'
import { Button } from './ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from './ui/dialog'
import { Input } from './ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

const Header = () => {
	const queryClient = useQueryClient()
	const user = useUser()
	const { data } = useRequestCategories()
	const logout = () => {
		localStorage.removeItem('access_token')
		localStorage.removeItem('refresh_token')
		queryClient.invalidateQueries({ queryKey: ['user'] })
	}

	return (
		<header className='flex items-center justify-between p-4'>
			<Link to='/'>Nexus</Link>
			<div className='flex items-center gap-4 w-1/4'>
				<Link to='/products'>
					<Button variant={'outline'}>All</Button>
				</Link>
				{data &&
					data.data.map(category => (
						<Link to={`/products/${category.slug}`} key={category.id}>
							<Button variant={'outline'}>{category.name}</Button>
						</Link>
					))}
			</div>
			<div className='w-1/3 relative'>
				<SearchIcon className='absolute left-2.5 top-3 h-4 w-4 text-muted-foreground' />
				<Input
					type='search'
					placeholder='Search...'
					className='w-full rounded-lg bg-background pl-8'
				/>
			</div>
			<div className='flex items-center gap-4'>
				{user ? (
					<>
						<Cart user={user} />
						<Profile user={user} logout={logout} />
					</>
				) : (
					<Dialog>
						<DialogTrigger asChild>
							<Button variant={'outline'}>Login</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogTitle></DialogTitle>
							<DialogDescription></DialogDescription>
							<Tabs defaultValue='account' className='w-full'>
								<TabsList className='w-full'>
									<TabsTrigger value='account' className='w-full'>
										Login
									</TabsTrigger>
									<TabsTrigger value='password' className='w-full'>
										Register
									</TabsTrigger>
								</TabsList>
								<TabsContent value='account'>
									<LoginCard />
								</TabsContent>
								<TabsContent value='password'>
									<RegisterCard />
								</TabsContent>
							</Tabs>
						</DialogContent>
					</Dialog>
				)}
			</div>
		</header>
	)
}

export default Header
