const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')
const data = require('./data')

app.use(express.json())

app.get('/', ( req, res ) => {
    res.send('Welcome to your server')
})

app.get('/api/data', ( req, res ) => {
    res.json( data.data )
})

let users = []
fs.readFile('users.json', 'utf8', ( err, data ) => {
    if (err) {
        console.error('Error reading users.json:', err)
    } else {
        users = JSON.parse(data)
    }
})

app.get('/api/users', ( req, res ) => {
    res.json( users )
})

app.post('/api/users', ( req, res ) => {
    const newUser = req.body
    users.push(newUser)

    fs.writeFile('users.json', JSON.stringify(users), (err) => {
        if ( err ){
            console.error('Error writing to users,json:', err)
            res.status(500).json({
                error: 'Failed to save user data'
            })
        } else{
            res.json(newUser)
        }
    })
})

app.put('/api/users/:id', ( req, res ) => {
    const userId = parseInt(req.params.id)
    const updatedUser = req.body
    const userIndex = users.findIndex(( user ) => user.id === userId)

    if ( userIndex !== -1 ){
        users[userIndex] = {
            ...users[userIndex],
            ...updatedUser
        }

        fs.writeFile('users.json', JSON.stringify( users ), ( err ) => {
            if ( err ){
                console.error('Error writing to users.json:', err)
                res.status(500).json({ error: "Failed to save user data" })
            } else {
                res.json(users[userIndex])
            }
        })
    } else {
        res.status(404).json({ error: "User not found" })
    }
})

app.delete('/api/users/:id', ( req, res ) => {
    const userId = parseInt(req.params.id)
    users = users.filter(( user ) => user.id !== userId)

    fs.writeFile('users.json', JSON.stringify( users ), ( err ) => {
        if ( err ){
            console.error('Error writing to users.json:', err)
            res.status(500).json({ error: 'Failed to save user data' })
        } else {
            res.json({ message: 'User deleted successfully'})
        }
    })
})

app.listen( port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})