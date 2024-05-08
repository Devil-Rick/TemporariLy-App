import spin from '../assets/Images/spinner.svg';

export default function Spinner() {
  return (
    <div className='bg-black bg-opacity-40 flex items-center justify-center fixed top-0 bottom-0 left-0 right-0'>
      <img className='m-auto w-20' src={spin} alt="loading spinner" />
    </div>
  )
}
