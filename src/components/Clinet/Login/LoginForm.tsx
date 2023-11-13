'use client'
import { faEye, faEyeSlash, faKey, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { useState } from 'react'

export default function LoginForm () {
  const [isShow, setIsShow] = useState(false)
  const [email, setEmial] = useState('')
  const [password, setPassword] = useState('')
  const [error, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (email === '') {
      newErrors.email = 'Email is required'
    }

    if (password === '') {
      newErrors.password = 'Password is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()

    if (validateForm()) {
      // Perform login logic here, e.g., send a request to an authentication API
      console.log('Login submitted with:', { email, password })
    } else {
      console.log('Form validation failed', error)
    }

    console.log((error.password !== undefined))
  }

  const handleShowPassword = () => {
    isShow ? setIsShow(false) : setIsShow(true)
  }

  const handleForgetpass = () => {
    console.log('lupa deh')
  }
  return (
      <section className="min-w-[40%] text-gray-500">
          <div className="title font-bold  text-main-color">
              <span className='block text-3xl '>Welcome to TiketPapa</span>
              <span className='block text-lg'>Login to continue</span>
          </div>
          <form onSubmit={handleSubmit} className="block pt-7">
              <div className="py-3">
                  <label htmlFor="email" className="font-bold">Email or Username</label>
                  <div className="flex gap-4 items-center pt-2">
                      <FontAwesomeIcon icon={faUser} />
                      <input type="text" id="email" className={` ${(error.email !== undefined) ? 'border-red-500' : 'border-gray-200'} block w-full p-2 rounded-lg border  focus:outline-none focus:ring focus:ring-main-color `} placeholder="Your email or username" value={email} onChange={(e) => { setEmial(e.target.value) }}/>
                  </div>
                  {(error.email !== '') && <p className='text-red-500 ps-10'>{error.email}</p>}
              </div>
              <div className="py-3">
                  <label htmlFor="password" className="font-bold">Password</label>
                  <div className="flex gap-4 items-center pt-2">
                      <FontAwesomeIcon icon={faKey} />
                      <input type={isShow ? 'text' : 'password'} id="password" className={`${(error.password !== undefined) ? 'border-red-500' : 'border-gray-200'} block w-full p-2 rounded-lg border  focus:outline-none focus:ring focus:ring-main-color` } placeholder="Your Password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                  </div>
                  {(error.password !== '') && <p className='text-red-500 ps-10'>{error.password}</p>}
              </div>

              <div className="flex justify-center">
                  <button type='button' onClick={() => { handleShowPassword() }} className='flex gap-1 items-center hover:underline hover:text-main-color'>
                      <FontAwesomeIcon icon={isShow ? faEye : faEyeSlash} />
                      <span>Tampilkan password</span>
                  </button>
              </div>
              <div className="flex justify-center pt-5">
                  <button type='button' onClick={() => { handleForgetpass() }} className=' hover:underline hover:text-main-color'>
                      <span>Lupa Password ?</span>
                  </button>
              </div>

              <div className="w-fit mx-auto pt-6">
                  <button type='submit' className='bg-main-color hover:bg-cyan-700 py-btn-padding px-5 rounded-xl text-white hover:text-gray-400 shadow-md'>
                      Log In
                  </button>
              </div>
          </form>

          <p className='text-center pt-5'>belum punya akun ?,
              <Link href={'/register'} className='text-main-color font-bold'> dafata sekarang !!</Link>
          </p>
      </section>
  )
}
