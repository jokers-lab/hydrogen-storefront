/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable prettier/prettier */
import {Link, useLoaderData} from '@remix-run/react';

export function meta() {
  return [
    {title: 'Hydrogen'},
    {description: 'A custom storefront powered by Hydrogen'},
  ];
}

export async function loader({context}) {
  return await context.storefront.query(COLLECTIONS_QUERY);
}

export default function Index() {
  const {collections} = useLoaderData();
  return (
    <section className="w-full gap-4">
      <p className="whitespace-pre-line max-w-prose font-bold text-lead">
        Collection
      </p>
      <div className="grid-flow-row grid gap-2 gap-y-6 md:gap-4 lg:gap-6 grid-cols-1 sm:grid-cols-3">
        {collections.nodes.map((item) => {
          return (
            <Link to={`/collections/${item.handle}`} key={item.id}>
              {item.title}
            </Link>
          );
        })}
      </div>
    </section>
  );
}

const COLLECTIONS_QUERY = `#graphql
  query FeaturedCollections {
    collections(first: 3, query: "collection_type:smart") {
      nodes {
        id
        title
        handle
      }
    }
  }
`;
