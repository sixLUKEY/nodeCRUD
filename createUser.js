const { response } = require("express")

const createUser = async () => {
    const user = {
        id: 3,
        name: 'Ayesha Galant',
        email: 'ayesha.g@example.com'
    }

    try{
        const res = await fetch('http://localhost:3000/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( user )
        })

        if ( !res.ok ){
            throw new Error('Failed to create user')
        }

        const newUser = response.json()
        console.log('New user created:', newUser)
    } catch ( err ){
        console.error('Error creating user:', err)
    }
}

createUser();