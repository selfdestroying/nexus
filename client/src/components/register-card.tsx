import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from './ui/form'
import { Input } from './ui/input'

const formSchema = z.object({
	username: z
		.string()
		.min(2, { message: 'Username must be at least 2 characters' }),

	password: z
		.string()
		.min(2, { message: 'Password must be at least 2 characters' }),
})

const fetchTokens = async (user: z.infer<typeof formSchema>) => {
	const myHeaders = new Headers()
	myHeaders.append('Content-Type', 'application/json')

	const raw = JSON.stringify({
		username: user.username,
		password: user.password,
	})

	const res = await fetch('http://127.0.0.1:8000/api/register', {
		method: 'POST',
		headers: myHeaders,
		body: raw,
		redirect: 'follow',
	})

	const data = await res.json()
	if (res.status !== 201 && res.status !== 200) {
		console.log(data)
		throw new Error(data.username)
	}

	return data
}

const RegisterCard = () => {
	const queryClient = useQueryClient()
	const mutation = useMutation({
		mutationFn: fetchTokens,
		onSuccess: data => {
			localStorage.setItem('access_token', data.access)
			localStorage.setItem('refresh_token', data.refresh)
			queryClient.invalidateQueries({ queryKey: ['user'] })
		},
	})

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: '',
			password: '',
		},
	})

	const onSubmit = (data: z.infer<typeof formSchema>) => {
		mutation.mutate(data)
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Register</CardTitle>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4'>
						<FormField
							control={form.control}
							name='username'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input placeholder='Username' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input placeholder='Password' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{mutation.error && (
							<p className='text-red-500'>{mutation.error.message}</p>
						)}
						<Button type='submit'>Register</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	)
}

export default RegisterCard
