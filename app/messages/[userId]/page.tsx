import ConversationClient from './ConversationClient';

export async function generateStaticParams() {
  return [{ userId: 'dummy' }];
}

export default function Page() {
  return <ConversationClient />;
}
