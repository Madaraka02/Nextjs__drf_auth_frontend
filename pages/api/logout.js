import cookie from 'cookie'

export default async (req, res) => {
    res.setHeader('Set-Cookie', cookie.serialize('refresh', '', {
        httpOnly:true,
        // secure to true in production
        secure:false,
        sameSite:'strict',
        expires: new Date(0),
        // maxAge: 60 * 60 * 24, 
        path:'/'
    }))
    res.status(200).json({message:'User has been logged out successfully'})
}