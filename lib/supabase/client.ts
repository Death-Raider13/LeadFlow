import { firebaseAuth } from "@/lib/firebase/client"

function createFromStub() {
	const message = `Supabase DB shim: you are calling a database method on the legacy Supabase shim. Please migrate this logic to Firestore (\"lib/firebase\").`

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

export function createClient() {
	return {
		auth: {
			async getUser() {
				// On the client we can read the currentUser
				const user = firebaseAuth.currentUser || null
				return { data: { user } }
			},
			async signOut() {
				return firebaseAuth.signOut()
			},
		},
		from(_table: string) {
			return createFromStub()
		},
	}
}

export default createClient
