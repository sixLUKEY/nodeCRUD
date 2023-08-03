const updatedUser = async ( userId, updatedData ) => {
    try {
        const res = await fetch(`http://localhost:3000/api/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        })

        if ( !res.ok ){
            throw new Error('Failed to update user')
        }

        const updatedUser = await res.json()
        console.log('User updated successfully:', updatedUser)
    } catch ( err ){
        console.error('Error update user:', err )
    }
}

const userId = 1
const updatedData = {
    name: 'Joel Mukhanya',
    email: 'JoelG@G'
}

updatedUser( userId, updatedData )