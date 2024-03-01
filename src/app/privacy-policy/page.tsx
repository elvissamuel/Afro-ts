import Image from 'next/image'
import React from 'react'
import logo from '@/assets/imgs/afrologo.png'

type Props = {}

const PrivacyPolicy = (props: Props) => {
  return (
    <div className=" flex items-center bg-gradient-to-r from-secondaryColor via-white to-white h-full justify-center px-6 py-2 lg:px-8">
      <div className='flex flex-col items-center w-[80%]'>
        <div className='w-[180px] h-[180px]'>
          <Image src={logo} alt='afro-logo' className='object-contain w-full h-full' />
        </div>
        <div>
          <h2 className='text-center text-3xl font-semibold text-primaryColor mb-4'>Privacy Policy</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas dolorem earum quos vitae, assumenda enim ex exercitationem tempore! Modi deleniti fugiat delectus quisquam tenetur iure eveniet accusantium esse nisi aperiam?
          Voluptatem, quod et consequatur doloremque saepe debitis tempore alias. Accusamus, provident. Vero minima ut, sit ea reiciendis repellat nam repellendus alias molestiae harum id tempora maiores inventore, nemo a praesentium?
          Inventore, accusantium consequatur? Iusto praesentium nulla sequi enim suscipit officia aliquam recusandae iste, voluptate et laudantium expedita, doloribus aspernatur incidunt consectetur minus sapiente quisquam dicta quasi! Delectus necessitatibus deserunt quae.
          Fugit veritatis ex nesciunt vel vitae corporis ullam voluptate, aliquid corrupti nobis quaerat incidunt error ad illo. Animi deserunt nesciunt hic. Possimus ad et saepe laboriosam atque harum nesciunt porro.
          Modi quia natus dolorum commodi? Impedit tempore, temporibus debitis quae explicabo ipsa dolores possimus accusantium harum magnam fuga consequuntur inventore in voluptatibus ipsum, aliquam molestias. Blanditiis debitis ipsa facere delectus?
          Facere, natus laborum officia nulla ab dolorum earum quam aspernatur eum! Doloribus, voluptatum sunt. Architecto, ut assumenda, itaque deserunt iure ipsum vel aperiam reprehenderit debitis facere alias veritatis accusantium doloremque.
          Aut, adipisci facilis cupiditate quis officiis modi, voluptatibus ex hic porro sint atque placeat quos. Exercitationem dicta voluptatum necessitatibus dignissimos cum, soluta debitis, adipisci quibusdam aut dolore error explicabo similique.
          Repellat non vitae exercitationem porro molestiae doloremque, magnam ipsa reprehenderit odit sed ut nesciunt qui iure deserunt harum adipisci, facilis voluptate necessitatibus esse! Accusantium nobis nemo cupiditate nostrum distinctio aliquam!
          Porro, commodi obcaecati recusandae assumenda sit deserunt officia vero at accusantium totam soluta impedit tempora ducimus! Ipsa cupiditate voluptatem, dolorum aliquid porro illo hic quibusdam sit doloribus. .</p>
        </div>

        <div className='mt-10 w-[80%] flex gap-5 justify-center mb-4'>
          <button className='w-full py-2 rounded-md bg-secondaryColor text-primaryColor'>Decline</button>
          <button className='w-full py-2 rounded-md bg-primaryColor text-white'>Accept</button>
        </div>
      </div>

    </div>
  )
}

export default PrivacyPolicy