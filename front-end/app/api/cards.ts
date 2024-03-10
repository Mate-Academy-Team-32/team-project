import { type Params } from 'next/dist/shared/lib/router/utils/route-matcher';

const serverURL = 'http://localhost:8000';

export default async function getCards(params: Params) {
  await fetch(`${serverURL}/api/items?${JSON.stringify(params)}`)
    .then(async (res) => await res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });
}
