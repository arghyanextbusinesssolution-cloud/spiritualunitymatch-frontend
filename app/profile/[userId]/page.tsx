import ProfileClient from './ProfileClient';

export async function generateStaticParams() {
  return [{ userId: 'dummy' }];
}

export default function Page() {
  return <ProfileClient />;
}
