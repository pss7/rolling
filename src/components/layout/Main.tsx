
import { ReactNode } from 'react';
import Header from './Header';

interface mainProps {
  children?: ReactNode;
  id?: string;
}

export default function Main({ id, children }: mainProps) {

  return (
    <>
      <Header />
      <main id={id}>
        {children}
      </main>
    </>
  )

}