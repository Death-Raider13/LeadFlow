import { getServerUser } from "@/lib/firebase/server-auth"

function createFromStub() {
	const message = `Supabase DB shim (server): DB methods are not implemented. Please migrate server routes to Firestore using \
	'@/lib/firebase/admin' (Firestore) or implement a proper adapter.`

	const chain: any = {
		select() { return chain },
		eq() { return chain },
		gte() { return chain },
		in() { return chain },
		update() { return Promise.reject(new Error(message)) },
		insert() { return Promise.reject(new Error(message)) },
		single() { return Promise.reject(new Error(message)) },
		then() { return Promise.reject(new Error(message)) },
	}

	return chain
}

export async function createClient() {
	return {
		auth: {
			async getUser() {
				const user = await getServerUser()
				return { data: { user } }
			},
		},
		from(_table: string) {
			return createFromStub()
		},
	}
}

export default createClient
