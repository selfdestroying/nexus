import { User } from '@/types'
import { useQuery } from '@tanstack/react-query'

const fetchUser = async () => {
	const accessToken = localStorage.getItem('access_token')
	if (accessToken) {
		const res = await fetch('http://127.0.0.1:8000/api/login', {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})
		const data = await res.json()
		return data
	}
	return null
}

export const useUser = () => {
	const {
		data: user,
		isError,
		error,
	} = useQuery<User>({
		queryKey: ['user'],
		queryFn: fetchUser,
		refetchOnWindowFocus: false,
		staleTime: Infinity,
	})

	return { user, isError, error }
}
