import { GetStaticPaths, GetStaticProps } from 'next';
import { RichText } from '../components/RichText';
import { Page } from '../payload-types';
import classes from './[slug].module.css';

const Page: React.FC<{ page: Page }> = ({ page }) => {
  return (
    <div className={classes.page}>
      <h1>{page.title}</h1>
      <div className={classes.content}>
        <RichText content={page.content} />
      </div>
    </div>
  );
};

export default Page;

export const getStaticProps: GetStaticProps<any, { slug: string }> = async (context) => {
  const { params } = context;

  const slug = params?.slug || 'home';

  const pageQuery = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/pages?where[slug][equals]=${slug}`).then(
    (res) => res.json(),
  );

  return {
    props: {
      page: pageQuery.docs[0],
    },
  };
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  const pagesQuery: { docs: Page[] } = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/pages?limit=100`).then(
    (res) => res.json(),
  );

  return {
    paths: pagesQuery.docs.map((page) => ({
      params: {
        slug: page.slug,
      },
    })),
    fallback: 'blocking',
  };
};
