import { createFileRoute } from '@tanstack/react-router';

export const HomeComponent = () => {
  return (
    <div className='!m-0 !p-0'>
      <img
        alt='background'
        className='absolute h-screen w-full'
        src='/background.png'
      />
      <div className='absolute top-[18%] right-1/2 z-[1] translate-x-1/2'>
        <img alt='logo' className='max-w-2xl' src='/logo.png' />
      </div>
    </div>
  );
};

export const Route = createFileRoute('/')({
  component: HomeComponent,
});
