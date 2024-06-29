import { User } from '@/types'

import { Avatar, AvatarFallback } from './ui/avatar'
import { Button } from './ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from './ui/dropdown-menu'

const Profile = ({ user, logout }: { user: User; logout: () => void }) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant='outline'
					size='icon'
					className='overflow-hidden rounded-full'
				>
					<Avatar>
						<AvatarFallback>
							{user.username.slice(0, 2).toUpperCase()}
						</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuLabel>{user.username}</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{/* <DropdownMenuItem>Settings</DropdownMenuItem>
				<DropdownMenuItem>Support</DropdownMenuItem> */}
				{/* <DropdownMenuSeparator /> */}
				<DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default Profile
