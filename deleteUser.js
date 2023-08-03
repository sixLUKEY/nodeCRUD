const deleteUser = async ( userId ) => {
    try {
        const res = await fetch(`http://localhost:3000/api/users/${userId}`, {
            method: 'DELETE'
        })

        if ( !res.ok ){
            throw new Error('Failed to delete user')
        }

        const data = await res.json()
        console.log('User deleted successfully:', data.message)
    } catch ( err ){
        console.error('Error deleting user:', err)
    }
}

deleteUser(3)