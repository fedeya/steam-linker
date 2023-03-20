import type { LoaderArgs } from '@remix-run/node';
import { defer } from '@remix-run/node';
import { Await, useLoaderData } from '@remix-run/react';
import { Suspense } from 'react';

export const loader = async (args: LoaderArgs) => {
  const res = await fetch(
    'https://api.steampowered.com/ISteamApps/GetAppList/v0002/?key=STEAMKEY&format=json'
  );

  return defer(
    {
      gamesPromise: res.json()
    },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=86400 max-age=86400'
      }
    }
  );
};

export default function Index() {
  const { gamesPromise } = useLoaderData<typeof loader>();

  console.log(gamesPromise);

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Welcome to Remix</h1>

      <Suspense fallback={<>Loading...</>}>
        <Await resolve={gamesPromise}>
          {data => (
            <p>
              This is a simple app built with Remix. Remix is a new framework
              for
            </p>
          )}
        </Await>
      </Suspense>
    </div>
  );
}
