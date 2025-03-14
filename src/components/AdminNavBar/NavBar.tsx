
const Navbar = () => {
  return (
    <div className='w-full h-fit py-4 bg-primary  md:px-10 shadow flex items-center justify-between z-40'>
      <div>
        <h1 className=" font-bold">Path Catalyst logo</h1>
      </div>
      <div className='justify-end gap-2 items-center md:flex hidden'>
        <div className=' w-12 h-12 rounded-full'>
          <img src="https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/man-user-circle-icon.png" alt="" />
        </div>
        <div className=' flex flex-col items-start justify-center '>
          <h1 className='font-bold text-sm'>Anish</h1>
          <p className='text-xs'>anish123@gmail.com</p>
        </div>
      </div>
    </div>
  )
}

export default Navbar